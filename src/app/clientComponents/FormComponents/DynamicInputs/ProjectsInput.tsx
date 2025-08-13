"use client";

import { FormType, project } from "@/app/types/formType";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import AppendButton, { RemoveButton } from "../../Buttons";

const defaultValue: project = {
  description: "",
  name: "",
  techStack: "",
  link: "",
  repo: "",
};

const ProjectsInput = () => {
  const { register, control } = useFormContext<FormType>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div className="mb-2">
      <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">
        Projects
      </h2>

      {fields.map((_, idx) => (
        <div className="space-y-4 mt-5" key={idx}>
          <div className="flex justify-end mb-2">
            <RemoveButton removeAction={() => remove(idx)} />
          </div>

          <div>
            <label
              htmlFor={`projects.${idx}.name`}
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Project Name
            </label>
            <input
              id={`projects.${idx}.name`}
              type="text"
              placeholder="Project Name"
              {...register(`projects.${idx}.name`)}
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor={`projects.${idx}.description`}
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Project Description
            </label>
            <textarea
              id={`projects.${idx}.description`}
              placeholder="Project Description"
              {...register(`projects.${idx}.description`)}
              rows={3}
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <div>
            <label
              htmlFor={`projects.${idx}.techStack`}
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Tech Stack
            </label>
            <input
              id={`projects.${idx}.techStack`}
              type="text"
              placeholder="Tech Stack (comma separated): React, Node.js, MongoDB, etc."
              {...register(`projects.${idx}.techStack`)}
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`projects.${idx}.repo`}
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Repository URL
              </label>
              <input
                id={`projects.${idx}.repo`}
                type="text"
                placeholder="Repository URL (optional)"
                {...register(`projects.${idx}.repo`)}
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label
                htmlFor={`projects.${idx}.link`}
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Live Demo URL
              </label>
              <input
                id={`projects.${idx}.link`}
                type="text"
                placeholder="Live Demo URL (optional)"
                {...register(`projects.${idx}.link`)}
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
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

export default ProjectsInput;
