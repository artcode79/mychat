"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteProduct, getProducts } from "@/lib/db/product";

export default function CardProduct() {
  const router = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProducts(),
  });

  const handleDelete = async (id: string) => {
    const result = await deleteProduct(id);
    if (result as any) {
      router.push("/product");
    }
  };

  const handleEdit = async (id: string) => {
    router.push(`/product/edit/${id}`);
  };

  const handleView = async (id: string) => {
    router.push(`/product/${id}`);
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1>Something went wrong</h1>
        <button
          type="button"
          onClick={() => router.push("/product/create")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>
    );
  }

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        ></div>
        <span className="visually-hidden">Loading...</span>
      </div>
    );

  console.log(data);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => router.push("/product/create")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>
      <div className="flex flex-wrap justify-center -mb-4 -mx-1 my-2">
        {data?.map((product: any) => (
          <div
            key={product.id}
            className="w-1/3 mb-4 px-2"
            onClick={() => handleView(product.id)}
          >
            <div className="max-w-sm flex flex-col rounded-lg overflow-hidden bg-slate-100 shadow">
              <Image
                className="h-56 w-56 object-cover"
                src={product.image}
                width={380}
                height={380}
                alt={product.name}
                placeholder="blur"
                blurDataURL={product.image}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="flex-1 px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">
                  {product.description.substring(0, 30)}
                </p>
                <p className="text-gray-700 text-lg text-end">
                  Rp. {product.price.toLocaleString("id-ID")}
                </p>
                <p className="text-gray-700 text-sm text-end">
                  Stock: {product.stock}
                </p>
              </div>

              <div className="px-6 py-4  bg-gray-100">
                <button
                  type="button"
                  className="bg-blue-600 mr-2 hover:bg-blue-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 mr-2 hover:bg-red-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => handleView(product.id)}
                  className="bg-violet-600 hover:bg-violet-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
