import { ParticipantMetaData, UserMetaData } from "@/app/login/type";
import { admin, database } from "../firebase-admin";
import { RoomType } from "@/app/real/actions/realTimeDb";
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
    path: string,
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

export class RealTimeDBAdminActions {
  static db = database;
  static async fetchRoomData(roomID: string): Promise<RoomType | null> {
    try {
      const snapshot = await this.db.ref(`rooms/${roomID}`).once("value");
      if (snapshot.exists()) {
        const data = snapshot.val();
        return data as RoomType;
      } else {
        console.log("No data available for roomID:", roomID);
        return null;
      }
    } catch (err) {
      console.error("Error fetching room data:", err);
      return null;
    }
  }
  static async validatePassword(
    roomID: string,
    password: string,
  ): Promise<boolean> {
    try {
      const roomData = await this.fetchRoomData(roomID);
      if (!roomData) {
        console.log("Room not found:", roomID);
        return false;
      }
      return roomData.roomPassword === password;
    } catch (err) {
      console.error("Error validating password:", err);
      return false;
    }
  }
  static async updateParticipants(
    roomID: string,
    newUser: ParticipantMetaData,
  ) {
    try {
      const roomRef = this.db.ref(`rooms/${roomID}`);
      const snapshot = await roomRef.once("value");

      if (!snapshot.exists()) {
        console.log("Room does not exist:", roomID);
        return;
      }

      const roomData = snapshot.val();

      const participants = Array.isArray(roomData.participants)
        ? roomData.participants
        : [];

      const userExists = participants.some(
        (p: ParticipantMetaData) => p.uid === newUser.uid,
      );

      if (!userExists) {
        participants.push(newUser);

        await this.db.ref(`rooms/${roomID}/participants`).set(participants);
        console.log("Participant added successfully.");
      } else {
        console.log("User already a participant.");
      }
    } catch (err) {
      console.log("Error updating participants:", err);
    }
  }
}
