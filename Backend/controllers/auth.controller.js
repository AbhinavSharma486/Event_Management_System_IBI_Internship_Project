import bcryptjs from "bcryptjs";
import validator from "validator";

import User from "../models/User.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import cloudinary from "../lib/cloudinary.js";

export const register = async (req, res) => {
  const { fullName, email, password, mobileNumber } = req.body;

  try {
    if (!fullName || !email || !password || !mobileNumber) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Email format check using validator 
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" });
    }

    if (!/^\d{10,15}$/.test(mobileNumber)) {
      return res.status(400).json({ success: false, message: "Invalid mobile number format" });
    }

    const userAlreadyExists = await User.findOne({ email }).lean().exec();

    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      mobileNumber
    });

    generateTokenAndSetCookie(res, user._id);

    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    console.log("Error in signup controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Email format check using validator 
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const user = await User.findOne({ email }).lean().exec();

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in Logout controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic, fullName, newPassword, confirmNewPassword } = req.body;

    const userId = req.user.id;

    if (!profilePic && !fullName && !newPassword && !confirmNewPassword) {
      return res.status(400).json({ message: "At least one field is required to update" });
    }

    let updateData = {};

    if (profilePic) {
      const uploadResponse = await cloudinary.uploader.upload(profilePic);
      updateData.profilePic = uploadResponse.secure_url;
    }

    if (fullName) {
      updateData.fullName = fullName;
    }

    if (newPassword || confirmNewPassword) {
      if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ message: "Password do not match" });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(newPassword, salt);

      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.log("Error in update profile pic controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error in delete user controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};