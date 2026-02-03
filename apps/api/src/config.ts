import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4300),
  MONGO_URI: z.string().default("mongodb://localhost:27017/capstonehub"),
  CORS_ORIGIN: z.string().default("http://localhost:5174"),
});

export const env = EnvSchema.parse(process.env);
