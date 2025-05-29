import React from "react";
import Personal_Info from "./FormComponents/personal_info";
import Skills from "./FormComponents/skills";
import CustomFormProvider from "./FormComponents/_FormProvider";
import ProjectsInput from "./FormComponents/DynamicInputs/ProjectsInput";
import CertificateInputs from "./FormComponents/DynamicInputs/CertificationInput";
import ExperienceInputs from "./FormComponents/DynamicInputs/ExperienceInputs";
import EducationInputs from "./FormComponents/DynamicInputs/EducationInputs";

const PortfolioBuilderForm = () => {
  return (
    <div className=" mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Portfolio Builder</h1>

     <CustomFormProvider>
        <div className="bg-gray-800 shadow-lg rounded-lg p-6">
          <Personal_Info />

          <Skills />

          <ProjectsInput/>

          <ExperienceInputs/>

          <EducationInputs/>

          <CertificateInputs/>

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
