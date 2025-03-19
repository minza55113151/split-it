import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

interface FriendItemProps {
  name: string;
  avatarUrl?: string;
}

const FriendItem: React.FC<FriendItemProps> = ({ name, avatarUrl }) => {
  return (
    <div className="flex w-full items-center py-1 px-2">
      {avatarUrl ? (
        <Avatar className="mr-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      ) : (
        <div className="mr-2 bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
          <span className="text-sm text-white">👤</span>
        </div>
      )}
      <h5>{name}</h5>
      <div className="ml-auto flex flex-col text-right">
        <span className="text-orange-500 text-sm">{"Debt"}</span>
        <span className="text-orange-500">
          {"฿"}
          {50}
        </span>
      </div>
    </div>
  );
};

export default FriendItem;
