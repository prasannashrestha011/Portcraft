"use client";

import Image from "next/image";
import Link from "next/link";
import { Pen, Trash, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import moment from "moment";
import { Flip, toast } from "react-toastify";
import { custom_font } from "@/utilities/custom_font";

interface FileCardProps {
  fileName: string;
  fileURL?: string;
  snapshotURL: string;
  createdAt: Date;
  ref: string;
  onDelete: (ref: string, fileName: string) => void;
}

export default function FileCard({
  fileName,
  createdAt,
  ref,
  onDelete,
}: FileCardProps) {
  const notify = () =>
    toast.info("URL copied", {
      theme: "colored",
      hideProgressBar: true,
      autoClose: 1000,
      position: "bottom-center",
      closeOnClick: true,
      transition: Flip,
    });

  const handleCopyToClipboard = () => {
    const link = `${process.env.NEXT_PUBLIC_ROOT_URL || window.location.origin}/view${ref}`;
    navigator.clipboard.writeText(link).then(() => {
      notify();
    });
  };
  const displayFileName = fileName
    ? fileName.split(".")[0] + ".html"
    : "Untitled.html";
  return (
    <Card
      className={`group w-72 bg-gradient-to-br from-gray-900/60 to-slate-900/40 backdrop-blur-md border border-gray-400/40 hover:border-gray-600/60 hover:from-gray-800/70 hover:to-slate-800/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/40 hover:-translate-y-1 hover:scale-[1.02] ${custom_font.className}`}
    >
      <CardContent className="p-0">
        {/* Thumbnail Section */}
        <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-gray-800/60 to-gray-900/80">
          <Image
            src="/images/thumbnail.png"
            width={288}
            height={160}
            alt={`${fileName || "File"} thumbnail`}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-gray-50 text-base leading-tight line-clamp-2 group-hover:text-white transition-colors duration-200">
              {displayFileName}
            </h3>
            <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-200">
              Edited {moment.utc(createdAt).fromNow()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Primary Actions Group */}
            <div className="flex items-center gap-1.5 flex-1">
              <Link href={`/editor/${ref}`} className="flex-1">
                <Button
                  size="sm"
                  className="w-full h-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-medium shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 transition-all duration-200"
                >
                  <Pen className="w-3 h-3 mr-1.5" />
                  Edit
                </Button>
              </Link>

              <Link href={`/view/${ref}`}>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 border-gray-600/50 bg-gray-800/40 hover:bg-gray-700/60 text-gray-300 hover:text-white hover:border-gray-500/60 text-xs backdrop-blur-sm transition-all duration-200"
                >
                  <Eye className="w-3 h-3" />
                </Button>
              </Link>
            </div>

            {/* Secondary Actions Group */}
            <div className="flex items-center gap-1 pl-2 border-l border-gray-700/50">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-gray-400 hover:text-gray-200 hover:bg-gray-700/60 transition-all duration-200"
                      onClick={handleCopyToClipboard}
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy page link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-red-900/20 transition-all duration-200"
                onClick={() => onDelete(ref, fileName || "Untitled")}
              >
                <Trash className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
