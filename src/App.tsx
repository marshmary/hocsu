import { BrowserRouter } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { QueryClientProvider, ThemeProvider } from "./config";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer transition={Slide} limit={3} />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
