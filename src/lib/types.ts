import { Prisma } from "@prisma/client";

export const getUserDataSelect = (loggedInUserId: string) => {
  return {
    id: true,
    username: true,
    avatarUrl: true,
    displayName: true,
    bio: true,
    createAt: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
};

export type TUser = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export const getPostDataInclude = (loggedInUserId: string) => {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
  } satisfies Prisma.PostInclude;
};

export type TPost = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface IPostPage {
  posts: TPost[];
  nextCursor: string | null;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}
