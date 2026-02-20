import { Request, Response } from "express";
import * as service from "../services/projectService.js";

export async function create(req: Request, res: Response) {
  try {
    const actorEmail = String(req.headers["x-user-email"] ?? "system@capstonehub.dev");
    const project = await service.createProject(req.body, actorEmail);
    res.status(201).json(project);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Bad request";
    res.status(400).json({ error: message });
  }
}

export async function list(_req: Request, res: Response) {
  const projects = await service.listProjects();
  res.json(projects);
}

export async function setProgress(req: Request, res: Response) {
  const code = String(req.params.code);
  const progress = Number(req.body?.progress ?? 0);
  const actorEmail = String(req.headers["x-user-email"] ?? "system@capstonehub.dev");
  const project = await service.updateProjectProgress(code, progress, actorEmail);
  res.json(project);
}
