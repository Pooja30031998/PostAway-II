import express from "express";
import LikeController from "./like-controller.js";

const likeRouter = express.Router();

const likeController = new LikeController();

likeRouter.post("/toggle/:id", (req, res, next) => {
  likeController.toggleLike(req, res, next);
});

likeRouter.get("/:id", (req, res, next) => {
  likeController.getLikes(req, res, next);
});

export default likeRouter;
