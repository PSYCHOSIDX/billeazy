import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
import {getAuth} from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseApp = {
  apiKey: "AIzaSyAxASR2IbmiVIXdLSIHRDmz4NoZhsHfh3M",
  authDomain: "test-da514.firebaseapp.com",
  projectId: "test-da514",
  storageBucket: "test-da514.appspot.com",
  messagingSenderId: "574180796106",
  appId: "1:574180796106:web:53bcd66a50e4f89247b633"
};

const app = initializeApp(firebaseApp);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
