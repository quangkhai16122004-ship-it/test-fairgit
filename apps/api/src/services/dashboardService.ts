import { Milestone } from "../models/Milestone.js";
import { Project } from "../models/Project.js";
import { Submission } from "../models/Submission.js";

function toDateOnly(value: Date) {
  const year = value.getUTCFullYear();
  const month = String(value.getUTCMonth() + 1).padStart(2, "0");
  const day = String(value.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function getDashboardSummary() {
  const today = toDateOnly(new Date());

  const [
    projectCount,
    milestoneCount,
    submissionCount,
    pendingReviews,
    activeProjects,
    reviewProjects,
    doneProjects,
    overdueMilestones,
  ] = await Promise.all([
    Project.countDocuments(),
    Milestone.countDocuments(),
    Submission.countDocuments(),
    Submission.countDocuments({ reviewStatus: "pending" }),
    Project.countDocuments({ status: "active" }),
    Project.countDocuments({ status: "review" }),
    Project.countDocuments({ status: "done" }),
    Milestone.countDocuments({ status: { $ne: "done" }, dueDate: { $lt: today } }),
  ]);

  const recentProjects = await Project.find().sort({ updatedAt: -1 }).limit(5).lean();

  return {
    projectCount,
    milestoneCount,
    submissionCount,
    pendingReviews,
    activeProjects,
    reviewProjects,
    doneProjects,
    overdueMilestones,
    recentProjects,
  };
}
