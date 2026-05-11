import type { NextFunction, Request, Response } from "express";

type AppRole = "student" | "supervisor" | "admin";

export function requireRoles(allowed: AppRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = String(req.headers["x-user-role"] ?? "student") as AppRole;
    if (allowed.includes(role)) {
      next();
      return;
    }

    res.status(403).json({ error: "Forbidden" });
  };
}
