"use client";

import React from "react";

export default function GithubLoginButton() {
  const handleLogin = () => {
    // This calls your backend that redirects to GitHub OAuth page
    window.location.href = "/api/github/login";
  };

  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-gray-800 text-white rounded"
    >
      Connect with GitHub
    </button>
  );
}
