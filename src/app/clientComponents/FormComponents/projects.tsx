import React from 'react'

const Projects = () => {
  return (
    <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">Projects</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project Name"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <textarea
              placeholder="Project Description"
              rows={3}
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
            <input
              type="text"
              placeholder="Tech Stack (comma separated): React, Node.js, MongoDB, etc."
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="url"
                placeholder="Repository URL (optional)"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <input
                type="url"
                placeholder="Live Demo URL (optional)"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
  )
}

export default Projects