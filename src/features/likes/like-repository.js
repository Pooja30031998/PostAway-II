import path from "path";
import { CommentModel } from "../comments/comment-schema.js";
import { PostModel } from "../posts/post-schema.js";
import { LikeModel } from "./like-schema.js";

export default class LikeRepository {
  async toggleLike(userId, id, type) {
    try {
      if (type == "Post") {
        const like = await LikeModel.findOneAndDelete({
          userId,
          likedId: id,
          model: type,
        });
        if (like) {
          const post = await PostModel.findById(id);
          post.likes = post.likes.filter((li) => {
            return li != String(like._id);
          });
          await post.save();
          return "like deleted for the post";
        } else {
          const post = await PostModel.findById(id);
          if (post) {
            const newLike = new LikeModel({ userId, likedId: id, model: type });
            await newLike.save();
            post.likes.push(newLike._id);
            await post.save();
            return "Post liked";
          } else {
            throw new Error("Post not found");
          }
        }
      }

      if (type == "Comment") {
        const like = await LikeModel.findOneAndDelete({
          userId,
          likedId: id,
          model: type,
        });
        if (like) {
          const comment = await CommentModel.findById(id);
          comment.likes = comment.likes.filter((li) => {
            return li != String(like._id);
          });
          await comment.save();
          return "like deleted for the comment";
        } else {
          const comment = await CommentModel.findById(id);
          if (comment) {
            const newLike = new LikeModel({ userId, likedId: id, model: type });
            await newLike.save();
            comment.likes.push(newLike._id);
            await comment.save();
            return "Comment liked";
          } else {
            throw new Error("Comment not found");
          }
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async getLikes(id) {
    try {
      const likes = await LikeModel.find({ likedId: id });
      if (likes.length > 0) {
        return likes;
      } else {
        throw new Error("No likes found for this post or comment");
      }
    } catch (err) {
      throw err;
    }
  }
}
