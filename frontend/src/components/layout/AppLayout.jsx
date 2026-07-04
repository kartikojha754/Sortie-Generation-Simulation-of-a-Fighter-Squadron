// src/components/layout/AppLayout.jsx

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0B0F0D] text-slate-100">
      <div className="flex">
        <Sidebar />

        <main className="min-h-screen flex-1">
          <Topbar />

          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
