import { startLocalServer } from "./src/transports/local";
import { logger } from "./src/utils/logger";

// This is the main entry point for the MCP server in local mode
// CLI wrapper that imports server.ts, adds error handling, and makes the project runnable as a command-line tool
async function main() {
  try {
    logger.info("Getting ready MCP server...");
    startLocalServer();
  } catch (err) {
    logger.error("Fatal error:", err);
    process.exit(1);
  }
}

main();
