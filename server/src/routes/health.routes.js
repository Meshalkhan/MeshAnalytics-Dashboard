import { Router } from "express";

const startedAt = Date.now();
const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    status: "ok",
    uptimeMs: Date.now() - startedAt,
    timestamp: new Date().toISOString()
  });
});

export default router;
