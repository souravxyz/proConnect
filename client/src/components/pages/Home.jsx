import { useState } from "react";
import { usePosts } from "../../hooks/posts/usePosts";
import PostCard from "./posts/PostCard";
import CreatePost from "./posts/CreatePost";
import { FiSearch } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Home() {
  const { getAll } = usePosts();
  const [searchTerm, setSearchTerm] = useState("");

  if (getAll.isLoading)
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );

  if (getAll.isError)
    return (
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
          Error loading posts. Please try again.
        </div>
      </div>
    );

  const posts = getAll.data || [];

  const filteredPosts = posts.filter((post) => {
    const contentMatch = post.content
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const authorMatch = post.author.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return contentMatch || authorMatch;
  });

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      {/* Create Post Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <CreatePost />
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="relative mt-6 mb-8"
      >
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search posts or authors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </motion.div>

      {/* Posts List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="space-y-6"
      >
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No posts found
            </h3>
            <p className="mt-1 text-gray-500">
              {searchTerm
                ? "Try a different search term"
                : "Be the first to post something"}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
