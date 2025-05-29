"use client"

import { certification, FormType } from '@/app/types/formType'
import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import AppendButton, { RemoveButton } from '../../Buttons'

const defaultValue:certification={
  issuer:"",
  title:""
}
const CertificateInputs = () => {
    const {register,control}=useFormContext<FormType>()
    const {fields,append,remove}=useFieldArray({control,name:"certifications"})
  
     return (
       <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4 border-b border-gray-600 pb-2">Certification</h2>
        {fields.map((_,idx)=>(
        <div className="flex flex-col" key={idx}>
          <div className='flex justify-end mb-2'>
                              <RemoveButton removeAction={()=>remove(idx)}/>
          </div>
          <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input
              type="text"
              placeholder="Certification Title"
              {...register(`certifications.${idx}.title`)}
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
            <input
              type="text"
              placeholder="Issuer/Organization"
            {...register(`certifications.${idx}.issuer`)}
              className="w-full p-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </main>
        </div>

        ))}

       
             <AppendButton appendAction={()=>append(defaultValue)} disabled={fields.length>=3}/>
            
      
        </div>
        )

}

export default CertificateInputs