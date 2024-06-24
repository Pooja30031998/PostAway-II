import { customErrorHandler } from "../../middlewares/errorHandler-middleware.js";
import PostRepository from "./post-repository.js";

export default class PostController {
  constructor() {
    this.repository = new PostRepository();
  }

  async addPost(req, res, next) {
    try {
      const caption = req.body.caption;
      const imageUrl = req.file.filename;
      const userId = req.userId;
      const post = await this.repository.addPost(userId, imageUrl, caption);
      return res.status(201).send(post);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async getOnePost(req, res, next) {
    try {
      const id = req.params.postId;
      const post = await this.repository.getOnePost(id);
      if (post) {
        return res.status(200).send(post);
      } else {
        next(new customErrorHandler(404, "Post not found"));
      }
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async getPosts(req, res, next) {
    try {
      const userId = req.userId;
      const post = await this.repository.getPosts(userId);
      return res.status(200).send(post);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async deletePost(req, res, next) {
    try {
      const id = req.params.postId;
      const post = await this.repository.deletePost(id);
      if (post) {
        return res.status(200).send({ deletedPost: post });
      } else {
        next(new customErrorHandler(404, "Post not found"));
      }
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async updatePost(req, res, next) {
    try {
      const id = req.params.postId;
      const caption = req.body.caption;
      const imageUrl = req.file?.filename;
      const post = await this.repository.updatePost(id, caption, imageUrl);
      if (post) {
        return res.status(200).send({ updatedPost: post });
      } else {
        next(new customErrorHandler(404, "Post not found"));
      }
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }
}
