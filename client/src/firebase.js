// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  //we use vite and not react app, we need to use import.meta.env
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a4b4d.firebaseapp.com",
  projectId: "mern-blog-a4b4d",
  storageBucket: "mern-blog-a4b4d.appspot.com",
  messagingSenderId: "196156492213",
  appId: "1:196156492213:web:2e4ceb34222c49c1a4f1fc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);