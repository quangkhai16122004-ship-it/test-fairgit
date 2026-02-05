import crypto from "node:crypto";
import { z } from "zod";
import { AuthSession } from "../models/AuthSession.js";

const LoginSchema = z.object({
  email: z.string().email(),
  role: z.enum(["student", "supervisor", "admin"]),
});

export async function login(payload: unknown) {
  const input = LoginSchema.parse(payload);
  const token = crypto.randomBytes(16).toString("hex");
  const expiredAt = new Date(Date.now() + 1000 * 60 * 60 * 8);
  await AuthSession.create({ ...input, token, expiredAt });
  return { token, profile: input };
}

export async function validateToken(token: string) {
  if (!token) return null;
  return AuthSession.findOne({ token, expiredAt: { $gt: new Date() } }).lean();
}
