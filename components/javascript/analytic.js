// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrX2nYYWhjQ6IW1-lqVsp_SjUgQ6L7TXc",
    authDomain: "mlsh-vocabulary.firebaseapp.com",
    projectId: "mlsh-vocabulary",
    storageBucket: "mlsh-vocabulary.appspot.com",
    messagingSenderId: "63650314327",
    appId: "1:63650314327:web:220c6da7b04183f8b98b12",
    measurementId: "G-XR19ZLP7SM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

