import mongoose, { Schema } from "mongoose";

const milestoneSchema = new Schema(
  {
    projectCode: { type: String, required: true, index: true },
    title: { type: String, required: true },
    dueDate: { type: String, required: true },
    status: { type: String, enum: ["todo", "in_progress", "blocked", "done"], default: "todo" },
    assigneeEmail: { type: String, required: true },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Milestone = mongoose.model("Milestone", milestoneSchema);
