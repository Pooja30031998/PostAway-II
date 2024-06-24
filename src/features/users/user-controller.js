import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customErrorHandler } from "../../middlewares/errorHandler-middleware.js";
import UserRepository from "./user-repository.js";

export default class UserController {
  constructor() {
    this.repository = new UserRepository();
  }
  async signUp(req, res, next) {
    try {
      const { name, email, password, gender } = req.body;

      const hashedPassword = await bcrypt.hash(password, 12);
      const userData = {
        name,
        email,
        password: hashedPassword,
        gender,
        avatar: req.file?.filename,
      };
      const user = await this.repository.signUp(userData);
      return res.status(201).send(user);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const signedIn = await this.repository.signIn(email, password);
      if (signedIn) {
        const token = jwt.sign(
          { userId: signedIn._id, userEmail: signedIn.email },
          process.env.JWT_SECRET,
          { expiresIn: "2h" }
        );
        res.cookie("jwt", token);
        await this.repository.addTokens(email, token);
        return res.status(200).send({ msg: "User signed in", token });
      } else {
        next(
          new customErrorHandler(400, "User not found/ Invalid Credentials")
        );
      }
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async logOut(req, res, next) {
    try {
      const id = req.userId;
      const token = req.token;
      if (token) {
        await this.repository.logOut(token, id);
        res.clearCookie("jwt");
        return res.status(200).send({ msg: "Logout successful" });
      } else {
        next(new customErrorHandler(400, "User not logged in"));
      }
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async logOutAll(req, res, next) {
    try {
      const id = req.userId;
      if (id) {
        await this.repository.logOutAll(id);
        res.clearCookie("jwt");
        return res
          .status(200)
          .send({ msg: "Logout from all devices is successful" });
      } else {
        next(new customErrorHandler(400, "User not logged in"));
      }
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async getDetails(req, res, next) {
    try {
      const id = req.params.userId;
      const userDetails = await this.repository.getDetails(id);
      if (userDetails) {
        return res.status(200).send(userDetails);
      } else {
        next(new customErrorHandler(404, "User not found"));
      }
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async getAllDetails(req, res, next) {
    try {
      const userDetails = await this.repository.getAllDetails();
      if (userDetails) {
        return res.status(200).send(userDetails);
      } else {
        next(new customErrorHandler(404, "User not found"));
      }
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async updateDetails(req, res, next) {
    try {
      const id = req.params.userId;
      const details = req.body;
      details.avatar = req.file?.filename;
      const userDetails = await this.repository.updateDetails(id, details);
      if (userDetails) {
        return res.status(200).send(userDetails);
      } else {
        next(new customErrorHandler(404, "User not found"));
      }
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }
}
