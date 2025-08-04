import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../api/apiHandler";

export const useUserProfile = (userId) =>
  useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserProfile(userId),
    enabled: !!userId, // only fetch if ID exists
  });