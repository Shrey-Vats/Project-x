import "dotenv/config";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies);

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Access Denied! JWT token not found in cookies",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById({ _id: decoded.userId });

    if (!user) {
      return res.status(400).json({
        message: "Invalid JWT token",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
