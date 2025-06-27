import e, { Router } from "express";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import User from "../models/user.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exit !",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User Register Successfuly",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Try again later",
      error,
    });
  }
};

export const LoginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email doesn't exit",
      });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Try again later.",
      error: error.message,
    });
  }
};

export const forgetPasswordController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email, Email does not exit",
      });
    }

    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email first." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! try again later",
      error: error.message,
    });
  }
};
