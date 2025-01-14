import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB75ze9zZDqipft-vFwryyfqsiBAnnFZsE",
  authDomain: "stoichify-1751f.firebaseapp.com",
  projectId: "stoichify-1751f",
  storageBucket: "stoichify-1751f.firebasestorage.app",
  messagingSenderId: "1036513487255",
  appId: "1:1036513487255:web:94ed2d9cd263df4506bcd2",
  measurementId: "G-ZFNPKJZGGR"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);