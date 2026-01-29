import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const productsCol = collection(db, "products");

// Fetch all products
export const fetchAllProductsFirebase = async () => {
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Optionally: fetch by category
export const fetchProductsByCategoryFirebase = async (category) => {
  const q = query(productsCol, where("category", "==", category));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Create product
export const createProductFirebase = async (product) => {
  const docRef = await addDoc(productsCol, product);
  return { id: docRef.id, ...product };
};

// Update
export const updateProductFirebase = async (id, product) => {
  const ref = doc(db, "products", id);
  await updateDoc(ref, product);
};

// Delete
export const deleteProductFirebase = async (id) => {
  const ref = doc(db, "products", id);
  await deleteDoc(ref);
};
