import os
import json
from pathlib import Path
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import anthropic
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

load_dotenv()

# Rate limiter
limiter = Limiter(key_func=get_remote_address)

# Store MCP data globally after loading
portfolio_data = {}

async def load_mcp_data():
    """Load all data from MCP server at startup."""
    global portfolio_data
    
    server_params = StdioServerParameters(
        command="uv",
        args=["run", "python", "server.py"],
        cwd=str(Path(__file__).parent.parent / "mcp-server")
    )
    
    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()
            
            # Load all resources
            resources = ["about", "education", "experience", "projects", "skills", "certificates", "adventures", "jackie"]
            
            for resource in resources:
                try:
                    result = await session.read_resource(f"portfolio://{resource}")
                    portfolio_data[resource] = json.loads(result.contents[0].text)
                except Exception as e:
                    print(f"Warning: Could not load {resource}: {e}")
    
    print("Portfolio data loaded from MCP server")

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load MCP data on startup."""
    await load_mcp_data()
    yield

app = FastAPI(title="Portfolio Chat API", lifespan=lifespan)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "https://*.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Anthropic client
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
@limiter.limit("5/day")  # 5 requests per day per IP
async def chat(request: Request, chat_request: ChatRequest):
    try:
        # Build messages
        messages = []
        
        # Add history
        for msg in chat_request.history:
            messages.append({
                "role": msg.get("role", "user"),
                "content": msg.get("content", "")
            })
        
        # Add current message
        messages.append({
            "role": "user",
            "content": chat_request.message
        })
        
        # Call Claude
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
        "data_loaded": bool(portfolio_data)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)