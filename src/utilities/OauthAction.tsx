import { auth, googleProvider } from "@/configs/firebase/firebase";
import { signInWithPopup, User } from "firebase/auth";
export async function OauthSignInMethod({
  setUser,
}: {
  setUser: (user: User) => void;
}) {
  try {
    const response = await signInWithPopup(auth, googleProvider);
    if (response) {
      setUser(response.user);
    }
  } catch (err) {
    console.error(err);
    console.log("login failed");
    return;
  }
}
