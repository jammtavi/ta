// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDpOnti9yv1DQa5mspgG02B_mPP4SruopM",
  authDomain: "moviehub-3c7db.firebaseapp.com",
  projectId: "moviehub-3c7db",
  storageBucket: "moviehub-3c7db.appspot.com",
  messagingSenderId: "137910493083",
  appId: "1:137910493083:web:a92dc3bc47ceedd3d1cb3e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
