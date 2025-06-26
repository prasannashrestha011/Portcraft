import { UploadFiles } from "@/configs/dropbox/actions";
import { NextRequest, NextResponse } from "next/server";

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
