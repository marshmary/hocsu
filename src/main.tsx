import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

// Styles
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Config Firebase as soon as possible
import "~/utils/firebase/firebase-config";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
