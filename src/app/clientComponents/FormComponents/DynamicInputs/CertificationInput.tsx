"use client";

import { certification, FormType } from "@/app/types/formType";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AppendButton, { RemoveButton } from "../../Buttons";
import { SampleFormData } from "@/test/autoFill";

const defaultValue: certification = {
  issuer: "",
  title: "",
};

const CertificateInputs = () => {
  const { register, control, reset } = useFormContext<FormType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "certifications",
  });

  const autofillForm = () => {
    reset(SampleFormData);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
        Certification
      </h2>

      {fields.map((_, idx) => (
        <div className="flex flex-col" key={idx}>
          <div className="flex justify-end mb-2">
            <RemoveButton removeAction={() => remove(idx)} />
          </div>

          <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`certifications.${idx}.title`}
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Certification Title
              </label>
              <input
                id={`certifications.${idx}.title`}
                type="text"
                placeholder="Certification Title"
                {...register(`certifications.${idx}.title`)}
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor={`certifications.${idx}.issuer`}
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Issuer / Organization
              </label>
              <input
                id={`certifications.${idx}.issuer`}
                type="text"
                placeholder="Issuer/Organization"
                {...register(`certifications.${idx}.issuer`)}
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </main>
        </div>
      ))}

      <div className="flex flex-col gap-4 items-start justify-center">
        <AppendButton
          appendAction={() => append(defaultValue)}
          disabled={fields.length >= 3}
        />
        <button
          onClick={() => autofillForm()}
          type="button"
          className="bg-green-500 p-1 rounded-md mt-4"
        >
          Auto fill for sampling
        </button>
      </div>
    </div>
  );
};

export default CertificateInputs;
