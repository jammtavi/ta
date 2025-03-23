// firebase-config.js
// Replace the below values with your Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDpOnti9yv1DQa5mspgG02B_mPP4SruopM",
  authDomain: "moviehub-3c7db.firebaseapp.com",
  projectId: "moviehub-3c7db",
  storageBucket: "moviehub-3c7db.appspot.com",
  messagingSenderId: "137910493083",
  appId: "1:137910493083:web:a92dc3bc47ceedd3d1cb3e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
