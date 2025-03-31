import apiInstance from "@/modules/services/myApi";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

export const useUserRegister = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiInstance.users.usersCreate();
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useUser"] });
    },
  });
};
