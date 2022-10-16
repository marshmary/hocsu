import React from "react";
import HomeLeftContent from "./Home.LeftContent";
import HomeRightContent from "./Home.RightContent";

const HomeLayout = () => {
    return (
        <div className="h-screen w-screen grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2">
            <HomeLeftContent className="order-2 lg:order-1" />
            <HomeRightContent className="order-1 lg:order-2" />
        </div>
    );
};

export default HomeLayout;
