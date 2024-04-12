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
const itemBody = document.getElementById('ItemBody');


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

//Sign Out Firebase
signOutBtn.onclick = () => auth.signOut();

//Add ClosetItem Button
addItemBtn.onclick = () => {
  addItemBtn.disabled = true;
  const tags = [];
  fetch('https://my-closet-app-backend-73fd1180df5d.herokuapp.com/itemTag', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  //load the item Tags to make the init form
  .then((data) => {
    // -----------------------------------------------------------------------------------------
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
    const tagToID = {};
    data.json().then(data => {
      data.forEach(tag => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'tags[]';
        checkbox.value = tag.name;
        tagToID[tag.name] = tag._id;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${tag.name}`));
        fieldset.appendChild(label);
      });
    })
    // Add fieldset to form
    form.appendChild(fieldset);
  
    // Create tag input field
    const tagInput = document.createElement('input');
    tagInput.type = 'text';
    tagInput.id = 'newTag';
    tagInput.placeholder = 'Enter a new tag';
    const tagBreak = document.createElement('br');
    form.appendChild(tagInput);
    form.appendChild(tagBreak);
  
    // Add event listener to check if the new tag already exists
    tagInput.addEventListener('blur', () => {
      const newTag = tagInput.value.trim();
      if (newTag !== '' && !tags.includes(newTag)) {
        //before adding the new tag, check if the tag already exists in the database
        fetch(`https://my-closet-app-backend-73fd1180df5d.herokuapp.com/itemTag/name/${newTag}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        //if the tag is not found, create a new tag in the database
        .then(data => {
          if (data.status === 404) {
            console.log('Tag not found, creating in the database');
            fetch(`https://my-closet-app-backend-73fd1180df5d.herokuapp.com/itemTag`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ "name": newTag })
            }).then(response => {
              if (response.ok) {
                console.log('New tag created');
              } else {
                console.log('Failed to create new tag');
              }
            }).catch(error => {
              console.log('Error creating new tag:', error.message);
            });
          } else {
            console.log('Tag found, adding to tags array');
          }
        });
        //make the new tag a checkbox
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'tags[]';
        checkbox.value = newTag;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${newTag}`));
        fieldset.appendChild(label);
        tags.push(newTag);
      }
    });
  
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
    //-----------------------------------------------------------------------------------------

    //Add listener for submit button
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const getTags = new Promise((resolve, reject) => {
        let tagIDs = [];
        formData.getAll('tags[]').forEach(tag => {
          tagIDs.push(tagToID[tag]);
        });
        resolve(tagIDs);
      });
      //Get the tag IDs
      //Get the picture and upload it to firebase storage
      const file = formData.get('picture');
      const storageRef = ref(storage, 'images/' + file.name);
      let closetID = '';
      getTags.then(tagIDs => {
        uploadBytes(storageRef, file).then(() => {
          getDownloadURL(storageRef).then((url) => {

            //With the url, create the closetItem
            fetch('https://my-closet-app-backend-73fd1180df5d.herokuapp.com/closetItem/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                "name": formData.get('name'),
                "picture": url,
                "itemTags": tagIDs,
              })
            })
            //announce Item Made
            .then(response => {
              if (response.ok) {
                console.log('Item added with ID', response._id);
                closetID = response._id;
                section.remove();
                addItemBtn.disabled = false;
              } else {
                console.log('Failed to add item');
              }
              //UPDATE USER BY FIREBASE ID <-User ID-> with closetID
              console.log('Adding item to user');
              fetch(`https://my-closet-app-backend-73fd1180df5d.herokuapp.com/user/${auth.currentUser.uid}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ closetItems: response._id })
              })
              .then(response => {
                if (response.ok) {
                  console.log('User updated');
                } else {
                  console.log('Failed to update user');
                }
              })
              //Error handling
              .catch(error => {
              console.log('Error adding item:', error.message);
              })
              
            })
          //end of getDownloadURL
          })
        //end of uploadBytes
        })
      //end of getTags  
      })
    //end of form event listener
    })
  //end of fetch
  })
//end of add item button
};

//Item Body Double Click
itemBody.ondblclick = () => {
  console.log('double click');
}

//Login/Logout Display
auth.onAuthStateChanged(user => {
  if (user) {
    fetch(`https://my-closet-app-backend-73fd1180df5d.herokuapp.com/user/${user.uid}`, {
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
