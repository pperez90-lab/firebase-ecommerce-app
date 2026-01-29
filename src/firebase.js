// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBvp0nOIlEGIliIHwRtolIf_J5vlazqK0",
  authDomain: "fakestore-ecommerce-firebase.firebaseapp.com",
  projectId: "fakestore-ecommerce-firebase",
  storageBucket: "fakestore-ecommerce-firebase.firebasestorage.app",
  messagingSenderId: "780518462982",
  appId: "1:780518462982:web:af1b4b25e9171e935b1587",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
