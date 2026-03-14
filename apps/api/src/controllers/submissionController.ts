import { Request, Response } from "express";
import * as service from "../services/submissionService.js";
import { toPositiveInt } from "../utils/pagination.js";

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
  const reviewStatus = typeof req.query.reviewStatus === "string" ? req.query.reviewStatus : undefined;
  const reviewerEmail = typeof req.query.reviewerEmail === "string" ? req.query.reviewerEmail : undefined;
  const limit = typeof req.query.limit === "string" ? toPositiveInt(req.query.limit, 50) : undefined;
  const submissions = await service.listSubmissions(projectCode, reviewStatus, reviewerEmail, limit);
  res.json(submissions);
}

export async function review(req: Request, res: Response) {
  const id = String(req.params.id);
  const reviewStatus = req.body?.reviewStatus as "pending" | "approved" | "changes_requested";
  const score = typeof req.body?.score === "number" ? req.body.score : undefined;
  const reviewerEmail = String(req.headers["x-user-email"] ?? "reviewer@capstonehub.dev");
  const reviewNotes = typeof req.body?.reviewNotes === "string" ? req.body.reviewNotes : undefined;
  const submission = await service.reviewSubmission(id, reviewStatus, score, reviewerEmail, reviewNotes);
  res.json(submission);
}
