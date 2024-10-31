import "@mantine/core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Slide, ToastContainer } from "react-toastify";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <AppRoutes />
                <ToastContainer transition={Slide} limit={3} />
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
