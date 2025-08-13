import { useState, useEffect } from "react";
import { FetchCodeFile } from "../../../action";
import { CleanedHTML } from "@/utilities/unescapeJsonstring";
import { PortfolioMeta } from "@/app/types/firestoreTypes";
import { db } from "@/configs/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useCodeLoader(path: string[]) {
  const [fetchedCode, setFetchedCode] = useState<string>("");
  const [newCode, setNewCode] = useState<string>("");
  const [metaData, setMetaData] = useState<PortfolioMeta | null>();
  const [isCodeLoading, setIsCodeLoading] = useState<boolean>(true);
  //file meta data
  const loadMetaData = async () => {
    try {
      const docRef = doc(db, path.join("/"));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as PortfolioMeta;
        setMetaData(data);
      } else {
        setMetaData(null);
      }
    } catch (error) {
      console.error("Error loading portfolio meta:", error);
    }
  };

  //file content

  const loadCodeContent = async () => {
    const pathString = "/" + Array.from(path).join("/");

    setIsCodeLoading(true);
    const codeContent = await FetchCodeFile(pathString);
    const cleanedHTML = CleanedHTML(codeContent);
    setFetchedCode(cleanedHTML);
    setNewCode(cleanedHTML);
    setIsCodeLoading(false);
  };

  useEffect(() => {
    loadMetaData();
    loadCodeContent();
  }, [path]);

  return { metaData, fetchedCode, newCode, setNewCode, isCodeLoading };
}
