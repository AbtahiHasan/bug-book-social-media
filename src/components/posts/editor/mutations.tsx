"use client";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useToast } from "../../ui/use-toast";
import { createPost } from "./actions";
import { IPostPage } from "@/lib/types";
import { useSession } from "@/app/(main)/SessionProvider";

export const useSubmitPostMutation = () => {
  const { user } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: async (newPost) => {
      const queryFilter = {
        queryKey: ["post-feed"],
        predicate(query) {
          return (
            query.queryKey.includes("for-you") ||
            (query.queryKey.includes("user-posts") &&
              query.queryKey.includes(user.id))
          );
        },
      } satisfies QueryFilters;
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<IPostPage, string | null>>(
        queryFilter,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (firstPage) {
            return {
              pageParams: oldData.pageParams,
              pages: [
                {
                  posts: [newPost, ...firstPage.posts],
                  nextCursor: firstPage.nextCursor,
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        },
      );

      queryClient.invalidateQueries({
        queryKey: queryFilter.queryKey,
        predicate(query) {
          return queryFilter.predicate(query) && !query?.state?.data;
        },
      });

      toast({
        description: "Post created",
      });
    },
    onError: (err) => {
      console.error(err);
      toast({
        description: "Failed to post, try again",
        variant: "destructive",
      });
    },
  });

  return mutation;
};
