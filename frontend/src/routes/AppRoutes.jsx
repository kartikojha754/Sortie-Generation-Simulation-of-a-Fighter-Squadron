// src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import Dashboard from "../pages/Dashboard";
import ScenarioBuilder from "../pages/ScenarioBuilder";
import Simulation from "../pages/Simulation";
import Maintenance from "../pages/Maintenance";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Navigate to="/scenario-builder" replace />} />
        <Route path="scenario-builder" element={<ScenarioBuilder />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="simulation" element={<Simulation />} />
        <Route path="maintenance" element={<Maintenance />} />
      </Route>
    </Routes>
  );
}
