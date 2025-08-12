"use client";

import Image from "next/image";
import Link from "next/link";
import { Pen, Trash, Copy } from "lucide-react";
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
    const link = `${process.env.NEXT_PUBLIC_ROOT_URL}/view${ref}`;
    navigator.clipboard.writeText(link).then(() => {
      notify();
    });
  };
  return (
    <Card className="group w-72 bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1">
      <CardContent className="p-0">
        {/* Thumbnail Section */}
        <div className="relative overflow-hidden rounded-t-lg bg-zinc-800">
          <Image
            src="/images/thumbnail.png"
            width={288}
            height={160}
            alt={`${fileName} thumbnail`}
            className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <div className="space-y-1">
            <h3 className="font-semibold text-white text-sm leading-tight line-clamp-2">
              {fileName.split(".")[0] + ".html"}
            </h3>
            <p className="text-zinc-400 text-xs">
              Edited {moment.utc(createdAt).fromNow()}
            </p>
          </div>

          {/* Actions Section */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Link href={`/editor/${ref}`}>
                <Button
                  size="sm"
                  className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium"
                >
                  <Pen className="w-3 h-3 mr-1.5" />
                  Edit
                </Button>
              </Link>

              <Button
                size="sm"
                variant="outline"
                className="h-8 px-3 border-zinc-700 bg-transparent hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs"
                onClick={() => onDelete(ref, fileName)}
              >
                <Trash className="w-3 h-3 mr-1.5" />
                Delete
              </Button>
            </div>

            <div className="flex items-center gap-1">
              <Link
                href={`/view/${ref}`}
                className="text-xs text-zinc-400 hover:text-blue-400 transition-colors duration-200 px-2 py-1 rounded hover:bg-zinc-800"
              >
                Preview
              </Link>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      onClick={handleCopyToClipboard}
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy page link</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
