import {
  ReadFiles,
  UploadFiles,
  UploadImageFile,
} from "@/configs/dropbox/actions";
import { FireStoreAdminActions } from "@/configs/firebase/actions/StorageActions";
import { getSnapshot } from "@/utility/snapshot";
import { NextRequest, NextResponse } from "next/server";
//for reading files
export async function GET(req: NextRequest) {
  const path = getQueryParam(req, "path");
  if (!path) return NextResponse.json({ error: "Path not provided" });
  const string = await ReadFiles(path);
  return NextResponse.json({ message: string });
}
//uploading files
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const fileName = formData.get("fileName")?.toString();
  const file = formData.get("file");
  const userID = getQueryParam(req, "userID");
  if (!fileName || !file || !(file instanceof File) || !userID) {
    return NextResponse.json(
      { error: "No file uploaded or wrong format" },
      { status: 400 }
    );
  }

  const fileContent = await file.text();
  const { name, lower_path, path_display } = await UploadFiles(
    userID,
    fileName,
    fileContent
  );
  const url = `http://localhost:3000/view${lower_path}`;
  console.log("LOWER PATH ", lower_path);
  const buffer = await getSnapshot(url);
  if (!buffer) return;
  const snapurl = await UploadImageFile(lower_path, buffer);
  await FireStoreAdminActions.UpdateFileDoc(path_display, snapurl);
  console.log(snapurl);
  return NextResponse.json({ name, lower_path, snapurl });
}
function getQueryParam(req: NextRequest, key: string) {
  return new URL(req.url).searchParams.get(key);
}
