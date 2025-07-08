// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "my-projects-6f448.firebaseapp.com",
  projectId: "my-projects-6f448",
  storageBucket: "my-projects-6f448.firebasestorage.app",
  messagingSenderId: "686504345354",
  appId: "1:686504345354:web:bad06d05c09e1636fdc4f3",
  measurementId: "G-GFET54FXBZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)