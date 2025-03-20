import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

interface FriendSelectItemProps {
  name: string;
  avatarUrl?: string;
}

const FriendSelectItem: React.FC<FriendSelectItemProps> = ({
  name,
  avatarUrl,
}) => {
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
      {/* <input type="checkbox" className="ml-auto" /> */}
    </div>
  );
};

export default FriendSelectItem;
