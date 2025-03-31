import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddFriend } from "@/hooks/useAddFriend";
import { useFriendList } from "@/hooks/useFriendList";
import { useUserListByName } from "@/hooks/useUserListByName";
import React, { useState } from "react";
import FriendAddItem from "./FriendAddItem";
import { useUser } from "@/hooks/useUser";

interface AddFriendProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddFriendModal: React.FC<AddFriendProps> = ({ isOpen, setIsOpen }) => {
  const [searchFriendName, setSearchFriendName] = useState<string>("");

  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: userList = [], isLoading: isUserListLoading } =
    useUserListByName(searchFriendName);
  const { data: friendList = [], isLoading: isFriendListLoading } =
    useFriendList();

  const isLoading = isUserListLoading || isFriendListLoading || isUserLoading;
  const filteredUserList = userList.filter((u) => u.SubID !== user?.SubID);

  const { mutate: addFriend } = useAddFriend();

  const onAddFriend = (subId: string) => {
    addFriend(subId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogTitle>Add Friend</DialogTitle>
        <Input
          type="text"
          placeholder="Friend's name"
          value={searchFriendName}
          onChange={(e) => setSearchFriendName(e.target.value)}
        />
        <div className="flex h-64 flex-col gap-2 overflow-y-scroll">
          {!isLoading &&
            filteredUserList.length !== 0 &&
            filteredUserList.map((user) => (
              <FriendAddItem
                key={user.SubID}
                name={user.Name!}
                imageUrl={user.ImageURL!}
                isFriend={friendList.some(
                  (friend) => friend.SubID === user.SubID,
                )}
                onAddFriend={() => onAddFriend(user.SubID!)}
              />
            ))}
          {isLoading && (
            <div className="flex h-full w-full items-center justify-center">
              <p>Loading...</p>
            </div>
          )}
          {!isLoading && userList.length === 0 && (
            <div className="flex h-full w-full items-center justify-center">
              <p>No friends found</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
