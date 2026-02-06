import React from "react";

type AuthState = {
  token: string;
  email: string;
  role: "student" | "supervisor" | "admin";
};

type AuthContextType = {
  state: AuthState | null;
  setState: (next: AuthState | null) => void;
};

const AuthContext = React.createContext<AuthContextType>({
  state: null,
  setState: () => undefined,
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState | null>(null);
  return <AuthContext.Provider value={{ state, setState }}>{children}</AuthContext.Provider>;
}
