import bcryptjs from "bcryptjs";
import validator from "validator";

import User from "../models/User.model.js";
import Event from "../models/Event.model.js";
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

    // Add mobile number validation 
    if (!/^\d{10,15}$/.test(mobileNumber)) {
      return res.status(400).json({ success: false, message: "Invalid mobile number format" });
    }

    // check if email already exists 
    const userAlreadyExists = await User.findOne({ email }).lean().exec();

    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // check if mobile number already exists 
    const userWithMobile = await User.findOne({ mobileNumber }).lean().exec();

    if (userWithMobile) {
      return res.status(400).json({ success: false, message: "Mobile number is already registered with another account" });
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
    const user = req.user;

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
    const { profilePic, fullName, newPassword, confirmNewPassword, mobileNumber } = req.body;

    const userId = req.user._id;

    if (!profilePic && !fullName && !newPassword && !confirmNewPassword && !mobileNumber) {
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

    if (mobileNumber) {
      if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
        return res.status(400).json({ message: "Enter a valid 10 digit Indian mobile number" });
      }

      // check if mobile number is alraedy used by another user
      const existingUser = await User.findOne({ mobileNumber, _id: { $ne: userId } });

      if (existingUser) {
        return res.status(400).json({ message: "This mobile number is already in use by another account." });
      }

      updateData.mobileNumber = mobileNumber;
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

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true }).lean().exec();

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.log("Error in update profile pic controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // only allow the logged in user to delete their own account 
    if (req.user._id.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this account" });
    }

    // 1. Delete all events created by this usr 
    await Event.deleteMany({ creator: userId });

    // 2. Remove this user from all attendees arrays 
    await Event.updateMany(
      { attendees: userId },
      { $pull: { attendees: userId } }
    );

    // 3. Delete the user account
    await User.findByIdAndDelete(userId).lean().exec();

    res.status(200).json({ message: "User and all realted data deleted successfully" });
  } catch (error) {
    console.log("Error in delete user controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};