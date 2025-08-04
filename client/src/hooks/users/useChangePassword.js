import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/apiHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useChangePassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: changePassword,
    onSuccess: (res) => {
      toast.success(res.message);
      navigate("/");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Password change failed");
    },
  });
};
