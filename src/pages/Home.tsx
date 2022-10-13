import { motion } from "framer-motion";
import { useState } from "react";
import HomeLayout from "~/components/Home/Home.Layout";
import PageLoading from "~/components/PageLoading";

const Home = () => {
    const [data, setData] = useState(null);

    // return !data ? <PageLoading /> : <HomeLayout />;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.75 } }}
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
            <HomeLayout />
        </motion.div>
    );
};

export default Home;
