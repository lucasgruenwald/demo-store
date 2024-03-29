import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
    onAuthStateChanged, User, NextOrObserver,
 } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'
import { Category } from '../../store/categories/categories.types';

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

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjToAdd = {
    title: string;
}

export const addCollectionAndDocuments = async <T extends ObjToAdd> (
    collectionKey: string, 
    objectsToAdd: T[]
    ): Promise<void> => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });

    await batch.commit();
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef); 
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as Category);
}

export type AddtlInfo = {
    displayName?: string
}

export type UserData = {
    createdAt: Date,
    displayName: string,
    email: string
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInfo = {} as AddtlInfo): 
    Promise<void | QueryDocumentSnapshot<UserData>> => {

    if(!userAuth) return; 

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        } catch(error) {
            console.log('error creating user', error)
        }
    } 

    return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return; 

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => 
    onAuthStateChanged(auth, callback); 
    
export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
            unsubscribe();
            resolve(userAuth);
        },
        reject
        );
    });
};