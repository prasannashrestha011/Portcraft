import { User } from "firebase/auth";
import { create } from "zustand";

type UserStoreType = {
  user: User | null;
  setUser: (user: User | null) => void;
};
export const useUserStore = create<UserStoreType>((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}));
