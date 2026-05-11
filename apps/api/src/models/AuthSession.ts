import mongoose, { Schema } from "mongoose";

const authSessionSchema = new Schema(
  {
    email: { type: String, required: true, index: true },
    role: { type: String, enum: ["student", "supervisor", "admin"], required: true },
    token: { type: String, required: true, unique: true },
    expiredAt: { type: Date, required: true },
  },
  { timestamps: true }
);

authSessionSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });

export const AuthSession = mongoose.model("AuthSession", authSessionSchema);
