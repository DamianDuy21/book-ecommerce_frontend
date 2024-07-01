// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDxegTp6v6b4CJvYOoBCpCwCV4_nHOXRtQ",
    authDomain: "book-ecommerce-upload.firebaseapp.com",
    projectId: "book-ecommerce-upload",
    storageBucket: "book-ecommerce-upload.appspot.com",
    messagingSenderId: "571012589072",
    appId: "1:571012589072:web:28c08192fb1b7affc94c95",
    measurementId: "G-YR17Q39K95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);