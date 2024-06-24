import { customErrorHandler } from "../../middlewares/errorHandler-middleware.js";
import OtpRepository from "./otp-repository.js";
import bcrypt from "bcrypt";

export default class OtpController {
  constructor() {
    this.repository = new OtpRepository();
  }
  async sendOtp(req, res, next) {
    try {
      const email = req.userEmail;
      const user = req.userId;
      const otp = await this.repository.sendOtp(email, user);
      return res.status(200).send(otp);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async verifyOtp(req, res, next) {
    try {
      const otp = req.body.otp;
      const user = req.userId;
      const result = await this.repository.verifyOtp(String(otp), user);
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { newPassword, otp } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      const user = req.userId;
      const result = await this.repository.resetPassword(
        hashedPassword,
        user,
        otp
      );
      return res.status(200).send(result);
    } catch (err) {
      console.log(err);
      next(new customErrorHandler(400, err));
    }
  }
}
