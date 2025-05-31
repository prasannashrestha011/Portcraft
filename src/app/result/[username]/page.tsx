"use client"
import { useResultStore } from '@/store/resultStore'

import React from 'react'

const FullHTMLPage = () => {
  const rawHTML=useResultStore((state)=>state.resultHTML)
    const cleanedHTML = rawHTML
  .replace(/^```[a-zA-Z]*\n?/, '')  // remove starting ```
  .replace(/```$/, '');    
  return (
     <div dangerouslySetInnerHTML={{ __html: cleanedHTML }} />
  )
}


export default FullHTMLPage