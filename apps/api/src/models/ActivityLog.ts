import mongoose, { Schema } from "mongoose";

const activityLogSchema = new Schema(
  {
    projectCode: { type: String, required: true, index: true },
    actorEmail: { type: String, required: true },
    action: { type: String, required: true },
    entityType: { type: String, required: true },
    entityId: { type: String, required: true },
    detail: { type: String, default: "" },
  },
  { timestamps: true }
);

activityLogSchema.index({ projectCode: 1, createdAt: -1 });

export const ActivityLog = mongoose.model("ActivityLog", activityLogSchema);
