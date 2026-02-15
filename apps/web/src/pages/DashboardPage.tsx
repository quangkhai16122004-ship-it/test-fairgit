import React from "react";
import { SummaryCard } from "../components/SummaryCard";

type DashboardProject = {
  _id: string;
  code: string;
  title: string;
  status: "planning" | "active" | "review" | "done";
  progress: number;
};

type DashboardData = {
  projectCount: number;
  milestoneCount: number;
  submissionCount: number;
  pendingReviews: number;
  activeProjects: number;
  reviewProjects: number;
  doneProjects: number;
  overdueMilestones: number;
  recentProjects: DashboardProject[];
};

type Props = {
  data: DashboardData | null;
};

export function DashboardPage({ data }: Props) {
  if (!data) {
    return <div className="card">Loading dashboard...</div>;
  }

  return (
    <div className="grid">
      <div className="kpi-grid">
        <SummaryCard title="Projects" value={data.projectCount} />
        <SummaryCard title="Milestones" value={data.milestoneCount} />
        <SummaryCard title="Submissions" value={data.submissionCount} />
        <SummaryCard title="Pending Reviews" value={data.pendingReviews} subtitle="Supervisor queue" />
      </div>

      <div className="kpi-grid">
        <SummaryCard title="Active Projects" value={data.activeProjects} />
        <SummaryCard title="In Review" value={data.reviewProjects} />
        <SummaryCard title="Done Projects" value={data.doneProjects} />
        <SummaryCard title="Overdue Milestones" value={data.overdueMilestones} subtitle="Need follow-up this week" />
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Recent Project Activity</h3>
        <table className="table">
          <thead>
            <tr>
              <th align="left">Code</th>
              <th align="left">Title</th>
              <th align="left">Status</th>
              <th align="right">Progress</th>
            </tr>
          </thead>
          <tbody>
            {data.recentProjects.map((project) => (
              <tr key={project._id}>
                <td>{project.code}</td>
                <td>{project.title}</td>
                <td>
                  <span className={`status-chip status-${project.status}`}>{project.status}</span>
                </td>
                <td align="right">{project.progress}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
