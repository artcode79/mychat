import {
  addDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const addProduct = async (
  title: string,
  description: string,
  image: string,
  price: number,
  category: string,
  stock: number,
  userId: string,
  quantity: number
) => {
  const productRef = collection(db, "products");
  const newProduct = {
    title,
    description,
    image,
    price,
    category,
    stock,
    userId,
    quantity,
    timestamp: serverTimestamp(),
  };
  await addDoc(productRef, newProduct);
  return newProduct;
};

export const getProducts = async () => {
  const q = query(collection(db, "products"));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
};

export const getProduct = async (id: any) => {
  const q = query(collection(db, "products"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products[0];
};
export const deleteProduct = async (id: any) => {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
};

export const updateProduct = async (id: any, data: any) => {
  const productRef = doc(db, "products", id);
  const newProduct = {
    ...data,
    timestamp: serverTimestamp(),
  };
  await updateDoc(productRef, newProduct);
  return newProduct;
};
