import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSfMRWDd80qL6ogQ-iCxQAlkCooH9Vp0",
  authDomain: "chatgpt-21b7d.firebaseapp.com",
  projectId: "chatgpt-21b7d",
  storageBucket: "chatgpt-21b7d.appspot.com",
  messagingSenderId: "877503878886",
  appId: "1:877503878886:web:60495a66ed86d059054d27",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
