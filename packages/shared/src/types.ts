export type UserRole = "student" | "supervisor" | "admin";

export type ProjectStatus = "planning" | "active" | "review" | "done";
export type MilestoneStatus = "todo" | "in_progress" | "blocked" | "done";
export type ReviewStatus = "pending" | "approved" | "changes_requested";

export type DashboardSummary = {
  projectCount: number;
  milestoneCount: number;
  submissionCount: number;
  pendingReviews: number;
  activeProjects: number;
  doneProjects: number;
  reviewProjects: number;
  overdueMilestones: number;
};

export type LeaderboardEntry = {
  email: string;
  reviewedCount: number;
  avgScore: number;
  submissionCount: number;
};
