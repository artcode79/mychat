"use client";
import CardProduct from "@/components/CardProduct";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="flex flex-col justify-items-center w-screen bg-gradient-to-b from-[#2e026d] to-[#0e102e] ">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Product
          </h1>
        </div>
        <CardProduct />
      </div>
    </>
  );
}
