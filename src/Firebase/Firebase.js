
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyC9Rlfmy9h5FoqubeywCM0egPzQh9XLzf4",
  authDomain: "perscripto-hostpital.firebaseapp.com",
  projectId: "perscripto-hostpital",
  storageBucket: "perscripto-hostpital.firebasestorage.app",
  messagingSenderId: "511080851908",
  appId: "1:511080851908:web:2a273577274fdf8d78dc91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const auth=getAuth(app)