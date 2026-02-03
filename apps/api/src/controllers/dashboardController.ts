import { Request, Response } from "express";
import { getDashboardSummary } from "../services/dashboardService.js";

export async function summary(_req: Request, res: Response) {
  const data = await getDashboardSummary();
  res.json(data);
}
