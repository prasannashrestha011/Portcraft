"use client";
import React from "react";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
const AuthProvider = ({ session, children }: SessionProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
