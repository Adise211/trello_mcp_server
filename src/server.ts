// Load environment variables FIRST, before importing any other modules
import * as dotenv from "dotenv";
// quiet: true to avoid logging to stdout
dotenv.config({ quiet: true });

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { allTools } from "./tools";

// Create an MCP server
export const server = new McpServer({
  name: "trello-mcp-server",
  version: "1.0.0",
});

// Register all tools
allTools.forEach((tool) => {
  server.registerTool(tool.name, tool.definition, tool.handler);
});
