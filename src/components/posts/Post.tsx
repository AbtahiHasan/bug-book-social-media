import { TPost } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";

interface PostProps {
  post: TPost;
}

const Post = ({ post }: PostProps) => {
  return (
    <article className="space-y-4 rounded-2xl bg-card p-5">
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

      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
};

export default Post;
