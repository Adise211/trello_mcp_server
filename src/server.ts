// Load environment variables FIRST, before importing any other modules
import dotenv from "dotenv";
dotenv.config();

import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { allTools } from "./tools";

// Create an MCP server
const server = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

// Register all tools
allTools.forEach((tool) => {
  server.registerTool(tool.name, tool.definition, tool.handler);
});

async function main() {
  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("🚀 Server started...");
}

main();
