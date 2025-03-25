import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Users } from "@phosphor-icons/react";
import React from "react";

interface FriendAddItemProps {
  name: string;
  imageUrl: string;
  isFriend: boolean;
  onAddFriend: () => void;
}

const FriendAddItem: React.FC<FriendAddItemProps> = ({
  name,
  imageUrl,
  isFriend,
  onAddFriend,
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
      {!isFriend && (
        <button className="ml-auto" onClick={() => onAddFriend()}>
          <UserPlus size={24} />
        </button>
      )}
      {isFriend && <Users className="ml-auto" size={24} />}
    </div>
  );
};

export default FriendAddItem;
