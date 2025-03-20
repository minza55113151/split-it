import React from "react";
import AppLayout from "@/modules/AppLayout";
import { X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import FriendSelectItem from "@/modules/friends/FriendSelectItem";

const AddPage: React.FC = () => {
  const friends = ["Alice", "Bob", "Charlie", "David", "Eve"];

  return (
    <AppLayout page="Add">
      <div className="fixed left-0 w-full bg-white p-4">
        <div className="flex items-center justify-between">
          <X size={24} />
          <div className="absolute left-1/2 -translate-x-1/2 transform">
            Add
          </div>
          <Button className="text-md" variant="link" disabled>
            Save
          </Button>
        </div>
        <div className="mt-4 flex items-center gap-2">
          <h5 className="w-fit">
            With <span className="font-bold">you</span> and:{" "}
          </h5>
          <input className="" type="text" placeholder="Name Email or Tel." />
        </div>
        <div className="fixed left-0 mt-2 h-[0.5px] w-full bg-gray-200"></div>
      </div>
      <div className="h-[108px]"></div>
      <div className="mt-4">
        <p className="text-xs">Your friends</p>
        <div className="mt-4 flex w-full flex-col gap-2">
          {friends.map((friend) => (
            <FriendSelectItem key={friend} name={friend} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default AddPage;
