import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_dTp6BpvlrkeHVmNXrbJ0lBcKY5p_tGI",
  authDomain: "rifa-casamento-27bac.firebaseapp.com",
  projectId: "rifa-casamento-27bac",
  storageBucket: "rifa-casamento-27bac.appspot.com",
  messagingSenderId: "44037974062",
  appId: "1:44037974062:web:0cfda4d9853392034f97bf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
