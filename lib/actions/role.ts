// buatkan role admin , user , guest dengan role yang berbeda
// role admin : mengakses semua data
// role user : mengakses data yang diperlukan
// role guest : tidak mengakses data
// buatkan function untuk mengecek role user , admin , guest
//  dengan firebase firestore
//  dengan firebase auth

import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const checkRole = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await getIdTokenResult(user);
      const role = token.claims.sub;
      console.log(role);
    } else {
      console.log("User is not logged in");
    }
  });

  const usersRef = collection(db, "users");
  const q = query(usersRef, where("role", "==", "admin"));
  const querySnapshot = await getDocs(q);
  const users = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log(users);
};
