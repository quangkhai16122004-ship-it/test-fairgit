import React from "react";
import { useAuth } from "../lib/auth";

const API_BASE = "http://localhost:4300";

export function LoginPage() {
  const { state, setState } = useAuth();
  const [email, setEmail] = React.useState("team.lead@capstonehub.dev");
  const [role, setRole] = React.useState<"student" | "supervisor" | "admin">("student");
  const [loading, setLoading] = React.useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      setState({ token: data.token, email, role });
    } finally {
      setLoading(false);
    }
  }

  if (state) {
    return <div className="card">Logged in as {state.email} ({state.role})</div>;
  }

  return (
    <form className="card grid" onSubmit={login} style={{ maxWidth: 520 }}>
      <h3 style={{ margin: 0 }}>Team Login</h3>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <select value={role} onChange={(e) => setRole(e.target.value as "student" | "supervisor" | "admin")}>
        <option value="student">student</option>
        <option value="supervisor">supervisor</option>
        <option value="admin">admin</option>
      </select>
      <button disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
