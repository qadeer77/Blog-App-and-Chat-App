// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  updateDoc,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXkLRIwYe2qWYcvsx4qiq7eX4yq_ZmXAg",
  authDomain: "chat-app-82a8c.firebaseapp.com",
  projectId: "chat-app-82a8c",
  storageBucket: "chat-app-82a8c.appspot.com",
  messagingSenderId: "793743605728",
  appId: "1:793743605728:web:d1f707f130fcd9e10f3585",
  measurementId: "G-9MCNHFP8XW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
const colRef = collection(db, "user")

let signup = document.getElementById("signup");
let login = document.getElementById("login");
let anker1 = document.getElementById("anker1");
let anker2 = document.getElementById("anker2");
let all = document.getElementById("all");
let profileButton = document.getElementById("profileButton");


if (anker1 !== null){
anker1.addEventListener("click", () => {
  event.preventDefault();
  login.style.display = "none";
  signup.style.display = "block";
});
}

if (anker2 !== null){
anker2.addEventListener("click", () => {
  event.preventDefault()
  signup.style.display = "none";
  login.style.display = "block";
});
}

// variables
let loginSubmit = document.getElementById("loginSubmit");
let email = document.getElementById("email");
let password = document.getElementById("password");


if (loginSubmit !== null){
loginSubmit.addEventListener("click", () => {
  event.preventDefault();
  const emptyEmailRegix = /^\s*$/.test(email.value);
  const emailRegix =
    /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/.test(email.value);
  const emptyPasswordRegix = /^\s*$/.test(password.value);
  const passwordRegix = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/.test(
    password.value
  );

  if (emptyEmailRegix) {
    swal("Warning!", "Your Email is Empty!", "error");
  } else if (!emailRegix) {
    swal("Warning!", "Your Email Address is invalid!", "error");
  } else if (emptyPasswordRegix) {
    swal("Warning!", "Your password is Empty!", "error");
  } else if (!passwordRegix) {
    swal(
      "Warning!",
      "Your password must be contain 8 character the Numbers and Strings!",
      "error"
    );
  } else if (
    !emptyEmailRegix &&
    emailRegix &&
    !emptyPasswordRegix &&
    passwordRegix
  ) {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "user", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          localStorage.setItem("user", JSON.stringify(docSnap.data()))
          login.style.display = "none";
          loader1.style.display = "none";
          all.style.display = "block";
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        swal(
          "Warning!",
          "User Not Found please you are go and registered your account!",
          "error"
          );
          login.style.display = "block"
          loader1.style.display = "none";
          all.style.display = "none";
        })
        // .finally(() => {
        // });
        loader1.style.display = "block";
  }
});
}

// signup
let signUpSubmit = document.getElementById("signUpSubmit");
let name = document.getElementById("name");
let fatherName = document.getElementById("fatherName");
let date = document.getElementById("date");
let email1 = document.getElementById("email1");
let password1 = document.getElementById("password1");
let fileUplaod = document.getElementById("file");
let loader1 = document.getElementById("loader1");

if (signUpSubmit !== null){
signUpSubmit.addEventListener("click", async () => {
  event.preventDefault();

  const nameRegix = /^\s*$/.test(name.value);
  const nameRegix2 = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/.test(name.value);
  const fatherNameRegix = /^\s*$/.test(fatherName.value);
  const fatherNameRegix2 = /^[a-zA-Z]{4,}(?: [a-zA-Z]+){0,2}$/.test(
    fatherName.value
  );
  const dateRegix = /^\s*$/.test(date.value);
  const emailRegix = /^\s*$/.test(email1.value);
  const emailRegix2 =
    /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/.test(email1.value);
  const passwordRegix = /^\s*$/.test(password1.value);
  const passwordRegix2 = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/.test(
    password1.value
  );

  if (nameRegix) {
    swal("Warning!", "Your Name is Empty!", "error");
  } else if (!nameRegix2) {
    swal(
      "Warning!",
      "Your Name must be contain 4 or more asciii character!",
      "error"
    );
  } else if (fatherNameRegix) {
    swal("Warning!", "Your Father Name is Empty!", "error");
  } else if (!fatherNameRegix2) {
    swal(
      "Warning!",
      "Your Father Name must be contain 4 or more asciii character!",
      "error"
    );
  } else if (dateRegix) {
    swal("Warning!", "Your Date is Empty!", "error");
  } else if (emailRegix) {
    swal("Warning!", "Your Email Address is Empty!", "error");
  } else if (!emailRegix2) {
    swal("Warning!", "Your Email Address is invalid!", "error");
  } else if (passwordRegix) {
    swal("Warning!", "Your Password is Empty!", "error");
  } else if (!passwordRegix2) {
    swal(
      "Warning!",
      "Your password must be contain 8 character the Numbers and Strings!",
      "error"
    );
  } else if (
    !nameRegix &&
    nameRegix2 &&
    !fatherNameRegix &&
    fatherNameRegix2 &&
    !dateRegix &&
    !emailRegix &&
    emailRegix2 &&
    !passwordRegix &&
    passwordRegix2
  ) {
    createUserWithEmailAndPassword(auth, email1.value, password1.value)
      .then(async (userCredential) => {
        const user = userCredential.user;

        await setDoc(doc(db, "user", user.uid), {
          FullName: name.value,
          FatherName: fatherName.value,
          DateOfBirth: date.value,
          EmailAddress: email1.value,
          Password: password1.value,
        });
      })
      .then(async () => {
        const uploadFiles = (file) => {
          return new Promise((resolve, reject) => {
            const storage = getStorage();
            const storageRef = ref(
              storage,
              `users/${auth.currentUser.uid}.png`
            );
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                  case "paused":
                    console.log("Upload is paused");
                    break;
                  case "running":
                    console.log("Upload is running");
                    break;
                }
              },
              (error) => {
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  resolve(downloadURL);
                });
              }
            );
          });
        };
        let file = fileUplaod.files[0];
        let url = await uploadFiles(file);

        const washingtonRef = doc(db, "user", auth.currentUser.uid);
        await updateDoc(washingtonRef, {
          Profile: url,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        swal("Warning!", "You have already Registered!", "error");
      })
      .finally(() => {
        loader1.style.display = "none";
        login.style.display = "block";
      });
    

    signup.style.display = "none";
    loader1.style.display = "block";
  }
});
}


