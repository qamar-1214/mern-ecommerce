import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const userSignupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation for empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message:
          "Please fill out all required fields: name, email, and password.",
        error: true,
        success: false,
      });
    }

    // Check if email already exists in the database
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(409).json({
        message: "Email already exists.",
        error: true,
        success: false,
      });
    }

    // Handle profile picture upload (if any)
    let profilePicUrl = null;
    if (req.file) {
      const localFilePath = req.file.path;

      // Upload file to Cloudinary
      const cloudinaryResponse = await cloudinary.v2.uploader.upload(
        localFilePath,
        {
          folder: "profile_pics", // optional folder on Cloudinary
        }
      );

      profilePicUrl = cloudinaryResponse.secure_url;

      // Delete the file from the local 'uploads' folder
      fs.unlinkSync(path.join(__dirname, "../uploads", req.file.filename));
    }

    // Password hashing
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    if (!hashedPassword) {
      return res.status(500).json({
        message: "Something went wrong during password hashing.",
        error: true,
        success: false,
      });
    }

    // Create user payload with hashed password and profile picture URL
    const payload = {
      name,
      email,
      password: hashedPassword,
      role: "GENERAL",
      profile_pic: profilePicUrl, // Store profile picture path
    };

    // Save the new user to the database
    const userData = new User(payload);
    const savedUser = await userData.save();

    return res.status(201).json({
      data: savedUser,
      success: true,
      error: false,
      message: "User created successfully.",
    });
  } catch (error) {
    // General error handling
    return res.status(500).json({
      message: error.message || "An unexpected error occurred.",
      error: true,
      success: false,
    });
  }
};
