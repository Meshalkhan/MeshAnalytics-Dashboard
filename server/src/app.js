import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import { env, isProduction } from "./config/env.js";
import { apiRateLimiter } from "./middleware/rate-limiter.js";
import { notFound } from "./middleware/not-found.js";
import { errorHandler } from "./middleware/error-handler.js";
import routes from "./routes/index.js";

export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: "1mb" }));
  app.use(
    cors({
      origin: env.corsOrigins.includes("*") ? true : env.corsOrigins,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    })
  );

  if (!isProduction) {
    app.use(morgan(env.logLevel));
  }

  app.use(env.apiPrefix, apiRateLimiter, routes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
