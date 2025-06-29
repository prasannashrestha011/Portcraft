import { useState, useEffect } from "react";
import { FetchCodeFile } from "../../../action";
import { CleanedHTML } from "@/utility/unescapeJsonstring";

export function useCodeLoader(path: string[]) {
  const [fetchedCode, setFetchedCode] = useState<string>("");
  const [newCode, setNewCode] = useState<string>("");

  const loadCodeContent = async () => {
    const pathString = "/" + Array.from(path).join("/");
    const codeContent = await FetchCodeFile(pathString);
    const cleanedHTML = CleanedHTML(codeContent);
    setFetchedCode(cleanedHTML);
    setNewCode(cleanedHTML);
  };

  useEffect(() => {
    loadCodeContent();
  }, [path]);

  return { fetchedCode, newCode, setNewCode };
}
