"use server";
import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getPostDataInclude } from "@/lib/types";

export const deletePost = async (id: string) => {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const post = await prisma.post.findUnique({ where: { id } });

  if (!post) throw new Error("Post not found");

  if (post.userId !== user.id) throw new Error("Unauthorized");

  const deleteUser = await prisma.post.delete({
    where: { id },
    include: getPostDataInclude(user.id),
  });
  return deleteUser;
};