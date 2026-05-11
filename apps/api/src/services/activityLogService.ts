import { ActivityLog } from "../models/ActivityLog.js";

type ActivityInput = {
  projectCode: string;
  actorEmail: string;
  action: string;
  entityType: string;
  entityId: string;
  detail?: string;
};

export async function writeActivity(input: ActivityInput) {
  return ActivityLog.create(input);
}

export async function listRecentActivity(projectCode: string, limit = 25) {
  return ActivityLog.find({ projectCode }).sort({ createdAt: -1 }).limit(limit).lean();
}
