import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

interface FriendSelectItemProps {
  name: string;
  imageUrl?: string;
}

const FriendSelectItem: React.FC<FriendSelectItemProps> = ({
  name,
  imageUrl,
}) => {
  return (
    <div className="flex w-full items-center px-2 py-1">
      {imageUrl ? (
        <Avatar className="mr-2">
          <AvatarImage src={imageUrl} alt="@shadcn" />
        </Avatar>
      ) : (
        <div className="mr-2 flex size-10 items-center justify-center rounded-full bg-gray-300">
          <span className="text-sm text-white">👤</span>
        </div>
      )}
      <h5>{name}</h5>
      {/* <input type="checkbox" className="ml-auto" /> */}
    </div>
  );
};

export default FriendSelectItem;
