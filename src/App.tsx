import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Slide, ToastContainer } from "react-toastify";

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
            <ToastContainer transition={Slide} limit={3} />
        </BrowserRouter>
    );
}

export default App;
