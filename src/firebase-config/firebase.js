
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBvg23KkJNti4gVsa6O9ExC992MWRoFHx0",
  authDomain: "fir-course-ec173.firebaseapp.com",
  projectId: "fir-course-ec173",
  storageBucket: "fir-course-ec173.appspot.com",
  messagingSenderId: "264487002874",
  appId: "1:264487002874:web:a65406e6d20a5bc333df43",
  measurementId: "G-GJ1EN26QJT"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider(app)
export const storage = getStorage(app)