import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type FriendDisplayItemProps = {
  name: string;
  imageUrl?: string;
  debtAmount: number;
  isFriendDebtor: boolean;
};

const FriendDisplayItem: React.FC<FriendDisplayItemProps> = ({
  name,
  imageUrl,
  debtAmount,
  isFriendDebtor,
}) => {
  return (
    <div className="flex w-full items-center px-2 py-1">
      {imageUrl ? (
        <Avatar className="mr-2">
          <AvatarImage src={imageUrl} alt={name} />
        </Avatar>
      ) : (
        <div className="mr-2 flex size-10 items-center justify-center rounded-full bg-gray-300">
          <span className="text-sm text-white">👤</span>
        </div>
      )}
      <h5>{name}</h5>
      <div className="ml-auto flex flex-col text-right">
        {!isFriendDebtor && debtAmount !== 0 && (
          <>
            <span className="text-sm text-orange-500">You debt</span>
            <span className="text-orange-500">฿{debtAmount}</span>
          </>
        )}
        {isFriendDebtor && debtAmount !== 0 && (
          <>
            <span className="text-sm text-green-500">Own you</span>
            <span className="text-green-500">฿{debtAmount}</span>
          </>
        )}
        {debtAmount === 0 && (
          <span className="text-sm text-gray-500">{"No expenses"}</span>
        )}
      </div>
    </div>
  );
};

export default FriendDisplayItem;
