import React from "react";
import AppLayout from "@/modules/AppLayout";
import { Notebook, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import FriendSelectItem from "@/modules/friends/FriendSelectItem";
import { Input } from "@/components/ui/input";

const AddPage: React.FC = () => {
  const [state, setState] = React.useState<"Select" | "Input">("Select");

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
          <Input
            className=""
            type="text"
            placeholder="Name Email or Tel."
            border={false}
          />
        </div>
        <div className="fixed left-0 mt-2 h-[0.5px] w-full bg-gray-200"></div>
      </div>
      <div className="mb-4 h-[108px]"></div>
      {state === "Select" && (
        <div>
          <p className="text-xs">Your friends</p>
          <div className="mt-4 flex w-full flex-col gap-2">
            {friends.map((friend) => (
              <button key={friend} onClick={() => setState("Input")}>
                <FriendSelectItem name={friend} />
              </button>
            ))}
          </div>
        </div>
      )}
      {state === "Input" && (
        <div className="flex w-full flex-col items-center justify-between gap-4 p-12">
          <div className="flex gap-2">
            <button className="h-12 w-12 items-center justify-center rounded-md border p-1 shadow-2xs shadow-gray-600">
              <Notebook weight="bold" size={36} />
            </button>
            <Input type="text" placeholder="Title" />
          </div>
          <div className="flex gap-2">
            <button className="h-12 w-12 items-center justify-center rounded-md border p-1 shadow-2xs shadow-gray-600">
              <span className="text-center text-3xl font-bold">฿</span>
            </button>
            <Input type="text" placeholder="0.00" />
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default AddPage;
