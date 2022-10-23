import { motion } from "framer-motion";

const PageLoading = () => {
    return (
        <div className="h-screen w-screen">
            <motion.div
                className="bg-lime-400 h-40 w-40"
                animate={{
                    scale: [1, 2, 2, 1, 1],
                    rotate: [0, 0, 270, 270, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                }}
            />
        </div>
    );
};

export default PageLoading;
