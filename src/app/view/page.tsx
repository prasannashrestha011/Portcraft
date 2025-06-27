"use client";
import { useResultStore } from "@/store/resultStore";
import Link from "next/link";
import React from "react";

const ViewPage = () => {
  const { resultHTML } = useResultStore();
  const cleanedHTML = resultHTML
    .replace(/^```[a-zA-Z]*\n?/, "") // remove starting ```
    .replace(/```$/, "");
  return (
    <div className="bg-blue-800 h-svh sora-regular">
      <header className="flex  flex-col justify-center items-center pt-3">
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
      </main>
    </div>
  );
};

export default ViewPage;
