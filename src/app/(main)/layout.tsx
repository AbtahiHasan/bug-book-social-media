import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";
import MenuBar from "./MenuBar";

const Layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const session = await validateRequest();

  if (!session?.user) redirect("/login");
  return (
    <SessionProvider values={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto flex w-full max-w-7xl grow gap-5 p-5">
          <MenuBar className="sticky top-[5.25rem] hidden h-fit flex-none space-y-3 rounded-2xl bg-card px-3 py-5 shadow-sm sm:block lg:px-5 xl:w-80" />
          <div className="w-full">{children}</div>
        </div>
        <MenuBar className="sticky bottom-0 flex justify-center gap-5 border-t bg-card p-3 shadow-sm sm:hidden" />
      </div>
    </SessionProvider>
  );
};

export default Layout;
