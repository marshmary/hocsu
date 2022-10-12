import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";

// Handle when the user in Firebase changes
export const useFirebaseUserChangeTracking = (
    handleChange: (user: User | null) => void
) => {
    useEffect(() => {
        const auth = getAuth();

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            // Handle user change
            handleChange(user);
        });

        return unsubscribe;
    }, []);
};
