"use client";
import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import { SignOut } from "@/app/login/actions";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { custom_font } from "@/utilities/custom_font";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";

export default function SlideDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserStore();
  return (
    <div className="">
      {/* Demo content */}
      <div className={`max-w-4xl mx-auto  ${custom_font.className}`}>
        <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger
            className="inline-flex items-center gap-2 px-1 py-1 ml-2  text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <Menu size={29} />
          </DrawerTrigger>

          <DrawerContent
            className={`fixed inset-y-0 right-0 z-50 h-full w-[400px] border-l bg-white dark:bg-gray-800 shadow-xl ${custom_font.className}`}
          >
            <div className="flex flex-col h-full">
              <DrawerHeader className="border-b border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <DrawerTitle className=" flex items-center  gap-2 font-semibold text-gray-900 dark:text-white">
                      <Image
                        src={
                          user?.photoURL ||
                          `https://ui-avatars.com/api/?name=${user?.displayName || "User"}&background=random&size=128`
                        }
                        className="rounded-full"
                        alt="User Avatar"
                        width={30}
                        height={30}
                      />
                      <span>{user?.displayName}</span>
                    </DrawerTitle>
                  </div>
                  <DrawerClose asChild>
                    <button
                      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <X
                        size={20}
                        className="text-gray-500 dark:text-gray-400"
                      />
                    </button>
                  </DrawerClose>
                </div>
              </DrawerHeader>

              {/* Drawer content */}
              <div className="flex-1 p-6 overflow-y-auto">
                <nav className="space-y-2 flex flex-col">
                  <Link href={"/create"} passHref>
                    <Button className="px-6 py-2 bg-blue-600 text-white w-full rounded-lg shadow-md hover:shadow-lg hover:bg-blue-700 transition-all duration-200">
                      <span>Create Portfolio</span>
                      <IoAdd size={14} />
                    </Button>
                  </Link>
                  <Link href={"/resume/create"} passHref>
                    <Button className="px-6 py-2 bg-green-500 text-white w-full rounded-lg shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-200">
                      <span>Create Resume</span>
                      <IoAdd size={14} />
                    </Button>
                  </Link>
                </nav>
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                <SignOut />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}
