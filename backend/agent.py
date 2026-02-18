import os
import json
from anthropic import AsyncAnthropic
from mcp_manager import MCPManager


def _get_claude_client() -> AsyncAnthropic:
    """Returns configured Anthropic client."""
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise ValueError("ANTHROPIC_API_KEY environment variable not set")
    return AsyncAnthropic(api_key=api_key)


def build_system_prompt(data: dict) -> str:
    return f"""You are an AI assistant on Sahana Rajashekara's portfolio website.
You help visitors learn about Sahana's experience, projects, skills, and background.
Here is Sahana's portfolio data:

## About
{json.dumps(data.get('about', {}), indent=2)}

## Education
{json.dumps(data.get('education', {}), indent=2)}

## Experience
{json.dumps(data.get('experience', {}), indent=2)}

## Projects
{json.dumps(data.get('projects', {}), indent=2)}

## Skills
{json.dumps(data.get('skills', {}), indent=2)}

## Certificates
{json.dumps(data.get('certificates', {}), indent=2)}

## Adventures
{json.dumps(data.get('adventures', {}), indent=2)}

## Jackie (Sahana's Dog)
{json.dumps(data.get('jackie', {}), indent=2)}

Guidelines:
- Be friendly, professional, and helpful
- Answer questions about Sahana's background, skills, projects, and experience
- If asked about Jackie, be enthusiastic — visitors love hearing about pets!
- If asked something not in the data, politely say you don't have that information
- Keep responses concise but informative
- Suggest relevant projects or experiences based on what visitors are looking for
"""


async def run_agent(
    message: str,
    history: list[dict],
    mcp: MCPManager | None,
) -> str:
    """
    Agentic loop: sends messages to Claude, handles tool calls via MCP,
    and returns the final text response.
    """
    client = _get_claude_client()
    data = mcp.data if mcp else {}
    tools = mcp.tools if mcp and mcp.tools else []

    messages = [
        {"role": msg.get("role", "user"), "content": msg.get("content", "")}
        for msg in history
    ]
    messages.append({"role": "user", "content": message})

    while True:
        response = await client.messages.create(
            model="claude-sonnet-4-20250514",
            max_tokens=1024,
            system=build_system_prompt(data),
            messages=messages,
            tools=tools if tools else None,
        )

        if response.stop_reason == "tool_use":
            messages.append({"role": "assistant", "content": response.content})

            tool_results = []
            await mcp.connect()
            for block in response.content:
                if block.type == "tool_use":
                    print(f"Calling tool: {block.name} with inputs: {block.input}")
                    result = await mcp.call_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": json.dumps(result),
                    })
            await mcp.disconnect()

            messages.append({"role": "user", "content": tool_results})

        else:
            return next(b.text for b in response.content if hasattr(b, "text"))