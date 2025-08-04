"use client";
import { auth, googleProvider } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import { getIdToken, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { UserMetaData } from "./type";
import { FcGoogle } from "react-icons/fc";
import { SiSnapcraft } from "react-icons/si";
const LoginPage = () => {
  const { user, setUser } = useUserStore();
  const router = useRouter();
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        setUser(result.user);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      setUser(user);
      const token = await getIdToken(user, true);
      const userMetaData: UserMetaData = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName!,
        photoURL: user.photoURL!,
        storagePath: `/users/${user.uid}`,
      };
      await fetch("/api/session", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ token, userMetaData }),
      });
    });
    return () => unsubscribe();
  }, [router, setUser]);
  useEffect(() => {
    if (user) {
      router.replace("/home");
      console.log("redirec to home page");
    }
  }, [user, router]);
  return (
    <div className="sora-regular">
      {user ? (
        <span>Redirecting to the home page..</span>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0f0c29]  flex items-center justify-center px-4">
          <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                <SiSnapcraft size={32} />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-300">
                Sign in to continue to your account
              </p>
            </div>

            {/* Main Content */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-2xl">
              <div className="text-center">
                <div className="space-y-6">
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium border border-gray-600 hover:border-gray-500"
                  >
                    <FcGoogle size={32} />
                    Sign In with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
