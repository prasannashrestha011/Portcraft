"use client"
import { experience, FormType } from '@/app/types/formType'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import AppendButton, { RemoveButton } from '../../Buttons'

const defaultValue:experience={
  company:"",
  duration:"",
  role:"",
  description:""
}
const ExperienceInputs = () => {
    const {register,control}=useFormContext<FormType>()
    const {fields,append,remove}=useFieldArray({control,name:"experience"})
  return (
    <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">Experience (Optional)</h2>
          {fields.map((_,idx)=>(
            <div key={idx}>
               <div className='flex justify-end mb-2'>
                <RemoveButton removeAction={()=>remove(idx)}/>
                </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              {...register(`experience.${idx}.company`)}
              placeholder="Company Name"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="text"
               {...register(`experience.${idx}.role`)}
              placeholder="Role/Position"
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <input
            type="text"
            {...register(`experience.${idx}.duration`)}
            placeholder="Duration (e.g., Jan 2022 - Present)"
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-4"
          />
          <textarea
          {...register(`experience.${idx}.description`)}
            placeholder="Job Description (optional)"
            rows={3}
            className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
          />
         
            </div>
          ))}
          <AppendButton appendAction={()=>append(defaultValue)}  disabled={fields.length>=3}/>
        </div>
  )
}

export default ExperienceInputs