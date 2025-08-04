import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  commentOnPost,
  createPost,
  getAllPosts,
  getPostsByUser,
  toggleLike,
} from "../../api/apiHandler";

export const usePosts = () => {
  const queryClient = useQueryClient();

  // 📄 Fetch all posts (with pagination support)
  const getAll = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to load posts");
      console.error("Posts fetch error:", err);
    },
  });

  // ✍️ Create Post
  const create = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Posted successfully!");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Post creation failed");
      console.error("Create post error:", err);
    },
  });

  // ❤️ Like/Unlike Post
  const likePost = useMutation({
    mutationFn: toggleLike,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(["posts"]);
      // Optimistic update for instant feedback
      queryClient.setQueryData(["posts"], (old) =>
        old.map((post) =>
          post._id === variables.postId
            ? {
                ...post,
                likes:
                  variables.action === "like"
                    ? [...post.likes, "temp-id"]
                    : post.likes.filter((id) => id !== "temp-id"),
              }
            : post
        )
      );
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Like action failed");
      console.error("Like error:", err);
    },
  });

  // 💬 Add Comment
  const comment = useMutation({
    mutationFn: ({ postId, text }) => commentOnPost({ postId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Comment added");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Comment failed");
      console.error("Comment error:", err);
    },
  });

  return {
    getAll,
    create,
    likePost,
    comment,
    // Additional utilities:
    refetchPosts: () => queryClient.invalidateQueries(["posts"]),
  };
};

// 📍 Separate hook for user-specific posts
export const usePostsByUser = (userId) => {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => getPostsByUser(userId),
    enabled: !!userId,
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to load user posts");
      console.error("User posts error:", err);
    },
  });
};
