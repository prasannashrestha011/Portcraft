"use client";
import { Button } from "@mui/material";
import axios from "axios";
import { Auth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
interface AuthProp {
  auth: Auth;
}
export function SignOut({ auth }: AuthProp) {
  const nav = useRouter();
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      await axios.get(`${process.env.NEXT_PUBLIC_ROOT_URL}/api/session/logout`);
      nav.replace("/");
    } catch (err) {
      console.log("Logout error-> ", err);
    }
  };
  return <Button onClick={() => handleLogOut()}>SignOut</Button>;
}
