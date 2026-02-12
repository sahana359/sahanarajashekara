import os
import json
from pathlib import Path
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

load_dotenv()

limiter = Limiter(key_func=get_remote_address)
portfolio_data = {}

IS_VERCEL = os.getenv("VERCEL") == "1"
MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "")


async def load_from_remote_mcp():
    """Load data from remote MCP server."""
    global portfolio_data
    from fastmcp import Client
    
    async with Client(f"{MCP_SERVER_URL}/sse") as client:
        resources = ["about", "education", "experience", "projects", 
                     "skills", "certificates", "adventures", "jackie"]
        
        for resource in resources:
            try:
                result = await client.read_resource(f"portfolio://{resource}")
                portfolio_data[resource] = json.loads(result[0].text)
            except Exception as e:
                print(f"Warning: Could not load {resource}: {e}")
    
    print(f"Loaded {len(portfolio_data)} resources from MCP server")


def load_json_data():
    """Fallback: Load from JSON files."""
    global portfolio_data
    data_dir = Path(__file__).parent / "data" / "json"
    
    resources = ["about", "education", "experience", "projects", 
                 "skills", "certificates", "adventures", "jackie"]
    
    for resource in resources:
        try:
            with open(data_dir / f"{resource}.json", 'r') as f:
                portfolio_data[resource] = json.load(f)
        except Exception as e:
            print(f"Warning: Could not load {resource}: {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    if MCP_SERVER_URL:
        print(f"Loading from MCP server: {MCP_SERVER_URL}")
        await load_from_remote_mcp()
    else:
        print("No MCP_SERVER_URL - falling back to JSON files")
        load_json_data()
    yield


app = FastAPI(title="Portfolio Chat API", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://*.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


class ChatRequest(BaseModel):
    message: str
    history: list = []


class ChatResponse(BaseModel):
    response: str


def build_system_prompt() -> str:
    """Build system prompt with portfolio data."""
    return f"""You are an AI assistant on Sahana Rajashekara's portfolio website. You help visitors learn about Sahana's experience, projects, skills, and background.

Here is Sahana's portfolio data:

## About
{json.dumps(portfolio_data.get('about', {}), indent=2)}

## Education
{json.dumps(portfolio_data.get('education', {}), indent=2)}

## Experience
{json.dumps(portfolio_data.get('experience', {}), indent=2)}

## Projects
{json.dumps(portfolio_data.get('projects', {}), indent=2)}

## Skills
{json.dumps(portfolio_data.get('skills', {}), indent=2)}

## Certificates
{json.dumps(portfolio_data.get('certificates', {}), indent=2)}

## Adventures
{json.dumps(portfolio_data.get('adventures', {}), indent=2)}

## Jackie (Sahana's Dog)
{json.dumps(portfolio_data.get('jackie', {}), indent=2)}

Guidelines:
- Be friendly, professional, and helpful
- Answer questions about Sahana's background, skills, projects, and experience
- If asked about Jackie, be enthusiastic - visitors love hearing about pets!
- If asked something not in the data, politely say you don't have that information
- Keep responses concise but informative
- You can suggest relevant projects or experiences based on what visitors are looking for
"""


@app.get("/")
async def root():
    return {"status": "Portfolio Chat API is running"}


@app.post("/chat", response_model=ChatResponse)
@limiter.limit("5/day")
async def chat(request: Request, chat_request: ChatRequest):
    try:
        messages = []
        
        for msg in chat_request.history:
            messages.append({
                "role": msg.get("role", "user"),
                "content": msg.get("content", "")
            })
        
        messages.append({
            "role": "user",
            "content": chat_request.message
        })
        
        response = client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=build_system_prompt(),
            messages=messages
        )
        
        return ChatResponse(response=response.content[0].text)
    
    except anthropic.APIError as e:
        raise HTTPException(status_code=500, detail=f"Claude API error: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "data_loaded": bool(portfolio_data),
        "data_source": "mcp" if MCP_SERVER_URL else "json",
        "resources": list(portfolio_data.keys())
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)