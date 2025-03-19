import { Button } from "@/components/ui/button";
import AppLayout from "@/modules/AppLayout";
import FriendItem from "@/modules/friends/FriendItem";
import { MagnifyingGlass, UserPlus } from "@phosphor-icons/react";
import React from "react";

const FriendsPage: React.FC = () => {
  const [friends, setFriends] = React.useState(["John Doe", "Jane Doe"]);

  return (
    <AppLayout page="Friends">
      <div className="flex w-full fixed left-0 p-4 justify-between bg-white">
        <MagnifyingGlass size={24} />
        <UserPlus size={24} />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full h-14"></div>
        <div className="flex flex-col w-full mt-4">
          <h5>
            You are in debt{" "}
            <span className="text-orange-500">
              {"฿"}
              {100}
            </span>
          </h5>
        </div>
        <div className="flex flex-col w-full mt-2 gap-2">
          {friends.map((friend) => (
            <FriendItem key={friend} name={friend} />
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
