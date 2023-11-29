"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getDocs,
  query,
  doc,
  collection,
  addDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function page() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "kategori"), {
        name: name,
        slug: slug,
        createdAt: serverTimestamp(),
      });
      alert(`Kategori ${docRef.id} berhasil dibuat`);
      setLoading(false);
    } catch (error: any) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "kategori"));
        const querySnapshot = await getDocs(q);
        const products = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(products);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>{error || "Something went wrong"}</div>;

  return (
    <>
      <div className="flex flex-col justify-center w-screen bg-gradient-to-b from-[#2e026d] to-[#0e102e] h-screen">
        <div className="flex flex-col items-center justify-center gap-12 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Kategori
          </h1>
          <div className="flex flex-col justify-center gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            {data.length === 0 ? (
              <h3 className="text-2xl font-bold">Tidak ada kategori</h3>
            ) : null}

            <h3 className="text-2xl font-bold">Kategori →</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="border p-2 rounded text-slate-950 bg-slate-50"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                name="slug"
                id="slug"
                className="border p-2 rounded text-slate-950 bg-slate-50"
                placeholder="Slug"
                onChange={(e) => setSlug(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-xl bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Submit Kategori Baru 🚀{" "}
                <span className="text-sm font-medium">
                  (Kategori akan ditampilkan di halaman kategori)
                </span>
              </button>
              {error ? <p className="text-red-500">{error}</p> : null}
              {loading ? <p className="text-blue-500">Loading...</p> : null}
            </form>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {data.map((item: any) => (
              <Link
                href={`/kategori/${item.slug}`}
                key={item.id}
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              >
                <h3 className="text-2xl font-bold">{item.name}</h3>
                <p className="text-sm">{item.slug}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
