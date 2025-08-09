"use client";
import { auth } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
export function SignOut() {
  const nav = useRouter();
  const { setUser } = useUserStore();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      await axios.get(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/session/logout`);
      nav.replace("/");
      setUser(null);
    } catch (err) {
      console.log("Logout error-> ", err);
    }
  };
  return (
    <button
      className="group flex w-full items-center gap-2 rounded-lg
      font-light bg-red-700 hover:bg-red-900 px-3 py-1.5 data-focus:bg-white/10"
      onClick={() => handleLogOut()}
    >
      Logout
    </button>
  );
}
