import { Code, Plus, Minus } from "lucide-react";

import { useFieldArray } from "react-hook-form";
import { useResumeHookLoader } from "./resumeHookLoader";

const Projects = () => {
  const { register, control } = useResumeHookLoader();
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <div>
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-semibold text-gray-100">
              Key Projects
            </h2>
          </div>
          <button
            type="button"
            onClick={() =>
              appendProject({
                title: "",
                technologies: "",
                descriptions: [""],
              })
            }
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>

        {projectFields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 bg-gray-750 border border-gray-700 rounded-xl space-y-5 shadow-inner"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-200">
                Project #{index + 1}
              </h3>
              {projectFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="p-1.5 bg-gray-700 hover:bg-gray-600 rounded-full text-red-400 hover:text-red-300 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  {...register(`projects.${index}.title`, {
                    required: "Project title is required",
                  })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                  placeholder="AI-Powered Page Builder Platform"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technologies Used
                </label>
                <input
                  {...register(`projects.${index}.technologies`)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
                  placeholder="Next.js, OpenAI API, GrapesJS, AWS"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Descriptions
              </label>
              {Array.from({ length: 2 }).map((_, descIndex) => (
                <textarea
                  key={descIndex}
                  {...register(`projects.${index}.descriptions.${descIndex}`)}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400 mb-3"
                  placeholder="• Describe a key feature or achievement of this project..."
                  rows={2}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Projects;
