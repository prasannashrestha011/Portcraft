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
import { Button } from "@/components/ui/button";

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
    return <LoadingSpinnerTransparent />;
  }
  return (
    <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800  h-svh overflow-hidden ">
      <nav className="flex gap-3 justify-between items-center pt-2 mr-1 border-b border-gray-700 pb-2">
        <section className="flex gap-2 justify-center items-center">
          {user && (
            <HomeMenu username={user.displayName!} photoURL={user.photoURL!} />
          )}
        </section>
        <section className="flex justify-end items-center gap-2 mr-8">
          <Link href={"/create"} passHref>
            <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-200">
              <span>Create Portfolio</span>
              <IoAdd size={14} />
            </Button>
          </Link>
          <Link href={"/resume/create"} passHref>
            <Button className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-200">
              <span>Create Resume</span>
              <IoAdd size={14} />
            </Button>
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
