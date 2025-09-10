import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { SpaceTravelProvider } from "./context/SpaceTravelContext.jsx";
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root"))
        .render(
	        <React.StrictMode>
		        <BrowserRouter>
			        <SpaceTravelProvider>
				        <App />
			        </SpaceTravelProvider>
		        </BrowserRouter>
	        </React.StrictMode>
        );
