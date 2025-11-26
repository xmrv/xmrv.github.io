// src/firebase/firebaseConfig.js
// !!! ÖNEMLİ: Buradaki config değerlerini kendi Firebase projenle değiştireceksin.

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// --- Firebase Config ---
// Firebase Console → Project Settings → Web App → SDK Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MSG_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// --- Firebase Başlatma ---
const app = initializeApp(firebaseConfig);

// --- Auth ---
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

// --- Firestore ---
export const db = getFirestore(app);

export default app;
