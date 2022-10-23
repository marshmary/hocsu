import { User } from "firebase/auth";
import { useState } from "react";

import AdminLayout from "~/components/Admin/Admin.Layout";
import LoginLayout from "~/components/Login/Login.Layout";
import PageLoadAnimation from "~/components/Loading/PageLoadAnimation";
import { getCurrentAuth, isAdmin } from "~/data/auth";
import { useFirebaseUserChangeTracking } from "~/utils/firebase/firebase-hook";
import { handleLogout } from "~/utils/logout";

const Admin = () => {
    const [status, setStatus] = useState<Status>("loading");
    const [currentUser, setCurrentUser] = useState<User | null>(
        getCurrentAuth()
    );

    // When login
    useFirebaseUserChangeTracking(async (user) => {
        setStatus("loading");

        // If user is not admin -> force logout
        if (user) {
            if (!(await isAdmin(user.uid))) {
                return handleLogout();
            }
        }

        setCurrentUser(user);
        setStatus("idle");
    });

    if (!currentUser)
        return (
            <PageLoadAnimation key="login">
                <LoginLayout status={status} />
            </PageLoadAnimation>
        );

    return (
        <PageLoadAnimation key="admin">
            <AdminLayout />
        </PageLoadAnimation>
    );
};

export default Admin;
