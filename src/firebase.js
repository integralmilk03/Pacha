import { initializeApp } from "firebase/app";
import {getDatabase, ref, onValue, set, child } from "firebase/database";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {     
    apiKey: "AIzaSyDpNriOHnMI_EAKi4aTZcEDc75UHyY9nw8",
    authDomain: "pacha-emg.firebaseapp.com",
    projectId: "pacha-emg",
    storageBucket: "pacha-emg.appspot.com",
    messagingSenderId: "206266393877",
    appId: "1:206266393877:web:53ec89a198a5c953dfb51c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

export { db, ref, onValue, set, child };