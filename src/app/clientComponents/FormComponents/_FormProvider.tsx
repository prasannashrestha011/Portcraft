"use client"
import { FormType } from '@/app/types/formType'
import { useResultStore } from '@/store/resultStore'


import { GeneratePrompt } from '@/utility/prompt_generator'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const CustomFormProvider = ({children}:{children:ReactNode}) => {
 
  const router=useRouter()
    const apiCall=async(data:string)=>{
      const response=await axios.post(`https://portfolio-builder-phi-three.vercel.app/api/prompt`,{
        prompt:data
      })
      console.log(response)
      return response.data
    }
    const methods=useForm<FormType>()
    const onSubmit=async(data:FormType)=>{
        console.log("FORM DATA ",data)
        const prompt=GeneratePrompt(data)
        const code=await apiCall(prompt)
        console.log(code)
        useResultStore.getState().setResultHTML(code)
        router.push('/result')
      }
 
    return (
    <FormProvider {...methods}>
       <form onSubmit={methods.handleSubmit(onSubmit)}>
         {children}
         
       </form>
    </FormProvider>
  )
}

export default CustomFormProvider