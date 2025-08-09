import { ReadFiles } from "@/configs/dropbox/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const path = getQueryParam(req, "path");
    console.log("PATH ", path);
    if (!path)
      return NextResponse.json({ error: "Path not provided" }, { status: 400 });

    const string = await ReadFiles(path);

    return NextResponse.json({ message: string });
  } catch (err) {
    return NextResponse.json({ err: err }, { status: 500 });
  }
}
function getQueryParam(req: NextRequest, key: string) {
  return new URL(req.url).searchParams.get(key);
}
