import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { logger } from "../utils/logger";
import { server } from "../server";
import crypto from "node:crypto";

const PORT = 3000;
const app = express();
app.use(express.json());

//Create transport ONCE
const transportHttp = new StreamableHTTPServerTransport({
  sessionIdGenerator: () => crypto.randomUUID(),
  enableJsonResponse: true,
});

//Connect server ONCE
server.connect(transportHttp);

app.post("/mcp", (req, res) => {
  try {
    // Delegate handling to the existing transport
    transportHttp.handleRequest(req, res, req.body);
  } catch (error) {
    logger.error("Error handling MCP request:", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
});

app.listen(PORT, async () => {
  logger.info(`🚀 MCP server started remotely on port ${PORT}!`);
});
