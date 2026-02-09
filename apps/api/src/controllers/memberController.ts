import { Request, Response } from "express";
import * as service from "../services/memberService.js";

export async function create(req: Request, res: Response) {
  try {
    const member = await service.addProjectMember(req.body);
    res.status(201).json(member);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Bad request";
    res.status(400).json({ error: message });
  }
}

export async function list(req: Request, res: Response) {
  const projectCode = String(req.query.projectCode ?? "");
  const members = await service.listProjectMembers(projectCode);
  res.json(members);
}

export async function rebalance(req: Request, res: Response) {
  const projectCode = String(req.params.projectCode);
  const updates = Array.isArray(req.body?.updates) ? req.body.updates : [];
  const members = await service.rebalanceWorkload(projectCode, updates);
  res.json(members);
}
