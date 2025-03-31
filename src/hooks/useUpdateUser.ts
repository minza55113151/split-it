import { ModelsUser } from "@/modules/services/Api";
import apiInstance from "@/modules/services/myApi";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (user: ModelsUser) => {
      const response = await apiInstance.users.usersUpdate(user);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useUser"] });
    },
  });
};
