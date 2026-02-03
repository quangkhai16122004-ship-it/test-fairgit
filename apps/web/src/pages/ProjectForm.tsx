import React from "react";
import { createProject, type ProjectItem } from "../lib/api";

type Props = {
  onCreated: (item: ProjectItem) => void;
};

export function ProjectForm({ onCreated }: Props) {
  const [code, setCode] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [teamName, setTeamName] = React.useState("");
  const [ownerEmail, setOwnerEmail] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const item = await createProject({ code, title, teamName, ownerEmail });
      onCreated(item);
      setCode("");
      setTitle("");
      setTeamName("");
      setOwnerEmail("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="card grid" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
      <input value={code} placeholder="Code" onChange={(e) => setCode(e.target.value)} />
      <input value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <input value={teamName} placeholder="Team" onChange={(e) => setTeamName(e.target.value)} />
      <input value={ownerEmail} placeholder="Owner email" onChange={(e) => setOwnerEmail(e.target.value)} />
      <button disabled={saving} type="submit">{saving ? "Saving..." : "Create"}</button>
    </form>
  );
}
