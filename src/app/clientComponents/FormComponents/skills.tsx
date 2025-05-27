import React from 'react'

const Skills = () => {
  return (
    <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">Skills</h2>
          <input
            type="text"
            placeholder="Skills (comma separated): React, JavaScript, Python, etc."
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
  )
}

export default Skills