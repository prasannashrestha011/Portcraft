"use client";
import { FormType } from "@/app/types/formType";
import { useResultStore } from "@/store/resultStore";

import { GeneratePrompt } from "@/utility/prompt_generator";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import LoadingStepper from "../Steppers/LoadingStepper";

const CustomFormProvider = ({ children }: { children: ReactNode }) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const router = useRouter();
  const apiCall = async (data: string) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/api/prompt`,
      {
        prompt: data,
      }
    );
    console.log(response);
    return response.data;
  };
  const methods = useForm<FormType>();
  const onSubmit = async (data: FormType) => {
    setIsSubmitted(true);
    console.log("FORM DATA ", data);

    // Step 1: Connecting (should be set when form is submitted)
    setActiveStep(0); // or 1 if you're using 1-based indexing

    try {
      // Generate prompt
      const prompt = GeneratePrompt(data);

      setTimeout(() => {
        setActiveStep(1);
      }, 1000);

      // Make API call
      const code = await apiCall(prompt);
      console.log(code);

      if (code) {
        setActiveStep(2);

        // Store result and navigate
        useResultStore.getState().setResultHTML(code);

        setTimeout(() => {
          router.push("/result");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      // Handle error state - maybe reset stepper or show error
      setIsSubmitted(false);
    }
  };
  if (isSubmitted) {
    return (
      <div className=" flex items-center justify-center">
        <LoadingStepper activeStep={activeStep} />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default CustomFormProvider;
