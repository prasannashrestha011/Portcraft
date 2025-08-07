import { ResumeFormValues } from "@/app/types/resumeType";
import { useFormContext } from "react-hook-form";

export function useResumeHookLoader() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<ResumeFormValues>();
  return { register, errors, control };
}
