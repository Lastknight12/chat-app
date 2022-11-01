// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
import { getStorage, ref } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyD1hkfQJBPPMik5LH1Q3_FGx06mfbi4l_Y",
    authDomain: "chat-react-bbb9d.firebaseapp.com",
    projectId: "chat-react-bbb9d",
    storageBucket: "chat-react-bbb9d.appspot.com",
    messagingSenderId: "413247836069",
    appId: "1:413247836069:web:71f5437931670052e2224c",
    measurementId: "G-N4RSZP1TY9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore()