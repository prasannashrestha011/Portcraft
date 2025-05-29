"use client"

import { FormType, project } from '@/app/types/formType'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import AppendButton, { RemoveButton } from '../../Buttons'


const defaultValue:project={
    description:"",
    name:"",
    techStack:"",
    link:"",
    repo:""
}

const ProjectsInput = () => {
    const {register,control}=useFormContext<FormType>()
    const {fields,append,remove}=useFieldArray({control,name:"projects"})
   
     return (
    <div className='mb-2'>
        <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">Projects</h2>
        {fields.map((field,idx)=>(
            <div className="space-y-4 mt-5" key={idx}>
               <div className='flex justify-end mb-2'>
                              <RemoveButton removeAction={()=>remove(idx)}/>
                  </div>
            <input
              type="text"
              placeholder="Project Name"
            {...register(`projects.${idx}.name`)}
              className="w-full h-8 p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <textarea
              placeholder="Project Description"
                   {...register(`projects.${idx}.description`)}
              rows={3}
              className="w-full p-3  bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
            <input
              type="text"
                 {...register(`projects.${idx}.techStack`)}
              placeholder="Tech Stack (comma separated): React, Node.js, MongoDB, etc."
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                     {...register(`projects.${idx}.repo`)}
                placeholder="Repository URL (optional)"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <input
                type="text"
                  {...register(`projects.${idx}.link`)}
                placeholder="Live Demo URL (optional)"
                className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
        
          </div>
        ))}
        <AppendButton appendAction={()=>append(defaultValue)} disabled={fields.length>=3}/>
    </div>
  )

}

export default ProjectsInput