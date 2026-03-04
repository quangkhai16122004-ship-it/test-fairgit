import React from "react";
import { fetchLeaderboard, type LeaderboardEntry } from "../lib/api";

export function LeaderboardPage() {
  const [projectCode, setProjectCode] = React.useState("CAPS-01");
  const [rows, setRows] = React.useState<LeaderboardEntry[]>([]);

  React.useEffect(() => {
    fetchLeaderboard(projectCode).then(setRows).catch(() => setRows([]));
  }, [projectCode]);

  return (
    <div className="grid">
      <div className="card" style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <label htmlFor="leaderboard-project">Project code</label>
        <input
          id="leaderboard-project"
          value={projectCode}
          onChange={(event) => setProjectCode(event.target.value)}
          style={{ maxWidth: 180 }}
        />
      </div>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Contributor Leaderboard</h3>
        <table className="table">
          <thead>
            <tr>
              <th align="left">Contributor</th>
              <th align="right">Submissions</th>
              <th align="right">Reviewed</th>
              <th align="right">Avg score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.email}>
                <td>
                  #{index + 1} {row.email}
                </td>
                <td align="right">{row.submissionCount}</td>
                <td align="right">{row.reviewedCount}</td>
                <td align="right">{row.avgScore.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
