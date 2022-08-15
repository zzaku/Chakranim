import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import 'firebase/auth'

const app =  initializeApp({
  apiKey: "AIzaSyDI8wtsp3-QZVtOsfoNnAphtSaOFqGWR2Y",
  authDomain: "chakranimes-67c42.firebaseapp.com",
  projectId: "chakranimes-67c42",
  storageBucket: "chakranimes-67c42.appspot.com",
  messagingSenderId: "741902551118",
  appId: "1:741902551118:web:1a78ea4edd1d85a2b69b1f",
  });

export const auth = getAuth(app);
export const db = getFirestore(app)
export default app