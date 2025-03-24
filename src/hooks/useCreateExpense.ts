import { ModelsExpense } from "@/modules/services/Api";
import apiInstance from "@/modules/services/myApi";
import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";

export const useCreateExpense = () => {
  return useMutation({
    mutationFn: async (expense: ModelsExpense) => {
      const response = await apiInstance.expenses.expensesCreate(expense);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["useExpenseList"] });
    },
  });
};
