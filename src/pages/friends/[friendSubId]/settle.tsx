import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateExpense } from "@/hooks/useCreateExpense";
import { useFriendExpenseList } from "@/hooks/useFriendExpense";
import { useFriendList } from "@/hooks/useFriendList";
import { useUser } from "@/hooks/useUser";
import CurrencySelectorButtonModal from "@/modules/add/CurrencySelectorButtonModal";
import AppLayout from "@/modules/AppLayout";
import { ArrowRight, X } from "@phosphor-icons/react";
import { AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const SettlePage: React.FC = () => {
  const router = useRouter();
  const { friendSubId } = router.query;

  const [settleItem, setSettleItem] = React.useState({
    amount: NaN,
    currency: "฿",
  });

  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: friendList, isLoading: isFriendListLoading } = useFriendList();
  const { data: expenseList = [], isLoading: isExpenseListLoading } =
    useFriendExpenseList(friendSubId as string);
  const { mutate: createExpense } = useCreateExpense();

  const isLoading =
    isUserLoading || isFriendListLoading || isExpenseListLoading;

  const friend = friendList?.find((f) => f.SubID === friendSubId);

  const userDebt = expenseList.reduce((acc, expense) => {
    const amount = expense.Amount! / (expense.SplitType === "equal" ? 2 : 1);
    if (expense.PayerSubID === user?.SubID) {
      return acc - amount;
    }
    return acc + amount;
  }, 0);

  const payer = userDebt > 0 ? user : friend;
  const debtor = userDebt > 0 ? friend : user;

  useEffect(() => {
    if (userDebt > 0) {
      setSettleItem({
        amount: userDebt,
        currency: "฿",
      });
    } else {
      setSettleItem({
        amount: Math.abs(userDebt),
        currency: "฿",
      });
    }
  }, [userDebt]);

  const onSave = () => {
    createExpense({
      PayerSubID: payer?.SubID,
      DebtorSubID: debtor?.SubID,
      Icon: "Settle",
      Title: "Settle",
      Currency: settleItem.currency,
      Amount: settleItem.amount,
      Note: "",
      Status: "",
      SplitType: "custom",
    });

    router.push(`/friends/${friendSubId}`);
  };

  return (
    <AppLayout page="Friends">
      <div className="fixed flex w-full max-w-[500px] -translate-x-4 items-center justify-between bg-white p-4">
        <div className="flex w-full justify-between">
          <X size={24} onClick={() => router.push(`/friends/${friendSubId}`)} />
          <Button
            variant="link"
            disabled={settleItem.amount <= 0}
            onClick={onSave}
          >
            Save
          </Button>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 transform">
          Settle expenses
        </div>
      </div>
      <div className="h-[56px]"></div>
      {!isLoading && (
        <div className="flex w-full flex-col items-center justify-between gap-12 px-12 py-24">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="size-16">
                <AvatarImage src={payer?.ImageURL} alt={payer?.Name} />
              </Avatar>
              <ArrowRight size={24} />
              <Avatar className="size-16">
                <AvatarImage src={debtor?.ImageURL} alt={debtor?.Name} />
              </Avatar>
            </div>
            {userDebt > 0 && (
              <div className="flex gap-1 text-sm">
                <span>You pay for {friend?.Name}</span>
              </div>
            )}
            {userDebt < 0 && (
              <div className="flex gap-1 text-sm">
                <span>{friend?.Name} pay for you</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <CurrencySelectorButtonModal
              currency={settleItem.currency}
              onSelect={(currency) =>
                setSettleItem({ ...settleItem, currency })
              }
            />
            <Input
              type="number"
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              placeholder="0.00"
              value={settleItem.amount}
              onChange={(e) =>
                setSettleItem({
                  ...settleItem,
                  amount: parseFloat(parseFloat(e.target.value).toFixed(2)),
                })
              }
            />
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default SettlePage;
