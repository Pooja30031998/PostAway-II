import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\../, "Please enter a valid email"],
  },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  avatar: { type: String },
  tokens: [],
});

export const UserModel = mongoose.model("user", userSchema);
