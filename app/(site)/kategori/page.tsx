"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  getDocs,
  query,
  doc,
  collection,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function page() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "kategori"),
          orderBy("timestamp", "desc")
        );
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
      <div className="flex flex-col items-center justify-center w-screen bg-gradient-to-b from-[#2e026d] to-[#0e102e]">
        <div className="flex flex-col items-center justify-center gap-12 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Kategori
          </h1>
          <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            <h3 className="text-2xl font-bold">Kategori →</h3>
            <Link href="/kategori/create" className="text-lg">
              Buat Kategori
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            {data.map((item: any) => (
              <Link
                href={`/kategori/${item.slug}`}
                key={item.id}
                className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              >
                <h3 className="text-2xl font-bold">{item.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
