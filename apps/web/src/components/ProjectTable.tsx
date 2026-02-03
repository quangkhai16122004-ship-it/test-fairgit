import React from "react";
import type { ProjectItem } from "../lib/api";

type Props = {
  projects: ProjectItem[];
};

export function ProjectTable({ projects }: Props) {
  return (
    <div className="card" style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
          {projects.map((p) => (
            <tr key={p._id} style={{ borderTop: "1px solid #eef2f6" }}>
              <td>{p.code}</td>
              <td>{p.title}</td>
              <td>{p.teamName}</td>
              <td>{p.ownerEmail}</td>
              <td>{p.status}</td>
              <td align="right">{p.progress}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
