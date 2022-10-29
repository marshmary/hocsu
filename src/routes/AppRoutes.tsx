import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router";
import About from "~/pages/About";
import Admin from "~/pages/Admin";
import Guide from "~/pages/Guide";
import Home from "~/pages/Home";

const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRoutes;
