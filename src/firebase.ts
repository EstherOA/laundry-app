// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPboOYMLIwjQuwyx56oGADHOqzx05wVww",
  authDomain: "chapman-prestige-laundry.firebaseapp.com",
  projectId: "chapman-prestige-laundry",
  storageBucket: "chapman-prestige-laundry.firebasestorage.app",
  messagingSenderId: "739081123267",
  appId: "1:739081123267:web:d4c17a791d48156c917976",
  measurementId: "G-G0MVE2XHP0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics, RecaptchaVerifier };
