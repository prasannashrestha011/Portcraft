import React from 'react'

const Education = () => {
  return (
  <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Institution Name"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Degree"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <input
            type="text"
            placeholder="Duration (e.g., 2018 - 2022)"
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
  )
}

export default Education