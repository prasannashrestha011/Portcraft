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

  const createSession = async (firebaseUser: User) => {
    const token = await getIdToken(firebaseUser, true);
    const userMetaData: UserMetaData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName: firebaseUser.displayName!,
      photoURL: firebaseUser.photoURL!,
      storagePath: `/users/${firebaseUser.uid}`,
    };

    const res = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, userMetaData }),
    });

    if (!res.ok) throw new Error("Session creation failed");

    setUser(firebaseUser);
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await signInWithPopup(auth, googleProvider);
      await createSession(result.user);
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("Sign-in failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle existing auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser && !user) {
        try {
          await createSession(firebaseUser);
        } catch (err) {
          console.error("Auth state error:", err);
          auth.signOut();
        }
      }
    });

    return unsubscribe;
  }, []);

  // Redirect if already logged in

  useEffect(() => {
    if (user && document.cookie.includes("session=")) {
      window.location.href = "/home";
    }
  }, [user]);
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0f0c29] flex items-center justify-center">
        <p className="text-white text-xl">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="sora-regular min-h-screen bg-gradient-to-br from-[#0a0a0f] via-[#1a1a2e] to-[#0f0c29] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
            <SiSnapcraft size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-300">Sign in to continue to your account</p>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-all duration-200 font-medium border border-gray-600 hover:border-gray-500"
          >
            {isLoading ? (
              <>
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
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
  );
};

export default LoginPage;
