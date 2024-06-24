import { customErrorHandler } from "../../middlewares/errorHandler-middleware.js";
import CommentRepository from "./comment-repository.js";

export default class CommentController {
  constructor() {
    this.repository = new CommentRepository();
  }

  async addComment(req, res, next) {
    try {
      const content = req.body.content;
      const userId = req.userId;
      const postId = req.params.postId;
      const comment = await this.repository.addComment(userId, postId, content);
      return res.status(201).send(comment);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async getComments(req, res, next) {
    try {
      const postId = req.params.postId;
      const comments = await this.repository.getComments(postId);
      return res.status(200).send(comments);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const comment = await this.repository.deleteComment(commentId);
      return res.status(200).send({ commentDeleted: comment });
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async updateComment(req, res, next) {
    try {
      const commentId = req.params.commentId;
      const content = req.body;
      const comment = await this.repository.updateComment(commentId, content);
      return res.status(200).send({ commentUpdated: comment });
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }
}
