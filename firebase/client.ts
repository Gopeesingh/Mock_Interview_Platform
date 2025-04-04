
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOO6E3MCzCzLRg9ApTrjGrGqS2HDJc-HM",
  authDomain: "prewise-a5048.firebaseapp.com",
  projectId: "prewise-a5048",
  storageBucket: "prewise-a5048.firebasestorage.app",
  messagingSenderId: "992749997550",
  appId: "1:992749997550:web:169daf23c5d7fe06cd52ff",
  measurementId: "G-KE731ML8WY"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);