"use client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { createPost } from "./actions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import "./styles.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const PostEditor = () => {
  const { user } = useSession();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's crack-a-lackin'?",
      }),
    ],
  });
  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = async () => {
    await createPost(input);
    editor?.commands.clearContent();
  };
  return (
    <div className="flex w-full flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} />

        <EditorContent
          editor={editor}
          className={cn(
            "max-h-[20rem] !w-full !max-w-full overflow-y-auto rounded-2xl bg-background px-5 py-3",
            "",
          )}
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={() => onSubmit()}
          className="min-w-20"
          disabled={!input.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
