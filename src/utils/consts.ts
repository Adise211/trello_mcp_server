export const JSONRPC_VERSION = "2.0";

export const JSONRPC_ERROR_CODES = {
  ParseError: -32700,
  InvalidRequest: -32600,
  MethodNotFound: -32601,
  InvalidParams: -32602,
  InternalError: -32603,
};

export const JSONRPC_ERROR_MESSAGES = {
  ParseError: "Parse error",
  InvalidRequest: "Invalid request",
  MethodNotFound: "Method not found",
  InvalidParams: "Invalid params",
  InternalError: "Internal error",
};
