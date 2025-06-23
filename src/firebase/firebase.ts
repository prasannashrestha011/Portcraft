import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"


// Initialize Firebase
const app = initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string));
const auth=getAuth(app)
const googleProvider= new GoogleAuthProvider()
export {app,auth,googleProvider}