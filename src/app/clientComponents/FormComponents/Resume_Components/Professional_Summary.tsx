import { FileText } from "lucide-react";

import { useResumeHookLoader } from "./resumeHookLoader";

const Professional_Summary = () => {
  const { register, errors } = useResumeHookLoader();
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-700">
        <FileText className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-semibold text-gray-100">
          Professional Summary
        </h2>
      </div>

      <div>
        <textarea
          {...register("summary", {
            required: "Professional summary is required",
          })}
          rows={4}
          className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-100 placeholder-gray-400"
          placeholder="Write a compelling summary of your professional experience and key achievements..."
        />
        {errors.summary && (
          <p className="text-red-400 text-sm mt-1">
            {errors.summary.message as string}
          </p>
        )}
      </div>
    </section>
  );
};

export default Professional_Summary;
