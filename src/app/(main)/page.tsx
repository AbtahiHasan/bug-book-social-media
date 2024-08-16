import TrendsSidebar from "@/components/TrendsSidebar";

import dynamic from "next/dynamic";
import ForYouFeed from "./ForYouFeed";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";

import FollowingFeed from "./FollowingFeed";

const PostEditor = dynamic(
  () => import("@/components/posts/editor/PostEditor"),
  { ssr: false, loading: () => <p>Loading....</p> },
);

const Page = () => {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />

        <Tabs defaultValue="for-you">
          <TabsList>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          <TabsContent value="for-you">
            <ForYouFeed />
          </TabsContent>
          <TabsContent value="following">
            <FollowingFeed />
          </TabsContent>
        </Tabs>
      </div>
      <TrendsSidebar />
    </main>
  );
};

export default Page;
