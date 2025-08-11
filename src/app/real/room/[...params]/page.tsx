"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchRoomData, RoomType } from "../../actions/realTimeDb";
import { toast } from "react-toastify";
import { LoadingSpinnerTransparent } from "@/app/clientComponents/LoadingSpinner";
import { useUserStore } from "@/store/userStore";
import { PasswordInput } from "@/app/clientComponents/Inputs/passwordInputForm";
import { useLiveParticipants, usePresence } from "../firebaseLiveParticipant";
import LiveEditor from "../../test";

import ParticipantActionContextMenu from "@/app/clientComponents/Menu/ContextMenu";
import { getNameAvatarURL } from "@/utilities/nameAvatar";
const Page = () => {
  const params = useParams();
  const path = params.params as string[];
  const roomID = path.join("/");
  const { user } = useUserStore();

  const [roomData, setRoomData] = useState<RoomType | null>(null);

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

  const liveParticipants = useLiveParticipants(roomID);

  usePresence(
    roomID,
    user
      ? {
          uid: user.uid,
          displayName: user.displayName ?? "Unknown",
          photoURL: user.photoURL ?? getNameAvatarURL(user.displayName),
        }
      : null,
    !!roomData
  );

  if (!roomData || !user) {
    return <LoadingSpinnerTransparent text="Loading room..." />;
  }

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

  return (
    <div>
      <ul className="flex  w-full justify-end items-center gap-4 p-1">
        {liveParticipants
          ? Object.entries(liveParticipants).map(([uid, p]) => (
              <div key={uid} className="text-center">
                <ParticipantActionContextMenu>
                  <img
                    src={p.photoURL}
                    alt={p.displayName}
                    className="w-7 rounded-full mx-auto"
                    title={p.displayName}
                  />
                </ParticipantActionContextMenu>
              </div>
            ))
          : "No participants live"}
      </ul>
      <LiveEditor roomID={roomID} projectRef={roomData.projectRef} />
    </div>
  );
};

export default Page;
