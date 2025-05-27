import React from 'react';
import Personal_Info from './FormComponents/personal_info';
import Skills from './FormComponents/skills';
import Projects from './FormComponents/projects';
import Experience from './FormComponents/experience';
import Education from './FormComponents/education';
import Certifications from './FormComponents/certifications';

const PortfolioBuilderForm = () => {
  return (
    <div className=" mx-auto p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-white mb-6">Portfolio Builder</h1>
      
      <div className="bg-gray-800 shadow-lg rounded-lg p-6">
        {/* Personal Information */}
        <Personal_Info/>

        {/* Skills */}
        <Skills/>

        {/* Projects */}
        <Projects/>

        {/* Experience */}
        <Experience/>

        {/* Education */}
        <Education/>

        {/* Certification */}
       <Certifications/>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-600">
          <button
            type="button"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            Generate Portfolio
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 font-medium transition-colors"
          >
            Save Draft
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioBuilderForm;