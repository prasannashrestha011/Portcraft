"use client";
import { auth } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import CodeLists from "./CodeLists";
import { SignOut } from "../login/actions";
import { FullPageLoadingSpinner } from "../clientComponents/LoadingSpinner";

const HomePage = () => {
  const { user, setUser } = useUserStore();
  useEffect(() => {
    auth.currentUser?.reload().then(() => {
      const refreshedUser = auth.currentUser;
      if (refreshedUser) {
        setUser(refreshedUser as User);
      }
    });
  }, [user, setUser]);
  if (!user) {
    return FullPageLoadingSpinner();
  }
  return (
    <div>
      <nav className="flex gap-3 justify-end items-center mt-2 mr-1">
        <img src={`${user?.photoURL}`} className="w-8 rounded-full " />
        <span className="sora-regular">{user?.displayName}</span>
        <SignOut auth={auth} />
      </nav>
      <main>
        <CodeLists />
      </main>
    </div>
  );
};
export default HomePage;
