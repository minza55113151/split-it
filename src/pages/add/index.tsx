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
import { useCreateExpense } from "@/hooks/useCreateExpense";
import { useFriendList } from "@/hooks/seFriendList";
import { useUser } from "@/hooks/seUser";
import ExpenseDetails from "@/modules/add/ExpenseDetails";
import AppLayout from "@/modules/AppLayout";
import FriendSelectItem from "@/modules/friends/FriendSelectItem";
import { ModelsFriendResponse } from "@/modules/services/Api";
import { Calculator, X } from "@phosphor-icons/react";
import React from "react";
import IconSelectorButtonModal from "../../modules/add/IconSelectorButtonModal";
import CurrencySelectorButtonModal from "@/modules/add/CurrencySelectorButtonModal";
import { useRouter } from "next/router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import ExpenseCalculator from "@/modules/add/ExpenseCalculator";

const AddPage: React.FC = () => {
  const router = useRouter();

  const [state, setState] = React.useState<"Select" | "Input" | "Calculator">(
    "Select",
  );

  const [friendNameSearchKey, setFriendNameSearchKey] =
    React.useState<string>("");

  const [splitChoice, setSplitChoice] = React.useState<"equal" | "custom">(
    "equal",
  );
  const [payer, setPayer] = React.useState<"you" | "friend">("you");
  const [selectedFriend, setSelectedFriend] =
    React.useState<ModelsFriendResponse | null>(null);

  const { data: user } = useUser();
  const { data: friends = [] } = useFriendList();
  const { mutate: createExpense } = useCreateExpense();

  const filteredFriends = friends.filter((friend) =>
    friend.Name?.toLowerCase().includes(friendNameSearchKey.toLowerCase()),
  );

  type ExpenseType = {
    title: string;
    amount: number;
    icon: string;
    currency: string;
  };

  const [expenseItem, setExpenseItem] = React.useState<ExpenseType>({
    title: "",
    amount: NaN,
    icon: "Other",
    currency: "฿",
  });

  const onSaveClick = () => {
    createExpense({
      Title: expenseItem.title,
      Amount: expenseItem.amount,
      PayerSubID: payer === "you" ? user?.SubID : selectedFriend?.SubID,
      DebtorSubID: payer === "you" ? selectedFriend?.SubID : user?.SubID,
      Currency: expenseItem.currency,
      SplitType: splitChoice,
      Status: "unpaid",
      Icon: expenseItem.icon,
      Note: "",
    });

    router.push(`/friends/${selectedFriend?.SubID}`);
  };

  return (
    <AppLayout page="Add">
      <div className="fixed w-full max-w-[500px] -translate-x-4 bg-white p-4">
        <div className="flex items-center justify-between">
          <X
            className={state === "Select" ? "opacity-0" : ""}
            size={24}
            onClick={() => {
              setState("Select");
              setSelectedFriend(null);
            }}
          />
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
          {selectedFriend === null && (
            <Input
              className="h-6"
              type="text"
              placeholder="Name Email or Tel."
              border={false}
              value={friendNameSearchKey}
              onChange={(e) => setFriendNameSearchKey(e.target.value)}
            />
          )}

          {selectedFriend != null && (
            <Badge className="rounded-2xl pl-1">
              <Avatar className="size-6">
                <AvatarImage src={selectedFriend.ImageURL} />
              </Avatar>
              {selectedFriend.Name}
            </Badge>
          )}
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
                <div
                  key={friend.SubID}
                  onClick={() => {
                    setSelectedFriend(friend);
                    setState("Input");
                  }}
                >
                  {index !== 0 && <Separator />}

                  <FriendSelectItem
                    name={friend.Name!}
                    imageUrl={friend.ImageURL}
                  />
                </div>
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
        <>
          <div className="flex">
            <Button className="ml-auto" onClick={() => setState("Calculator")}>
              <Calculator size={36} />
            </Button>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-4 p-12">
            <div className="flex items-center gap-2">
              <IconSelectorButtonModal
                iconName={expenseItem.icon}
                onSelect={(iconName) =>
                  setExpenseItem({ ...expenseItem, icon: iconName })
                }
              />
              <Input
                type="text"
                placeholder="Title"
                value={expenseItem.title}
                onChange={(e) =>
                  setExpenseItem({ ...expenseItem, title: e.target.value })
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <CurrencySelectorButtonModal
                currency={expenseItem.currency}
                onSelect={(currency) =>
                  setExpenseItem({ ...expenseItem, currency })
                }
              />
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
                    `${selectedFriend?.Name || "Your friend"} is payer, split equally`}
                  {payer === "friend" &&
                    splitChoice === "custom" &&
                    `${selectedFriend?.Name || "Your friend"} is owner full debt`}
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
                    userImageUrl={user?.ImageURL || ""}
                    friendName={selectedFriend?.Name || ""}
                    friendImageUrl={selectedFriend?.ImageURL || ""}
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
                    userImageUrl={user?.ImageURL || ""}
                    friendName={selectedFriend?.Name || ""}
                    friendImageUrl={selectedFriend?.ImageURL || ""}
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
                    userImageUrl={user?.ImageURL || ""}
                    friendName={selectedFriend?.Name || ""}
                    friendImageUrl={selectedFriend?.ImageURL || ""}
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
                    userImageUrl={user?.ImageURL || ""}
                    friendName={selectedFriend?.Name || ""}
                    friendImageUrl={selectedFriend?.ImageURL || ""}
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
        </>
      )}
      {state === "Calculator" && (
        <ExpenseCalculator
          onBackClick={() => setState("Input")}
          setValue={(value) => {
            setExpenseItem({ ...expenseItem, amount: value });
          }}
        />
      )}
    </AppLayout>
  );
};

export default AddPage;
