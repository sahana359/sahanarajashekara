import json
from mcp import ClientSession
from mcp.client.sse import sse_client


class MCPManager:
    def __init__(self, server_url: str):
        self.server_url = server_url
        self.data: dict = {}
        self.tools: list = []
        self._session: ClientSession | None = None
        self._streams = None

    # ── Connection ──────────────────────────────────────────────────────────

    async def connect(self):
        self._streams = sse_client(self.server_url)
        read, write = await self._streams.__aenter__()
        self._session = ClientSession(read, write)
        await self._session.__aenter__()
        await self._session.initialize()

    async def disconnect(self):
        if self._session:
            await self._session.__aexit__(None, None, None)
            self._session = None
        if self._streams:
            await self._streams.__aexit__(None, None, None)
            self._streams = None

    # ── Resources ────────────────────────────────────────────────────────────

    async def fetch_resources(self):
        """Fetch all resources and store in self.data."""
        if not self._session:
            raise RuntimeError("Not connected")
        resources = await self._session.list_resources()
        for resource in resources.resources:
            result = await self._session.read_resource(resource.uri)
            key = str(resource.uri).split("/")[-1]
            for content in result.contents:
                try:
                    self.data[key] = json.loads(content.text)
                except (json.JSONDecodeError, AttributeError):
                    self.data[key] = getattr(content, "text", str(content))

    # ── Tools ────────────────────────────────────────────────────────────────

    async def list_tools(self):
        """Fetch available tools and store in self.tools."""
        if not self._session:
            raise RuntimeError("Not connected")
        result = await self._session.list_tools()
        self.tools = [
            {
                "name": t.name,
                "description": t.description,
                "input_schema": t.inputSchema,
            }
            for t in result.tools
        ]

    async def call_tool(self, name: str, inputs: dict) -> dict:
        """Call a tool by name and return its result."""
        if not self._session:
            raise RuntimeError("Not connected — call connect() first")
        result = await self._session.call_tool(name, inputs)
        return result.model_dump()

    # ── Helpers ──────────────────────────────────────────────────────────────

    def is_loaded(self) -> bool:
        return bool(self.data)

    def keys(self) -> list[str]:
        return list(self.data.keys())