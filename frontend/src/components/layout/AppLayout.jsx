import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <Topbar />

          <main className="relative mx-auto max-w-[1600px] px-5 py-7 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
