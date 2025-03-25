import { useFriendExpenseList } from "@/hooks/useFriendExpense";
import AppLayout from "@/modules/AppLayout";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

const FriendSubIdPage: React.FC = () => {
  const router = useRouter();
  const { friendSubId } = router.query;

  const { data: expenseList = [], isLoading: isExpenseListLoading } =
    useFriendExpenseList(friendSubId as string);

  return (
    <AppLayout page="Friends">
      <div className="fixed left-0 flex w-full items-center justify-between bg-white p-4">
        <MagnifyingGlass size={24} />
        <UserPlus size={24} />
      </div>
      <div>
        {!isExpenseListLoading &&
          expenseList.map((expense) => (
            <div key={expense.Id}>
              <div>{expense.Id}</div>
              <div>{expense.Amount}</div>
              <div>{expense.PayerSubID}</div>
              <div>{expense.DebtorSubID}</div>
            </div>
          ))}
        {isExpenseListLoading && <div>Loading...</div>}
      </div>
    </AppLayout>
  );
};

export default FriendSubIdPage;
