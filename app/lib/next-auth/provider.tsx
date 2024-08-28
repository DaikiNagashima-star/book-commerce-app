"use client";

import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

// Use this component to wrap your app with SessionProvider
export const NextAuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};