'use client'
import { auth, googleProvider } from '@/firebase/firebase'
import { useUserStore } from '@/store/userStore'
import { Button } from '@mui/material'
import { getIdToken, onAuthStateChanged, signInWithPopup  } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect  } from 'react'

const LoginPage = () => {
  const {user,setUser}=useUserStore()
  const router=useRouter()
  const handleGoogleSignIn=async()=>{
    try{
      const result=await signInWithPopup(auth,googleProvider);
      console.log("Auth resultl",result);
      if(result){
      setUser(result.user);
      }
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,async(user)=>{
      if(!user) return 
      setUser(user);
      const token=await getIdToken(user,true)
      await fetch("/api/session",{
        method:"POST",
        headers:{"Content-type":"applications/json"},
        body:JSON.stringify({token})
      })
      router.replace("/home")
    })
    return ()=>unsubscribe()
  },[])
  return (
      <div>
        {user?(
          <span>Redirecting to the home page..</span>
        ):(
<Button onClick={()=>handleGoogleSignIn()}>Sign In</Button>
        )}
      </div>
  )
}

export default LoginPage 