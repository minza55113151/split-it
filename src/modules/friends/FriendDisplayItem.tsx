import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

interface FriendDisplayItemProps {
  name: string;
  avatarUrl?: string;
}

const FriendDisplayItem: React.FC<FriendDisplayItemProps> = ({
  name,
  avatarUrl,
}) => {
  return (
    <div className="flex w-full items-center px-2 py-1">
      {avatarUrl ? (
        <Avatar className="mr-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      ) : (
        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
          <span className="text-sm text-white">👤</span>
        </div>
      )}
      <h5>{name}</h5>
      <div className="ml-auto flex flex-col text-right">
        <span className="text-sm text-orange-500">{"Debt"}</span>
        <span className="text-orange-500">
          {"฿"}
          {50}
        </span>
      </div>
    </div>
  );
};

export default FriendDisplayItem;
