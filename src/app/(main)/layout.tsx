import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import SessionProvider from "./SessionProvider";

const Layout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const session = await validateRequest();

  if (!session?.user) redirect("/login");
  return <SessionProvider values={session}>{children}</SessionProvider>;
};

export default Layout;
