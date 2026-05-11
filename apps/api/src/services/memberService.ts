import { z } from "zod";
import { ProjectMember } from "../models/ProjectMember.js";

const CreateMemberSchema = z.object({
  projectCode: z.string().min(2),
  email: z.string().email(),
  role: z.enum(["leader", "member", "reviewer"]).default("member"),
  workload: z.number().min(0).max(100).optional(),
});

export async function addProjectMember(body: unknown) {
  const input = CreateMemberSchema.parse(body);
  return ProjectMember.create(input);
}

export async function listProjectMembers(projectCode: string) {
  return ProjectMember.find({ projectCode }).sort({ workload: -1, createdAt: 1 }).lean();
}

export async function rebalanceWorkload(projectCode: string, updates: Array<{ email: string; workload: number }>) {
  for (const item of updates) {
    await ProjectMember.updateOne(
      { projectCode, email: item.email },
      { $set: { workload: Math.max(0, Math.min(100, item.workload)) } }
    );
  }
  return listProjectMembers(projectCode);
}
