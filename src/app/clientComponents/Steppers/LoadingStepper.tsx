"use client"
import { CircularProgress, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'

const steps=["Connecting to the Gemini server",
    "Processing the request",
    "Finishing"]
const LoadingStepper = ({activeStep}:{activeStep:number}) => {
  
  return (
    <Stepper activeStep={activeStep}  orientation='vertical' >
        {steps.map((step,idx)=>(
            <Step key={step}>
                <StepLabel className='flex items-center justify-center gap-3'>
                     <div className='flex gap-4 items-center'>
                         {idx===activeStep&&idx<2 &&(
                        <CircularProgress size={18} color='primary'/>
                    )}
                    <span className='sora-regular text-slate-200 text-xl scale-105' >{step}</span>
                     </div>
                  
                </StepLabel>
            </Step>
        ))}
    </Stepper>
  )
}

export default LoadingStepper