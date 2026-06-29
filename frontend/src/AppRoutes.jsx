import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Simulation from "./pages/Simulation";
import Dashboard from "./pages/Dashboard";
import ScenarioBuilder from "./pages/ScenarioBuilder";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Simulation />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="scenario-builder" element={<ScenarioBuilder />} />
      </Route>

      <Route path="*" element={<NotFound />} />

      <Route path="home" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
