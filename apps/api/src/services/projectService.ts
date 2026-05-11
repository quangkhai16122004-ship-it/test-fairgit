import { z } from "zod";
import { Project } from "../models/Project.js";
import { writeActivity } from "./activityLogService.js";

const CreateProjectSchema = z.object({
  code: z.string().min(3),
  title: z.string().min(3),
  teamName: z.string().min(2),
  ownerEmail: z.string().email(),
});

export async function createProject(body: unknown, actorEmail = "system@capstonehub.dev") {
  const input = CreateProjectSchema.parse(body);
  const exists = await Project.findOne({ code: input.code }).lean();
  if (exists) throw new Error("Project code already exists");

  const project = await Project.create(input);
  await writeActivity({
    projectCode: project.code,
    actorEmail,
    action: "project.created",
    entityType: "project",
    entityId: String(project._id),
    detail: `Project ${project.code} created`,
  });

  return project;
}

type ListProjectsInput = {
  page: number;
  limit: number;
  search?: string;
};

export async function listProjects(input?: ListProjectsInput) {
  if (!input) {
    return Project.find().sort({ updatedAt: -1 }).lean();
  }

  const page = Math.max(1, input.page);
  const limit = Math.min(Math.max(1, input.limit), 100);
  const filter: Record<string, unknown> = {};
  if (input.search) {
    filter.$or = [
      { code: { $regex: input.search, $options: "i" } },
      { title: { $regex: input.search, $options: "i" } },
      { teamName: { $regex: input.search, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    Project.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Project.countDocuments(filter),
  ]);

  return {
    items,
    page,
    limit,
    total,
  };
}

export async function updateProjectProgress(code: string, progress: number, actorEmail = "system@capstonehub.dev") {
  const project = await Project.findOneAndUpdate({ code }, { progress }, { new: true }).lean();
  if (project) {
    await writeActivity({
      projectCode: code,
      actorEmail,
      action: "project.progress_updated",
      entityType: "project",
      entityId: String(project._id),
      detail: `Project progress moved to ${progress}%`,
    });
  }
  return project;
}
