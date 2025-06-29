"use client";
import { auth } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import CodeLists from "./CodeLists";
import { SignOut } from "../login/actions";
import { FullPageLoadingSpinner } from "../clientComponents/LoadingSpinner";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";

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
          <img src={`${user?.photoURL}`} className="w-6 rounded-full " />
          <span className="sora-regular text-sm">{user?.displayName}</span>

          <SignOut auth={auth} />
        </section>
        <section className="flex justify-end items-center mr-8">
          <Link href={"/create"} passHref>
            <button className="bg-blue-500 hover:bg-blue-800 flex gap-2 justify-center items-center px-2 py-1 rounded-md">
              <IoAdd />
              <span>Create</span>
            </button>
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
