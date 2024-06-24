import { sendMail } from "../../middlewares/nodemailer-middleware.js";
import { UserModel } from "../users/user-schema.js";
import { OtpModel } from "./otp-schema.js";

export default class OtpRepository {
  async sendOtp(email, user) {
    try {
      const generatedOTP = Math.floor(Math.random() * 900000) + 100000;
      const newOTP = new OtpModel({ userId: user, otp: generatedOTP });
      await newOTP.save();
      const result = await sendMail(email, generatedOTP);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async verifyOtp(otp, user) {
    try {
      const otpFound = await OtpModel.findOne({ userId: user, otp });
      if (!otpFound) {
        throw new Error("otp is incorrect");
      } else {
        const currentTime = new Date();
        if (currentTime > otpFound.createdTime.getTime() + 10 * 60 * 1000) {
          throw new Error("otp is expired");
        } else {
          return "You may change the password";
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async resetPassword(hashedPassword, user, otp) {
    try {
      const otpFound = await OtpModel.findOne({ userId: user, otp });
      if (!otpFound) {
        throw new Error("otp is expired");
      } else {
        const userData = await UserModel.findById(user);
        userData.password = hashedPassword;
        await userData.save();
        await OtpModel.findOneAndDelete({ userId: user, otp });
        return "Password is updated";
      }
    } catch (err) {
      throw err;
    }
  }
}
