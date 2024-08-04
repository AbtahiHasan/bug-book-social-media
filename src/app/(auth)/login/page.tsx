import React from "react";
import LoginFrom from "./LoginFrom";
import Link from "next/link";
import Image from "next/image";
import loginImage from "@/assets/login-image.jpg";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl shadow-xl">
        <div className="w-full space-y-10 p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Login to bugbook</h1>
            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span> can find
              friend
            </p>
          </div>
          <LoginFrom />
          <Link href="login">
            <p className="text-center text-muted-foreground">
              Don&apos;t have an account? Sign up
            </p>
          </Link>
        </div>
        <div className="hidden w-1/2 overflow-hidden md:block">
          <Image
            src={loginImage}
            className="h-full w-full object-cover"
            alt="login image"
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
