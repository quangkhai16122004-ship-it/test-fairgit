export type ProjectItem = {
  _id: string;
  code: string;
  title: string;
  teamName: string;
  ownerEmail: string;
  status: "planning" | "active" | "review" | "done";
  progress: number;
};

const API_BASE = "http://localhost:4300";

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE}/dashboard/summary`);
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}

export async function fetchProjects() {
  const res = await fetch(`${API_BASE}/projects`);
  if (!res.ok) throw new Error("Failed to load projects");
  return res.json() as Promise<ProjectItem[]>;
}

export async function createProject(input: {
  code: string;
  title: string;
  teamName: string;
  ownerEmail: string;
}) {
  const res = await fetch(`${API_BASE}/projects`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json() as Promise<ProjectItem>;
}
