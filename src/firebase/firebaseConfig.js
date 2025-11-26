// src/firebase/firebaseConfig.js
// !!! ÖNEMLİ: Buradaki config değerlerini kendi Firebase projenle değiştireceksin.

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- Firebase Config ---
// Firebase Console → Project Settings → Web App → SDK Config
const firebaseConfig = {
  apiKey: "AIzaSyCXxKXLSYdS1AViaW9OxGGjFT33zQNi7oQ",
  authDomain: "bst-menu.firebaseapp.com",
  projectId: "bst-menu",
  storageBucket: "bst-menu.firebasestorage.app",
  messagingSenderId: "626363437068",
  appId: "1:626363437068:web:13d804573d82e5dc835e29",
  measurementId: "G-NLQHVVDPH1"
};

// --- Firebase Başlatma ---
const app = initializeApp(firebaseConfig);

// --- Auth ---
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// --- Firestore ---
export const db = getFirestore(app);

export default app;
