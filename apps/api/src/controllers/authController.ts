import { Request, Response } from "express";
import * as authService from "../services/authService.js";

export async function login(req: Request, res: Response) {
  try {
    const output = await authService.login(req.body);
    res.status(201).json(output);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid login payload";
    res.status(400).json({ error: message });
  }
}

export async function me(req: Request, res: Response) {
  const token = String(req.headers.authorization || "").replace("Bearer ", "");
  const session = await authService.validateToken(token);
  if (!session) {
    res.status(401).json({ error: "Session expired" });
    return;
  }

  res.json({
    email: session.email,
    role: session.role,
    expiredAt: session.expiredAt,
  });
}
