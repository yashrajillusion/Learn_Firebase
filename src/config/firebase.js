import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqW1_TkUvAXwBH8LJ6kLvsN_0m2NzBhpE",
  authDomain: "fir-crud-auth-4af2c.firebaseapp.com",
  projectId: "fir-crud-auth-4af2c",
  storageBucket: "fir-crud-auth-4af2c.appspot.com",
  messagingSenderId: "991088797722",
  appId: "1:991088797722:web:fec5557537912b87c6c9a3",
  measurementId: "G-Q2XZHXE6EJ"
};
/*

if you don't have firbaseConfig watch below video
video link = https://youtu.be/13eja_RYimU

complete playlist if you not able to understand this code
link = https://youtube.com/playlist?list=PL4cUxeGkcC9jERUGvbudErNCeSZHWUVlb
 */

//initialize Firebase
const app = initializeApp(firebaseConfig);

//init services for database and export for using in todoCompontent for CRUD
export const db = getFirestore(app);

/*
Authentication in firebase

I discuss three ways of Auth by firebase

//doc https://firebase.google.com/docs/auth/web/start?authuser=1&hl=en

1. normal email password create account and login
2. login with google where you redirect to new page for login best for mobile
3. login with google where a pop type window opne best for website

*/

//auth initialise
const auth = getAuth();
const provider = new GoogleAuthProvider();

export const loginWithGoogleByReidirecting = () => {
  signInWithRedirect(auth, provider);
};

export const loginWithGoogleByPopWindow = () => {
  //this is the best for website
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      //now you can store user an token
      console.log(user, token);

      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

//Login signup with email and password
//Register or Create new account for new user

export const createAnAccountWithFirebase = async (email, password) => {
  try {
    let res2 = await createUserWithEmailAndPassword(auth, email, password);
    console.log(res2.user);
  } catch (error) {
    alert(JSON.stringify(error.message));
    console.log(error.message);
  }
};

export const loginAnAccountWithFirebase = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    alert(JSON.stringify(e.message));
    console.log(e.message);
  }
};

//logout
export const handleLogout = async () => {
  try {
    await signOut(auth);
    alert(`Logout Success`);
  } catch (e) {
    console.log(e.message);
  }
};

//below is like eventLister it called when user login logout sigin
onAuthStateChanged(auth, (user) => {
  //it return null when you logout other wise userobj
  console.log(user);
  if (user) {
    alert(`
    Welocme ${user.displayName}
    Email : ${user.email}
    `);
  }
  //else user is logout other wise not signin till now
});

/* 

Firebase Database
go to Todo component to learn CRUD


*/
