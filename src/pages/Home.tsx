import { useEffect, useState } from "react";
import HomeLayout from "~/components/Home/Home.Layout";
import PageLoadAnimation from "~/components/Loading/PageLoadAnimation";
import { listTimelines } from "~/data/timelines";

const Home = () => {
    return (
        <PageLoadAnimation>
            <HomeLayout />
        </PageLoadAnimation>
    );
};

export default Home;
