import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type ExpenseDetailsProps = {
  isYouPayer: boolean;
  userImageUrl: string;
  friendName: string;
  friendImageUrl: string;
  splitChoice: "equal" | "custom";
  amount: number;
  onClick: () => void;
};

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({
  isYouPayer,
  userImageUrl,
  friendName,
  friendImageUrl,
  splitChoice,
  amount,
  onClick,
}) => {
  let title = "";
  let description = "";
  if (isYouPayer && splitChoice == "equal") {
    title = "You are payer, split equally";
    description = `${friendName} own you ${(Math.ceil((amount / 2) * 100) / 100).toFixed(2)}`;
  } else if (isYouPayer && splitChoice == "custom") {
    title = "You are owner full debt";
    description = `${friendName} own you ${amount.toFixed(2)}`;
  } else if (!isYouPayer && splitChoice == "equal") {
    title = `${friendName} is payer, split equally`;
    description = `You are debt ${friendName} ${(Math.ceil((amount / 2) * 100) / 100).toFixed(2)}`;
  } else if (!isYouPayer && splitChoice == "custom") {
    title = `${friendName} is owner full debt`;
    description = `You are debt ${friendName} ${amount.toFixed(2)}`;
  }

  return (
    <button className="flex gap-6" onClick={onClick}>
      <Avatar>
        <AvatarImage src={userImageUrl} />
      </Avatar>
      <Avatar className="absolute ml-6">
        <AvatarImage src={friendImageUrl} />
      </Avatar>
      <div className="ml-4 text-left font-light">
        <p>{title}</p>
        <p className={isYouPayer ? "text-green-600" : "text-red-600"}>
          {description}
        </p>
      </div>
    </button>
  );
};

export default ExpenseDetails;
