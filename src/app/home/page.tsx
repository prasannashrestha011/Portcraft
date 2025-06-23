 "use client"
import { useUserStore } from '@/store/userStore'
import React, { useEffect } from 'react'

const HomePage = () => {
    const {user}=useUserStore()
    useEffect(()=>{
        console.log("USER ",user);
    },[user])
    if(!user){
        return<div>Loading ...</div>
    }
  return (
    <div> 
        <nav className='flex gap-3 justify-end items-center mt-2 mr-1'>
            <img src={`${user?.photoURL}`} className='w-8 rounded-full '/>
<span className='sora-regular'>{user?.displayName}</span>

        </nav>
    </div>
  )
}
export default  HomePage   