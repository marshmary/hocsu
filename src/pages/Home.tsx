import HomeLayout from "~/components/Home/Home.Layout";
import PageLoadAnimation from "~/components/Loading/PageLoadAnimation";

const Home = () => {
    return (
        <PageLoadAnimation>
            <HomeLayout />
        </PageLoadAnimation>
    );
};

export default Home;
