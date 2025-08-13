import React, { useEffect, useState } from "react";
import { Edit2, Check, X } from "lucide-react";
import { KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  fetchFileMetaData,
  reNameFile,
} from "@/configs/firebase/actions/ClientActions";
interface prop {
  filePath: string;
  fileName: string;
  setFileName: (fileName: string) => void;
}
const FileRenameInterface = ({ filePath, fileName, setFileName }: prop) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const handleFetch = async () => {
    if (!filePath) return;
    const data = await fetchFileMetaData(filePath);
    if (data == null) return;
    console.log(data);
    setFileName(data.fileName);
  };
  const handleStartEdit = () => {
    setIsEditing(true);
    setNewFileName(fileName);
  };

  const handleSave = async () => {
    if (newFileName.trim()) {
      console.log(newFileName);
      await reNameFile(filePath, newFileName);
      setFileName(newFileName.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewFileName(fileName);
  };

  const handleKeyPress = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };
  useEffect(() => {
    handleFetch();
  }, [filePath]);
  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-3 py-1 bg-gray-800 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500 sora-regular"
          autoFocus
        />
        <button
          onClick={handleSave}
          className="p-1 text-green-400 hover:text-green-300 transition-colors"
          title="Save"
        >
          <Check size={16} />
        </button>
        <button
          onClick={handleCancel}
          className="p-1 text-red-400 hover:text-red-300 transition-colors"
          title="Cancel"
        >
          <X size={16} />
        </button>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="sora-regular text-white truncate block max-w-[200px]">
        {fileName}
      </span>
      <button
        onClick={handleStartEdit}
        className="p-1 text-gray-400 hover:text-white transition-colors"
        title="Rename file"
      >
        <Edit2 size={16} />
      </button>
    </div>
  );
};

export default FileRenameInterface;
