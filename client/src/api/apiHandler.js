import axiosInstance from "./axiosInstance";
import endpoints from "./endpoints";

// 🔐 Register
export const registerUser = async (formData) => {
  const res = await axiosInstance.post(endpoints.auth.register, formData);
  return res.data;
};

// 🔐 Login
export const loginUser = async (credentials) => {
  const res = await axiosInstance.post(endpoints.auth.login, credentials);
  return res.data;
};

// ✅ Verify Email
export const verifyEmail = async (token) => {
  const res = await axiosInstance.get(endpoints.auth.verifyEmail(token));
  return res.data;
};

// 🚪 Logout
export const logoutUser = async () => {
  const res = await axiosInstance.get(endpoints.auth.logout);
  return res.data;
};

// 👤 Get Profile
export const getProfile = async () => {
  const res = await axiosInstance.get(endpoints.auth.profile);
  return res.data;
};

// ✏️ Edit Profile
export const editProfile = async (data) => {
  const res = await axiosInstance.put(endpoints.auth.profile, data);
  return res.data;
};

// 🔐 Forgot Password
export const forgotPassword = async (email) => {
  const res = await axiosInstance.post(endpoints.auth.forgotPassword, email);
  return res.data;
};

// 🔐 Reset Password with token
export const resetPasswordWithToken = async ({ token, newPassword }) => {
  const res = await axiosInstance.post(
    endpoints.auth.resetPasswordWithToken(token),
    { password: newPassword } // ✅ Fix here
  );
  return res.data;
};

// 🔐 Change Password
export const changePassword = async (data) => {
  const res = await axiosInstance.post(endpoints.auth.changePassword, data);
  return res.data;
};

// ✍️ Create Post
export const createPost = async (postData) => {
  const res = await axiosInstance.post(endpoints.post.create, postData);
  return res.data;
};

// 📃 Get all posts
export const getAllPosts = async () => {
  const res = await axiosInstance.get(endpoints.post.getAll);
  return res.data;
};

// 📄 Get posts by user
export const getPostsByUser = async (userId) => {
  const res = await axiosInstance.get(endpoints.post.byUser(userId));
  return res.data;
};

// 👤 Get user profile by ID
export const getUserProfile = async (userId) => {
  const res = await axiosInstance.get(endpoints.user.profile(userId));
  return res.data;
};

// 👍 Toggle Like
export const toggleLike = async (postId) => {
  const res = await axiosInstance.post(endpoints.post.like(postId));
  return res.data;
};

// 📡 Get home feed
export const getHomeFeed = async () => {
  const res = await axiosInstance.get(endpoints.feed.getHomeFeed);
  return res.data;
};

// 💬 Comment on Post
export const commentOnPost = async ({ postId, text }) => {
  const res = await axiosInstance.post(endpoints.post.comment(postId), { text });
  return res.data;
};
