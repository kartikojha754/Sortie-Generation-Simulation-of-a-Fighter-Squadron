import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";

import { SimulationProvider } from "./context/SimulationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SimulationProvider>
        <App />
      </SimulationProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
