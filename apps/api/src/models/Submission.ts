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
    reviewerEmail: { type: String, default: "" },
    reviewNotes: { type: String, default: "" },
    reviewedAt: { type: Date },
  },
  { timestamps: true }
);

submissionSchema.index({ projectCode: 1, reviewStatus: 1, createdAt: -1 });
submissionSchema.index({ reviewerEmail: 1, reviewedAt: -1 });

export const Submission = mongoose.model("Submission", submissionSchema);
