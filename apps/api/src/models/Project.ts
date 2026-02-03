import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    teamName: { type: String, required: true },
    ownerEmail: { type: String, required: true },
    status: { type: String, enum: ["planning", "active", "review", "done"], default: "planning" },
    progress: { type: Number, min: 0, max: 100, default: 0 },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
