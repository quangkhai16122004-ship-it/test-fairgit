import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "./config.js";
import { fakeAuth } from "./middlewares/fakeAuth.js";
import { projectRouter } from "./routes/projectRoutes.js";
import { milestoneRouter } from "./routes/milestoneRoutes.js";
import { submissionRouter } from "./routes/submissionRoutes.js";
import { dashboardRouter } from "./routes/dashboardRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { memberRouter } from "./routes/memberRoutes.js";

const app = express();
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(express.json());
app.use(fakeAuth);

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "capstonehub-api" });
});

app.use("/projects", projectRouter);
app.use("/milestones", milestoneRouter);
app.use("/submissions", submissionRouter);
app.use("/dashboard", dashboardRouter);
app.use("/auth", authRouter);
app.use("/members", memberRouter);

async function start() {
  await mongoose.connect(env.MONGO_URI);
  app.listen(env.PORT, () => {
    console.log(`API listening on http://localhost:${env.PORT}`);
  });
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});

