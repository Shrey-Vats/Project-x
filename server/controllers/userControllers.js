import e, { Router } from "express";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import User from "../models/user.js";

export const userInformationController = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User doesn't exit",
      });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong! Try again later",
      error: error.message,
    });
  }
};

export const userInformationEditController = async (req, res) => {
  const userId = req.user._id;
  const newName = req.body.name;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { name: newName },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      message: "successfuly changed the name",
    });
  } catch (error) {
    res.status(200).json({
      message: "Something went wrong! Try again",
      error: error.message,
    });
  }
};
