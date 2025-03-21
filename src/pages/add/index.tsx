import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ExpenseDetails from "@/modules/add/ExpenseDetails";
import AppLayout from "@/modules/AppLayout";
import FriendSelectItem from "@/modules/friends/FriendSelectItem";
import { Notebook, X } from "@phosphor-icons/react";
import React from "react";

type FriendType = {
  name: string;
};

const AddPage: React.FC = () => {
  const [state, setState] = React.useState<"Select" | "Input">("Select");

  const [friendSearchKey, setFriendSearchKey] = React.useState<string>("");

  const [splitChoice, setSplitChoice] = React.useState<"equal" | "custom">(
    "equal",
  );
  const [payer, setPayer] = React.useState<"you" | "friend">("you");
  const [seletedFriend, setSelectedFriend] = React.useState<string | null>(
    null,
  );

  // TODO: use hook
  const friends = ["Alice", "Bob", "Charlie", "David", "Eve"];
  const filteredFriends = friends.filter((friend) =>
    friend.toLowerCase().includes(friendSearchKey.toLowerCase()),
  );

  type ExpenseType = {
    title: string;
    amount: number;
  };

  const [expenseItem, setExpenseItem] = React.useState<ExpenseType>({
    title: "",
    amount: NaN,
  });

  const onSaveClick = () => {
    console.log({
      splitChoice,
      payer,
      seletedFriend,
      expenseItem,
    });
  };

  return (
    <AppLayout page="Add">
      <div className="fixed left-0 w-full bg-white p-4">
        <div className="flex items-center justify-between">
          <X size={24} />
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            Add Expense
          </div>
          <Button
            className="text-md"
            variant="link"
            onClick={onSaveClick}
            disabled={isNaN(expenseItem.amount) || expenseItem.title === ""}
          >
            Save
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <h5 className="w-fit">
            With <span className="font-bold">you</span> and:{" "}
          </h5>
          {seletedFriend == null && (
            <Input
              className="h-6"
              type="text"
              placeholder="Name Email or Tel."
              border={false}
              value={friendSearchKey}
              onChange={(e) => setFriendSearchKey(e.target.value)}
            />
          )}
          {/* TODO: Add avatar */}
          {seletedFriend != null && <Badge>{seletedFriend}</Badge>}
        </div>
        <Separator className="fixed left-0 mt-2" />
      </div>
      <div className="mb-4 h-[108px]"></div>
      {state === "Select" && (
        <div>
          <p className="text-xs">Your friends</p>
          <div className="mt-4 flex w-full flex-col gap-2">
            {filteredFriends.length !== 0 &&
              filteredFriends.map((friend, index) => (
                <>
                  {index !== 0 && <Separator />}
                  <button
                    key={friend}
                    onClick={() => {
                      setSelectedFriend(friend);
                      setState("Input");
                    }}
                  >
                    <FriendSelectItem name={friend} />
                  </button>
                </>
              ))}
            {filteredFriends.length === 0 && (
              <div className="flex h-24 items-center justify-center">
                <p className="text-gray-500">No friends found</p>
              </div>
            )}
          </div>
        </div>
      )}
      {state === "Input" && (
        <div className="flex w-full flex-col items-center justify-between gap-4 p-12">
          <div className="flex gap-2">
            <button className="h-12 w-12 items-center justify-center rounded-md border p-1 shadow-2xs shadow-gray-600">
              <Notebook weight="bold" size={36} />
            </button>
            <Input
              type="text"
              placeholder="Title"
              value={expenseItem.title}
              onChange={(e) =>
                setExpenseItem({ ...expenseItem, title: e.target.value })
              }
            />
          </div>
          <div className="flex gap-2">
            <button className="h-12 w-12 items-center justify-center rounded-md border p-1 shadow-2xs shadow-gray-600">
              <span className="text-center text-3xl font-bold">฿</span>
            </button>
            <Input
              type="number"
              inputMode="decimal"
              pattern="[0-9]*[.]?[0-9]*"
              placeholder="0.00"
              value={expenseItem.amount}
              onChange={(e) =>
                setExpenseItem({
                  ...expenseItem,
                  amount: parseFloat(parseFloat(e.target.value).toFixed(2)),
                })
              }
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="mt-6"
                variant="outline"
                size="sm"
                disabled={isNaN(expenseItem.amount)}
              >
                {payer === "you" &&
                  splitChoice === "equal" &&
                  "You are payer, split equally"}
                {payer === "you" &&
                  splitChoice === "custom" &&
                  "You are owner full debt"}
                {payer === "friend" &&
                  splitChoice === "equal" &&
                  `${seletedFriend} is payer, split equally`}
                {payer === "friend" &&
                  splitChoice === "custom" &&
                  `${seletedFriend} is owner full debt`}
              </Button>
            </DialogTrigger>
            <DialogContent className="gap-2">
              <DialogHeader>
                <DialogTitle>Expense details</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <DialogClose asChild>
                <ExpenseDetails
                  isYouPayer={true}
                  friend={seletedFriend || ""}
                  splitChoice="equal"
                  amount={expenseItem.amount}
                  onClick={() => {
                    setPayer("you");
                    setSplitChoice("equal");
                  }}
                />
              </DialogClose>
              <Separator />
              <DialogClose asChild>
                <ExpenseDetails
                  isYouPayer={true}
                  friend={seletedFriend || ""}
                  splitChoice="custom"
                  amount={expenseItem.amount}
                  onClick={() => {
                    setPayer("you");
                    setSplitChoice("custom");
                  }}
                />
              </DialogClose>
              <Separator />
              <DialogClose asChild>
                <ExpenseDetails
                  isYouPayer={false}
                  friend={seletedFriend || ""}
                  splitChoice="equal"
                  amount={expenseItem.amount}
                  onClick={() => {
                    setPayer("friend");
                    setSplitChoice("equal");
                  }}
                />
              </DialogClose>
              <Separator />
              <DialogClose asChild>
                <ExpenseDetails
                  isYouPayer={false}
                  friend={seletedFriend || ""}
                  splitChoice="custom"
                  amount={expenseItem.amount}
                  onClick={() => {
                    setPayer("friend");
                    setSplitChoice("custom");
                  }}
                />
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </AppLayout>
  );
};

export default AddPage;
