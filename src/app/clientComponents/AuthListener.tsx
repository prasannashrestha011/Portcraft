'use client'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useUserStore } from '@/store/userStore'

export function AuthListener() {
  const setUser = useUserStore((state) => state.setUser)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
     if(user){
      setUser(user)
     } 
    })
    return () => unsubscribe()
  }, [setUser])

  return null
}
