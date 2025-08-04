import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../../api/apiHandler";
import { toast } from "react-toastify";

export const useEditProfile = (userId) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfile,
    onSuccess: () => {
      toast.success("✅ Profile updated");
      queryClient.invalidateQueries(["myProfile"]);
      navigate(`/profile/${userId}`);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Profile update failed");
    },
  });
};
