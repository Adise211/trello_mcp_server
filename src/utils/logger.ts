import { createLogger, format, transports } from "winston";

const { combine, timestamp, colorize, printf } = format;

// Custom format: [LEVEL] 2025-09-20T20:12:34Z message
const logFormat = printf(({ level, message, timestamp }) => {
  return `[${level.toUpperCase()}] ${timestamp} ${message}`;
});

export const logger = createLogger({
  level: process.env.DEBUG ? "debug" : "info",
  format: combine(colorize(), timestamp(), logFormat),
  transports: [
    // Important: MCP logs must NOT go to stdout, only stderr
    new transports.Stream({ stream: process.stderr }),
  ],
});
