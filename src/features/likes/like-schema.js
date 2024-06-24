import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  likedId: { type: mongoose.Schema.Types.ObjectId, ref: "model" },
  model: { type: String, required: true, enum: ["Post", "Comment"] },
});

export const LikeModel = mongoose.model("like", likeSchema);
