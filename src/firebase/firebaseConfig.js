// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyABoyyFqDqLq8J3bpd4MaykXRHqovQqpjQ",
  authDomain: "gts-sms.firebaseapp.com",
  projectId: "gts-sms",
  storageBucket: "gts-sms.firebasestorage.app",
  messagingSenderId: "219415919225",
  appId: "1:219415919225:web:41b429c0e0c4e6c0e172a8",
};
// import { db } from "../../../firebase/firebaseConfig";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Ensure session persistence
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("Firebase Auth Persistence Enabled");
  })
  .catch((error) => {
    console.error(" Firebase Persistence Error:", error);
  });

export { auth, db, storage };

/*

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyABoyyFqDqLq8J3bpd4MaykXRHqovQqpjQ",
//   authDomain: "gts-sms.firebaseapp.com",
//   projectId: "gts-sms",
//   storageBucket: "gts-sms.firebasestorage.app",
//   messagingSenderId: "219415919225",
//   appId: "1:219415919225:web:41b429c0e0c4e6c0e172a8"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
*/
