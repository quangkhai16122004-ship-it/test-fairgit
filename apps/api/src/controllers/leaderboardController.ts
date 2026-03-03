import { Request, Response } from "express";
import { buildLeaderboard } from "../services/leaderboardService.js";

export async function list(req: Request, res: Response) {
  const projectCode = String(req.query.projectCode ?? "");
  if (!projectCode) {
    res.status(400).json({ error: "projectCode is required" });
    return;
  }

  const leaderboard = await buildLeaderboard(projectCode);
  res.json(leaderboard);
}
