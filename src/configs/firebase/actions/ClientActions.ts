import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { PortfolioMeta } from "@/app/types/firestoreTypes";
import axios from "axios";
export async function fetchFileMetaData(
  path: string
): Promise<PortfolioMeta | null> {
  try {
    const docRef = doc(db, path);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log("No Document exists on path: ", path);
      return null;
    }
    const data = docSnap.data();
    return data as PortfolioMeta;
  } catch (err) {
    console.error(err);
    return null;
  }
}
export async function deleteDocByPath(path: string): Promise<boolean> {
  console.log("PATH", path);
  try {
    const docRef = doc(db, path);
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/storage`,
      {
        data: { path },
      }
    );
    if (response.status !== 200) return false;

    await deleteDoc(docRef);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
export async function reNameFile(path: string, newFileName: string) {
  try {
    const docRef = doc(db, path);
    await updateDoc(docRef, {
      fileName: newFileName,
    });
  } catch (err) {
    console.error("RENAME ERR", err);
  }
}
