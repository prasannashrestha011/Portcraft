"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { SavePortFolioData } from "@/app/result/actions";
import { CleanedHTML } from "@/utility/unescapeJsonstring";
import EditorPane from "./components/EditorPane";
import PreviewPane from "./components/PreviewPane";
import { useCodeLoader } from "./components/CodeLoader";
import FooterPane from "./components/FooterPane";
import { FullPageLoadingSpinner } from "@/app/clientComponents/LoadingSpinner";
const ViewPage = () => {
  const param = useParams();
  const { user } = useUserStore();
  const path = param.params as string[];
  //accessing file name from identifier
  const filePath = path[path.length - 1];
  const fileName = path[path.length - 1].split("_")[0];
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { fetchedCode, newCode, setNewCode } = useCodeLoader(path);
  const handleSave = async () => {
    const cleanedHTML = CleanedHTML(newCode);
    if (!user) return;
    const { status } = await SavePortFolioData(
      cleanedHTML,
      user?.uid,
      filePath
    );
    setIsSaved(status);
  };
  useEffect(() => {
    console.log("FILENAME ", fileName);
  }, []);

  if (!path) {
    return <div>No path provided</div>;
  }

  if (!fetchedCode) {
    return FullPageLoadingSpinner();
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900">
      <header className="w-10/12  flex justify-center  sora-regular mt-4 ">
        <span className="w-6/12 text-center">Editor</span>
        <span className="flex-1 text-center">Live preview</span>
      </header>
      <main className=" flex h-10/12 w-10/12 border over border-yellow-400">
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
