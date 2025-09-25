// Load environment variables FIRST, before importing any other modules
import * as dotenv from "dotenv";
// quiet: true to avoid logging to stdout
dotenv.config({ quiet: true });

import { startServer } from "./src/server";
import { logger } from "./src/utils/logger";

// This is the main entry point for the MCP server
// CLI wrapper that imports server.ts, adds error handling, and makes the project runnable as a command-line tool
async function main() {
  try {
    logger.info("Getting ready MCP server...");
    startServer();
  } catch (err) {
    logger.error("Fatal error:", err);
    process.exit(1);
  }
}

main();
