// src/firebase/auth.js
// Google Authentication işlemleri için helper fonksiyonlar

import { auth, provider } from "./firebaseConfig";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Google ile giriş
export function signInWithGoogle() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    })
    .catch((error) => {
      console.error("Google login error:", error);
    });
}

// Çıkış
export function signOutUser() {
  return signOut(auth);
}

// Kullanıcı durumunu dinleme (admin panel için gerekli)
export function onAuthStateChangedListener(callback) {
  return onAuthStateChanged(auth, callback);
}
