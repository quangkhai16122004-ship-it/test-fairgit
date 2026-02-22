import type { NextFunction, Request, Response } from "express";

export function fakeAuth(req: Request, _res: Response, next: NextFunction) {
  req.headers["x-user-email"] = req.headers["x-user-email"] || "team.lead@capstonehub.dev";
  req.headers["x-user-role"] = req.headers["x-user-role"] || "student";
  next();
}
