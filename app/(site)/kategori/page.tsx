"use client";
import Link from "next/link";
import { getKategori, deleteKategori } from "@/lib/db/kategori";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export default function page() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [slug, setSlug] = useState("");
  const [name, setName] = useState("");

  const handleDelete = async (id: string) => {
    await deleteKategori(id);
    router.refresh();
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["kategori"],
    queryFn: () => getKategori(),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const kategoriRef = collection(db, "kategori");
      const newKategori = {
        name: name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
        createdAt: serverTimestamp(),
        timestamp: serverTimestamp(),
      };
      await addDoc(kategoriRef, newKategori);
      router.refresh();
    } catch (error: any) {
      setError(error.message);
      alert(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-center w-screen bg-gradient-to-b from-[#2e026d] to-[#0e102e] h-screen">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col justify-center rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
            {data?.length === 0 ? (
              <h3 className="text-xl text-sky-600 text-center italic mt-4 mb-2 px-2 py-1 rounded-lg font-bold">
                Belum ada kategori
              </h3>
            ) : null}

            <h3 className="text-xl text-sky-600 text-center italic mt-4 mb-2 px-2 py-1 rounded-lg font-bold">
              Tambah Kategori
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="text"
                name="name"
                placeholder="Nama kategori"
                autoComplete="off"
                required
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                minLength={3}
                maxLength={20}
                className="rounded-lg border-2 text-black border-white/10 p-2"
              />
              <input
                type="text"
                name="slug"
                placeholder="Slug kategori"
                className="rounded-lg border-2 border-white/10 p-2"
              />
              <button
                type="submit"
                className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
              >
                Tambah
              </button>
            </form>
          </div>
        </div>
        {/* buatkan kategori di sini dengan card di grid atau flex 4 baris */}
        <div className="flex flex-col justify-center gap-4 my-3 mx-5 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
          <h3 className="text-2xl font-bold">Kategori →</h3>
          <div className="grid grid-cols-4 gap-4">
            {data?.map((kategori: any, index) => (
              <div className="flex flex-col gap-2">
                <Link
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`/kategori/${kategori.slug}`}
                  className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
                >
                  {kategori.name}
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(kategori.id)}
                  className="justify-self-end items-end rounded-lg bg-white/10 p-2 text-white hover:bg-white/20"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
