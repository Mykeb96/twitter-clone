import {initializeApp} from 'firebase/app'
import {useState, useEffect} from 'react'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyCE2Abe5EmKRe5F1DqcHax1aFGq15HnyO4',
    authDomain: 'oregon-melee.firebaseapp.com',
    projectId: 'oregon-melee',
    storageBucket: 'oregon-melee.appspot.com',
    messagingSenderId: '207404168332',
    appId: '1:207404168332:web:94c9553a5251aab2c6f7a9'
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
export const db = getDatabase(app);
export const storage = getStorage(app)

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export function logout(){
    return signOut(auth)
}

export function useAuth(){
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
       const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
       return unsub;
    }, [])
    

    return currentUser
}

