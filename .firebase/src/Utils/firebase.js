 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = { 
  apiKey: "AIzaSyD-m8IRCgCmKcSGFkIDkKNejpK8-PQua0s",
  authDomain: "netflixgpt-c1547.firebaseapp.com",
  projectId: "netflixgpt-c1547",
  storageBucket: "netflixgpt-c1547.firebasestorage.app",
  messagingSenderId: "681806232346",
  appId: "1:681806232346:web:09edf33d8aa589a1e14aa3",
  measurementId: "G-VJ9VQRHCRT"
};

// Initialize Firebase 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();