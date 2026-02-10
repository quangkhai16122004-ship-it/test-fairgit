import React from "react";
import type { ProjectItem } from "../lib/api";

type Props = {
  projects: ProjectItem[];
};

export function ProjectTable({ projects }: Props) {
  const [query, setQuery] = React.useState("");
  const [status, setStatus] = React.useState<"all" | ProjectItem["status"]>("all");

  const filtered = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchStatus = status === "all" || project.status === status;
      if (!normalizedQuery) return matchStatus;
      const haystack = `${project.code} ${project.title} ${project.teamName}`.toLowerCase();
      return matchStatus && haystack.includes(normalizedQuery);
    });
  }, [projects, query, status]);

  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by code/title/team"
          style={{ flex: 1 }}
        />
        <select value={status} onChange={(event) => setStatus(event.target.value as "all" | ProjectItem["status"])}>
          <option value="all">All status</option>
          <option value="planning">Planning</option>
          <option value="active">Active</option>
          <option value="review">Review</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div style={{ fontSize: 12, color: "#4a5662", marginBottom: 8 }}>
        Showing {filtered.length} of {projects.length} projects
      </div>

      <table className="table">
        <thead>
          <tr>
            <th align="left">Code</th>
            <th align="left">Title</th>
            <th align="left">Team</th>
            <th align="left">Owner</th>
            <th align="left">Status</th>
            <th align="right">Progress</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((project) => (
            <tr key={project._id}>
              <td>{project.code}</td>
              <td>{project.title}</td>
              <td>{project.teamName}</td>
              <td>{project.ownerEmail}</td>
              <td>
                <span className={`status-chip status-${project.status}`}>{project.status.replace("_", " ")}</span>
              </td>
              <td align="right">
                <div style={{ display: "grid", gap: 4 }}>
                  <div>{project.progress}%</div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 ? <div className="empty-hint">No projects matched current filters.</div> : null}
    </div>
  );
}
