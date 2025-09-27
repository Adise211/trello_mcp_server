import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio";
import { logger } from "../utils/logger";
import { server } from "../server";

export function startLocalServer() {
  // Start receiving messages on stdin and sending messages on stdout
  const transportStdio = new StdioServerTransport();

  server.connect(transportStdio);
  logger.info("🚀 MCP server started locally on stdio mode!");
}
