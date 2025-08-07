import { ResumeFormValues } from "@/app/types/resumeType";
import { useResumeStore } from "@/store/resumeDataStore";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

const ResumeFormProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const methods = useForm<ResumeFormValues>();
  const { setResumeValues } = useResumeStore();
  const onSubmit = (data: ResumeFormValues) => {
    setResumeValues(data);
    router.push("/resume/view");
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default ResumeFormProvider;
