import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
            <div className="text-lg">Admin page is in developing</div>
            <Button outline={true} gradientDuoTone="purpleToPink">
                <Link to="/">Back to Home</Link>
            </Button>
        </div>
    );
};

export default Admin;
