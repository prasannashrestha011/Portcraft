"use client"
import { useResultStore } from '@/store/resultStore'
import Link from 'next/link'
import React from 'react'

const ResultPage = () => {
    const rawHTML=useResultStore((state)=>state.resultHTML)
    const cleanedHTML = rawHTML
  .replace(/^```[a-zA-Z]*\n?/, '')  // remove starting ```
  .replace(/```$/, '');    
  return (
    <div className='bg-blue-800 h-svh sora-regular'>
      <header className='flex  flex-col justify-center items-center '>
       <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-2">
      <span role="img" aria-label="confetti">🎉</span>
      Congratulations!
      <span role="img" aria-label="confetti">🎉</span>
    </h1>
  <p className="text-lg md:text-xl">You&apos;ve successfully created your portfolio!</p>

      </header>
       <main className=' w-full flex flex-col justify-center items-center h-8/12  '>
        
         <iframe
      srcDoc={cleanedHTML}
      className='rounded-2xl'
      style={{ width: "50%", height: "50vh", border: "none" }}
      sandbox="allow-scripts allow-same-origin"
      />
      <Link href={"/result/user"} className='mt-4 bg-green-600 hover:bg-green-800 transition-colors duration-100 ease-in-out p-3 rounded-md '>View the full page</Link>

       </main>
    </div>
  )
}

export default ResultPage