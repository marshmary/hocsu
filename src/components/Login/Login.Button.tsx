import { useState } from "react";

import Icon from "~/components/Icon";
import { GoogleLogin } from "~/data/auth";

interface GoogleLoginButtonProps {
    extraDisabled?: boolean;
}

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({
    extraDisabled = false,
}) => {
    const [disabled, setDisabled] = useState(false);

    const handleLogin = async () => {
        setDisabled(true);

        GoogleLogin().then(
            (value) => {
                // setDisabled(false);
            },
            (reason) => {
                setDisabled(false);
            }
        );
    };

    return (
        <button
            className="rounded-md p-3 bg-white font-bold shadow hover:shadow-lg"
            style={{
                opacity: disabled || extraDisabled ? "0.5" : "1",
            }}
            onClick={handleLogin}
            disabled={disabled || extraDisabled}
        >
            <Icon icon={["fab", "google"]} color="#db4437" className="mr-2.5" />
            Login with Google
        </button>
    );
};

export default GoogleLoginButton;
