// firebaseLiveParticipants.ts
import { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  ref,
  onDisconnect,
  set,
  remove,
} from "firebase/database";
import { toast } from "react-toastify";
import { ParticipantMetaData } from "@/app/login/type";

export function useLiveParticipants(roomID: string | null) {
  const [liveParticipants, setLiveParticipants] = useState<{
    [uid: string]: ParticipantMetaData;
  } | null>(null);

  useEffect(() => {
    if (!roomID) return;

    const db = getDatabase();
    const liveRef = ref(db, `rooms/${roomID}/liveParticipants`);

    const unsubscribe = onValue(liveRef, (snapshot) => {
      setLiveParticipants(snapshot.val());
    });

    return () => {
      unsubscribe();
    };
  }, [roomID]);

  return liveParticipants;
}

export function usePresence(
  roomID: string | null,
  user: ParticipantMetaData | null,
  isRoomLoaded: boolean,
) {
  useEffect(() => {
    if (!roomID || !user || !isRoomLoaded) return;

    const db = getDatabase();
    const participantRef = ref(
      db,
      `rooms/${roomID}/liveParticipants/${user.uid}`,
    );

    set(participantRef, {
      displayName: user.displayName,
      photoURL: user.photoURL,
    }).catch((err) => {
      toast.error("Failed to join live participants");
      console.error(err);
    });

    onDisconnect(participantRef)
      .remove()
      .catch((err) => {
        console.error("Failed to set onDisconnect removal:", err);
      });

    return () => {
      remove(participantRef).catch((err) => {
        console.error("Failed to remove live participant:", err);
      });
    };
  }, [roomID, user?.uid, isRoomLoaded]);
}
