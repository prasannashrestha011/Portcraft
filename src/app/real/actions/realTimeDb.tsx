import { get, ref, set } from "firebase/database";
import { realDb } from "@/configs/firebase/firebase";

import { ParticipantMetaData } from "@/app/login/type";
import axios from "axios";
export type RoomType = {
  ownerID: string;
  roomName: string;
  roomPassword?: string;
  maxParticipants: number;
  participants: ParticipantMetaData[];
  liveParticipants?: ParticipantMetaData[];
  projectRef: string;
};

export async function createRealTimeRoom(roomData: RoomType) {
  const { ownerID, roomName } = roomData;
  try {
    const roomRef = ref(realDb, `rooms/${ownerID.toLowerCase()}/${roomName}`);
    await set(roomRef, roomData);
  } catch (err) {
    console.log(err);
  }
}

export async function fetchRoomData(roomID: string): Promise<RoomType | null> {
  console.log(roomID);
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/room?roomID=${roomID}`
    );
    if (response.status !== 200) {
      console.log(response.data);
      return null;
    }
    return response.data;
  } catch (err) {
    console.error("Error fetching room data:", err);
    return null;
  }
}
export async function updateParticipants(
  roomID: string,
  newUser: ParticipantMetaData
) {
  try {
    const roomRef = ref(realDb, `rooms/${roomID}`);
    const snapshot = await get(roomRef);

    if (!snapshot.exists()) {
      console.log("Room does not exist:", roomID);
      return;
    }

    const roomData = snapshot.val();

    const participants = Array.isArray(roomData.participants)
      ? roomData.participants
      : [];

    const userExists = participants.some(
      (p: ParticipantMetaData) => p.uid === newUser.uid
    );

    if (!userExists) {
      participants.push(newUser);

      await set(ref(realDb, `rooms/${roomID}/participants`), participants);
      console.log("Participant added successfully.");
    } else {
      console.log("User already a participant.");
    }
  } catch (err) {
    console.log("Error updating participants:", err);
  }
}
