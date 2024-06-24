//importing loaded environment variables
import "./env.js";

import cookieParser from "cookie-parser";
import express from "express";

import { appLevelErrorHandlerMiddleware } from "./src/middlewares/errorHandler-middleware.js";
import { connectUsingMongoose } from "./src/config/configDB.js";
import UserRouter from "./src/features/users/user-routes.js";
import PostRouter from "./src/features/posts/post-routes.js";
import jwtAuth from "./src/middlewares/jwtAuth-middleware.js";
import commentRouter from "./src/features/comments/comment-routes.js";
import likeRouter from "./src/features/likes/like-routes.js";
import friendRouter from "./src/features/friends/friend-routes.js";
import otpRouter from "./src/features/otp/otp-routes.js";
import loggerMiddleware from "./src/middlewares/logger-middleware.js";

const server = express();
server.use(express.json());
server.use(cookieParser());

server.use(loggerMiddleware);

server.use("/api/users", UserRouter);
server.use("/api/posts", jwtAuth, PostRouter);
server.use("/api/comments", jwtAuth, commentRouter);
server.use("/api/likes", jwtAuth, likeRouter);
server.use("/api/friends", jwtAuth, friendRouter);
server.use("/api/otp", jwtAuth, otpRouter);

server.use(appLevelErrorHandlerMiddleware);

server.listen(8000, () => {
  console.log("server is listening to port 8000");
  connectUsingMongoose();
});
