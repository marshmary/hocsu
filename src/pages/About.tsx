import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
            <div className="text-lg">About page is in developing</div>
            <Button outline={true} gradientDuoTone="pinkToOrange">
                <Link to="/">Back to Home</Link>
            </Button>
        </div>
    );
};

export default About;
