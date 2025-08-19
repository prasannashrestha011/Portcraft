"use client";
import { auth } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { signOut } from "firebase/auth";

export function SignOut() {
  const { setUser } = useUserStore();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      await axios.get(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/session/logout`);
      window.location.href = "/";
      setUser(null);
    } catch (err) {
      console.log("Logout error-> ", err);
    }
  };
  return (
    <button
      className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
      onClick={() => handleLogOut()}
    >
      Sign Out
    </button>
  );
}
