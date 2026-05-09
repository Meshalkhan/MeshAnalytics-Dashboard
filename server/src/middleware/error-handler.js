import { ApiError } from "../utils/ApiError.js";
import { isProduction } from "../config/env.js";

export const errorHandler = (err, req, res, _next) => {
  const apiError =
    err instanceof ApiError
      ? err
      : new ApiError(500, "Internal server error", { code: "INTERNAL" });

  if (apiError.statusCode >= 500) {
    console.error(`[${req.method} ${req.originalUrl}]`, err);
  }

  const body = {
    error: {
      code: apiError.code,
      message: apiError.expose ? apiError.message : "Internal server error"
    }
  };

  if (apiError.details) body.error.details = apiError.details;
  if (!isProduction && err.stack) body.error.stack = err.stack;

  res.status(apiError.statusCode).json(body);
};
