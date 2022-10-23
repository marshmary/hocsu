import React from "react";
import { motion } from "framer-motion";

interface PageLoadAnimationProps {
    children: React.ReactNode;
}

const PageLoadAnimation: React.FC<PageLoadAnimationProps> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.75 } }}
            variants={{
                visible: { transition: { staggerChildren: 0.3 } },
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageLoadAnimation;
