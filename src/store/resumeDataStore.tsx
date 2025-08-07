import { ResumeFormValues } from "@/app/types/resumeType";
import { create } from "zustand";

type StoreType = {
  resumeValues: ResumeFormValues | null;
  setResumeValues: (data: ResumeFormValues) => void;
};
export const useResumeStore = create<StoreType>((set) => ({
  resumeValues: null,
  setResumeValues: (resumeValues) => set({ resumeValues: resumeValues }),
}));
