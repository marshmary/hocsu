import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { AdminLayout } from "~/components/Layout";
import { RouteGuard } from "~/components/RouteGuard";
import Admin from "~/pages/Admin";
import Guide from "~/pages/Guide";
import Home from "~/pages/Home";
import Quiz from "~/pages/Quiz";

const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/admin" element={<RouteGuard />}>
                    <Route path="" element={<AdminLayout />}>
                        <Route path="" index element={<Admin />} />
                        <Route path="quiz" index element={<Quiz />} />
                    </Route>
                </Route>
                <Route path="/guide" element={<Guide />} />
                <Route path="/test" element={<AdminLayout />} />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRoutes;
