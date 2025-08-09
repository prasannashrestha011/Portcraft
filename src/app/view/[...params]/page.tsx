"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FetchPublicCodeFile } from "../action";
import { CleanedHTML } from "@/utility/unescapeJsonstring";
import { LoadingSpinnerTransparent } from "@/app/clientComponents/LoadingSpinner";

const ViewPage = () => {
  const param = useParams();
  const path = param.params as string[];
  const pathString = "/" + Array.from(path).join("/");
  const [code, setCode] = useState<string>("");
  const handleCodeLoad = async () => {
    const fetchedCode = await FetchPublicCodeFile(pathString);
    const cleanedCode = CleanedHTML(fetchedCode);
    setCode(cleanedCode);
  };
  useEffect(() => {
    handleCodeLoad();
  }, [path]);
  if (!path) {
    return <div>No path provided</div>;
  }
  if (!code) {
    return <LoadingSpinnerTransparent text="Loading the page" />;
  }
  return (
    <div className="w-screen h-screen p-4 overflow-auto ">
      <div dangerouslySetInnerHTML={{ __html: code }} />
    </div>
  );
};

export default ViewPage;
