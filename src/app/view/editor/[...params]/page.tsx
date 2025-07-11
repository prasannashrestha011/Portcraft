"use client";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useUserStore } from "@/store/userStore";
import { SavePortFolioData } from "@/app/result/actions";
import { CleanedHTML } from "@/utility/unescapeJsonstring";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";
import { useCodeLoader } from "./components/CodeLoader";
import FooterPane from "./components/FooterPane";
import { FullPageLoadingSpinner } from "@/app/clientComponents/LoadingSpinner";
import { SiSnapcraft } from "react-icons/si";
import { IoIosWarning } from "react-icons/io";
import FileRenameInterface from "./components/RenameInterface";
import Link from "next/link";
const ViewPage = () => {
  const param = useParams();
  const { user } = useUserStore();
  const path = param.params as string[];
  //accessing file name from identifier
  const filePath = path[path.length - 1];
  const [fileName, setFileName] = useState<string>("");

  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { fetchedCode, newCode, setNewCode } = useCodeLoader(path);
  const handleSave = async () => {
    console.log("CALLING API");
    const cleanedHTML = CleanedHTML(newCode);
    if (!user || !fileName) {
      console.log("No user or fileName ");
      return;
    }
    const { status } = await SavePortFolioData(
      cleanedHTML,
      user?.uid,
      filePath,
      fileName,
    );
    setIsSaved(status);
  };

  if (!path) {
    return <div>No path provided</div>;
  }

  if (!fetchedCode) {
    return FullPageLoadingSpinner();
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <Link href={"/home"}>
        <SiSnapcraft className="absolute left-5 md:top-1 top-10 md:text-4xl text-xl" />
      </Link>
      <p className="w-full md:hidden relative flex items-center justify-center  bg-gradient-to-r from-amber-400 to-orange-500 border-l-4 border-orange-600 shadow-lg">
        <IoIosWarning size={19} />
        <span className="text-white">
          Please use a desktop for the best experience.
        </span>
      </p>
      <header className="w-full flex flex-col items-center justify-center ">
        <FileRenameInterface
          filePath={path.join("/")}
          fileName={fileName}
          setFileName={setFileName}
        />
        <div className="w-10/12  flex justify-center  sora-regular mt-4 ">
          <span className="w-6/12 text-center">Editor</span>
          <Link href={`/view/${path.join("/")}`} className="flex-1 text-center">
            Live preview
          </Link>
        </div>
      </header>
      <main className=" flex md:flex-row flex-col min-h-screen  h-screen w-10/12 border over border-yellow-400">
        <EditorPane fetchedCode={fetchedCode} setNewCode={setNewCode} />
        <PreviewPane code={newCode} />
      </main>
      <footer className="w-10/12  flex justify-end gap-2 sora-regular mt-4">
        <FooterPane newCode={newCode} action={handleSave} isSaved={isSaved} />
      </footer>
    </div>
  );
};

export default ViewPage;
