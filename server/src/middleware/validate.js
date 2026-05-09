import { ApiError } from "../utils/ApiError.js";

export const validateQuery = (schema) => (req, _res, next) => {
  const result = schema.safeParse(req.query);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message
    }));
    return next(ApiError.badRequest("Invalid query parameters", details));
  }
  req.validatedQuery = result.data;
  next();
};
