"use client";

import React, { useEffect, useRef, useState } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { useCodeLoader } from "@/app/view/editor/[...params]/components/CodeLoader";
import { useParams } from "next/navigation";

import { CodeMatcher, PrepareHTML_CSS_Structure } from "@/utility/matcher";
import { PrepareZipDownload } from "../actions/prepareZipDownload";
import { SavePortFolioData } from "@/app/result/actions";
import { useUserStore } from "@/store/userStore";
import { toast } from "react-toastify";
import { LoadingSpinnerTransparent } from "@/app/clientComponents/LoadingSpinner";

const GrapesEditor = () => {
  const editorRef = useRef<Editor | null>(null);
  const editorContainer = useRef<HTMLDivElement>(null);
  const param = useParams();
  const path = param.params as string[];
  const filePath = path[path.length - 1];
  const { fetchedCode, metaData } = useCodeLoader(path);
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSave = async (newCode: string) => {
    if (!user) return;
    setIsLoading(true);
    const { status } = await SavePortFolioData(
      newCode,
      user?.uid,
      filePath,
      metaData?.fileName
    );
    if (status) {
      toast.success("File saved");
    } else {
      toast.error("Failed to save the file");
    }
    setIsLoading(false);
  };
  const editorHandler = () => {
    if (editorContainer.current && !editorRef.current && fetchedCode) {
      const {
        extractedHTML: initialExtractedHTML,
        extractedCSS,
        cssWithoutVariables,
        extractedJS,
      } = CodeMatcher(fetchedCode);
      let extractedHTML = initialExtractedHTML;
      if (extractedJS.trim()) {
        extractedHTML += `<script>${extractedJS}</script>`;
      }
      const editor = grapesjs.init({
        container: editorContainer.current,
        fromElement: false,
        height: "100vh",
        width: "auto",
        storageManager: false,
        plugins: [],
        panels: {},
      });

      editor.setComponents(`
  ${extractedHTML}
  <div data-gjs-type="script-placeholder"></div>
      `);
      editor.setStyle(extractedCSS);
      editor.setStyle(cssWithoutVariables);

      editor.Commands.add("save-command", {
        run() {
          const updatedHTML = editor.getHtml();
          const updatedCSS = editor.getCss()!;

          const newCode = PrepareHTML_CSS_Structure(updatedHTML, updatedCSS);
          handleSave(newCode);
        },
      });
      editor.Commands.add("download-zip-command", {
        run() {
          const updatedHTML = editor.getHtml();
          const updatedCSS = editor.getCss()!;
          PrepareZipDownload(updatedHTML, updatedCSS, extractedJS);
        },
      });
      editor.Panels.addButton("options", {
        id: "save-button",
        className: "fa fa-save",
        label: "Save",
        command: "save-command",
        attributes: { title: "Save Project" },
      });
      editor.Panels.addButton("options", {
        id: "download-zip-button",
        className: "fa fa-download",
        label: "Download ZIP",
        command: "download-zip-command",
        attributes: { title: "Download Project ZIP" },
      });
      editorRef.current = editor;
    }
  };
  useEffect(() => {
    editorHandler();
  }, [fetchedCode]);
  if (!fetchedCode) {
    return <LoadingSpinnerTransparent />;
  }
  return (
    <div className="relative h-screen">
      {/* GrapesJS editor */}
      <div ref={editorContainer} className="h-full" />

      {isLoading && <LoadingSpinnerTransparent />}
    </div>
  );
};

export default GrapesEditor;
