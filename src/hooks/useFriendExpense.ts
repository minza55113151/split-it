import { useExpenseList } from "./useExpenseList";

export const useFriendExpenseList = (subId: string) => {
  const query = useExpenseList();

  return {
    ...query,
    data: query.data?.filter(
      (expense) =>
        expense.DebtorSubID === subId || expense.PayerSubID === subId,
    ),
  };
};
