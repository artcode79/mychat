"use client";
import React from "react";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Kategori {
  name: string;
  slug: string;
}

export default function page() {
  const postKategori = async (formData: FormData) => {
    const kategoriRef = collection(db, "kategori");
    const newKategori = {
      name: formData.get("name"),
      slug: formData.get("slug"),
      createdAt: serverTimestamp(),
    };
    const docRef = await addDoc(kategoriRef, newKategori);
    alert(`Kategori ${docRef.id} berhasil dibuat`);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen bg-gradient-to-b from-[#2e026d] to-[#0e102e]">
        <div className="flex flex-col items-center justify-center gap-12 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Kategori
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <form action={postKategori} className="flex flex-col gap-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border p-2 rounded text-slate-950 bg-slate-50"
                placeholder="Name"
              />
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                name="slug"
                id="slug"
                required
                minLength={3}
                maxLength={100}
                pattern="[a-z0-9-]*"
                title="Slug must only contain lowercase letters, numbers, and hyphens."
                className="border p-2 rounded text-slate-950 bg-slate-50"
                placeholder="Slug"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {" "}
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
