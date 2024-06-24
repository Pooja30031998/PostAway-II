import { customErrorHandler } from "../../middlewares/errorHandler-middleware.js";
import FriendRepository from "./friend-repository.js";

export default class FriendController {
  constructor() {
    this.repository = new FriendRepository();
  }

  async getFriends(req, res, next) {
    try {
      const userId = req.params.userId;
      const friends = await this.repository.getFriends(userId);
      return res.status(200).send(friends);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async getPendingRequests(req, res, next) {
    try {
      const userId = req.userId;
      const pendingFriends = await this.repository.getPendingRequests(userId);
      return res.status(200).send(pendingFriends);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async toggleFriendship(req, res, next) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;
      const friend = await this.repository.toggleFriendship(userId, friendId);
      return res.status(200).send(friend);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async responseToRequest(req, res, next) {
    try {
      const userId = req.userId;
      const friendId = req.params.friendId;
      const response = req.body.response;
      const friend = await this.repository.responseToRequest(
        userId,
        friendId,
        response
      );
      return res.status(200).send(friend);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }
}
