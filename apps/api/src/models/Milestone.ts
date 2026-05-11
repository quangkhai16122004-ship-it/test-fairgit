import mongoose, { Schema } from "mongoose";

const milestoneSchema = new Schema(
  {
    projectCode: { type: String, required: true, index: true },
    title: { type: String, required: true },
    dueDate: { type: String, required: true, index: true },
    status: { type: String, enum: ["todo", "in_progress", "blocked", "done"], default: "todo" },
    assigneeEmail: { type: String, required: true },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    points: { type: Number, min: 1, max: 20, default: 5 },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Milestone = mongoose.model("Milestone", milestoneSchema);
