"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setDoc, collection, doc, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  StorageObserver,
} from "firebase/storage";

export default function FormProduct() {
  const router = useRouter();
  const [kategori, setKategori] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "kategori"));
      const categories = querySnapshot.docs.map((doc) => doc.data());
      setKategori(categories as any);
    };

    fetchCategories();
    setLoading(false);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storageRef = ref(storage, `product-images/${image?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image as File);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    });

    const download = await getDownloadURL(uploadTask.snapshot.ref);

    const data = {
      name: name,
      description: description,
      price: price,
      category: category,
      stock: stock,
      quantity: quantity,
      image: download,
    };

    await addDoc(collection(db, "products"), data);

    router.push("/product");

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  const handleCancel = () => {
    router.push("/product");
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Form Product</h1>
        <div className="w-96 rounded-md bg-violet-600 text-white">
          <h1 className="text-center">Form Product</h1>
          <form
            className="flex flex-col items-center justify-center gap-4"
            onSubmit={handleFormSubmit}
            method="post"
            encType="multipart/form-data"
            id="form-product"
          >
            {error && <p className="text-red-500">{error}</p>}
            {loading && (
              <div className="w-32 h-32 rounded-full relative">
                <div className="animate-ping w-full h-full bg-slate-200 rounded-full">
                  <p className="text-3xl font-bold">+</p>
                </div>
              </div>
            )}
            <div className="w-32 h-32 rounded-full relative">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Preview"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center">
                  <p className="text-3xl font-bold">+</p>
                </div>
              )}
            </div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="border p-2 rounded text-slate-950 bg-slate-50"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              className="border p-2 rounded text-slate-950 bg-slate-50"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              className="border p-2 rounded text-slate-950 bg-slate-50"
              placeholder="Price"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              className="border p-2 rounded text-slate-950 bg-slate-50"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {kategori.map((item: any) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              name="stock"
              id="stock"
              className="border p-2 rounded text-slate-950 bg-slate-50"
              placeholder="Stock"
              onChange={(e) => setStock(Number(e.target.value))}
            />
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="border p-2 rounded text-slate-950 bg-slate-50"
              placeholder="Quantity"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
            <label htmlFor="image">Image</label>
            <input
              type="file"
              name="image"
              id="image"
              className="border p-2 rounded text-slate-950 bg-slate-50"
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={200}
              />
            )}
            <div className="flex items-center justify-center gap-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
