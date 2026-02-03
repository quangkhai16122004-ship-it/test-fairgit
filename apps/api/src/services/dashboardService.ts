import { Project } from "../models/Project.js";
import { Milestone } from "../models/Milestone.js";
import { Submission } from "../models/Submission.js";

export async function getDashboardSummary() {
  const [projectCount, milestoneCount, submissionCount, pendingReviews] = await Promise.all([
    Project.countDocuments(),
    Milestone.countDocuments(),
    Submission.countDocuments(),
    Submission.countDocuments({ reviewStatus: "pending" }),
  ]);

  const recentProjects = await Project.find().sort({ updatedAt: -1 }).limit(5).lean();

  return {
    projectCount,
    milestoneCount,
    submissionCount,
    pendingReviews,
    recentProjects,
  };
}
