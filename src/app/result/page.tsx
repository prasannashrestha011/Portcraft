"use client";
import { useResultStore } from "@/store/resultStore";
import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { useEffect, useState } from "react";
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
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-100 mb-2">
            Page not found
          </h2>
          <p className="text-gray-400">
            The requested content could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 sora-regular">
      {user && (
        <nav className="flex justify-end items-center gap-3 p-6">
          <div className="flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-700">
            {user.photoURL && (
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={user?.photoURL || "/placeholder.svg"}
                alt="Profile"
              />
            )}
            <span className="text-gray-200 font-medium text-sm">
              {user.displayName}
            </span>
          </div>
        </nav>
      )}

      <header className="text-center px-6 pt-8 pb-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4 leading-tight">
            Your Portfolio is
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Ready to Shine
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            Take a moment to review your creation, then share it with the world
          </p>
        </div>
      </header>

      <main className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Portfolio Preview */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-gray-100">
                Portfolio Preview
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                See how your portfolio looks
              </p>
            </div>
            <div className="p-6">
              <iframe
                srcDoc={cleanedHTML}
                className="w-full h-96 md:h-[500px] rounded-lg border border-gray-600 shadow-lg"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={"/result/user"}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View Full Page
            </Link>

            <div className="flex items-center gap-3">
              {!isLoading && isSaved && (
                <span className="inline-flex items-center gap-2 text-green-400 font-medium">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Saved Successfully
                </span>
              )}

              {isLoading ? (
                <div className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600">
                  <LoadingSpinner />
                  <span>Saving...</span>
                </div>
              ) : (
                <button
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 font-medium rounded-lg border border-gray-600 hover:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm"
                  onClick={uploadHandler}
                >
                  Save Portfolio
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {showAuthModel && (
        <SignInModel open={showAuthModel} setOpen={setShowAuthModel} />
      )}
    </div>
  );
};

export default ResultPage;
