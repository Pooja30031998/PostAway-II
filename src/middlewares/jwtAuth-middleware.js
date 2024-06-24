import jwt from "jsonwebtoken";
import { customErrorHandler } from "./errorHandler-middleware.js";

const jwtAuth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      next(new customErrorHandler(401, "Unauthorized"));
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    req.userEmail = payload.userEmail;
    req.token = token;
  } catch (err) {
    next(new customErrorHandler(401, "Unauthorized"));
  }
  next();
};

export default jwtAuth;
