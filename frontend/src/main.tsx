import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {ReduxProvider} from "./redux/redux-provider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ReduxProvider>
            <App/>
        </ReduxProvider>
    </StrictMode>
);