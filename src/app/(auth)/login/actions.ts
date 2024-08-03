"use server";

import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { loginSchema, LoginValues } from "@/lib/validation";
import { isRedirectError } from "next/dist/client/components/redirect";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export async function login(
  credentials: LoginValues,
): Promise<{ error: string }> {
  try {
    const { username, password } = loginSchema.parse(credentials);

    const userExits = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!userExits || !userExits?.password) {
      return {
        error: "incorrect username and password",
      };
    }

    const validPassword = verify(userExits.password, password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });

    if (!validPassword) {
      return {
        error: "incorrect username and password",
      };
    }

    const session = await lucia.createSession(userExits.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) throw error;
    return {
      error: "something went wrong, please try again",
    };
  }
}
