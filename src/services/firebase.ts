import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebaseアプリの作成
const firebaseConfig = {
  apiKey: "AIzaSyDsXiEqqB6WqFqeiWu7o39om9yXEcQNGAY",
  authDomain: "budget-app-da1f4.firebaseapp.com",
  projectId: "budget-app-da1f4",
  storageBucket: "budget-app-da1f4.appspot.com",
  messagingSenderId: "627013519269",
  appId: "1:627013519269:web:147a9c7a96147d3135ca4c",
  measurementId: "G-2G540NLD91",
};

const app = initializeApp(firebaseConfig);

// authとfirestoreのインスタンスの取得
export const auth = getAuth(app);
export const db = getFirestore(app);
