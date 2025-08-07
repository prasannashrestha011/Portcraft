import { GraduationCap } from "lucide-react";

import React from "react";

import { useResumeHookLoader } from "./resumeHookLoader";

const Education = () => {
  const { register } = useResumeHookLoader();
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
        <GraduationCap className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-100">Education</h2>
      </div>

      <div className="p-5 bg-gray-750 border border-gray-700 rounded-xl space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Degree *
            </label>
            <input
              {...register("education.degree", {
                required: "Degree is required",
              })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              placeholder="Bachelor of Computer Application (BCA)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Institution *
            </label>
            <input
              {...register("education.institution", {
                required: "Institution is required",
              })}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              placeholder="Tribhuvan University"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              {...register("education.location")}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              placeholder="Kathmandu, Nepal"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Year
              </label>
              <input
                type="number"
                {...register("education.startYear")}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100"
                placeholder="2019"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Year
              </label>
              <input
                type="number"
                {...register("education.endYear")}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100"
                placeholder="2023"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              GPA/CGPA
            </label>
            <input
              {...register("education.gpa")}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              placeholder="3.85 / 4.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Achievements
            </label>
            <input
              {...register("education.achievements")}
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
              placeholder="Dean's List • Top 5% of Class"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
