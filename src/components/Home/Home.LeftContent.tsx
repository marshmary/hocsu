import { Dropdown } from "flowbite-react";
import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface LeftContentProps {
    className?: string;
    style?: React.CSSProperties | undefined;
}

const LeftContent: FunctionComponent<LeftContentProps> = ({
    className = "",
    style = {},
}) => {
    return (
        <div className={`${className}`} style={style}>
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

export default LeftContent;
