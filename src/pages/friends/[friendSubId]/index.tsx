import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useFriendExpenseList } from "@/hooks/useFriendExpense";
import { useFriendList } from "@/hooks/UseFriendList";
import { useUser } from "@/hooks/UseUser";
import AppLayout from "@/modules/AppLayout";
import FriendExpenseItem from "@/modules/friends/FriendExpenseItem";
import { CaretLeft, Gear } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";

const FriendSubIdPage: React.FC = () => {
  const router = useRouter();
  const { friendSubId } = router.query;

  const { data: expenseList = [], isLoading: isExpenseListLoading } =
    useFriendExpenseList(friendSubId as string);
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: friendList, isLoading: isFriendListLoading } = useFriendList();

  const isLoading =
    isExpenseListLoading || isUserLoading || isFriendListLoading;

  const friend = friendList?.find((f) => f.SubID === friendSubId);

  const userDebt = expenseList.reduce((acc, expense) => {
    const amount = expense.Amount! / (expense.SplitType === "equal" ? 2 : 1);
    if (expense.PayerSubID === user?.SubID) {
      return acc - amount;
    }
    return acc + amount;
  }, 0);
  const reversedExpenseList = expenseList.reverse();

  return (
    <AppLayout page="Friends">
      <div className="fixed flex w-full max-w-[500px] -translate-x-4 items-center justify-between bg-white p-4">
        <CaretLeft size={24} onClick={() => router.back()} />
        <Gear size={24} onClick={() => toast("FRIEND SETTING")} />
      </div>
      <div className="h-[56px]"></div>
      <div>
        <Avatar>
          <AvatarImage src={friend?.ImageURL} alt={friend?.Name} />
        </Avatar>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl">{friend?.Name}</h1>
            {userDebt > 0 && (
              <div className="flex gap-1 text-sm">
                <span>You borrow money</span>
                <span className="text-orange-500">฿{userDebt}</span>
              </div>
            )}
            {userDebt < 0 && (
              <div className="flex gap-1 text-sm">
                <span>You lend money</span>
                <span className="text-green-500">฿{Math.abs(userDebt)}</span>
              </div>
            )}
            {userDebt === 0 && <div>You are even</div>}
          </div>
          <div>
            <Button
              onClick={() => router.push(`/friends/${friend?.SubID}/settle`)}
            >
              Settle
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-32">
        {!isLoading &&
          reversedExpenseList.map((expense) => (
            <button
              className="w-full"
              key={expense.ID}
              onClick={() => {
                router.push(`/friends/${friendSubId}/expenses/${expense.ID}`);
              }}
            >
              <FriendExpenseItem
                date={new Date(expense.CreatedAt!)}
                icon={expense.Icon!}
                title={expense.Title!}
                friendName={friend?.Name || ""}
                isFriendDebtor={expense.PayerSubID === user?.SubID}
                amount={expense.Amount!}
                debtAmount={
                  expense.Amount! / (expense.SplitType === "equal" ? 2 : 1)
                }
              />
            </button>
          ))}
        {isExpenseListLoading && <div>Loading...</div>}
      </div>
    </AppLayout>
  );
};

export default FriendSubIdPage;
