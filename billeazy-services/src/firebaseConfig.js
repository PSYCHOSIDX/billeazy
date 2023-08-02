import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseApp = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "electricity-billing-32cd0.firebaseapp.com",
  projectId: "electricity-billing-32cd0",
  storageBucket: "electricity-billing-32cd0.appspot.com",
  messagingSenderId: "12011552111",
  appId: "1:12011552111:web:4a9896f6f1d8f07019bc9a"
};

const app = initializeApp(firebaseApp);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
