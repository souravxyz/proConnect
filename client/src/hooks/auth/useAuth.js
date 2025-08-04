import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, logoutUser } from "../../api/apiHandler";
import { toast } from "react-toastify";

export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // ✅ get access to query cache

  const register = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful! Please check your email.");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Registration failed");
    },
  });

  const login = useMutation({
    mutationFn: loginUser,
    onSuccess: async (res) => {
      localStorage.setItem("token", res.token);
      await queryClient.invalidateQueries(["myProfile"]);
      toast.success("Welcome back!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Login failed");
    },
  });

  const logout = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.removeQueries(["myProfile"]);
      toast.info("Logged out successfully");
      navigate("/login");
    },
    onError: () => {
      toast.error("Logout failed");
    },
  });

  return { register, login, logout };
};
