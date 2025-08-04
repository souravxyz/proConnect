import { Link, useParams } from "react-router-dom";
import { useUserProfile } from "../../hooks/users/useUserProfile";
import { FiMail, FiEdit2, FiCalendar, FiLink, FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";
import PostCard from "./posts/PostCard";
import { format } from "date-fns";

export default function Profile() {
  const { userId } = useParams();
  const { data, isLoading, isError } = useUserProfile(userId);

  if (isLoading)
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full h-32 w-32 bg-gradient-to-r from-gray-200 to-gray-300 mb-4"></div>
            <div className="h-6 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded mb-2"></div>
            <div className="h-4 w-64 bg-gradient-to-r from-gray-200 to-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 p-6 rounded-xl shadow-sm"
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-red-800">
                Failed to load profile
              </h3>
              <div className="mt-2 text-base text-red-700">
                <p>
                  We couldn&apos;t load the profile data. Please try again
                  later.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );

  const { user, posts } = data;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mb-8 sm:mb-12"
      >
        {/* Cover Photo */}
        <div className="h-48 sm:h-64 w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden shadow-xl">
          {user.coverPhoto ? (
            <img
              src={user.coverPhoto}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600"></div>
          )}
        </div>

        {/* Profile Content */}
        <div className="px-6 sm:px-8 -mt-16 sm:-mt-20 relative z-10">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Avatar */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl border-4 border-white bg-white shadow-2xl overflow-hidden mx-auto sm:mx-0">
              {user.profilePic ? (
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl sm:text-6xl font-bold text-white bg-gradient-to-br from-cyan-500 to-blue-600">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
                  {user.name}
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {user.bio || "Digital creator"}
                </p>

                {/* Social Links */}
                <div className="mt-3 flex justify-center sm:justify-start gap-3">
                  {user.socialLinks?.twitter && (
                    <a
                      href={user.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-blue-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {user.socialLinks?.instagram && (
                    <a
                      href={user.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-pink-600 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                  )}
                  {user.socialLinks?.website && (
                    <a
                      href={user.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      <FiLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <Link to={`/edit-profile`} className="mx-auto sm:mx-0">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg"
                >
                  <FiEdit2 className="mr-2" />
                  Edit Profile
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Profile Stats */}
          <div className="mt-6 sm:mt-8 grid grid-cols-3 divide-x divide-gray-200 text-center bg-white rounded-xl shadow-lg p-4">
            <div className="px-4">
              <p className="text-sm font-medium text-gray-500">Posts</p>
              <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
            </div>
            <div className="px-4">
              <p className="text-sm font-medium text-gray-500">Following</p>
              <p className="text-2xl font-bold text-gray-900">
                {user.followingCount || 0}
              </p>
            </div>
            <div className="px-4">
              <p className="text-sm font-medium text-gray-500">Followers</p>
              <p className="text-2xl font-bold text-gray-900">
                {user.followersCount || 0}
              </p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center text-sm sm:text-base text-gray-700 bg-white rounded-lg p-3 shadow-sm">
              <FiMail className="mr-3 text-indigo-500 flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center text-sm sm:text-base text-gray-700 bg-white rounded-lg p-3 shadow-sm">
              <FiCalendar className="mr-3 text-indigo-500 flex-shrink-0" />
              <span>
                Joined {format(new Date(user.createdAt), "MMMM yyyy")}
              </span>
            </div>
            {user.location && (
              <div className="flex items-center text-sm sm:text-base text-gray-700 bg-white rounded-lg p-3 shadow-sm">
                <FiMapPin className="mr-3 text-indigo-500 flex-shrink-0" />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Posts Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {user.name}&apos;s Posts
          </h2>
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </div>
        </div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 text-center"
          >
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900">No posts yet</h3>
            <p className="mt-2 text-base text-gray-500 max-w-md mx-auto">
              When {user.name} shares their thoughts, you&apos;ll see them here.
            </p>
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Be the first to follow
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
