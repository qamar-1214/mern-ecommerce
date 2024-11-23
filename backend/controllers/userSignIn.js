import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required.");
    }
    const isUser = await User.findOne({ email });
    if (!isUser) {
      throw new Error("User not found.");
    }
    const validPassword = bcryptjs.compareSync(password, isUser.password);
    if (!validPassword) {
      throw new Error("Invalid email or password.");
    }
    const tokenData = {
      id: isUser._id,
      email: isUser.email,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8,
    });
    const { password: hashedPassword, ...rest } = isUser._doc;
    const tokenOptions = {
      httpOnly: true, // JavaScript can't access the cookie (improves security)
      secure: false, // Set to false during local development (true in production with HTTPS)
      sameSite: "Lax", // Required for cross-origin requests (use 'Lax' if not needed)
      path: "/", // Cookie is accessible for all routes
    };
    res.cookie("token", token, tokenOptions).status(200).json({
      token: token,
      data: rest,
      success: true,
      error: false,
      message: "User logged in successfully.",
    });
  } catch (error) {
    res.json({
      message: error.message || "Server error",
      error: true,
      success: false,
    });
  }
};
