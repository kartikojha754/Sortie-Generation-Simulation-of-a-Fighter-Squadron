import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/common/ScrollToTop";

import { ScenarioProvider } from "./context/ScenarioContext";
import { SimulationProvider } from "./context/SimulationContext";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <ScenarioProvider>
        <SimulationProvider>
          <AppRoutes />
        </SimulationProvider>
      </ScenarioProvider>
    </BrowserRouter>
  );
}
