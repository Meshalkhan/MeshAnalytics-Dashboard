import { buildDashboardPayload } from "../lib/buildDashboardPayload.js";

export function getDashboardData(req, res) {
  res.json(buildDashboardPayload(req.query || {}));
}
