// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFD9PXx1lhRbnoSM7b7yKI9J_WhqIlG0c",
  authDomain: "myclosetapp-116e9.firebaseapp.com",
  projectId: "myclosetapp-116e9",
  storageBucket: "myclosetapp-116e9.appspot.com",
  messagingSenderId: "223217430305",
  appId: "1:223217430305:web:46c536abed081d23b95860",
  measurementId: "G-9V3W1TCEJX"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebase);
