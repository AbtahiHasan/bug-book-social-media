"use client";
import { Button } from "@/components/ui/button";
import { TUser } from "@/lib/types";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

interface EditProfileButtonProps {
  user: TUser;
}

const EditProfileButton = ({ user }: EditProfileButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <Button onClick={() => setShowDialog(true)} variant="outline">
        Edit Profile
      </Button>
      <EditProfileDialog
        user={user}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
};

export default EditProfileButton;
