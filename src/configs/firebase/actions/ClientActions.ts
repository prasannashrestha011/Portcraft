import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export async function deleteDocByPath(path: string) {
  console.log("PATH", path);
  try {
    const docRef = doc(db, path);
    await deleteDoc(docRef);
    console.log("Document deleted ");
  } catch (err) {
    console.error(err);
  }
}
