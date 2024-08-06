import Post from "@/components/posts/Post";
import TrendsSidebar from "@/components/TrendsSidebar";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import dynamic from "next/dynamic";

const PostEditor = dynamic(
  () => import("@/components/posts/editor/PostEditor"),
  { ssr: false, loading: () => <p>Loading...</p> },
);

const Page = async () => {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: {
      createAt: "desc",
    },
  });
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default Page;
