import Post from "../models/Post.js";
import mongoose from "mongoose";

// GET /api/feed
export const getHomeFeed = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorData",
        },
      },
      {
        $unwind: "$authorData",
      },
      {
        $project: {
          content: 1,
          createdAt: 1,
          author: {
            _id: "$authorData._id",
            name: "$authorData.name",
          },
        },
      },
    ]);

    res.status(200).json({ posts });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to load feed", error: error.message });
  }
};
