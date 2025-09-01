// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAEBJXCSc8HH6jVLm0IsDW9AVkvNtSf9XU",
  authDomain: "beestock-27413.firebaseapp.com",
  projectId: "beestock-27413",
  storageBucket: "beestock-27413.firebasestorage.app",
  messagingSenderId: "826723947759",
  appId: "1:826723947759:web:c07e26ca3ec2e0c84a371a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);