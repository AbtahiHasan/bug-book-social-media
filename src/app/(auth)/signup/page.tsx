import Image from "next/image";
import React from "react";
import signUpImage from "@/assets/signup-image.jpg";

const Page = () => {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-2xl shadow-xl">
        <div className="w-full space-y-10 md:w-1/2">
          <div className="space-y-1 p-10 text-center">
            <h1 className="text-3xl font-bold">Sign up to bugbook</h1>
            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span>can find
              friend
            </p>
          </div>
        </div>
        <div className="hidden w-1/2 overflow-hidden md:block">
          <Image
            src={signUpImage}
            className="h-full w-full object-cover"
            alt="sign up image"
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
