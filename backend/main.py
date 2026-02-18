import os
from contextlib import asynccontextmanager
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Any

from mcp_manager import MCPManager
from agent import run_agent

load_dotenv()

MCP_SERVER_URL = os.getenv("MCP_SERVER_URL", "")
mcp = MCPManager(MCP_SERVER_URL) if MCP_SERVER_URL else None


@asynccontextmanager
async def lifespan(app: FastAPI):
    if mcp:
        await mcp.connect()
        await mcp.fetch_resources()
        await mcp.list_tools()
        await mcp.disconnect()
    yield


app = FastAPI(title="Portfolio Chat API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://sahanarajashekara.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    history: list[dict[str, Any]] = Field(default_factory=list)


class ChatResponse(BaseModel):
    response: str


@app.get("/")
async def root():
    return {"status": "Portfolio Chat API is running"}


@app.post("/chat", response_model=ChatResponse)
async def chat(request: Request, chat_request: ChatRequest):
    try:
        text = await run_agent(chat_request.message, chat_request.history, mcp)
        return ChatResponse(response=text)
    except Exception as e:
        import traceback
        error_detail = f"{type(e).__name__}: {str(e)}\n{traceback.format_exc()}"
        print(error_detail)
        raise HTTPException(status_code=500, detail=error_detail)


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "data_loaded": mcp.is_loaded() if mcp else False,
        "data_source": "mcp" if MCP_SERVER_URL else "none",
        "resources": mcp.keys() if mcp else [],
    }


@app.get("/debug")
async def debug():
    return {
        "portfolio_data_keys": mcp.keys() if mcp else [],
        "mcp_url": MCP_SERVER_URL or "not set",
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)