// src/hooks/auth/usePassword.js
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { forgotPassword, resetPasswordWithToken } from "../../api/apiHandler";

import { toast } from "react-toastify";

export const usePassword = () => {
  const navigate = useNavigate();
  const forgot = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Reset link sent! Check your email.");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to send reset link");
    },
  });

  const reset = useMutation({
    mutationFn: resetPasswordWithToken,
    onSuccess: () => {
      toast.success("Password reset successful!");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Reset failed");
    },
  });

  return { forgot, reset };
};
