import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { usePosts } from "../../../hooks/posts/usePosts";
import {
  FiHeart,
  FiMessageSquare,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";

export default function PostCard({ post }) {
  const { likePost, comment } = usePosts();
  const [isLiking, setIsLiking] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [visibleComments, setVisibleComments] = useState(3); // Show 3 comments by default

  const handleLike = async () => {
    if (isLiking) return;
    setIsLiking(true);
    await likePost.mutateAsync(post._id);
    setIsLiking(false);
  };

  const handleComment = async () => {
    if (!commentText.trim()) return;
    setIsCommenting(true);
    await comment.mutateAsync({ postId: post._id, text: commentText });
    setCommentText("");
    setIsCommenting(false);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    setVisibleComments(showComments ? 3 : post.comments?.length || 0);
  };

  const loadMoreComments = () => {
    setVisibleComments((prev) =>
      Math.min(prev + 5, post.comments?.length || 0)
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-md border border-gray-100 p-5 mb-6"
    >
      {/* Author and time */}
      <div className="flex items-center mb-3">
        <Link
          to={`/profile/${post.author._id}`}
          className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold mr-3"
        >
          {post.author.name.charAt(0).toUpperCase()}
        </Link>
        <div>
          <Link
            to={`/profile/${post.author._id}`}
            className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
          >
            {post.author.name}
          </Link>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      {/* Post content */}
      <p className="mb-4 text-gray-800">{post.content}</p>

      {/* Like and comment buttons */}
      <div className="flex items-center gap-4 text-gray-600 mb-3 border-t border-gray-100 pt-3">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleLike}
          disabled={isLiking}
          className="flex items-center gap-1 hover:text-red-500 transition-colors"
        >
          <FiHeart className={`${isLiking ? "animate-pulse" : ""}`} />
          <span className="text-sm">{post.likes?.length || 0}</span>
        </motion.button>

        <button
          onClick={toggleComments}
          className="flex items-center gap-1 hover:text-blue-600 transition-colors"
        >
          <FiMessageSquare />
          <span className="text-sm">{post.comments?.length || 0}</span>
          {post.comments?.length > 0 &&
            (showComments ? (
              <FiChevronUp className="ml-1" />
            ) : (
              <FiChevronDown className="ml-1" />
            ))}
        </button>
      </div>

      {/* Comment section */}
      {showComments && post.comments?.length > 0 && (
        <div className="mb-3 space-y-3">
          {/* Visible comments */}
          {post.comments.slice(0, visibleComments).map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-start gap-2 text-sm"
            >
              <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs font-medium">
                {c.user?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-lg p-3">
                  <Link
                    to={`/profile/${c.user?._id || "#"}`}
                    className="font-medium text-gray-800 hover:text-blue-600"
                  >
                    {c.user?.name || "User"}
                  </Link>
                  <p className="text-gray-700 mt-1">{c.text}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Load more button if there are more comments */}
          {visibleComments < post.comments.length && (
            <button
              onClick={loadMoreComments}
              className="text-blue-600 text-sm font-medium hover:underline mt-2"
            >
              Show more comments ({post.comments.length - visibleComments}{" "}
              remaining)
            </button>
          )}
        </div>
      )}

      {/* Comment input */}
      <div className="flex items-center gap-2 mt-3">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleComment}
          disabled={isCommenting || !commentText.trim()}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            isCommenting || !commentText.trim()
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } transition-colors`}
        >
          {isCommenting ? "Posting..." : "Post"}
        </motion.button>
      </div>
    </motion.div>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    author: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          _id: PropTypes.string,
          name: PropTypes.string,
        }),
        text: PropTypes.string,
      })
    ),
  }).isRequired,
};
