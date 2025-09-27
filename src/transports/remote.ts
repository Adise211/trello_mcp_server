import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { logger } from "../utils/logger";
import { server } from "../server";
import crypto from "node:crypto";
import {
  JSONRPC_ERROR_CODES,
  JSONRPC_ERROR_MESSAGES,
  JSONRPC_VERSION,
} from "../utils/consts";
import { RemoteResponse } from "../schema/remote.schema";

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
      const response: RemoteResponse = {
        jsonrpc: JSONRPC_VERSION,
        error: {
          code: JSONRPC_ERROR_CODES.InternalError,
          message: JSONRPC_ERROR_MESSAGES.InternalError,
        },
      };
      res.status(500).json(response);
    }
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the Trello MCP server!");
});

app.listen(PORT, async () => {
  logger.info(`🚀 MCP server started remotely on port ${PORT}!`);
});
