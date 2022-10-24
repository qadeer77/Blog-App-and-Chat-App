// Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
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
  onSnapshot,
  orderBy,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXkLRIwYe2qWYcvsx4qiq7eX4yq_ZmXAg",
  authDomain: "chat-app-82a8c.firebaseapp.com",
  projectId: "chat-app-82a8c",
  storageBucket: "chat-app-82a8c.appspot.com",
  messagingSenderId: "793743605728",
  appId: "1:793743605728:web:d1f707f130fcd9e10f3585",
  measurementId: "G-9MCNHFP8XW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

let logOut = document.getElementById("logOut");
logOut.addEventListener("click", (event) => {
  event.preventDefault();
  signOut(auth)
    .then(() => {
      window.location.pathname = "/index.html";
    })
    .catch((error) => {
      console.log(error);
    });
});

window.onload = async () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "user", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        localStorage.setItem("user", JSON.stringify(docSnap.data()));
        var data = docSnap.data();
        var image1 = document.getElementById("image1");
        image1.src = data.Profile;

        let name = document.getElementById("name");
        name.innerHTML = data.FullName;

        let sidebarImage = document.getElementById("sidebarImage");
        sidebarImage.src = data.Profile;

        let paraProfile = document.getElementById("paraProfile");
        paraProfile.innerHTML = data.FullName;

        let paraFatherName = document.getElementById("paraFatherName");
        paraFatherName.innerHTML = data.FatherName;

        let paraDateOfBirth = document.getElementById("paraDateOfBirth");
        paraDateOfBirth.innerHTML = data.DateOfBirth;

        let paraEmailAddress = document.getElementById("paraEmailAddress");
        paraEmailAddress.innerHTML = data.EmailAddress;
      } else {
        console.log("No such document!");
      }
      if (window.location.pathname === "/index.html") {
        window.location.href = "profile.html";
      }
    } else {
      if (window.location.pathname === "/profile.html") {
        window.location.href = "index.html";
      }
    }
  });
};

image1.addEventListener("click", () => {
  let sidebar = document.getElementById("mySidenav");
  sidebar.style.width = "250px";
});

let closeNav = document.getElementById("closeNav");
closeNav.addEventListener("click", () => {
  document.getElementById("mySidenav").style.width = "0";
});

var modal = document.getElementById("modal2");
let post = document.getElementById("post");
let close = document.getElementById("close");

post.addEventListener("click", () => {
  modal.style.display = "block";
});

close.addEventListener("click", () => {
  modal.style.display = "none";
});

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"],
];

var quill = new Quill("#editor", {
  modules: {
    toolbar: toolbarOptions,
  },
  theme: "snow",
});

let textPost = document.querySelector(".profilePost");
let spinnerNone = document.querySelector(".spinnerNone");
let allIDs = [];
let unsub;
try {
  textPost.addEventListener("click", async () => {
    let storageLocal = JSON.parse(localStorage.getItem("user"));
    let data = quill.root.innerHTML;
    textPost.style.display = "none";
    spinnerNone.style.display = "block";
    await addDoc(collection(db, "postingText"), {
      value: data,
      timestamp: moment().format("llll"),
      name: storageLocal.FullName,
      fatherName: storageLocal.FatherName,
      email: storageLocal.EmailAddress,
      profileImage: storageLocal.Profile,
    });
    modal.style.display = "none";
    window.location.reload();
  });

  let listProfile = document.getElementById("listProfile");

  const getData = async () => {
    unsub = onSnapshot(
      query(collection(db, "postingText"), orderBy("timestamp", "desc")),
      (querySnapshot) => {
        allIDs = [];
        querySnapshot.forEach((doc) => {
          allIDs.push(doc.id);
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
   <div id="unlike" onclick="unLike()">
   <i class="fa-regular fa-thumbs-up"></i>
   like
   </div>
   <div id="like" onclick="like()" class="d-none">
   <i class="fa-solid fa-thumbs-up"></i>
   like
   </div>
   <div id="comment">
   <i class="fa-regular fa-comment"></i>
   comment
   </div>
   </div>
   </li>
 `;
        });
      }
    );
  };

  getData();

  const unLike = () => {
    let unlike = document.getElementById("unlike");
    unlike.className = "d-none";
    let like = document.getElementById("like");
    like.className = "d-block";
    console.log(unlike, like);
  };
  window.unLike = unLike;

  const like = () => {
    let unlike = document.getElementById("unlike");
    unlike.className = "d-block";
    let like = document.getElementById("like");
    like.className = "d-none";
    console.log(unlike, like);
  };

  window.like = like;
} catch (err) {
  console.log(err);
}
