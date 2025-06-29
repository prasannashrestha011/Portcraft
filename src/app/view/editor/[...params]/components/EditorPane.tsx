"use client";
import React, { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { html } from "@codemirror/lang-html";
import { EditorState } from "@codemirror/state";
import { oneDark } from "@codemirror/theme-one-dark";
interface EditorPaneProp {
  fetchedCode: string;
  setNewCode: (newCode: string) => void;
}
const EditorPane: React.FC<EditorPaneProp> = ({ fetchedCode, setNewCode }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>(null);
  useEffect(() => {
    if (editorRef.current) {
      const startState = EditorState.create({
        doc: fetchedCode,
        extensions: [
          basicSetup,
          html(),
          oneDark,
          EditorView.updateListener.of((update) => {
            if (update.docChanged && viewRef.current) {
              const newCode = viewRef.current.state.doc.toString();
              setNewCode(newCode);
            }
          }),
        ],
      });
      viewRef.current = new EditorView({
        state: startState,
        parent: editorRef.current,
      });
    }
    return () => {
      viewRef.current?.destroy();
    };
  }, [fetchedCode]);

  return <div ref={editorRef} className="h-full w-6/12 overflow-y-auto"></div>;
};

export default EditorPane;
