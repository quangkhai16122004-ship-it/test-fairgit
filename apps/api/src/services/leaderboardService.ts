import { Submission } from "../models/Submission.js";

type LeaderboardRow = {
  email: string;
  submissionCount: number;
  reviewedCount: number;
  avgScore: number;
};

export async function buildLeaderboard(projectCode: string): Promise<LeaderboardRow[]> {
  const rows = await Submission.aggregate([
    { $match: { projectCode } },
    {
      $group: {
        _id: "$submittedBy",
        submissionCount: { $sum: 1 },
        reviewedCount: {
          $sum: {
            $cond: [{ $ne: ["$reviewStatus", "pending"] }, 1, 0],
          },
        },
        avgScore: {
          $avg: {
            $ifNull: ["$score", 0],
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        email: "$_id",
        submissionCount: 1,
        reviewedCount: 1,
        avgScore: { $round: ["$avgScore", 2] },
      },
    },
    { $sort: { avgScore: -1, reviewedCount: -1, submissionCount: -1 } },
  ]);

  return rows;
}
