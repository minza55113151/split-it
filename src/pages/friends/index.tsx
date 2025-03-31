import { Button } from "@/components/ui/button";
import { useExpenseList } from "@/hooks/useExpenseList";
import { useFriendList } from "@/hooks/UseFriendList";
import AppLayout from "@/modules/AppLayout";
import AddFriendModal from "@/modules/friends/AddFriendModal";
import FriendDisplayItem from "@/modules/friends/FriendDisplayItem";
import { MagnifyingGlass, UserPlus } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import React from "react";

const FriendsPage: React.FC = () => {
  const router = useRouter();

  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = React.useState(false);

  const { data: friends = [], isLoading: isFriendListLoading } =
    useFriendList();
  const { data: expenseList = [], isLoading: isExpenseListLoading } =
    useExpenseList();

  const isLoading = isFriendListLoading || isExpenseListLoading;

  const friendDebtMap = friends.reduce(
    (acc, friend) => {
      acc[friend.SubID!] = expenseList.reduce((acc, expense) => {
        if (
          expense.PayerSubID !== friend.SubID &&
          expense.DebtorSubID !== friend.SubID
        ) {
          return acc;
        }

        const amount =
          expense.Amount! / (expense.SplitType === "custom" ? 1 : 2);
        if (expense.DebtorSubID === friend.SubID) {
          return acc - amount;
        }
        return acc + amount;
      }, 0);
      return acc;
    },
    {} as Record<string, number>,
  );

  const userDebt = friends.reduce((acc, friend) => {
    return acc + friendDebtMap[friend.SubID!];
  }, 0);

  return (
    <AppLayout page="Friends">
      <div className="fixed flex w-full max-w-[500px] -translate-x-4 items-center justify-between bg-white p-4">
        <MagnifyingGlass size={24} />
        <UserPlus size={24} onClick={() => setIsAddFriendModalOpen(true)} />
      </div>
      <div className="flex flex-col items-center">
        <div className="h-14 w-full"></div>
        <div className="mt-4 flex w-full flex-col">
          {userDebt < 0 && (
            <h5>
              You are in debt{" "}
              <span className="text-orange-500">฿{userDebt}</span>
            </h5>
          )}
          {userDebt > 0 && (
            <h5>
              Your friends owe you{" "}
              <span className="text-green-500">฿{Math.abs(userDebt)}</span>
            </h5>
          )}
          {userDebt === 0 && <h5>You are all settled up</h5>}
        </div>
        <div className="mt-2 flex w-full flex-col gap-2">
          {!isLoading &&
            friends.map((friend) => {
              return (
                <button
                  key={friend.SubID}
                  onClick={() => {
                    console.log(friend.SubID);
                    router.push(`/friends/${friend.SubID}`);
                  }}
                >
                  <FriendDisplayItem
                    name={friend.Name!}
                    imageUrl={friend.ImageURL}
                    debtAmount={Math.abs(friendDebtMap[friend.SubID!])}
                    isFriendDebtor={friendDebtMap[friend.SubID!] > 0}
                  />
                </button>
              );
            })}
        </div>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => setIsAddFriendModalOpen(true)}
        >
          <UserPlus size={32} /> Add Friend
        </Button>
        <AddFriendModal
          isOpen={isAddFriendModalOpen}
          setIsOpen={setIsAddFriendModalOpen}
        />
      </div>
    </AppLayout>
  );
};

export default FriendsPage;
