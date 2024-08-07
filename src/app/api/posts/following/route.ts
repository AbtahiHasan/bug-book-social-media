import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { IPostPage, getPostDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;
    const { user } = await validateRequest();
    if (!user)
      return Response.json({ error: "Something went wrong" }, { status: 500 });

    const posts = await prisma.post.findMany({
      where: {
        user: {
          followers: {
            some: {
              followerId: user.id,
            },
          },
        },
      },
      include: getPostDataInclude(user.id),
      orderBy: {
        createAt: "desc",
      },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data: IPostPage = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" }, { status: 500 });
  }
};
