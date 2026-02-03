import { z } from "zod";
import { Milestone } from "../models/Milestone.js";

const CreateMilestoneSchema = z.object({
  projectCode: z.string().min(2),
  title: z.string().min(3),
  dueDate: z.string().min(8),
  assigneeEmail: z.string().email(),
  notes: z.string().optional(),
});

export async function createMilestone(body: unknown) {
  const input = CreateMilestoneSchema.parse(body);
  return Milestone.create(input);
}

export async function listMilestones(projectCode: string) {
  return Milestone.find({ projectCode }).sort({ createdAt: -1 }).lean();
}

export async function setMilestoneStatus(id: string, status: "todo" | "in_progress" | "blocked" | "done") {
  return Milestone.findByIdAndUpdate(id, { status }, { new: true }).lean();
}
