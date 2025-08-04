const endpoints = {
  auth: {
    register: "/auth/signup",
    login: "/auth/login",
    logout: "/auth/logout", // optional
    profile: "/users/me",
    updateProfile: "/users/me",
    resetPassword: "/auth/reset-password",
    forgotPassword: "/auth/forgot-password",
    resetPasswordWithToken: (token) => `/auth/reset-password/${token}`,
    changePassword: "/auth/change-password",
    verifyEmail: (token) => `/auth/verify/${token}`,
  },
  user: {
    profile: (userId) => `/users/${userId}/profile`,
  },
  post: {
    create: "/posts",
    getAll: "/posts",
    byUser: (userId) => `/users/${userId}/profile`,
    like: (postId) => `/posts/${postId}/like`,
    comment: (postId) => `/posts/${postId}/comment`,
  },

  feed: {
    getHomeFeed: "/feed",
  },
};

export default endpoints;
