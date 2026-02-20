import { z } from "zod";
import { Submission } from "../models/Submission.js";
import { writeActivity } from "./activityLogService.js";

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
  const submission = await Submission.create(input);
  await writeActivity({
    projectCode: input.projectCode,
    actorEmail: input.submittedBy,
    action: "submission.created",
    entityType: "submission",
    entityId: String(submission._id),
    detail: `Submission ${submission.title} created`,
  });
  return submission;
}

export async function listSubmissions(projectCode: string, reviewStatus?: string) {
  const filter: Record<string, unknown> = { projectCode };
  if (reviewStatus) filter.reviewStatus = reviewStatus;
  return Submission.find(filter).sort({ createdAt: -1 }).lean();
}

export async function reviewSubmission(
  id: string,
  reviewStatus: "pending" | "approved" | "changes_requested",
  score: number | undefined,
  reviewerEmail: string,
  reviewNotes: string | undefined
) {
  const update: Record<string, unknown> = {
    reviewStatus,
    reviewerEmail,
    reviewedAt: new Date(),
  };
  if (typeof score === "number") update.score = score;
  if (reviewNotes) update.reviewNotes = reviewNotes;
  const submission = await Submission.findByIdAndUpdate(id, update, { new: true }).lean();

  if (submission) {
    await writeActivity({
      projectCode: String(submission.projectCode),
      actorEmail: reviewerEmail,
      action: "submission.reviewed",
      entityType: "submission",
      entityId: String(submission._id),
      detail: `Review status changed to ${reviewStatus}`,
    });
  }

  return submission;
}
