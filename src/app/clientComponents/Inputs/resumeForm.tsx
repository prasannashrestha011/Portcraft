"use client";
import React from "react";

import { FileText } from "lucide-react";
import { DM_Sans } from "next/font/google";
import ResumeFormProvider from "../FormComponents/Resume_Components/ResumeFormProvider";
import Personal_info from "../FormComponents/Resume_Components/Personal_info";
import Professional_Summary from "../FormComponents/Resume_Components/Professional_Summary";
import TechnicalSkills from "../FormComponents/Resume_Components/TechnicalSkills";
import Projects from "../FormComponents/Resume_Components/Projects";
import Education from "../FormComponents/Resume_Components/Education";
import Experience from "../FormComponents/Resume_Components/Experience";
const inter = DM_Sans({
  subsets: ["latin"],
});
const ResumeForm = () => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 ${inter.className}`}
    >
      <ResumeFormProvider>
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-200" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Professional Resume Builder
                </h1>
                <p className="mt-1 text-indigo-200">
                  Create your professional resume with our comprehensive form
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Personal Information */}
            <Personal_info />
            {/* Professional Summary */}
            <Professional_Summary />
            {/* Technical Skills */}
            <TechnicalSkills />
            {/* Key Projects */}
            <Projects />
            {/* Education */}
            <Education />
            {/*Experience*/}
            <Experience />
            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
              >
                Generate Resume
              </button>
            </div>
          </div>
        </div>
      </ResumeFormProvider>
    </div>
  );
};

export default ResumeForm;
