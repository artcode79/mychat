"use client";
import React from "react";
import {
  onAuthStateChanged,
  ActionCodeInfo,
  initializeAuth,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function page() {
  const [user, setUser] = React.useState<ActionCodeInfo | null>(null);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user as any);
      } else {
        setUser(null);
      }
    });
  }, []);

  console.log(auth.currentUser?.email);
  return (
    <>
      <div className="flex flex-col justify-center w-screen bg-gradient-to-b from-[#2e026d] to-[#0e102e] h-screen">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Setting
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            {auth.currentUser?.email ? auth.currentUser?.email : "Loading..."}
          </h1>
        </div>
      </div>
    </>
  );
}
