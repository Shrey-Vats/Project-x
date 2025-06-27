import User from "../models/user.js"

export const verifyOTPController = async (req, res) => {
    const email = req.body.email.trim().toLowerCase();
    const otp = req.body.otp.trim();

    try {
        const user = await User.findOne({ email });

        if (
          !user ||
          user.otp !== otp ||
          new Date(user.otpExpires) < new Date()
        ) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        res
          .status(500)
          .json({ message: "OTP verification failed", error: error.message });
    }

}