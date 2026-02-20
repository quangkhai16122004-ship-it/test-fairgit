import { z } from "zod";
import { Milestone } from "../models/Milestone.js";
import { Project } from "../models/Project.js";
import { writeActivity } from "./activityLogService.js";

const CreateMilestoneSchema = z.object({
  projectCode: z.string().min(2),
  title: z.string().min(3),
  dueDate: z.string().min(8),
  assigneeEmail: z.string().email(),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
  points: z.number().min(1).max(20).default(5),
  notes: z.string().optional(),
});

async function refreshProjectProgress(projectCode: string) {
  const [allCount, doneCount] = await Promise.all([
    Milestone.countDocuments({ projectCode }),
    Milestone.countDocuments({ projectCode, status: "done" }),
  ]);

  if (allCount === 0) {
    await Project.updateOne({ code: projectCode }, { $set: { progress: 0 } });
    return;
  }

  const progress = Math.round((doneCount / allCount) * 100);
  await Project.updateOne({ code: projectCode }, { $set: { progress } });
}

export async function createMilestone(body: unknown, actorEmail = "system@capstonehub.dev") {
  const input = CreateMilestoneSchema.parse(body);
  const milestone = await Milestone.create(input);
  await refreshProjectProgress(input.projectCode);
  await writeActivity({
    projectCode: input.projectCode,
    actorEmail,
    action: "milestone.created",
    entityType: "milestone",
    entityId: String(milestone._id),
    detail: `Milestone ${milestone.title} assigned to ${milestone.assigneeEmail}`,
  });
  return milestone;
}

export async function listMilestones(projectCode: string) {
  return Milestone.find({ projectCode }).sort({ dueDate: 1, createdAt: -1 }).lean();
}

export async function setMilestoneStatus(
  id: string,
  status: "todo" | "in_progress" | "blocked" | "done",
  actorEmail = "system@capstonehub.dev"
) {
  const milestone = await Milestone.findByIdAndUpdate(id, { status }, { new: true }).lean();
  if (milestone?.projectCode) {
    await refreshProjectProgress(String(milestone.projectCode));
    await writeActivity({
      projectCode: String(milestone.projectCode),
      actorEmail,
      action: "milestone.status_updated",
      entityType: "milestone",
      entityId: String(milestone._id),
      detail: `Milestone status changed to ${status}`,
    });
  }
  return milestone;
}
