"use client";

import React, { useEffect, useRef } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { ref, onValue, set } from "firebase/database";
import { realDb } from "@/configs/firebase/firebase";
import DemoCodeLoader from "./code";
import { CodeMatcher } from "@/utilities/matcher";

const projectId = "demo-project"; // Could be dynamic

export default function GrapesEditor() {
  const editorRef = useRef<Editor | null>(null);
  const editorContainer = useRef<HTMLDivElement>(null);
  const isApplyingRemoteChange = useRef(false);
  const fetchedCode = DemoCodeLoader();
  useEffect(() => {
    if (!editorContainer.current || editorRef.current) return;

    const editor = grapesjs.init({
      container: editorContainer.current,
      height: "100vh",
      storageManager: false,
    });
    const {
      extractedHTML: initialExtractedHTML,
      extractedCSS,
      cssWithoutVariables,
    } = CodeMatcher(fetchedCode);
    editor.setComponents(`
  ${initialExtractedHTML}
  <div data-gjs-type="script-placeholder"></div>
      `);
    editor.setStyle(extractedCSS);
    editor.setStyle(cssWithoutVariables);
    // Listen for DB changes
    const projectRef = ref(realDb, `projects/${projectId}`);
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      if (data && !isApplyingRemoteChange.current) {
        isApplyingRemoteChange.current = true;
        editor.setComponents(data.html || "");
        editor.setStyle(data.css || "");
        setTimeout(() => (isApplyingRemoteChange.current = false), 100);
      }
    });

    // Push changes to DB
    const saveToDB = () => {
      if (isApplyingRemoteChange.current) return;
      set(projectRef, {
        html: editor.getHtml(),
        css: editor.getCss(),
        updatedAt: Date.now(),
      });
    };

    // GrapesJS change events
    editor.on(
      "component:add component:update component:remove style:update",
      saveToDB
    );
    editor.on("style:change", () => {
      // style is the changed style property name, e.g. "opacity"
      // component is the component being styled
      saveToDB();
    });

    editorRef.current = editor;
  }, []);

  return <div ref={editorContainer} className="h-full" />;
}
