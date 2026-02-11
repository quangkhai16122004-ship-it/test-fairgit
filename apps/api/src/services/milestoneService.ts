import { z } from "zod";
import { Milestone } from "../models/Milestone.js";
import { Project } from "../models/Project.js";

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

export async function createMilestone(body: unknown) {
  const input = CreateMilestoneSchema.parse(body);
  const milestone = await Milestone.create(input);
  await refreshProjectProgress(input.projectCode);
  return milestone;
}

export async function listMilestones(projectCode: string) {
  return Milestone.find({ projectCode }).sort({ dueDate: 1, createdAt: -1 }).lean();
}

export async function setMilestoneStatus(id: string, status: "todo" | "in_progress" | "blocked" | "done") {
  const milestone = await Milestone.findByIdAndUpdate(id, { status }, { new: true }).lean();
  if (milestone?.projectCode) {
    await refreshProjectProgress(String(milestone.projectCode));
  }
  return milestone;
}
