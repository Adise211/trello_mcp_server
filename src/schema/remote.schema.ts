import { z } from "zod";
import { JSONRPC_VERSION } from "../utils/consts";

export const remoteErrorSchema = z.object({
  code: z.number(),
  message: z.string(),
});

export const remoteRequestSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  method: z.string(),
  params: z.any().optional(),
  id: z.string().optional(),
});

export const remoteResponseSchema = z.object({
  jsonrpc: z.literal(JSONRPC_VERSION),
  result: z.any().optional(),
  error: remoteErrorSchema.optional(),
  id: z.string().optional(),
});

export type RemoteRequest = z.infer<typeof remoteRequestSchema>;
export type RemoteResponse = z.infer<typeof remoteResponseSchema>;
export type RemoteResponseError = z.infer<typeof remoteErrorSchema>;
