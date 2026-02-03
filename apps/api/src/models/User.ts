import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["student", "supervisor", "admin"], required: true },
  teamId: { type: String },
});

export const User = mongoose.model("User", userSchema);
