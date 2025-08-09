import { doc, setDoc } from "firebase/firestore";
import { UserDoc } from "../types";
import { db } from "../firebase";

export async function SaveUserInfo(user: UserDoc) {
  const userDocRef = doc(db, "users", user.uid.toLowerCase());
  await setDoc(userDocRef, user);
  console.log("User info saved");
}
