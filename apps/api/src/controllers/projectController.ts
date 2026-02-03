import { Request, Response } from "express";
import * as service from "../services/projectService.js";

export async function create(req: Request, res: Response) {
  try {
    const project = await service.createProject(req.body);
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
  const project = await service.updateProjectProgress(code, progress);
  res.json(project);
}
