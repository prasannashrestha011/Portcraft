import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "{}"
);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
export { app, auth, db, googleProvider };
