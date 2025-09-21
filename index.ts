// block stdout pollution ---
// This is a workaround to force all logs to be printed to stderr
// This is because the MCP server expects logs to be printed to stderr
// and the inspector expects logs to be printed to stdout
// This is a workaround to force all logs to be printed to stderr
// This is because the MCP server expects logs to be printed to stderr
// and the inspector expects logs to be printed to stdout
console.log = (...args) => {
  console.error("[FORCED-LOG]", ...args);
};

import { startServer } from "./src/server";
import { logger } from "./src/utils/logger";

// This is the main entry point for the MCP server
// CLI wrapper that imports server.ts, adds error handling, and makes the project runnable as a command-line tool
async function main() {
  try {
    logger.info("Getting ready MCP server...");
    await startServer();
  } catch (err) {
    logger.error("Fatal error:", err);
    process.exit(1);
  }
}

main();
