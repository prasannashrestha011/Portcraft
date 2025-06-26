"use client";
import { useResultStore } from "@/store/resultStore";
import { useUserStore } from "@/store/userStore";
import axios from "axios";
import Link from "next/link";
import React from "react";

const ResultPage = () => {
  const rawHTML = useResultStore((state) => state.resultHTML);
  const { user } = useUserStore();
  const cleanedHTML = rawHTML
    .replace(/^```[a-zA-Z]*\n?/, "") // remove starting ```
    .replace(/```$/, "");
  const uploadHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("fileName", "portfolio.txt");
      formData.append(
        "file",
        new Blob([cleanedHTML], { type: "text/plain" }),
        "portfolio.html"
      );
      const userID = user?.uid;
      const response = await axios.post(
        `http://localhost:3000/api/storage?userID=${userID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
      return;
    }
  };
  return (
    <div className="bg-blue-800 h-svh sora-regular">
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
        <button
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-2xl cursor-pointer"
          onClick={() => uploadHandler()}
        >
          Save
        </button>
      </main>
    </div>
  );
};

export default ResultPage;
