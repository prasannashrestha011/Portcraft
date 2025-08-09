"use client";
import { useResultStore } from "@/store/resultStore";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SavePortFolioData } from "./actions";
import SignInModel from "../clientComponents/Models/SignInModel";
import LoadingSpinner from "../clientComponents/LoadingSpinner";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ResultPage = () => {
  const router = useRouter();
  const rawHTML = useResultStore((state) => state.resultHTML);
  const { user } = useUserStore();
  const [showAuthModel, setShowAuthModel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [pendingSave, setPendingSave] = useState<boolean>(false);
  const notify = () => toast("File has been saved", { theme: "dark" });
  const cleanedHTML = rawHTML
    .replace(/^```[a-zA-Z]*\n?/, "") // remove starting ```
    .replace(/```$/, "");
  useEffect(() => {
    if (user && pendingSave) {
      uploadHandler();
    }
  }, [user]);
  const uploadHandler = async () => {
    if (!user) {
      setShowAuthModel(true);
      setPendingSave(true);
      return;
    }
    setShowAuthModel(false);
    setIsLoading(true);
    const { status } = await SavePortFolioData(cleanedHTML, user?.uid);
    setIsSaved(status);
    setIsLoading(false);

    notify();
    router.replace("/home");
  };

  if (!rawHTML) {
    return <div>Page not found</div>;
  }
  return (
    <div className="bg-blue-800 h-svh sora-regular">
      {user && (
        <nav className=" flex justify-end gap-2 items-center pt-2">
          <span>
            {user.photoURL && (
              <img className="w-9 rounded-full" src={user?.photoURL} />
            )}
          </span>
          <span>{user.displayName}</span>
        </nav>
      )}
      <header className="flex  flex-col justify-center items-center pt-3">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
          <span role="img" aria-label="confetti">
            🎉
          </span>
          Congratulations!
          <span role="img" aria-label="confetti">
            🎉
          </span>
        </h1>
        <p className="text-lg  w-fit mx-auto  md:text-xl">
          You&apos;ve successfully created your portfolio!
        </p>
      </header>
      <main className=" w-full flex flex-col justify-center items-center h-8/12  ">
        <iframe
          srcDoc={cleanedHTML}
          className="rounded-2xl md:w-6/12 h-9/12"
          sandbox="allow-scripts allow-same-origin"
        />
        <Link
          href={"/result/user"}
          className="mt-4 bg-green-600 hover:bg-green-800 transition-colors duration-100 ease-in-out p-3 rounded-md "
        >
          View the full page
        </Link>
        <div className="mt-5">
          {!isLoading && isSaved && <span>Saved</span>}

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <button
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-2xl cursor-pointer"
              onClick={uploadHandler}
            >
              Save
            </button>
          )}
        </div>
        {showAuthModel && (
          <SignInModel open={showAuthModel} setOpen={setShowAuthModel} />
        )}
      </main>
    </div>
  );
};

export default ResultPage;
