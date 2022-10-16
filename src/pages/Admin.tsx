import { motion } from "framer-motion";
import AdminLayout from "~/components/Admin/Admin.Layout";

const Admin = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, transition: { duration: 0.75 } }}
            variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        >
            <AdminLayout />
        </motion.div>
    );
};

export default Admin;
