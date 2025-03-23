import React from "react";
import AppLayout from "@/modules/AppLayout";
import { UserButton } from "@clerk/nextjs";

const ProfilePage: React.FC = () => {
  return (
    <AppLayout page="Profile">
      <div>
        <h1>Profile Page</h1>
        <p>Welcome to the Profile page!</p>
        <UserButton />
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
