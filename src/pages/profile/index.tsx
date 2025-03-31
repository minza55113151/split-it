import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { useUser } from "@/hooks/UseUser";
import AppLayout from "@/modules/AppLayout";
import { UserButton } from "@clerk/nextjs";
import { Check, PencilSimple } from "@phosphor-icons/react";
import React, { useEffect } from "react";
import { toast } from "sonner";

const ProfilePage: React.FC = () => {
  const { data: user, isLoading } = useUser();
  const {
    mutate: updateUser,
    isSuccess: isUpdateSuccess,
    isError: isUpdateError,
  } = useUpdateUser();
  const [isEditing, setIsEditing] = React.useState(false);

  const [userName, setUserName] = React.useState<string | undefined>("");

  useEffect(() => {
    if (isUpdateError) {
      setUserName(user?.Name);
      toast("Error updating user");
    }
  }, [isUpdateError, user?.Name]);

  useEffect(() => {
    if (isUpdateSuccess) {
      toast("User updated successfully");
    }
  }, [isUpdateSuccess]);

  useEffect(() => {
    if (user && !isLoading) {
      setUserName(user?.Name);
    }
  }, [user, isLoading]);

  return (
    <AppLayout page="Profile">
      <div className="flex flex-col gap-8">
        <h1 className="self-center p-4 text-xl">Profile</h1>
        <Separator />
        <div className="flex items-center gap-2 px-4">
          <div className="size-fit scale-200">
            <UserButton />
          </div>
          {isEditing && (
            <Input
              className="ml-8 w-1/2 text-xl!"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          )}
          {!isEditing && <h1 className="ml-8 w-1/2 text-xl!">{userName}</h1>}
          <Button
            variant="ghost"
            onClick={() => {
              if (isEditing && userName !== user?.Name && userName) {
                updateUser({ ...user, Name: userName });
              }
              setIsEditing(!isEditing);
            }}
          >
            {!isEditing && <PencilSimple size={20} />}
            {isEditing && <Check size={20} />}
          </Button>
        </div>
        <Separator />
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
