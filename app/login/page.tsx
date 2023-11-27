"use client";
import React, { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      router.push("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-4"
          >
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-96 rounded-md border border-gray-300 p-2"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-96 rounded-md border border-gray-300 p-2"
            />

            <button
              type="submit"
              className="w-96 rounded-md bg-violet-600 p-2 text-white"
            >
              Sign In
            </button>
          </form>
          <button
            onClick={handleGoogleLogin}
            className="w-96 rounded-md bg-gray-600 p-2 text-white"
          >
            Sign In with Google
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default page;
