"use client"
import { FormType } from '@/app/types/formType'
import React, { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const CustomFormProvider = ({children}:{children:ReactNode}) => {
    const methods=useForm<FormType>()
    const onSubmit=(data:FormType)=>{
        console.log("FORM DATA ",data)
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