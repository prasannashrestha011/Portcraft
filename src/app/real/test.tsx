"use client";
import React, { useEffect, useRef, useCallback } from "react";
import grapesjs, { Editor } from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { ref, onValue, set, off } from "firebase/database";
import { realDb } from "@/configs/firebase/firebase";
import { CodeMatcher, PrepareHTML_CSS_Structure } from "@/utilities/matcher";
import { LoadingSpinnerTransparent } from "../clientComponents/LoadingSpinner";
import { debounce } from "lodash";
import { useUserStore } from "@/store/userStore";
import { SavePortFolioData } from "../result/actions";
import { useCodeLoader } from "./actions/codeLoader";

interface EditorProps {
  roomID: string;

  projectRef: string;
}

export default function LiveEditor({ roomID, projectRef }: EditorProps) {
  const editorRef = useRef<Editor | null>(null);
  const editorContainer = useRef<HTMLDivElement>(null);
  const isApplyingRemoteChange = useRef(false);
  const lastLocalChange = useRef<number>(0);
  const userId = useRef<string>(Math.random().toString(36).substring(7));

  const path = React.useMemo(() => projectRef.split("/"), [projectRef]);
  const { fetchedCode, metaData } = useCodeLoader(path);
  const { user } = useUserStore();

  // Fast Firebase sync - no debounce for real-time collaboration
  const syncToFirebase = useCallback(
    (html: string, css: string) => {
      if (isApplyingRemoteChange.current) return;

      const timestamp = Date.now();
      lastLocalChange.current = timestamp;

      const projectFirebaseRef = ref(realDb, `rooms/${roomID}/data`);
      set(projectFirebaseRef, {
        html,
        css,
        updatedAt: timestamp,
        userId: userId.current, // Track who made the change
      });
    },
    [roomID]
  );

  // Slower portfolio save - debounced to avoid excessive API calls
  const saveToPortfolio = useRef(
    debounce(async (html: string, css: string) => {
      if (!user || !metaData) return;

      try {
        const newCode = PrepareHTML_CSS_Structure(html, css);
        await SavePortFolioData(
          newCode,
          user.uid,
          metaData.fileName,
          metaData.ref
        );
      } catch (error) {
        console.error("Portfolio save failed:", error);
      }
    }, 2000) // Only save to portfolio every 2 seconds
  );

  const lastContentHash = useRef<string>("");

  const handleEditorChange = useCallback(() => {
    if (isApplyingRemoteChange.current || !editorRef.current) return;

    const editor = editorRef.current;
    const html = editor.getHtml();
    const css = editor.getCss() || "";

    // Create a hash to detect actual content changes
    const contentHash = `${html}|${css}`;
    if (contentHash === lastContentHash.current) return;

    lastContentHash.current = contentHash;

    // Immediate Firebase sync for real-time collaboration
    syncToFirebase(html, css);

    // Debounced portfolio save
    saveToPortfolio.current(html, css);
  }, [syncToFirebase]);

  useEffect(() => {
    if (!editorContainer.current || editorRef.current || !fetchedCode) return;

    const editor = grapesjs.init({
      container: editorContainer.current,
      height: "100vh",
      storageManager: false,

      undoManager: { trackSelection: false },
    });

    const { extractedHTML, extractedCSS, cssWithoutVariables } =
      CodeMatcher(fetchedCode);

    editor.setComponents(
      `${extractedHTML}<div data-gjs-type="script-placeholder"></div>`
    );
    editor.setStyle(`${extractedCSS}\n${cssWithoutVariables}`);

    editorRef.current = editor;

    // Firebase listener for real-time updates
    const projectFirebaseRef = ref(realDb, `rooms/${roomID}/data`);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleRemoteUpdate = (snapshot: any) => {
      const data = snapshot.val();
      if (!data || !editor) return;

      // Skip if this is our own change or we're already applying
      if (data.userId === userId.current || isApplyingRemoteChange.current) {
        return;
      }

      // Skip very recent local changes to prevent conflicts
      if (Date.now() - lastLocalChange.current < 100) {
        return;
      }

      const currentHtml = editor.getHtml();
      const currentCss = editor.getCss() || "";

      if (data.html !== currentHtml || data.css !== currentCss) {
        isApplyingRemoteChange.current = true;

        // Apply changes immediately for real-time feel
        if (data.html !== currentHtml) editor.setComponents(data.html);
        if (data.css !== currentCss) editor.setStyle(data.css);

        // Update our content hash when applying remote changes
        const remoteContentHash = `${data.html || ""}|${data.css || ""}`;
        lastContentHash.current = remoteContentHash;

        // Quick release of the lock
        setTimeout(() => {
          isApplyingRemoteChange.current = false;
        }, 50);
      }
    };

    onValue(projectFirebaseRef, handleRemoteUpdate);

    // Comprehensive event listeners for all types of changes
    const events = [
      "component:add",
      "component:update",
      "component:remove",
      "style:update",
      "style:property:update",
      "style:property:remove",
      "undo",
      "redo",
      "canvas:spot",
      "change:content",
      "rte:enable",
      "rte:disable", // Rich text editor events
    ];

    events.forEach((event) => {
      editor.on(event, handleEditorChange);
    });

    // Monitor RTE (Rich Text Editor) for text changes
    let rteObserver: MutationObserver | null = null;
    let canvasObserver: MutationObserver | null = null;

    editor.on("rte:enable", () => {
      // When RTE is enabled, monitor for text changes
      setTimeout(() => {
        const rteElement = editor.Canvas.getDocument().querySelector(
          '[contenteditable="true"]'
        );
        if (rteElement && !rteObserver) {
          rteObserver = new MutationObserver(() => {
            handleEditorChange();
          });
          rteObserver.observe(rteElement, {
            childList: true,
            subtree: true,
            characterData: true,
          });
        }
      }, 100);
    });

    editor.on("rte:disable", () => {
      // Clean up RTE observer when disabled
      if (rteObserver) {
        rteObserver.disconnect();
        rteObserver = null;
      }
      handleEditorChange(); // Sync final changes
    });

    // Monitor the entire canvas for any DOM changes
    setTimeout(() => {
      const canvasDoc = editor.Canvas.getDocument();
      const canvasBody = canvasDoc.body;

      if (canvasBody) {
        canvasObserver = new MutationObserver(() => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          clearTimeout((canvasObserver as any).timeout);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (canvasObserver as any).timeout = setTimeout(() => {
            handleEditorChange();
          }, 100);
        });

        canvasObserver.observe(canvasBody, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
        });
      }
    }, 500);

    // Reduced polling interval since we have better detection now
    const pollInterval = setInterval(() => {
      handleEditorChange();
    }, 500); // Reduced from 200ms to 500ms

    // Cleanup
    return () => {
      saveToPortfolio.current.cancel();
      clearInterval(pollInterval);

      // Clean up observers
      if (rteObserver) {
        rteObserver.disconnect();
      }
      if (canvasObserver) {
        canvasObserver.disconnect();
      }

      off(projectFirebaseRef);
      editor?.destroy();
      editorRef.current = null;
    };
  }, [fetchedCode, roomID, handleEditorChange]);

  if (!fetchedCode) {
    return <LoadingSpinnerTransparent />;
  }

  return <div ref={editorContainer} className="h-full" />;
}
