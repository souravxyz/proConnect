import { useQuery } from "@tanstack/react-query";
import { getHomeFeed } from "../../api/apiHandler";

export const useFeed = () => {
  const query = useQuery({
    queryKey: ["feed"],
    queryFn: getHomeFeed,
  });

  return { query };
};
