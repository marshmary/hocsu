import { useState } from "react";
import HomeLayout from "~/components/Home/Home.Layout";
import PageLoadAnimation from "~/components/Loading/PageLoadAnimation";

const Home = () => {
    const [data, setData] = useState(null);

    // return !data ? <PageLoading /> : <HomeLayout />;
    return (
        <PageLoadAnimation>
            <HomeLayout />
        </PageLoadAnimation>
    );
};

export default Home;
