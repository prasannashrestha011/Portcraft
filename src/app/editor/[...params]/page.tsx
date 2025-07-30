"use client";

import React, { useEffect, useRef } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { useCodeLoader } from "@/app/view/editor/[...params]/components/CodeLoader";
import { useParams } from "next/navigation";
import { rawCode } from "../rawCode";
import JSZip from "jszip";
import { saveAs } from "file-saver";
const GrapesEditor = () => {
  const editorRef = useRef<Editor | null>(null);
  const editorContainer = useRef<HTMLDivElement>(null);
  const param = useParams();
  const path = param.params as string[];
  const { fetchedCode } = useCodeLoader(path);
  useEffect(() => {
    if (editorContainer.current && !editorRef.current) {
      const cssMatch = fetchedCode.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
      const htmlMatch = fetchedCode.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      const jsMatch = fetchedCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
      const extractedCSS = cssMatch ? cssMatch[1] : "";
      const cssWithoutVariables = extractedCSS
        .replace(/var\(--gradient-start\)/g, "#667eea")
        .replace(/var\(--gradient-end\)/g, "#764ba2")
        .replace(/var\(--text-color\)/g, "white")
        .replace(/var\(--card-bg\)/g, "white")
        .replace(/var\(--shadow-color\)/g, "rgba(0, 0, 0, 0.1)")
        .replace(/var\(--base-spacing\)/g, "16px")
        .replace(/var\(--border-radius\)/g, "10px");
      let extractedHTML = htmlMatch ? htmlMatch[1] : "";
      const extractedJS = jsMatch ? jsMatch[1] : "";

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
      editor.Panels.addButton("options", {
        id: "save-button",
        className: "fa fa-save",
        label: "Save",
        command: "save-command",
        attributes: { title: "Save Project" },
      });
      editor.Commands.add("save-command", {
        run() {
          alert("Code saved inside GrapesJS!");
        },
      });

      editor.setComponents(`
  ${extractedHTML}
  <div data-gjs-type="script-placeholder"></div>
`);
      editor.setStyle(extractedCSS);
      editor.setStyle(cssWithoutVariables);

      editor.Commands.add("download-zip-command", {
        run() {
          const indexHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Downloaded Project</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  ${extractedHTML}
  <script src="script.js"></script>
</body>
</html>`;

          const zip = new JSZip();
          zip.file("index.html", indexHtmlContent);
          zip.file("styles.css", extractedCSS);
          zip.file("script.js", extractedJS);

          zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "project.zip");
          });
        },
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
  }, [rawCode]);

  return <div ref={editorContainer} />;
};

export default GrapesEditor;
