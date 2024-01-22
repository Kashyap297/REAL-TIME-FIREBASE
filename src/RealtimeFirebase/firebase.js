// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTO_E3-0kxvLZcroYatcPtArYkUaQkE1k",
    authDomain: "pr-11---realtimefirebase.firebaseapp.com",
    projectId: "pr-11---realtimefirebase",
    storageBucket: "pr-11---realtimefirebase.appspot.com",
    messagingSenderId: "632669346026",
    appId: "1:632669346026:web:8dde695373e18adfd69f93",
    measurementId: "G-3NP3382HMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase(app)