import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  otp: { type: String, required: true },
  createdTime: { type: Date, default: Date.now, expires: "10m" },
});

export const OtpModel = mongoose.model("otp", otpSchema);
