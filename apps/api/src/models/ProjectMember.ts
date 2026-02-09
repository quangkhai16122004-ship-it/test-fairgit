import mongoose, { Schema } from "mongoose";

const projectMemberSchema = new Schema(
  {
    projectCode: { type: String, required: true, index: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["leader", "member", "reviewer"], default: "member" },
    workload: { type: Number, min: 0, max: 100, default: 20 },
  },
  { timestamps: true }
);

projectMemberSchema.index({ projectCode: 1, email: 1 }, { unique: true });

export const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema);
