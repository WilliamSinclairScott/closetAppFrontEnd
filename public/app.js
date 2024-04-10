// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
//import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import {getStorage, ref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-storage.js";

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
const storage = getStorage(firebase);
// const storageRef = ref(storage, 'images');
//const analytics = getAnalytics(firebase);
const whenSignedIn = document.getElementById('whenLoggedIn');
const whenSignedOut = document.getElementById('whenLoggedOut');
const signInBtn = document.getElementById('login');
const signOutBtn = document.getElementById('logout');
const addItemBtn = document.getElementById('addbtn');

//Sign In Firebase with google Auth
signInBtn.onclick = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      // console.log('Hello, ' + user.displayName);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

signOutBtn.onclick = () => auth.signOut();

addItemBtn.onclick = () => {
  addItemBtn.disabled = true;
  const tags = ['T-shirt', 'Jeans', 'Dress', 'Sweater', 'Skirt', 'Shoes'];
  addAddItemPopUp(tags)
}

auth.onAuthStateChanged(user => {
  if (user) {
    fetch(`https://my-closet-app-backend-73fd1180df5d.herokuapp.com/user/userID/${user.uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      //If the User is not found, create a new user
      if (data.status === 404) {
        fetch(`https://my-closet-app-backend-73fd1180df5d.herokuapp.com/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            "name": user.displayName,
            "userID": user.uid,
            "closetItems": []
          })
        }).then(response => {
          if (response.ok) {
            console.log('New user created');
            //Switch to LoggedIn Display
            console.log('Welcome New User, ' + user.displayName);
            whenSignedIn.style.display = 'grid';
            whenSignedOut.style.display = 'none';
          } else {
            console.log('Failed to create new user');
            //Switch to LoggedIn Display
            whenSignedIn.style.display = 'grid';
            whenSignedOut.style.display = 'none';
          }
        }).catch(error => {
          console.log('Error creating new user:', error.message);
        });
      } 
      //If the User is found, orgainze the data fetched
      else {
        //Switch to LoggedIn Display
        console.log('Welcome, ' + user.displayName);
        data.json().then(data => console.log(data.closetItems));
        //TODO load data from backend

        whenSignedIn.style.display = 'grid';
        whenSignedOut.style.display = 'none';
      }
    }).catch(error => {
      console.log('Error fetching user:', error.message);
    })
  } else {
    console.log('User is signed out')
    whenSignedIn.style.display = 'none'
    whenSignedOut.style.display = 'flex'
  }
})


function addAddItemPopUp(tags) {
  // Create a section element
  const section = document.createElement('section');
  section.id = 'addItemPopUp';

  // Create a form element
  const form = document.createElement('form');
  form.action = '/upload';
  form.method = 'post';
  form.enctype = 'multipart/form-data';

  // Create name input field
  const nameLabel = document.createElement('label');
  nameLabel.for = 'name';
  nameLabel.textContent = 'Name:';
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.name = 'name';
  nameInput.required = true;
  const nameBreak = document.createElement('br');
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(nameBreak);

  // Create file input field
  const pictureLabel = document.createElement('label');
  pictureLabel.for = 'picture';
  pictureLabel.textContent = 'Choose a picture:';
  const pictureInput = document.createElement('input');
  pictureInput.type = 'file';
  pictureInput.id = 'picture';
  pictureInput.name = 'picture';
  pictureInput.accept = 'image/*';
  pictureInput.required = true;
  const pictureBreak = document.createElement('br');
  form.appendChild(pictureLabel);
  form.appendChild(pictureInput);
  form.appendChild(pictureBreak);

  // Create preview image
  const preview = document.createElement('img');
  preview.id = 'previewAddItem';
  preview.src = '';
  preview.style.width = '100px';
  preview.style.height = '100px';
  form.appendChild(preview);

  // Create fieldset for tags
  const fieldset = document.createElement('fieldset');
  const legend = document.createElement('legend');
  legend.textContent = 'Select tags:';
  fieldset.appendChild(legend);

  // Create checkboxes for tags
  tags.forEach(tag => {
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = 'tags[]';
    checkbox.value = tag;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(` ${tag}`));
    fieldset.appendChild(label);
  });

  // Add fieldset to form
  form.appendChild(fieldset);

  // Create submit button
  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.value = 'Upload';
  form.appendChild(submitButton);
  // Create cancel button
  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'Cancel';
  cancelButton.type = 'button';
  cancelButton.addEventListener('click', () => {
    // Remove the section from the DOM
    section.remove();
    addItemBtn.disabled = false;
  });
  form.appendChild(cancelButton);
  // Add form to section
  section.appendChild(form);

  // Append the section after the body of the document
  document.body.appendChild(section);
  //add event listener to update preview image
  pictureInput.addEventListener('change', () => {
    const file = pictureInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
    }
    reader.readAsDataURL(file);
  });
  //Add listener for submit button
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    formData.forEach(function(value, key) {
      //console.log(key + ': ' + value);
      if (key === 'picture') {
        const file = value;
        const storageRef = ref(storage, 'images/' + file.name);
        uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(storageRef).then((url) => {
            console.log('File available at', url);
            value = url;
          });
        });
      }
    });
    //fetch('/upload', {
  });
}
