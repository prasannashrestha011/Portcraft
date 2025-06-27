import { ReadFiles, UploadFiles } from "@/configs/dropbox/actions";
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
  const dbxResponse = await UploadFiles(userID, fileName, fileContent);
  return NextResponse.json({ dbxResponse });
}
function getQueryParam(req: NextRequest, key: string) {
  return new URL(req.url).searchParams.get(key);
}
