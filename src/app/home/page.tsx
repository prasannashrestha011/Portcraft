"use client";
import { auth } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import CodeLists from "./CodeLists";
import { LoadingSpinnerTransparent } from "../clientComponents/LoadingSpinner";
import { IoAdd } from "react-icons/io5";

import Link from "next/link";
import { HomeMenu } from "../clientComponents/Menu/HomeMenu";
import { BezelButton } from "../clientComponents/Buttons/Bezel";

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

  return (
    <div className="bg-[#121212] h-svh overflow-hidden ">
      <nav className="flex gap-3 justify-between items-center pt-2 mr-1 border-b border-gray-700 pb-2">
        <section className="flex gap-2 justify-center items-center">
          {user && (
            <HomeMenu username={user.displayName!} photoURL={user.photoURL!} />
          )}
        </section>
        <section className="flex justify-end items-center mr-8">
          <Link href={"/create"} passHref>
            <BezelButton>
              <span>Create Portfolio</span>
              <IoAdd size={14} />
            </BezelButton>
          </Link>
          <Link href={"/resume/create"} passHref>
            <BezelButton>
              <span>Create Resume</span>
              <IoAdd size={14} />
            </BezelButton>
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
