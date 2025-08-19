import Link from "next/link";
import React from "react";
import IndexDrawer from "./Drawers/IndexDrawer";
import { AppLogoMedium } from "@/utilities/app_logo";

export default function Index() {
  const desData = [
    {
      icon: "⚡",
      title: "Instant",
      desc: "Create and share portfolios in seconds",
    },
    { icon: "📦", title: "Simple", desc: "Templating information" },
    {
      icon: "🤖",
      title: "Powered by Gemini",
      desc: "AI-enhanced content",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-gray-900 border border-neutral-800 overflow-hidden">
      {/* Navigation */}
      <nav className="h-16 flex  justify-between items-center px-4 sm:px-6 lg:px-14 text-slate-100 text-sm font-semibold">
        {/* Logo */}
        <div className="md:flex hidden z-50">
          <Link
            href="/"
            className="flex items-center hover:text-white transition-colors"
            passHref
          >
            <AppLogoMedium />
          </Link>
        </div>
        <div className="md:hidden flex items-center z-10">
          <IndexDrawer />
        </div>
        {/* Navigation Links */}
        <div className="md:flex hidden items-center gap-4 sm:gap-6">
          <Link
            href="https://github.com/prasannashrestha011/Portcraft/blob/main/README.md"
            rel="noopener noreferrer"
            target="_blank"
            className="hover:text-white transition-colors touch-manipulation py-2 px-1"
          >
            Documentation
          </Link>
          <Link
            href="#about"
            className="hover:text-white transition-colors touch-manipulation py-2 px-1"
          >
            About
          </Link>
          <Link
            href="/login"
            className="hover:text-white transition-colors touch-manipulation py-2 px-1"
          >
            SignIn/SignUp
          </Link>
        </div>
      </nav>

      {/* Main hero content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 mb-4">
            Portfolio Builder
          </h1>
          <p className="text-base sm:text-lg text-slate-100 max-w-md mb-10 leading-relaxed">
            Build and share your portfolio instantly simple, smart, no fuss.
          </p>
        </div>

        {/* CTA Button */}
        <Link
          className="z-10 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 ease-in-out touch-manipulation text-center min-w-[140px]"
          href="/create"
        >
          Get Started
        </Link>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full max-w-3xl px-4">
          {desData.map((item) => {
            return (
              <div key={item.title} className="text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-slate-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
