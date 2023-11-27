"use client";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  });

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      {user ? (
        <>{children}</>
      ) : (
        <div className="flex h-screen w-screen items-center justify-center">
          <h1 className="text-3xl font-bold">Please Sign In</h1>
          <button
            className="ml-2 rounded-md bg-blue-500 p-3 text-white"
            onClick={() => router.push("/login")}
          >
            Sign Out
          </button>
        </div>
      )}
    </>
  );
};

export default Provider;
