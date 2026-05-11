import { Request, Response } from "express";
import * as service from "../services/milestoneService.js";

export async function create(req: Request, res: Response) {
  try {
    const actorEmail = String(req.headers["x-user-email"] ?? "system@capstonehub.dev");
    const milestone = await service.createMilestone(req.body, actorEmail);
    res.status(201).json(milestone);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Bad request";
    res.status(400).json({ error: message });
  }
}

export async function list(req: Request, res: Response) {
  const projectCode = String(req.query.projectCode ?? "");
  const milestones = await service.listMilestones(projectCode);
  res.json(milestones);
}

export async function setStatus(req: Request, res: Response) {
  const id = String(req.params.id);
  const status = req.body?.status as "todo" | "in_progress" | "blocked" | "done";
  const actorEmail = String(req.headers["x-user-email"] ?? "system@capstonehub.dev");
  const milestone = await service.setMilestoneStatus(id, status, actorEmail);
  res.json(milestone);
}
