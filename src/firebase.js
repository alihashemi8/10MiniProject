// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCjEWaJoIERSwLGzrkgFHnzNahrynFnNS4",
  authDomain: "miniprj-5a7a0.firebaseapp.com",
  projectId: "miniprj-5a7a0",
  storageBucket: "miniprj-5a7a0.appspot.com",
  messagingSenderId: "228802826928",
  appId: "1:228802826928:web:c790bd5f6f5df91ec82175",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
