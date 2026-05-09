export class ApiError extends Error {
  constructor(statusCode, message, { code, details } = {}) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.code = code || `HTTP_${statusCode}`;
    this.details = details;
    this.expose = true;
  }

  static badRequest(message, details) {
    return new ApiError(400, message, { code: "BAD_REQUEST", details });
  }

  static notFound(message = "Resource not found") {
    return new ApiError(404, message, { code: "NOT_FOUND" });
  }

  static internal(message = "Internal server error") {
    return new ApiError(500, message, { code: "INTERNAL" });
  }
}
