
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyAnmt3YyI1RMQ_fbuve46Msa6FJzrpK4qY",
  authDomain: "super-shows-store.firebaseapp.com",
  projectId: "super-shows-store",
  storageBucket: "super-shows-store.firebasestorage.app",
  messagingSenderId: "914714114967",
  appId: "1:914714114967:web:cc1ef8817059cbf0f1a2d2",
  measurementId: "G-2PGY9WWEXT"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);