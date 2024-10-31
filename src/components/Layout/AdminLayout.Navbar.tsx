import {
    faCalendarAlt,
    faClipboardQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mantine/core";
import { useLocation, useNavigate } from "react-router";

const Config = [
    {
        title: "Event management",
        path: "/admin",
        icon: <FontAwesomeIcon icon={faCalendarAlt} />,
    },
    {
        title: "Quiz management",
        path: "/admin/quiz",
        icon: <FontAwesomeIcon icon={faClipboardQuestion} />,
    },
];

export const AdminLayoutNavbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <>
            {Config.map((item) => (
                <Button
                    key={item.path}
                    justify="space-between"
                    fullWidth
                    rightSection={item.icon}
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
