import express from "express";
import PostController from "./post-controller.js";
import { uploadFile } from "../../middlewares/fileUpload-middleware.js";

const PostRouter = express.Router();

const postController = new PostController();

PostRouter.post("/", uploadFile.single("imageUrl"), (req, res, next) => {
  postController.addPost(req, res, next);
});

PostRouter.get("/:postId", (req, res, next) => {
  postController.getOnePost(req, res, next);
});

PostRouter.get("/", (req, res, next) => {
  postController.getPosts(req, res, next);
});

PostRouter.delete("/:postId", (req, res, next) => {
  postController.deletePost(req, res, next);
});

PostRouter.put("/:postId", uploadFile.single("imageUrl"), (req, res, next) => {
  postController.updatePost(req, res, next);
});

export default PostRouter;
