import { z } from "zod";
import { Submission } from "../models/Submission.js";

const CreateSubmissionSchema = z.object({
  projectCode: z.string().min(2),
  milestoneId: z.string().min(3),
  submittedBy: z.string().email(),
  title: z.string().min(3),
  description: z.string().optional(),
  artifactUrl: z.string().url(),
});

export async function createSubmission(body: unknown) {
  const input = CreateSubmissionSchema.parse(body);
  return Submission.create(input);
}

export async function listSubmissions(projectCode: string) {
  return Submission.find({ projectCode }).sort({ createdAt: -1 }).lean();
}

export async function reviewSubmission(id: string, reviewStatus: "pending" | "approved" | "changes_requested", score?: number) {
  const update: Record<string, unknown> = { reviewStatus };
  if (typeof score === "number") update.score = score;
  return Submission.findByIdAndUpdate(id, update, { new: true }).lean();
}
