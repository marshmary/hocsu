import { logout } from "~/data/auth";

export const handleLogout = () => {
    logout().then(() => window.location.assign("/"));
};
