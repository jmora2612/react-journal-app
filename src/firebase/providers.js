import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async()=>{
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}


export const registerUserWithEmailPassword = async(email, password, displayName)=>{
    try {
        
        //con esto llegamos a firebase
        const res = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const {photoURL, uid} = res.user

        // ACTUALIZAR EL DISPLAY EN FIREBASE

        await updateProfile(FirebaseAuth.currentUser, {
            displayName 
        });


        return {
            ok: true,
            displayName, email, photoURL, uid
        }


    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}


export const loginWithEmailPassword= async({email, password})=>{
    try {
        const res = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const {displayName, uid} = res.user
        return {
            ok: true,
            displayName, uid
        }
    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const logoutFirebase = async()=>{
    return await FirebaseAuth.signOut();
}