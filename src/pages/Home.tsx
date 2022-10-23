import Fab from "~/components/Fab";
import HomeLayout from "~/components/Home/Home.Layout";
import PageLoadAnimation from "~/components/Loading/PageLoadAnimation";

const Home = () => {
    return (
        <PageLoadAnimation>
            <HomeLayout />
            <Fab />
        </PageLoadAnimation>
    );
};

export default Home;
