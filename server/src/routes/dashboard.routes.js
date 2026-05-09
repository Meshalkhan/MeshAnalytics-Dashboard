import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { validateQuery } from "../middleware/validate.js";
import { dashboardQuerySchema } from "../validators/dashboard.schema.js";
import { asyncHandler } from "../utils/async-handler.js";

const router = Router();

router.get("/", validateQuery(dashboardQuerySchema), asyncHandler(getDashboard));

export default router;
