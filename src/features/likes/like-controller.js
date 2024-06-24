import { customErrorHandler } from "../../middlewares/errorHandler-middleware.js";
import LikeRepository from "./like-repository.js";

export default class LikeController {
  constructor() {
    this.repository = new LikeRepository();
  }
  async toggleLike(req, res, next) {
    try {
      const id = req.params.id;
      const type = req.query.type;
      if (type != "Post" && type != "Comment") {
        return res.status(400).send("type must be 'Post' or 'Comment'");
      }
      const userId = req.userId;
      const like = await this.repository.toggleLike(userId, id, type);
      return res.status(201).send(like);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async getLikes(req, res, next) {
    try {
      const id = req.params.id;
      const likes = await this.repository.getLikes(id);
      return res.status(200).send(likes);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }
}
