import React from "react";
import Personal_Info from "./FormComponents/personal_info";
import Skills from "./FormComponents/skills";
import CustomFormProvider from "./FormComponents/_FormProvider";
import ProjectsInput from "./FormComponents/DynamicInputs/ProjectsInput";
import CertificateInputs from "./FormComponents/DynamicInputs/CertificationInput";
import ExperienceInputs from "./FormComponents/DynamicInputs/ExperienceInputs";
import EducationInputs from "./FormComponents/DynamicInputs/EducationInputs";
import { DM_Sans } from "next/font/google";
import ProfessionalSummaryInput from "./FormComponents/professional_summary";
const custom_font = DM_Sans({
  subsets: ["latin"],
});
const PortfolioBuilderForm = () => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 ${custom_font.className}`}
    >
      <h1 className="text-3xl font-bold text-white mb-6">Portfolio Builder</h1>

      <CustomFormProvider>
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <Personal_Info />

          <ProfessionalSummaryInput />
          <Skills />

          <ProjectsInput />

          <ExperienceInputs />

          <EducationInputs />

          <CertificateInputs />

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-600">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Generate Portfolio
            </button>
          </div>
        </div>
      </CustomFormProvider>
    </div>
  );
};

export default PortfolioBuilderForm;
