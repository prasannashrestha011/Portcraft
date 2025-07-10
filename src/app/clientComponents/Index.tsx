import Link from "next/link";
import React from "react";
import { SiSnapcraft } from "react-icons/si";
export const Index = () => {
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
    <div className="relative h-screen w-full border border-neutral-800 overflow-hidden">
      {/* Navigation */}
      <nav className="h-12 flex flex-wrap justify-end gap-4 items-center px-6 sm:px-14 Lexend-Regular text-slate-100 text-sm font-semibold">
        <Link href="home">
          <SiSnapcraft size={18} />
        </Link>
        <Link href="#docs">Documentation</Link>
        <Link href="#about">About</Link>
      </nav>

      {/* Main hero content */}
      <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)]">
        <span className="flex flex-col Lexend-Bold text-4xl text-center">
          <span className=" sora-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
            Portfolio Builder
          </span>
          <span className="text-base w-92 text-slate-100 mt-4 max-w-md">
            Build and share your portfolio instantly simple, smart, no fuss.
          </span>
        </span>

        {/* CTA Button */}
        <Link
          className=" z-10 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-indigo-500/30 transition-shadow duration-300 ease-in-out mt-10"
          href={"/create"}
        >
          Get Started
        </Link>
        {/* Features grid */}
        <div className="flex justify-center gap-8 mt-16 flex-wrap">
          {desData.map((item) => {
            return (
              <div key={item.title} className="text-center max-w-xs">
                <div className="text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-slate-100">{item.title}</h3>
                <p className="text-sm text-slate-400 w-3xs">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
