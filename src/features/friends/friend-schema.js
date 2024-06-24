import mongoose from "mongoose";

const friendSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  friendId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  status: { type: String, enum: ["pending", "accepted", "rejected"] },
  requestSent: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

export const FriendModel = mongoose.model("friend", friendSchema);
