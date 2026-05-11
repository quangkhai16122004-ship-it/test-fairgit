import React from "react";
import { createSubmission, fetchSubmissions, type SubmissionItem } from "../lib/api";

export function SubmissionsPage() {
  const [projectCode, setProjectCode] = React.useState("CAPS-01");
  const [items, setItems] = React.useState<SubmissionItem[]>([]);
  const [form, setForm] = React.useState({
    milestoneId: "M1",
    submittedBy: "member1@capstonehub.dev",
    title: "",
    description: "",
    artifactUrl: "",
  });
  const [saving, setSaving] = React.useState(false);

  const load = React.useCallback(async () => {
    const data = await fetchSubmissions(projectCode);
    setItems(data);
  }, [projectCode]);

  React.useEffect(() => {
    load().catch(() => setItems([]));
  }, [load]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      await createSubmission({ projectCode, ...form });
      setForm((prev) => ({ ...prev, title: "", description: "", artifactUrl: "" }));
      await load();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid">
      <div className="card grid" style={{ gridTemplateColumns: "220px 1fr", alignItems: "center" }}>
        <label htmlFor="submission-project">Project code</label>
        <input
          id="submission-project"
          value={projectCode}
          onChange={(event) => setProjectCode(event.target.value)}
          placeholder="CAPS-01"
        />
      </div>

      <form className="card grid" onSubmit={submit} style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
        <input
          value={form.milestoneId}
          onChange={(event) => setForm((prev) => ({ ...prev, milestoneId: event.target.value }))}
          placeholder="Milestone ID"
        />
        <input
          value={form.submittedBy}
          onChange={(event) => setForm((prev) => ({ ...prev, submittedBy: event.target.value }))}
          placeholder="Submitter email"
        />
        <input
          value={form.title}
          onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
          placeholder="Title"
        />
        <input
          value={form.artifactUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, artifactUrl: event.target.value }))}
          placeholder="Artifact URL"
        />
        <button disabled={saving}>{saving ? "Submitting..." : "Create submission"}</button>
        <textarea
          style={{ gridColumn: "1 / -1", minHeight: 80 }}
          value={form.description}
          onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
          placeholder="Description"
        />
      </form>

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Submissions</h3>
        <table className="table">
          <thead>
            <tr>
              <th align="left">Title</th>
              <th align="left">Author</th>
              <th align="left">Review</th>
              <th align="left">Score</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.submittedBy}</td>
                <td>{item.reviewStatus}</td>
                <td>{typeof item.score === "number" ? item.score : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
