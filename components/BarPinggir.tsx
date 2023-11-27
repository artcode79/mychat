"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

{
  /* sidebar pinggir bisa di open dengan tombol di header di ubah sesuai kebutuhan menggunakan tailwind */
}
export default function BarPinggir({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
  });

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex justify-between px-4 py-2 bg-gradient-to-r from-blue-500 via-red-600 to-violet-700">
        <button
          className="flex items-center justify-center gap-2 rounded-md bg-blue-500 p-2 text-white"
          onClick={toggleSidebar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3.75 12a.75.75 0 100 1.5h16.5a.75.75 0 100-1.5H3.75zm0 5a.75.75 0 100 1.5h16.5a.75.75 0 100-1.5H3.75z"
              clipRule="evenodd"
            />
          </svg>
          <span>Menu</span>
        </button>
        <button
          className="flex items-center justify-center gap-2 rounded-md bg-blue-500 p-2 text-white"
          onClick={handleLogout}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
      {/* sidebar pinggir di bawah header */}
      <div className="flex flex-col bg-gradient-to-r from-blue-500 via-red-600 to-violet-700">
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } fixed inset-0 z-10 bg-black bg-opacity-50`}
        ></div>
        <div
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-20 w-64 bg-white transition-transform duration-300 ease-in-out`}
          ref={ref}
        >
          <div className="flex h-16 items-center justify-center bg-gradient-to-r from-blue-500 via-red-600 to-violet-700">
            <h1 className="text-2xl font-bold text-white">Menu</h1>
          </div>
          <div className="flex flex-col p-4">
            <Link
              href="/"
              className="block rounded-md p-2 text-white hover:bg-blue-500"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-md p-2 text-white hover:bg-blue-500"
              onClick={handleLinkClick}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4">{children}</div>
    </>
  );
}
