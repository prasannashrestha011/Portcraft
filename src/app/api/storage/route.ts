import {
  DeleteFileDBX,
  ReadFiles,
  UploadFiles,
} from "@/configs/dropbox/actions";
import { verifyJwtToken } from "@/utilities/jwt_methods";

import { NextRequest, NextResponse } from "next/server";
//for reading files
export async function GET(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const decodedToken = verifyJwtToken(token);
    if (!decodedToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const path = getQueryParam(req, "path");
    if (!path) {
      return NextResponse.json({ error: "Path required" }, { status: 400 });
    }

    const userId = path.split("/")[2];
    if (userId !== decodedToken.uid.toLowerCase()) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const content = await ReadFiles(path);
    return NextResponse.json({ message: content });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
//uploading files
export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const fileName = formData.get("fileName")?.toString();
  const filePath = formData.get("filePath")?.toString();
  const file = formData.get("file");

  const userID = getQueryParam(req, "userID");
  if (!fileName || !filePath || !file || !(file instanceof File) || !userID) {
    return NextResponse.json(
      { error: "No file uploaded or wrong format" },
      { status: 400 }
    );
  }

  const fileContent = await file.text();
  const { name, lower_path } = await UploadFiles(
    userID.toLowerCase(),
    fileName.toLowerCase(),
    filePath?.toString(),
    fileContent
  );
  return NextResponse.json({ name, lower_path });
}
export async function DELETE(req: NextRequest) {
  try {
    const { path } = await req.json();
    if (!path)
      return NextResponse.json(
        { message: "path not provided" },
        { status: 400 }
      );

    const isDeleted = await DeleteFileDBX(path);
    return isDeleted
      ? NextResponse.json({ message: "File deleted " }, { status: 200 })
      : NextResponse.json(
          { message: "Failed to deleted the file" },
          { status: 500 }
        );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Unknow error" }, { status: 500 });
  }
}
function getQueryParam(req: NextRequest, key: string) {
  return new URL(req.url).searchParams.get(key);
}
