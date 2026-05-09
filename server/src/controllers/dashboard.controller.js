import { getDashboardSnapshot } from "../services/dashboard.service.js";

export const getDashboard = (req, res) => {
  res.status(200).json(getDashboardSnapshot(req.validatedQuery));
};
