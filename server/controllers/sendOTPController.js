import User from "../models/user";
import { sendOTPEmail } from "../utils/sendEmail";

const sendOTPController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User doesn't exits",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 min.

    user.otp = otp;
    user.otpExpires = expires;
    await user.save();

    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
};
