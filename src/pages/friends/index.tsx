import { Button } from "@/components/ui/button";
import AppLayout from "@/modules/AppLayout";
import FriendDisplayItem from "@/modules/friends/FriendDisplayItem";
import { MagnifyingGlass, UserPlus } from "@phosphor-icons/react";
import React from "react";

const FriendsPage: React.FC = () => {
  // TODO: friends
  const friends = ["Alice", "Bob"];

  return (
    <AppLayout page="Friends">
      <div className="fixed left-0 flex w-full items-center justify-between bg-white p-4">
        <MagnifyingGlass size={24} />
        <UserPlus size={24} />
      </div>
      <div className="flex flex-col items-center">
        <div className="h-14 w-full"></div>
        <div className="mt-4 flex w-full flex-col">
          <h5>
            You are in debt{" "}
            <span className="text-orange-500">
              {"฿"}
              {100}
            </span>
          </h5>
        </div>
        <div className="mt-2 flex w-full flex-col gap-2">
          {friends.map((friend) => (
            <FriendDisplayItem key={friend} name={friend} />
          ))}
        </div>
        <Button className="mt-4" variant="outline">
          <UserPlus size={32} /> Add Friend
        </Button>
      </div>
    </AppLayout>
  );
};

export default FriendsPage;
