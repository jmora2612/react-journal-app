import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore/lite"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDx0vHS_QaYtIJ2m2ITfU2WGVe7soU1xJQ",
  authDomain: "react-cursos-7be22.firebaseapp.com",
  projectId: "react-cursos-7be22",
  storageBucket: "react-cursos-7be22.appspot.com",
  messagingSenderId: "264367033284",
  appId: "1:264367033284:web:a771ccc2a604062015b291"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//funcionalidades de autenticacion
export const FirebaseAuth = getAuth(FirebaseApp);
//configuracion de la db
export const FirebaseDB = getFirestore(FirebaseApp)