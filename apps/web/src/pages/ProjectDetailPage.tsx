import React from "react";
import { useParams } from "react-router-dom";
import { fetchMilestones, fetchProjectByCode, fetchSubmissions, type MilestoneItem, type ProjectItem, type SubmissionItem } from "../lib/api";

export function ProjectDetailPage() {
  const { code = "" } = useParams();
  const [project, setProject] = React.useState<ProjectItem | null>(null);
  const [milestones, setMilestones] = React.useState<MilestoneItem[]>([]);
  const [submissions, setSubmissions] = React.useState<SubmissionItem[]>([]);

  React.useEffect(() => {
    if (!code) return;
    fetchProjectByCode(code).then(setProject).catch(() => setProject(null));
    fetchMilestones(code).then(setMilestones).catch(() => setMilestones([]));
    fetchSubmissions(code).then(setSubmissions).catch(() => setSubmissions([]));
  }, [code]);

  if (!project) {
    return <div className="card">Project not found or still loading.</div>;
  }

  const doneMilestones = milestones.filter((item) => item.status === "done").length;
  const reviewedSubmissions = submissions.filter((item) => item.reviewStatus !== "pending").length;
  const orderedMilestones = [...milestones].sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="grid">
      <div className="card">
        <h2 style={{ margin: 0 }}>{project.title}</h2>
        <div style={{ marginTop: 8, color: "#4a5662" }}>
          Code: {project.code} | Team: {project.teamName} | Owner: {project.ownerEmail}
        </div>
      </div>

      <div className="kpi-grid">
        <div className="card">
          <div style={{ fontSize: 12 }}>Progress</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{project.progress}%</div>
        </div>
        <div className="card">
          <div style={{ fontSize: 12 }}>Milestones Done</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>
            {doneMilestones}/{milestones.length}
          </div>
        </div>
        <div className="card">
          <div style={{ fontSize: 12 }}>Submissions Reviewed</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>
            {reviewedSubmissions}/{submissions.length}
          </div>
        </div>
        <div className="card">
          <div style={{ fontSize: 12 }}>Current Status</div>
          <div style={{ fontSize: 24, fontWeight: 700, textTransform: "capitalize" }}>{project.status}</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Milestones</h3>
        <table className="table">
          <thead>
            <tr>
              <th align="left">Title</th>
              <th align="left">Assignee</th>
              <th align="left">Due date</th>
              <th align="left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderedMilestones.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.assigneeEmail}</td>
                <td>{item.dueDate}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Submission Snapshot</h3>
        <table className="table">
          <thead>
            <tr>
              <th align="left">Title</th>
              <th align="left">Contributor</th>
              <th align="left">Review</th>
              <th align="right">Score</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.submittedBy}</td>
                <td>{item.reviewStatus}</td>
                <td align="right">{typeof item.score === "number" ? item.score : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
