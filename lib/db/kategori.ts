import {
  doc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";

export const getKategoriById = async (id: any) => {
  const q = query(collection(db, "kategoris"), where("id", "==", id));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products[0];
};

export const getKategoriList = async () => {
  const q = query(collection(db, "kategori"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
};

export const getKategori = async () => {
  const q = query(collection(db, "kategori"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
};

export const updateKategori = async (id: any, data: any) => {
  const kategoriRef = doc(db, "kategori", id);
  const newKategori = {
    kategori: data,
    timestamp: serverTimestamp(),
  };
  await updateDoc(kategoriRef, newKategori);
  return newKategori;
};

export const deleteKategori = async (id: any) => {
  const kategoriRef = doc(db, "kategori", id);
  await deleteDoc(kategoriRef);
};
