import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZNPYdn0bGCGnlIOct1Irr9azc_xxkgUI",
  authDomain: "rifa-gincana.firebaseapp.com",
  projectId: "rifa-gincana",
  storageBucket: "rifa-gincana.firebasestorage.app",
  messagingSenderId: "676031147646",
  appId: "1:676031147646:web:241d6a9810b0605859f22f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
