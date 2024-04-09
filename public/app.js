// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

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
const auth = getAuth();
const provider = new GoogleAuthProvider();
//const analytics = getAnalytics(firebase);
const whenSignedIn = document.getElementById('whenLoggedIn');
const whenSignedOut = document.getElementById('whenLoggedOut');
const signInBtn = document.getElementById('login');
const signOutBtn = document.getElementById('logout');

signInBtn.onclick = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('Hello, ' + user.displayName);
    })
    .catch((error) => {
      console.log(error.message);
    });
}
signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
  if (user) {
    console.log('User is signed in');
    whenSignedIn.style.display = 'flex';
    whenSignedOut.style.display = 'none';
    whenSignedOut.hidden = true;
  } else {
    console.log('User is signed out')
    whenSignedIn.style.display = 'none'
    whenSignedOut.style.display = 'flex'
  }
})