let logOut = document.getElementById("logOut");
if (logOut !== null){
logOut.addEventListener("click", (event) => {
  event.preventDefault();
  signOut(auth).then(() => {
    window.location.href = "./index.html";
  }).catch((error) => {
    console.log(error)
  });
})
}

window.onload = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // console.log(uid)
      // if(window.location.pathname === "/index.html"){  
      //   window.location.href = ("profile.html");
      // }
    } else {
      // if(window.location.pathname === "/profile.html"){  
      //   window.location.href = ("index.html");
      // }
    }
  });
};

if(profileButton !== null){
  profileButton.addEventListener("click",() => {
        window.location.href = "./profile.html";
      })
    }
   const storageLocal =  JSON.parse(localStorage.getItem("user"));


let image1 = document.getElementById("image1");
if (image1 !== null){
image1.src = storageLocal.Profile;

let name = document.getElementById("name");
name.innerHTML = storageLocal.FullName

image1.addEventListener("click", () => {
 let sidebar = document.getElementById("mySidenav");
 sidebar.style.width = "250px";
})
}

let closeNav = document.getElementById("closeNav");
if (closeNav !== null){
closeNav.addEventListener("click", () => {
  document.getElementById("mySidenav").style.width = "0";
})
}


let sidebarImage = document.getElementById("sidebarImage");
if (sidebarImage !== null){
sidebarImage.src = storageLocal.Profile
}


let paraProfile = document.getElementById("paraProfile");
if (paraProfile !== null){
paraProfile.innerHTML = storageLocal.FullName
}

let paraFatherName = document.getElementById("paraFatherName");
if (paraFatherName !== null){
paraFatherName.innerHTML = storageLocal.FatherName;
}

let paraDateOfBirth = document.getElementById("paraDateOfBirth");
if (paraDateOfBirth !== null){
paraDateOfBirth.innerHTML = storageLocal.DateOfBirth;
}

let paraEmailAddress = document.getElementById("paraEmailAddress");
if (paraEmailAddress !== null){
paraEmailAddress.innerHTML = storageLocal.EmailAddress;
}

var modal = document.getElementById("modal2");
let post = document.getElementById("post");
let close = document.getElementById("close");

if (post !== null){
post.addEventListener("click", () => {
  modal.style.display = "block";
})
}

if (close !== null){
close.addEventListener("click", () => {
  modal.style.display = "none";
})
}

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                        
];

var quill = new Quill('#editor', {
  modules: {
    toolbar: toolbarOptions
  },
  theme: 'snow'
});


let textPost = document.querySelector(".profilePost");
textPost.addEventListener("click", async() => {
  let data = quill.root.innerHTML;
  await addDoc(collection(db, "postingText"), {
    value: data,
    timestamp: moment().format('llll'),
    name: storageLocal.FullName,
    fatherName: storageLocal.FatherName,
    email: storageLocal.EmailAddress,
    profileImage: storageLocal.Profile
  });
})

let listProfile = document.getElementById("listProfile");

const getData = async() => {
const querySnapshot = await getDocs(collection(db, "postingText"));
querySnapshot.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
  let docData = doc.data();
  listProfile.innerHTML += `
  <div id="profilelist">
    <li id="list">
  <img src=${docData.profileImage} id="profileImg">
  <h6 id="paraprofile">${docData.name}</h6>
  <p id="paraDate">${docData.timestamp}</p>
  <div id="paravalue">
      ${docData.value} 
  </div>
  </li>
  </div>
`
});
};

getData()