import { z } from "zod";

export const PERIODS = ["7d", "30d", "90d"];
export const REGIONS = ["all", "north-america", "emea", "apac", "latam"];
export const SEGMENTS = ["all", "enterprise", "mid-market", "smb"];

export const dashboardQuerySchema = z.object({
  period: z.enum(PERIODS).default("30d"),
  region: z.enum(REGIONS).default("all"),
  segment: z.enum(SEGMENTS).default("all")
});
