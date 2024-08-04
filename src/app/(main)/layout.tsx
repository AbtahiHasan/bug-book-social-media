import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "./SessionProvider";
import Navbar from "./Navbar";

const Layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const session = await validateRequest();

  if (!session?.user) redirect("/login");
  return (
    <SessionProvider values={session}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="mx-auto max-w-7xl p-5">{children}</div>
      </div>
    </SessionProvider>
  );
};

export default Layout;
