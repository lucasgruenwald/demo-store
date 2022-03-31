import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

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

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log('error creating user', error.message)
        }
    } 

    return userDocRef;
}