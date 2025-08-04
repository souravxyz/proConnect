import Post from "../models/Post.js";

// ✅ Create Post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content)
      return res.status(400).json({ message: "Content is required" });

    const post = await Post.create({
      content,
      author: req.user._id,
    });

    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create post", error: err.message });
  }
};

// ✅ Public Feed (used for homepage)
export const getPublicFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email profilePic")
      .populate("comments.user", "name profilePic");

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch posts",
      error: err.message,
    });
  }
};


// ✅ Toggle Like on Post

export const toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    res.status(200).json({
      message: alreadyLiked ? "Unliked" : "Liked",
      likes: post.likes.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error toggling like", error: error.message });
  }
};

// ✅ Comment on Post
export const commentOnPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text)
      return res.status(400).json({ message: "Comment text is required" });

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: userId, text });
    await post.save();

    res.status(200).json({ message: "Comment added", comments: post.comments });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add comment", error: err.message });
  }
};
