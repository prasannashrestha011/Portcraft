import {
  ReadFiles,
  UploadFiles,
  UploadImageFile,
} from "@/configs/dropbox/actions";
import { FireStoreAdminActions } from "@/configs/firebase/actions/AdminAction";
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
      { status: 400 },
    );
  }

  const fileContent = await file.text();
  console.log(fileContent);
  const { name, lower_path } = await UploadFiles(
    userID.toLowerCase(),
    fileName.toLowerCase(),
    fileContent,
  );
  const url = `${process.env.ROOT_URL}/view/${lower_path}`;
  const buffer = await getSnapshot(url);
  if (!buffer) return;
  const arrayBuffer = Buffer.from(buffer);
  const snapurl = await UploadImageFile(lower_path, arrayBuffer);
  await FireStoreAdminActions.UpdateFileDoc(lower_path, snapurl);
  console.log(snapurl);
  return NextResponse.json({ name, lower_path, snapurl });
}
function getQueryParam(req: NextRequest, key: string) {
  return new URL(req.url).searchParams.get(key);
}
