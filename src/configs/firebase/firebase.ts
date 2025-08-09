import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG || "{}"
);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
githubProvider.addScope("repo");
githubProvider.addScope("workflow");
export { app, auth, db, googleProvider, githubProvider };
