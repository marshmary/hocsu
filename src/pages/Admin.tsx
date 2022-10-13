import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Admin = () => {
    return (
        <motion.div
            className="h-screen w-screen flex flex-col justify-center items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.75 } }}
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
            <div className="text-lg">Admin page is in developing</div>
            <Button outline={true} gradientDuoTone="purpleToPink">
                <Link to="/">Back to Home</Link>
            </Button>
        </motion.div>
    );
};

export default Admin;
