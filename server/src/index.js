import express from "express";
import cors from "cors";
import dashboardRoutes from "./routes/dashboardRoutes.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/dashboard", dashboardRoutes);

app.listen(port, () => {
  console.log(`MeshAnalytics API listening on http://localhost:${port}`);
});
