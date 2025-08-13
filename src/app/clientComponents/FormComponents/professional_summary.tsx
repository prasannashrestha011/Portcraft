"use client";

import { FormType } from "@/app/types/formType";
import React from "react";
import { useFormContext } from "react-hook-form";

const ProfessionalSummaryInput = () => {
  const { register } = useFormContext<FormType>();

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
        Professional Summary
      </h2>

      <div>
        <textarea
          id="professionalSummary"
          {...register("professionalSummary")}
          placeholder="Write a brief summary about your skills, experience, and career goals..."
          rows={5}
          className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default ProfessionalSummaryInput;
