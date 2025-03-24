import apiInstance from "@/modules/services/myApi";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

export const useAddFriend = () => {
  return useMutation({
    mutationFn: async (friendSubID: string) => {
      const response = await apiInstance.friends.friendsCreate(friendSubID);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useFriendList"] });
    },
  });
};
