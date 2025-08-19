"use client";
import { auth } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import { User } from "firebase/auth";
import React, { useEffect } from "react";
import CodeLists from "./CodeLists";
import { LoadingSpinnerTransparent } from "../clientComponents/LoadingSpinner";

import { HomeMenu } from "../clientComponents/Menu/HomeMenu";
import SlideDrawer from "../clientComponents/Drawers/HomeDrawer";
import Create_Links from "../clientComponents/HyperLinks/Create_Links";
import { custom_font } from "@/utilities/custom_font";

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
    <div
      className={`bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800  h-svh overflow-hidden ${custom_font.className}`}
    >
      <nav className="flex gap-3 justify-between items-center pt-2 mr-1 border-b border-gray-700 pb-2">
        <section className="md:flex hidden gap-2 justify-center  items-center">
          {user && (
            <HomeMenu username={user.displayName!} photoURL={user.photoURL!} />
          )}
        </section>
        <section className="md:hidden flex">
          <SlideDrawer />
        </section>

        <div className="absolute left-1/2 transform -translate-x-1/2 font-bold text-white text-2xl">
          Portcraft
        </div>
        <section className="md:flex hidden justify-end items-center gap-2 mr-8">
          <Create_Links />
        </section>
      </nav>
      <main>
        <CodeLists />
      </main>
    </div>
  );
};
export default HomePage;
