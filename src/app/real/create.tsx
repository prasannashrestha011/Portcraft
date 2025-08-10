"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { Users, Plus, Hash, Lock } from "lucide-react";
import { DM_Sans } from "next/font/google";
import { useParams } from "next/navigation";
import { createRealTimeRoom, RoomType } from "./actions/realTimeDb";
import { useUserStore } from "@/store/userStore";
import { LoadingSpinnerTransparent } from "../clientComponents/LoadingSpinner";

const custom_font = DM_Sans({
  subsets: ["latin"],
});
const CreateRoom: React.FC = () => {
  const params = useParams();
  const path = params.params as string[];
  const { user } = useUserStore();
  const {
    register,
    handleSubmit,

    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RoomType>({
    defaultValues: {
      roomName: "",
      roomPassword: "",
      maxParticipants: 10,
      projectRef: path.join("/"),
    },
  });

  const watchedPassword = watch("roomPassword");

  if (!user) {
    return <LoadingSpinnerTransparent text="Preparing the form" />;
  }
  const onSubmit = async (data: RoomType): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const roomData: RoomType = {
        ownerID: user.uid,
        roomName: data.roomName,
        maxParticipants: data.maxParticipants,
        projectRef: data.projectRef,
        participants: [
          {
            uid: user.uid.toLowerCase(),
            displayName: user.displayName!,
            photoURL: user.photoURL ?? "",
          },
        ],
        ...(data.roomPassword
          ? { roomPassword: data.roomPassword.trim() }
          : {}),
      };
      await createRealTimeRoom(roomData);
      // Reset form
      reset();
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Failed to create room. Please try again.");
    }
  };

  return (
    <div
      className={`${custom_font.className} min-h-screen bg-gray-800 p-4 flex items-center justify-center`}
    >
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Create New Room
          </h1>
          <p className="text-slate-300">
            Collaborate with your friends to design your portfolio
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
          <div className="space-y-6">
            {/* Room Name */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                <Hash className="inline w-4 h-4 mr-1" />
                Room Name *
              </label>
              <input
                type="text"
                {...register("roomName", {
                  required: "Room name is required",
                  minLength: {
                    value: 3,
                    message: "Room name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 50,
                    message: "Room name must be less than 50 characters",
                  },
                  validate: (value: string) =>
                    value.trim().length > 0 || "Room name cannot be empty",
                })}
                placeholder="Enter room name"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.roomName ? "border-red-400" : "border-white/20"
                } text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200`}
              />
              {errors.roomName && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.roomName.message}
                </p>
              )}
            </div>

            {/* Room Password */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                <Lock className="inline w-4 h-4 mr-1" />
                Room Password (Optional)
              </label>
              <input
                type="password"
                {...register("roomPassword", {
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be less than 20 characters",
                  },
                })}
                placeholder="Enter password to protect your room"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.roomPassword ? "border-red-400" : "border-white/20"
                } text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200`}
              />
              {errors.roomPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.roomPassword.message}
                </p>
              )}
              <p className="mt-1 text-xs text-slate-400">
                {watchedPassword && watchedPassword.length > 0
                  ? `Password set (${watchedPassword.length} characters)`
                  : "Leave empty for open access, or set a password to protect your room"}
              </p>
            </div>

            {/* Max Participants */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                <Users className="inline w-4 h-4 mr-1" />
                Max Participants
              </label>
              <input
                type="number"
                {...register("maxParticipants", {
                  required: "Max participants is required",
                  min: {
                    value: 2,
                    message: "Minimum 2 participants required",
                  },
                  max: {
                    value: 100,
                    message: "Maximum 100 participants allowed",
                  },
                  valueAsNumber: true,
                })}
                min="2"
                max="100"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border ${
                  errors.maxParticipants ? "border-red-400" : "border-white/20"
                } text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200`}
              />
              {errors.maxParticipants && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.maxParticipants.message}
                </p>
              )}
            </div>
            {/*Project reference */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">
                Project Reference
              </label>
              <input
                value={path.join("/")}
                className={`w-full px-4 py-3 rounded-lg bg-white/5  text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all duration-200`}
                disabled={true}
              />
            </div>
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                isSubmitting
                  ? "bg-slate-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creating Room...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Room
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
