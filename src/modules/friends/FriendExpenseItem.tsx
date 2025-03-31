import React from "react";
import ExpenseIcon from "../add/ExpenseIcon";

type FriendExpenseItemProps = {
  date: Date;
  icon: string;
  title: string;
  friendName: string;
  isFriendDebtor: boolean;
  amount: number;
  debtAmount: number;
};

const FriendExpenseItem: React.FC<FriendExpenseItemProps> = ({
  date,
  icon,
  title,
  friendName,
  isFriendDebtor,
  debtAmount,
  amount,
}) => {
  const isSettle = icon === "Settle" && title === "Settle";

  return (
    <div className="flex w-full items-center">
      <div className="flex gap-2">
        <div className="flex flex-col text-right">
          <span className="text-sm">
            {date.toLocaleString("default", { month: "short" })}
          </span>
          <span> {date.getDate()}</span>
        </div>
        <ExpenseIcon iconName={icon} />
        {!isSettle && (
          <div className="flex flex-col items-start">
            <span>{title}</span>
            {isFriendDebtor && (
              <span className="text-xs text-gray-500">You paid ฿{amount}</span>
            )}
            {!isFriendDebtor && (
              <span className="text-xs text-gray-500">
                {friendName} paid ฿{amount}
              </span>
            )}
          </div>
        )}
        {isSettle && (
          <div className="flex items-center">
            {!isFriendDebtor && (
              <span className="text-xs">
                You pay for {friendName} ฿{amount}
              </span>
            )}
            {isFriendDebtor && (
              <span className="text-xs">
                {friendName} pay for you ฿{amount}
              </span>
            )}
          </div>
        )}
      </div>
      {!isSettle && (
        <div className="ml-auto flex flex-col text-right">
          {!isFriendDebtor && debtAmount !== 0 && (
            <>
              <span className="text-sm text-orange-500">You borrow money</span>
              <span className="text-orange-500">฿{debtAmount}</span>
            </>
          )}
          {isFriendDebtor && debtAmount !== 0 && (
            <>
              <span className="text-sm text-green-500">You lend money</span>
              <span className="text-green-500">฿{debtAmount}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendExpenseItem;
