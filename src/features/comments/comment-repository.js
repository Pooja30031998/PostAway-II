import { PostModel } from "../posts/post-schema.js";
import { CommentModel } from "./comment-schema.js";

export default class CommentRepository {
  async addComment(userId, postId, content) {
    try {
      const post = await PostModel.findById(postId);
      if (post) {
        const comment = new CommentModel({ userId, postId, content });
        const savedComment = await comment.save();
        post.comments.push(savedComment._id);
        await post.save();
        return savedComment;
      } else {
        throw new Error("Post not Found");
      }
    } catch (err) {
      throw err;
    }
  }

  async getComments(postId) {
    try {
      const post = await PostModel.findById(postId);
      if (post) {
        const comments = await CommentModel.find({ postId });
        if (comments.length > 0) {
          return comments;
        } else {
          throw new Error("comments not found for this post");
        }
      } else {
        throw new Error("Post not Found");
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteComment(commentId) {
    try {
      const comment = await CommentModel.findByIdAndDelete(commentId);
      if (comment) {
        const postId = comment.postId;
        const post = await PostModel.findById(postId);
        post.comments = post.comments.filter((com) => {
          return com != commentId;
        });
        await post.save();
        return comment;
      } else {
        throw new Error("Comment not Found");
      }
    } catch (err) {
      throw err;
    }
  }

  async updateComment(commentId, content) {
    try {
      const comment = await CommentModel.findByIdAndUpdate(commentId, content, {
        returnOriginal: false,
      });
      if (comment) {
        return comment;
      } else {
        throw new Error("Comment not Found");
      }
    } catch (err) {
      throw err;
    }
  }
}
