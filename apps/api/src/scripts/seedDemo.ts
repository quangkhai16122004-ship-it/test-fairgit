import "dotenv/config";
import mongoose from "mongoose";
import { env } from "../config.js";
import { Milestone } from "../models/Milestone.js";
import { ProjectMember } from "../models/ProjectMember.js";
import { Project } from "../models/Project.js";
import { Submission } from "../models/Submission.js";

async function run() {
  await mongoose.connect(env.MONGO_URI);

  await Promise.all([
    Project.deleteMany({}),
    ProjectMember.deleteMany({}),
    Milestone.deleteMany({}),
    Submission.deleteMany({}),
  ]);

  await Project.insertMany([
    {
      code: "CAPS-01",
      title: "Capstone Workflow Manager",
      teamName: "Falcon",
      ownerEmail: "khoa.tran@capstonehub.dev",
      status: "active",
      progress: 40,
    },
    {
      code: "CAPS-02",
      title: "Industry Mentor Portal",
      teamName: "Nova",
      ownerEmail: "lananh.nguyen@capstonehub.dev",
      status: "review",
      progress: 82,
    },
  ]);

  await ProjectMember.insertMany([
    { projectCode: "CAPS-01", email: "khoa.tran@capstonehub.dev", role: "leader", workload: 35 },
    { projectCode: "CAPS-01", email: "huy.le@capstonehub.dev", role: "member", workload: 25 },
    { projectCode: "CAPS-01", email: "bao.pham@capstonehub.dev", role: "member", workload: 25 },
    { projectCode: "CAPS-01", email: "mai.do@capstonehub.dev", role: "reviewer", workload: 15 },
  ]);

  const milestoneDocs = await Milestone.insertMany([
    {
      projectCode: "CAPS-01",
      title: "Finalize domain model",
      dueDate: "2026-03-04",
      status: "done",
      assigneeEmail: "khoa.tran@capstonehub.dev",
      priority: "high",
      points: 8,
    },
    {
      projectCode: "CAPS-01",
      title: "Build submission review page",
      dueDate: "2026-03-08",
      status: "in_progress",
      assigneeEmail: "huy.le@capstonehub.dev",
      priority: "high",
      points: 8,
    },
    {
      projectCode: "CAPS-01",
      title: "Add integration checks",
      dueDate: "2026-03-12",
      status: "todo",
      assigneeEmail: "mai.do@capstonehub.dev",
      priority: "medium",
      points: 5,
    },
  ]);

  await Submission.insertMany([
    {
      projectCode: "CAPS-01",
      milestoneId: String(milestoneDocs[0]?._id),
      submittedBy: "bao.pham@capstonehub.dev",
      title: "Domain entities migration",
      description: "Refined core entities and indexes",
      artifactUrl: "https://example.com/caps01/domain-migration",
      reviewStatus: "approved",
      reviewerEmail: "mai.do@capstonehub.dev",
      score: 8.7,
      reviewNotes: "Good structure and naming consistency.",
      reviewedAt: new Date("2026-03-05T10:00:00+07:00"),
    },
  ]);

  console.log("Seed data inserted for CAPS-01 and CAPS-02");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
