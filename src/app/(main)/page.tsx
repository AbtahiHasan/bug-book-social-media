import Post from "@/components/posts/Post";
import TrendsSidebar from "@/components/TrendsSidebar";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/types";
import dynamic from "next/dynamic";
import ForYouFeed from "./ForYouFeed";

const PostEditor = dynamic(
  () => import("@/components/posts/editor/PostEditor"),
  { ssr: false, loading: () => <p>Loading...</p> },
);

const Page = () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default Page;
