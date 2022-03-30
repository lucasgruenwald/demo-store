import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBaID39XaPeCSS5r159yhdLl1tTxsj9aCw",
    authDomain: "tn-furniture.firebaseapp.com",
    projectId: "tn-furniture",
    storageBucket: "tn-furniture.appspot.com",
    messagingSenderId: "200844098365",
    appId: "1:200844098365:web:862e8092ee5a07a936e354",
    measurementId: "G-2255K33BE4"
  };
  
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)