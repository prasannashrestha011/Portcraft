"use client";
import { auth, googleProvider } from "@/configs/firebase/firebase";
import { useUserStore } from "@/store/userStore";
import {
  getIdToken,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserMetaData } from "./type";
import { FcGoogle } from "react-icons/fc";
import { SiSnapcraft } from "react-icons/si";

const LoginPage = () => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUserSession = async (user: User) => {
    try {
      setIsLoading(true);
      setError("");

      const token = await getIdToken(user, true);
      const userMetaData: UserMetaData = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName!,
        photoURL: user.photoURL!,
        storagePath: `/users/${user.uid}`,
      };

      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, userMetaData }),
      });

      if (!res.ok) {
        throw new Error("Failed to create session");
      }
      console.log(user);
      setUser(user);
    } catch (err) {
      console.error("Session error:", err);
      setError("Failed to sign in. Please try again.");
      await auth.signOut();
    } finally {
      setIsLoading(false);
      try {
        router.push("/home");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      await handleUserSession(result.user);
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Google sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !isLoading) {
        await handleUserSession(user);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("redirecting......");
    }
  }, [user]);

  return (
    <div className="sora-regular">
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0f0c29] flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
              <SiSnapcraft size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-300">Sign in to continue to your account</p>
          </div>

          {/* Main Content */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-2xl">
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}
            <div className="text-center">
              <div className="space-y-6">
                <button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-3 ${
                    isLoading
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-gray-800 hover:bg-gray-700"
                  } text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium border ${
                    isLoading
                      ? "border-gray-700"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <FcGoogle size={20} />
                      Sign In with Google
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
