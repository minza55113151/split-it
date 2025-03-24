import apiInstance from "@/modules/services/myApi";
import { useQuery } from "@tanstack/react-query";

export const useExpenseList = (status = "") => {
  return useQuery({
    queryKey: ["useExpenseList"],
    queryFn: async () => {
      const response = await apiInstance.expenses.expensesList({ status });
      return response.data;
    },
  });
};
