import { Briefcase, Plus, Minus } from "lucide-react";

import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useResumeHookLoader } from "./resumeHookLoader";

const Experience = () => {
  const { register, control } = useResumeHookLoader();
  const { watch } = useFormContext();
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-indigo-400" />
          <h2 className="text-xl font-semibold text-gray-100">
            Professional Experience
          </h2>
        </div>
        <button
          type="button"
          onClick={() =>
            appendExperience({
              jobTitle: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              current: false,
              achievements: [""],
            })
          }
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {experienceFields.map((field, index) => (
        <div
          key={field.id}
          className="p-5 bg-gray-750 border border-gray-700 rounded-xl space-y-5 shadow-inner"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-medium text-gray-200">
              Experience #{index + 1}
            </h3>
            {experienceFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full text-red-400 hover:text-red-300 transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Job Title *
              </label>
              <input
                {...register(`experience.${index}.jobTitle`, {
                  required: "Job title is required",
                })}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                placeholder="Senior Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company *
              </label>
              <input
                {...register(`experience.${index}.company`, {
                  required: "Company is required",
                })}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                placeholder="TechX Solutions"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Location
              </label>
              <input
                {...register(`experience.${index}.location`)}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                placeholder="Kathmandu"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Start Date
                </label>
                <input
                  type="month"
                  {...register(`experience.${index}.startDate`)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  End Date
                </label>
                <input
                  type="month"
                  {...register(`experience.${index}.endDate`)}
                  disabled={watch(`experience.${index}.current`)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 disabled:bg-gray-600 disabled:opacity-70"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register(`experience.${index}.current`)}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-300">
                  Currently working here
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Key Achievements
            </label>
            {Array.from({ length: 2 }).map((_, achievementIndex) => (
              <textarea
                key={achievementIndex}
                {...register(
                  `experience.${index}.achievements.${achievementIndex}`
                )}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400 mb-3"
                placeholder="• Describe a key achievement with metrics and impact..."
                rows={2}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Experience;
