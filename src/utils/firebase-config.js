// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAYZwdbxfuEJgttzy0CAXLGXUNRh1sO7cI",
  authDomain: "netflix-app-9eb1d.firebaseapp.com",
  projectId: "netflix-app-9eb1d",
  storageBucket: "netflix-app-9eb1d.appspot.com",
  messagingSenderId: "353619394849",
  appId: "1:353619394849:web:184be39571982cfe293e60",
  measurementId: "G-DF7KT6WJPN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
