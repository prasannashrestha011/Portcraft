"use client";
import { education, FormType } from "@/app/types/formType";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AppendButton, { RemoveButton } from "../../Buttons";

const defaultValue: education = {
  instituition: "",
  degree: "",
  duration: "",
};

const EducationInputs = () => {
  const { register, control } = useFormContext<FormType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educations",
  });

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
        Education
      </h2>

      {fields.map((_, idx) => (
        <div key={idx}>
          <div className="flex justify-end mb-2">
            <RemoveButton removeAction={() => remove(idx)} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor={`educations.${idx}.instituition`}
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Institution Name
              </label>
              <input
                id={`educations.${idx}.instituition`}
                type="text"
                {...register(`educations.${idx}.instituition`)}
                placeholder="Institution Name"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor={`educations.${idx}.degree`}
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Degree
              </label>
              <input
                id={`educations.${idx}.degree`}
                {...register(`educations.${idx}.degree`)}
                type="text"
                placeholder="Degree"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor={`educations.${idx}.duration`}
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Duration
            </label>
            <input
              id={`educations.${idx}.duration`}
              {...register(`educations.${idx}.duration`)}
              type="text"
              placeholder="Duration (e.g., 2018 - 2022)"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      ))}

      <AppendButton
        appendAction={() => append(defaultValue)}
        disabled={fields.length >= 3}
      />
    </div>
  );
};

export default EducationInputs;
