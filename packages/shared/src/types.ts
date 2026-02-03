export type UserRole = "student" | "supervisor" | "admin";

export type ProjectStatus = "planning" | "active" | "review" | "done";

export type DashboardSummary = {
  projectCount: number;
  milestoneCount: number;
  submissionCount: number;
  pendingReviews: number;
};
