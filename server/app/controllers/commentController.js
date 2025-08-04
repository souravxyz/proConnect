import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    const comment = await Comment.create({
      post: postId,
      author: req.user.id,
      content,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment", error: error.message });
  }
};

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId }).populate("author", "name profilePic");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments", error: error.message });
  }
};
