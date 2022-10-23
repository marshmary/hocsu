// Firebase Auth
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "~/utils/firebase/firebase-config";

// Firestore
import { doc, getDoc } from "firebase/firestore";
import { db } from "~/utils/firebase/firebase-config";

export const getCurrentAuth = () => {
    const res = auth.currentUser;

    return res;
};

export const logout = async () => {
    try {
        await auth.signOut();
    } catch (e) {
        console.error(e);
    }
};

export const GoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(res);

    return credential;
};

export const isAdmin: (uid: string) => Promise<boolean> = async (uid) => {
    const docRef = doc(db, "admins", uid);
    const docSnap = await getDoc(docRef);

    return docSnap.exists();
};
