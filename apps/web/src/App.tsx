import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { ProjectTable } from "./components/ProjectTable";
import { fetchDashboard, fetchProjects, type ProjectItem } from "./lib/api";
import { AuthProvider } from "./lib/auth";
import { DashboardPage } from "./pages/DashboardPage";
import { LeaderboardPage } from "./pages/LeaderboardPage";
import { LoginPage } from "./pages/LoginPage";
import { ProjectDetailPage } from "./pages/ProjectDetailPage";
import { ProjectForm } from "./pages/ProjectForm";
import { SubmissionsPage } from "./pages/SubmissionsPage";
import "./styles.css";

export function App() {
  const [projects, setProjects] = React.useState<ProjectItem[]>([]);
  const [dashboard, setDashboard] = React.useState<any>(null);

  React.useEffect(() => {
    fetchProjects().then(setProjects).catch(() => setProjects([]));
    fetchDashboard().then(setDashboard).catch(() => setDashboard(null));
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="layout">
          <header style={{ display: "flex", gap: 16, marginBottom: 14 }}>
            <h2 style={{ margin: 0 }}>CapstoneHub</h2>
            <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Link to="/">Dashboard</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/submissions">Submissions</Link>
              <Link to="/leaderboard">Leaderboard</Link>
              <Link to="/login">Login</Link>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<DashboardPage data={dashboard} />} />
            <Route
              path="/projects"
              element={(
                <div className="grid">
                  <ProjectForm onCreated={(item) => setProjects((prev) => [item, ...prev])} />
                  <ProjectTable projects={projects} />
                </div>
              )}
            />
            <Route path="/projects/:code" element={<ProjectDetailPage />} />
            <Route path="/submissions" element={<SubmissionsPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
