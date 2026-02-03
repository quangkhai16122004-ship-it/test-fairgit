import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { fetchDashboard, fetchProjects, type ProjectItem } from "./lib/api";
import { DashboardPage } from "./pages/DashboardPage";
import { ProjectForm } from "./pages/ProjectForm";
import { ProjectTable } from "./components/ProjectTable";
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
      <div className="layout">
        <header style={{ display: "flex", gap: 16, marginBottom: 14 }}>
          <h2 style={{ margin: 0 }}>CapstoneHub</h2>
          <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Link to="/">Dashboard</Link>
            <Link to="/projects">Projects</Link>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}
