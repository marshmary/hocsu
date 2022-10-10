import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center gap-3">
            <div className="text-lg">Trịnh huyền thị nguyễn triệu trần</div>
            <Dropdown label="Dropdown button">
                <Dropdown.Item>
                    <Link to={"/admin"}>Admin</Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link to={"/about"}>About</Link>
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
};

export default Home;
