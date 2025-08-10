import { ParticipantMetaData } from "@/app/login/type";
import axios from "axios";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export const PasswordInput = ({
  roomID,
  user,
}: {
  roomID: string;
  user: ParticipantMetaData;
}) => {
  const [password, setPassword] = useState("");
  const handleValidation = async () => {
    if (!roomID || !user) {
      toast.error("Missing roomID or user data");
      return;
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/room`,
      {
        roomID,
        newUser: user,
        password,
      },
    );
    if (response.status !== 200) {
      toast.error("Failed to join room: " + response.data.error);
      return;
    }
    window.location.reload();
    return;
  };
  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault();
    await handleValidation();
  };
  return (
    <form onSubmit={handleJoinRoom}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-4">Join Room</h2>
          <input
            type="password"
            placeholder="Enter room password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border text-black rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Join Room
          </button>
        </div>
      </div>
    </form>
  );
};
