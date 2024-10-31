import { Button } from "@mantine/core";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

const Config = [
    {
        title: "Event management",
        path: "/admin",
    },
    {
        title: "Quiz management",
        path: "/admin/quiz",
    },
];

export const AdminLayoutNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname);
    return (
        <>
            {Config.map((item) => (
                <Button
                    key={item.path}
                    justify="space-between"
                    fullWidth
                    rightSection
                    variant="light"
                    color={location.pathname === item.path ? "blue" : "gray"}
                    onClick={() => navigate(item.path)}
                >
                    {item.title}
                </Button>
            ))}
        </>
    );
};
