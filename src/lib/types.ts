import { Prisma } from "@prisma/client";

export const userDataSelect = {
  username: true,
  avatarUrl: true,
  displayName: true,
} satisfies Prisma.UserSelect;

export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.PostInclude;

export type TPost = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;

export interface IPostPage {
  posts: TPost[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}
