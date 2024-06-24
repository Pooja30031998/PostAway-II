import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  imageUrl: { type: String, required: true },
  caption: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "like" }],
});

export const PostModel = mongoose.model("post", postSchema);
