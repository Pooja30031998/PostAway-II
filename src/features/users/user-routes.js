import express from "express";
import UserController from "./user-controller.js";
import { uploadFile } from "../../middlewares/fileUpload-middleware.js";
import jwtAuth from "../../middlewares/jwtAuth-middleware.js";

const UserRouter = express.Router();

const userController = new UserController();

UserRouter.post("/signup", uploadFile.single("avatar"), (req, res, next) => {
  userController.signUp(req, res, next);
});

UserRouter.post("/signin", (req, res, next) => {
  userController.signIn(req, res, next);
});

UserRouter.get("/logout", jwtAuth, (req, res, next) => {
  userController.logOut(req, res, next);
});

UserRouter.get("/logout-all-devices", jwtAuth, (req, res, next) => {
  userController.logOutAll(req, res, next);
});

UserRouter.get("/get-details/:userId", jwtAuth, (req, res, next) => {
  userController.getDetails(req, res, next);
});

UserRouter.get("/get-all-details", jwtAuth, (req, res, next) => {
  userController.getAllDetails(req, res, next);
});

UserRouter.put(
  "/update-details/:userId",
  jwtAuth,
  uploadFile.single("avatar"),
  (req, res, next) => {
    userController.updateDetails(req, res, next);
  }
);

export default UserRouter;
