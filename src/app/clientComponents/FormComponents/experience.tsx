import React from 'react'

const Experience = () => {
  return (
  <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">Experience (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Role/Position"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Duration (e.g., Jan 2022 - Present)"
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-4"
          />
          <textarea
            placeholder="Job Description (optional)"
            rows={3}
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
        </div>
  )
}

export default Experience