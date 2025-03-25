import apiInstance from "@/modules/services/myApi";
import { useQuery } from "@tanstack/react-query";

export const useUserListByName = (name: string) => {
  return useQuery({
    queryKey: ["useUserListByName", name],
    queryFn: async () => {
      const response = await apiInstance.users.usersDetail(name);
      return response.data;
    },
    enabled: !!name,
  });
};
