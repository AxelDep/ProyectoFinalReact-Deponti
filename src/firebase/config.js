// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAq5Jt4CP0E2L7Tc2kZjVCO0JO7t-H3sH8",
  authDomain: "remeras-shop-deponti.firebaseapp.com",
  projectId: "remeras-shop-deponti",
  storageBucket: "remeras-shop-deponti.firebasestorage.app",
  messagingSenderId: "955953413682",
  appId: "1:955953413682:web:b6328179df8934f00c462b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
