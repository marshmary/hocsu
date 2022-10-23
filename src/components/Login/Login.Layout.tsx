import React from "react";
import GoogleLoginButton from "./Login.Button";

interface LoginLayoutProps {
    status: Status;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ status }) => {
    return (
        <div className="w-screen h-screen flex flex-row items-center justify-center bg-gray-100">
            <GoogleLoginButton extraDisabled={status === "loading"} />
        </div>
    );
};

export default LoginLayout;
