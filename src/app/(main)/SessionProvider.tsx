"use client";

import { Session, User } from "lucia";
import { createContext, PropsWithChildren, useContext } from "react";

interface SessionContext {
  user: User;
  session: Session;
}

const SessionContext = createContext<SessionContext | null>(null);

const SessionProvider = ({
  children,
  values,
}: PropsWithChildren<{ values: SessionContext }>) => {
  return (
    <SessionContext.Provider value={values}>{children}</SessionContext.Provider>
  );
};

export default SessionProvider;

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context)
    throw new Error("use Session must be used within a SessionProvider");
  return context;
};
