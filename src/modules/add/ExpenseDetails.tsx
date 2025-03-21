import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type ExpenseDetailsProps = {
  isYouPayer: boolean;
  friend: string;
  splitChoice: "equal" | "custom";
  amount: number;
  onClick: () => void;
};

const ExpenseDetails: React.FC<ExpenseDetailsProps> = ({
  isYouPayer,
  friend,
  splitChoice,
  amount,
  onClick,
}) => {
  let title = "";
  let description = "";
  if (isYouPayer && splitChoice == "equal") {
    title = "You are payer, split equally";
    description = `${friend} own you ${amount / 2}`;
  } else if (isYouPayer && splitChoice == "custom") {
    title = "You are owner full debt";
    description = `${friend} own you ${amount}`;
  } else if (!isYouPayer && splitChoice == "equal") {
    title = `${friend} is payer, split equally`;
    description = `You are debt ${friend} ${amount / 2}`;
  } else if (!isYouPayer && splitChoice == "custom") {
    title = `${friend} are owner full debt`;
    description = `You are debt ${friend} ${amount}`;
  }

  return (
    <button className="flex gap-6" onClick={onClick}>
      <Avatar>
        <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" />
      </Avatar>
      <Avatar className="absolute ml-6">
        <AvatarImage src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg" />
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
