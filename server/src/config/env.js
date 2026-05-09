import "dotenv/config";

function readNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readList(value, fallback) {
  if (!value) return fallback;
  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV || "development",
  port: readNumber(process.env.PORT, 4000),
  apiPrefix: process.env.API_PREFIX || "/api",
  corsOrigins: readList(process.env.CORS_ORIGINS, ["*"]),
  rateLimit: {
    windowMs: readNumber(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
    max: readNumber(process.env.RATE_LIMIT_MAX, 120)
  },
  logLevel: process.env.LOG_LEVEL || "tiny"
});

export const isProduction = env.nodeEnv === "production";
