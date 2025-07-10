"use client";
import React from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import {
  windowNavGoBack,
  windowNavHome,
} from "./clientComponents/WindowNavigators";

const PageNotFound = () => {
  return (
    <div className="sora-regular min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-purple-400 mb-4">404</h1>
          <div className="w-24 h-1 bg-purple-400 mx-auto mb-8"></div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-white mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            The page you&#39;re looking for doesn&#39;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={windowNavHome}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            <Home size={20} />
            Go Home
          </button>

          <button
            onClick={windowNavGoBack}
            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-gray-400">
          <Search size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-sm">
            Need help? Try checking the URL or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
