import apiInstance from "@/modules/services/myApi";
import { useQuery } from "@tanstack/react-query";

export const useFriendList = () => {
  return useQuery({
    queryKey: ["useFriendList"],
    queryFn: async () => {
      const response = await apiInstance.friends.friendsList();
      return response.data;
    },
  });
};
