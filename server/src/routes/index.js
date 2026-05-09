import { Router } from "express";
import dashboardRoutes from "./dashboard.routes.js";
import healthRoutes from "./health.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
