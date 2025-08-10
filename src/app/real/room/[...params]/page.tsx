"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchRoomData, RoomType } from "../../actions/realTimeDb";
import { toast } from "react-toastify";
import { LoadingSpinnerTransparent } from "@/app/clientComponents/LoadingSpinner";
import { useUserStore } from "@/store/userStore";
import { PasswordInput } from "@/app/clientComponents/Inputs/passwordInputForm";
import { ParticipantMetaData } from "@/app/login/type";
import {
  getDatabase,
  onValue,
  ref,
  onDisconnect,
  set,
  remove,
} from "firebase/database";

const Page = () => {
  const params = useParams();
  const path = params.params as string[];
  const roomID = path.join("/");
  const { user } = useUserStore();

  const [roomData, setRoomData] = useState<RoomType | null>(null);
  const [liveParticipants, setLiveParticipants] = useState<{
    [uid: string]: ParticipantMetaData;
  } | null>(null);

  // Fetch room data once
  useEffect(() => {
    async function loadRoom() {
      const fetchedRoom = await fetchRoomData(roomID);
      if (!fetchedRoom) {
        toast.error("Cannot find the room");
        return;
      }
      setRoomData(fetchedRoom);
    }
    loadRoom();
  }, [roomID]);

  // Listen for liveParticipants updates in realtime
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

  // Manage presence: add current user to liveParticipants on mount, remove on unmount and on disconnect
  useEffect(() => {
    if (!roomData || !user) return;

    const db = getDatabase();
    const participantRef = ref(
      db,
      `rooms/${roomID}/liveParticipants/${user.uid}`
    );

    // Set user as live participant
    set(participantRef, {
      displayName: user.displayName!,
      photoURL: user.photoURL!,
    }).catch((err) => {
      toast.error("Failed to join live participants");
      console.error(err);
    });

    // Setup onDisconnect to remove the participant automatically if they disconnect unexpectedly
    onDisconnect(participantRef)
      .remove()
      .catch((err) => {
        console.error("Failed to set onDisconnect removal:", err);
      });

    // Remove participant on unmount (graceful leave)
    return () => {
      remove(participantRef).catch((err) => {
        console.error("Failed to remove live participant:", err);
      });
    };
  }, [roomData, user, roomID]);

  if (!roomData || !user) {
    return <LoadingSpinnerTransparent text="Loading room..." />;
  }

  // If user not part of participants, show passoword form
  if (
    !roomData.participants?.some(
      (p) => p.uid.toLowerCase() === user.uid.toLowerCase()
    )
  ) {
    return (
      <PasswordInput
        roomID={roomID}
        user={{
          displayName: user.displayName!,
          uid: user.uid,
          photoURL: user.photoURL!,
        }}
      />
    );
  }

  // Render live participants list
  return (
    <div>
      <h2 className="text-center mb-4 font-semibold">Live Participants</h2>
      <ul className="flex w-full justify-center items-center gap-4 p-4">
        {liveParticipants
          ? Object.entries(liveParticipants).map(([uid, p]) => (
              <div key={uid} className="text-center">
                <img
                  src={p.photoURL}
                  alt={p.displayName}
                  className="w-9 rounded-full mx-auto"
                  title={p.displayName}
                />
                <p className="text-xs">{p.displayName}</p>
              </div>
            ))
          : "No participants live"}
      </ul>
    </div>
  );
};

export default Page;
