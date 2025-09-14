// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCxYuPUMzoSMwzjxFVy_fZT5Jkf2DDvjg",
  authDomain: "plant-care-reminder-21eca.firebaseapp.com",
  projectId: "plant-care-reminder-21eca",
  storageBucket: "plant-care-reminder-21eca.firebasestorage.app",
  messagingSenderId: "758559308139",
  appId: "1:758559308139:web:bbfb76780eca994890f42e",
  measurementId: "G-06DP805B5M"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
//export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP); // 👈 keep Firestore separate // 👈 RTDB instance
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP)
