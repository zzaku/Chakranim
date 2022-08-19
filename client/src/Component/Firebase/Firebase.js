import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import 'firebase/auth'

const app =  initializeApp({
  apiKey: "AIzaSyAY6b-unMpwJF34TZTaUlKnthJOFHkW-y8",
  authDomain: "chakranimes-9dec8.firebaseapp.com",
  projectId: "chakranimes-9dec8",
  storageBucket: "chakranimes-9dec8.appspot.com",
  messagingSenderId: "906490506414",
  appId: "1:906490506414:web:357bdf99b1d3ada045513f"
  });

export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app