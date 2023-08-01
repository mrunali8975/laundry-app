// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhbQhO_bDq4oHeMbeOpnI635mIlIs98ug",
  authDomain: "laundry-app-78002.firebaseapp.com",
  projectId: "laundry-app-78002",
  storageBucket: "laundry-app-78002.appspot.com",
  messagingSenderId: "872518633912",
  appId: "1:872518633912:web:e72c99813cb982dfc2a74d",
  measurementId: "G-B5QVHBNS4W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();
export { auth, db };
// Example function

// const analytics = getAnalytics(app);