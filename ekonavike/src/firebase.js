import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey:            "AIzaSyDIRHjDPWTzbhR8aEsA5ZI67TjAaadeupE",
  authDomain:        "ekonavike.firebaseapp.com",
  projectId:         "ekonavike",            
  storageBucket:     "ekonavike.appspot.com",
  appId:             "1:419895952992:web:dfd7500de44773c845e505",
  measurementId:     "G-H6MRFEWN0V"
};

const app = initializeApp(firebaseConfig);
export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db       = getFirestore(app);
