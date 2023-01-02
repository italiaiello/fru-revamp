// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIJBGrKBsaFH2Fd6Qd2caIdZ4wnGT4q6I",
  authDomain: "football-round-up-c04ff.firebaseapp.com",
  databaseURL: "https://football-round-up-c04ff-default-rtdb.firebaseio.com",
  projectId: "football-round-up-c04ff",
  storageBucket: "football-round-up-c04ff.appspot.com",
  messagingSenderId: "769746701979",
  appId: "1:769746701979:web:48456bf27ca18a854b803e"
};

// Initialize Firebase
const firebase_app = initializeApp(firebaseConfig);
export const database = getDatabase(firebase_app);
export const auth = getAuth(firebase_app);