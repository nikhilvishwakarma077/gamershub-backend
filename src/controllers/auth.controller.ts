import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { AuthRequest } from "../middlewares/auth.middleware.js";
import { Profile } from "../models/profile.model.js";



const generateToken = (id: string) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET not defined");
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    let { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (typeof username !== "string" || username.trim().length < 3) {
      return res.status(400).json({ message: "Name must be at least 3 characters" });
    }

    if (typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    email = email.toLowerCase().trim();

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username.trim(),
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id.toString()),
      }
    });

  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    if (typeof email !== "string" || !email.includes("@")) {
      return res.status(400).json({ message: "Invalid email" });
    }

    if (typeof password !== "string" || password.length < 6) {
      return res.status(400).json({ message: "Invalid password" });
    }

    email = email.toLowerCase().trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 2 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });

  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const getMe = async (req: AuthRequest,res: Response) => {

  try {
    const userId = req.user?._id;

    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const profile = await Profile.findOne({
      userId: userId,
    }).select("avatar");

    res.status(200).json({
      success: true,

      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        avatarUrl: profile?.avatar || null,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const logoutUser = async (req: Request,res: Response) => {

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? "none"
        : "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};