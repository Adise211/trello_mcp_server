// Load environment variables FIRST, before importing any other modules
import * as dotenv from "dotenv";
// quiet: true to avoid logging to stdout
dotenv.config({ quiet: true });

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { allTools } from "./tools";
import { logger } from "./utils/logger";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

// Register all tools
allTools.forEach((tool) => {
  server.registerTool(tool.name, tool.definition, tool.handler);
});

export function startServer() {
  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  server.connect(transport);
  logger.info("🚀 MCP server started!");
}
