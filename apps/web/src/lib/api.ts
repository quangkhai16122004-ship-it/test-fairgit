export type ProjectItem = {
  _id: string;
  code: string;
  title: string;
  teamName: string;
  ownerEmail: string;
  status: "planning" | "active" | "review" | "done";
  progress: number;
};

export type SubmissionItem = {
  _id: string;
  projectCode: string;
  milestoneId: string;
  submittedBy: string;
  title: string;
  description: string;
  artifactUrl: string;
  reviewStatus: "pending" | "approved" | "changes_requested";
  score?: number;
};

export type MilestoneItem = {
  _id: string;
  projectCode: string;
  title: string;
  dueDate: string;
  status: "todo" | "in_progress" | "blocked" | "done";
  assigneeEmail: string;
  priority: "low" | "medium" | "high";
  points: number;
  notes: string;
};

export type LeaderboardEntry = {
  email: string;
  submissionCount: number;
  reviewedCount: number;
  avgScore: number;
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

export async function fetchProjectByCode(code: string) {
  const projects = await fetchProjects();
  return projects.find((item) => item.code === code) ?? null;
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

export async function fetchSubmissions(projectCode: string) {
  const query = new URLSearchParams({ projectCode }).toString();
  const res = await fetch(`${API_BASE}/submissions?${query}`);
  if (!res.ok) throw new Error("Failed to load submissions");
  return res.json() as Promise<SubmissionItem[]>;
}

export async function createSubmission(input: {
  projectCode: string;
  milestoneId: string;
  submittedBy: string;
  title: string;
  description?: string;
  artifactUrl: string;
}) {
  const res = await fetch(`${API_BASE}/submissions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create submission");
  return res.json() as Promise<SubmissionItem>;
}

export async function fetchMilestones(projectCode: string) {
  const query = new URLSearchParams({ projectCode }).toString();
  const res = await fetch(`${API_BASE}/milestones?${query}`);
  if (!res.ok) throw new Error("Failed to load milestones");
  return res.json() as Promise<MilestoneItem[]>;
}

export async function fetchLeaderboard(projectCode: string) {
  const query = new URLSearchParams({ projectCode }).toString();
  const res = await fetch(`${API_BASE}/leaderboard?${query}`);
  if (!res.ok) throw new Error("Failed to load leaderboard");
  return res.json() as Promise<LeaderboardEntry[]>;
}
