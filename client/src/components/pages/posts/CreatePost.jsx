import { useForm } from "react-hook-form";
import { usePosts } from "../../../hooks/posts/usePosts";
import { motion } from "framer-motion";

export default function CreatePost() {
  const { register, handleSubmit, reset, watch } = useForm();
  const { create } = usePosts();
  const content = watch("content", "");
  const charCount = content.length;

  const onSubmit = (data) => {
    if (!data.content.trim()) return;
    create.mutate(data);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-6 bg-white rounded-xl shadow-soft overflow-hidden border border-gray-100"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="p-5">
        {/* Premium Header */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
            Y
          </div>
          <div className="ml-3">
            <h3 className="font-medium text-gray-900">Create Post</h3>
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              <div className="w-2 h-2 rounded-full bg-blue-300"></div>
            </div>
          </div>
        </div>

        {/* Text Area with Floating Label Effect */}
        <div className="relative">
          <textarea
            {...register("content", {
              required: "Post content is required",
              maxLength: {
                value: 500,
                message: "Maximum 500 characters",
              },
            })}
            placeholder="Share your professional insights..."
            className="w-full border-none p-4 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 resize-none"
            rows={4}
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {charCount}/500
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min(100, (charCount / 500) * 100)}%`,
              backgroundColor:
                charCount > 400
                  ? "#ef4444"
                  : charCount > 300
                  ? "#f59e0b"
                  : "#3b82f6",
            }}
            transition={{ duration: 0.3 }}
            className="h-full"
          />
        </div>

        {/* Premium Submit Button */}
        <motion.button
          whileHover={{
            scale: 1.02,
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
          }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={create.isPending || !content.trim()}
          className={`w-full mt-4 px-5 py-3 rounded-xl font-medium text-white ${
            create.isPending || !content.trim()
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition-all duration-200 shadow-md`}
        >
          {create.isPending ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Publishing...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                ></path>
              </svg>
              Publish Post
            </span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
