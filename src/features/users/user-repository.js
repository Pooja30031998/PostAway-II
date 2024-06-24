import bcrypt from "bcrypt";

import { UserModel } from "./user-schema.js";

export default class UserRepository {
  async signUp(userData) {
    try {
      const user = new UserModel(userData);
      const savedUser = await user.save();
      return savedUser;
    } catch (err) {
      throw err;
    }
  }

  async signIn(email, password) {
    try {
      const userFound = await UserModel.findOne({ email });
      if (userFound) {
        const result = await bcrypt.compare(password, userFound.password);
        if (result) {
          return userFound;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async addTokens(email, token) {
    try {
      const userFound = await UserModel.findOne({ email });
      userFound.tokens.push(token);
      await userFound.save();
    } catch (err) {
      throw err;
    }
  }

  async logOut(token, id) {
    try {
      const userFound = await UserModel.findById(id);
      userFound.tokens = userFound.tokens.filter((tok) => {
        return tok != token;
      });
      await userFound.save();
    } catch (err) {
      throw err;
    }
  }

  async logOutAll(id) {
    try {
      const userFound = await UserModel.findById(id);
      userFound.tokens = [];
      await userFound.save();
    } catch (err) {
      throw err;
    }
  }

  async getDetails(id) {
    try {
      const userFound = await UserModel.findById(id);
      if (userFound) {
        return {
          _id: userFound._id,
          username: userFound.username,
          email: userFound.email,
          avatar: userFound.avatar,
          gender: userFound.gender,
        };
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async getAllDetails() {
    try {
      const userFound = await UserModel.find();
      if (userFound) {
        const users = userFound.map((user) => ({
          _id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          gender: user.gender,
        }));
        return users;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async updateDetails(id, details) {
    try {
      const userFound = await UserModel.findByIdAndUpdate(id, details, {
        returnOriginal: false,
      });
      if (userFound) {
        return userFound;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }
}
