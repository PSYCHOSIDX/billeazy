import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseApp = {
  apiKey: "AIzaSyBSQxFkHLvZ0Y_5_Gz-A2KqvCEiQcLYOJw",
  authDomain: "goa-electricity-system.firebaseapp.com",
  projectId: "goa-electricity-system",
  storageBucket: "goa-electricity-system.appspot.com",
  messagingSenderId: "880526443443",
  appId: "1:880526443443:web:c7c3cbfc150e4859b541c6"
};

const app = initializeApp(firebaseApp);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
