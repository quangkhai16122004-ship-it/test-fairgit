import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema(
  {
    projectCode: { type: String, required: true, index: true },
    milestoneId: { type: String, required: true },
    submittedBy: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    artifactUrl: { type: String, required: true },
    score: { type: Number, min: 0, max: 10 },
    reviewStatus: { type: String, enum: ["pending", "approved", "changes_requested"], default: "pending" },
  },
  { timestamps: true }
);

export const Submission = mongoose.model("Submission", submissionSchema);
