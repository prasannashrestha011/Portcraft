import { admin } from "../firebase-admin";

export class FireStoreAdminActions {
  static db = admin.firestore();

  static async UploadDoc(userMetaData: UserMetaData, path: string) {
    await this.db
      .collection("users")
      .doc(userMetaData.uid)
      .collection(`${path}`)
      .doc("data")
      .set({
        ...userMetaData,
        createdAt: new Date(),
      });
  }
  static async UploadFileRefs(
    uid: string,
    uniqueId: string,
    fileName: string,
    path: string
  ) {
    await this.db
      .collection("users")
      .doc(uid)
      .collection("portfolios")
      .doc(`${uniqueId}`)
      .set({
        fileName: fileName,
        snapshotURL: "",
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ref: path,
      });
  }
}
