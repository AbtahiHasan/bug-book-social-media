"use client";
import { TPost } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useDeletePostMutation } from "./mutations";
import { LoadingButton } from "../ui/loading-button";
import { Button } from "../ui/button";

interface DeletePostDialogProps {
  open: boolean;
  onClose: () => void;
  post: TPost;
}

const DeletePostDialog = ({ onClose, open, post }: DeletePostDialogProps) => {
  const mutation = useDeletePostMutation();
  const handleOpenChange = (open: boolean) => {
    if (!open || !mutation.isPending) {
      onClose();
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Post</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this post?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <LoadingButton
            variant="destructive"
            loading={mutation.isPending}
            onClick={() => {
              mutation.mutate(post.id, {
                onSuccess: onClose,
              });
            }}
          >
            Delete
          </LoadingButton>
          <Button
            variant="outline"
            disabled={mutation.isPending}
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostDialog;
