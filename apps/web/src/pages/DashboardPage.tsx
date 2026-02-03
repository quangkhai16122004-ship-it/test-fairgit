import React from "react";
import { SummaryCard } from "../components/SummaryCard";

type DashboardData = {
  projectCount: number;
  milestoneCount: number;
  submissionCount: number;
  pendingReviews: number;
};

type Props = {
  data: DashboardData | null;
};

export function DashboardPage({ data }: Props) {
  if (!data) {
    return <div className="card">Loading dashboard...</div>;
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: "repeat(4, minmax(0, 1fr))" }}>
      <SummaryCard title="Projects" value={data.projectCount} />
      <SummaryCard title="Milestones" value={data.milestoneCount} />
      <SummaryCard title="Submissions" value={data.submissionCount} />
      <SummaryCard title="Pending Reviews" value={data.pendingReviews} subtitle="Supervisor queue" />
    </div>
  );
}
