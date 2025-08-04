import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const getProfile = (req, res) => {
  const user = req.user;
  res.status(200).json({
    message: "User profile fetched",
    user,
  });
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, bio } = req.body;

    // Update text fields
    if (name) user.name = name;
    if (bio) user.bio = bio;

    // Upload profile image to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "profile_pics",
      });
      user.profilePic = result.secure_url;

      // Remove local file after uploading
      fs.unlinkSync(req.file.path);
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
      },
    });
  } catch (err) {
    console.error("Update error:", err.message);
    res
      .status(500)
      .json({ message: "Profile update failed", error: err.message });
  }
};

// ✅ Get user profile with posts
export const getUserProfileWithPosts = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId).select(
      "name email bio profilePic createdAt"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "name email profilePic") // ✅ Populate author data
      .select("content createdAt author");

    res.status(200).json({
      message: "User profile and posts",
      user,
      posts,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch user profile", error: error.message });
  }
};
