"use client";
import { TPost } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "./PostMoreButton";
import Linkify from "../Linkify";

interface PostProps {
  post: TPost;
}

const Post = ({ post }: PostProps) => {
  const { user } = useSession();
  return (
    <article className="group space-y-4 rounded-2xl bg-card p-5">
      <div className="flex justify-between gap-3">
        <div className="flex gap-5">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>

          <div>
            <Link
              className="block font-medium hover:underline"
              href={`/users/${post.user.username}`}
            >
              {post.user.displayName}
            </Link>
            <Link
              className="block text-sm text-muted-foreground hover:underline"
              href={`/posts/${post.id}`}
            >
              {formatRelativeDate(post.createAt)}
            </Link>
          </div>
        </div>
        {post.userId === user?.id && (
          <PostMoreButton
            className="opacity-0 transition-opacity group-hover:opacity-100"
            post={post}
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
    </article>
  );
};

export default Post;
