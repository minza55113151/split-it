import apiInstance from "@/modules/services/myApi";
import { useQuery } from "@tanstack/react-query";

export const useUser = (enable: boolean = true) => {
  return useQuery({
    queryKey: ["useUser"],
    queryFn: async () => {
      const response = await apiInstance.users.usersList();
      return response.data;
    },
    enabled: enable,
  });
};
