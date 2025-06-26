import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import { admin } from "@/configs/firebase/firebase-admin";
import { UserMetaData } from "@/app/login/type";
import { UploadImageFile } from "@/configs/dropbox/actions";
import { FireStoreAdminActions } from "@/configs/firebase/actions/StorageActions";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { token, userMetaData } = body;
  const { uid, photoURL } = userMetaData as UserMetaData;
  const imgResponse = await fetch(photoURL);
  const arrayBuffer = await imgResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const shareableUrl = await UploadImageFile(uid, "photourl.png", buffer);
  const metaData: UserMetaData = {
    ...userMetaData,
    photoURL: shareableUrl,
  };
  await FireStoreAdminActions.UploadDoc(metaData, "/profile");
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const serialized = serialize("session", token, {
      httpOnly: true,
      maxAge: expiresIn / 1000,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    const response = NextResponse.json({ status: "success" });
    response.headers.set("Set-Cookie", serialized);
    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
