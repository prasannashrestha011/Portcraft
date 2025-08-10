import { NextResponse } from "next/server";
import { RealTimeDBAdminActions } from "@/configs/firebase/actions/AdminAction";
import { ParticipantMetaData } from "@/app/login/type";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const roomID = searchParams.get("roomID");

    if (!roomID) {
      return NextResponse.json(
        { error: "Missing roomID query parameter" },
        { status: 400 },
      );
    }

    const roomData = await RealTimeDBAdminActions.fetchRoomData(roomID);

    if (!roomData) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(roomData, { status: 200 });
  } catch (error) {
    console.error("Error fetching room data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { roomID, newUser, password } = body as {
      roomID: string;
      newUser: ParticipantMetaData;
      password: string;
    };

    if (!roomID || !newUser || !newUser.uid) {
      return NextResponse.json(
        { error: "Missing roomID or newUser data" },
        { status: 400 },
      );
    }
    const isValidPassword = await RealTimeDBAdminActions.validatePassword(
      roomID,
      password,
    );

    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 403 });
    }

    await RealTimeDBAdminActions.updateParticipants(roomID, newUser);

    return NextResponse.json(
      { message: "Participant updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating participants:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
