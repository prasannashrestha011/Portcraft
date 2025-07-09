"use client";
import { auth } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import CodeLists from "./CodeLists";
import { FullPageLoadingSpinner } from "../clientComponents/LoadingSpinner";
import { IoAdd } from "react-icons/io5";

import { BezelButton } from "@shadeui/ui";
import Link from "next/link";
import { HomeMenu } from "../clientComponents/Menu/HomeMenu";

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
    <div className="bg-[#121212]">
      <nav className="flex gap-3 justify-between items-center pt-2 mr-1 border-b border-gray-700 pb-2">
        <section className="flex gap-2 justify-center items-center">
          {user && (
            <HomeMenu username={user.displayName!} photoURL={user.photoURL!} />
          )}
        </section>
        <section className="flex justify-end items-center mr-8">
          <Link href={"/create"} passHref>
            <BezelButton
              color="blue"
              label="Create"
              size="md"
              leftIcon={<IoAdd />}
            />
          </Link>
        </section>
      </nav>
      <main>
        <CodeLists />
      </main>
    </div>
  );
};
export default HomePage;
