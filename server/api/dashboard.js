import { getDashboardSnapshot } from "../src/services/dashboard.service.js";
import { dashboardQuerySchema } from "../src/validators/dashboard.schema.js";

const ALLOWED_METHODS = "GET,OPTIONS";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", ALLOWED_METHODS);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", ALLOWED_METHODS);
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const parsed = dashboardQuerySchema.safeParse(req.query || {});
  if (!parsed.success) {
    res.status(400).json({
      message: "Invalid query parameters",
      details: parsed.error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
      }))
    });
    return;
  }

  res.status(200).json(getDashboardSnapshot(parsed.data));
}
