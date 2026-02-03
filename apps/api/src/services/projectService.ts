import { z } from "zod";
import { Project } from "../models/Project.js";

const CreateProjectSchema = z.object({
  code: z.string().min(3),
  title: z.string().min(3),
  teamName: z.string().min(2),
  ownerEmail: z.string().email(),
});

export async function createProject(body: unknown) {
  const input = CreateProjectSchema.parse(body);
  const exists = await Project.findOne({ code: input.code }).lean();
  if (exists) throw new Error("Project code already exists");
  return Project.create(input);
}

export async function listProjects() {
  return Project.find().sort({ updatedAt: -1 }).lean();
}

export async function updateProjectProgress(code: string, progress: number) {
  return Project.findOneAndUpdate({ code }, { progress }, { new: true }).lean();
}
