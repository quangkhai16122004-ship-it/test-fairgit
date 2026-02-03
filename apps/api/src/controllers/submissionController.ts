import { Request, Response } from "express";
import * as service from "../services/submissionService.js";

export async function create(req: Request, res: Response) {
  try {
    const submission = await service.createSubmission(req.body);
    res.status(201).json(submission);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Bad request";
    res.status(400).json({ error: message });
  }
}

export async function list(req: Request, res: Response) {
  const projectCode = String(req.query.projectCode ?? "");
  const submissions = await service.listSubmissions(projectCode);
  res.json(submissions);
}

export async function review(req: Request, res: Response) {
  const id = String(req.params.id);
  const reviewStatus = req.body?.reviewStatus as "pending" | "approved" | "changes_requested";
  const score = typeof req.body?.score === "number" ? req.body.score : undefined;
  const submission = await service.reviewSubmission(id, reviewStatus, score);
  res.json(submission);
}
