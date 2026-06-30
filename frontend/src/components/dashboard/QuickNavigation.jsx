import { Link } from "react-router-dom";
import {
  FiPlayCircle,
  FiSettings,
  FiTool,
  FiArrowRight,
  FiLock,
} from "react-icons/fi";

import Card from "../common/Card";

const navigationItems = [
  {
    title: "Simulation",
    description: "Configure scenarios and run sortie generation simulations.",
    icon: <FiPlayCircle />,
    to: "/",
    active: true,
  },
  {
    title: "Scenario Builder",
    description: "Create and manage advanced mission configurations.",
    icon: <FiSettings />,
    to: "/scenario-builder",
    active: true,
  },
  {
    title: "Maintenance",
    description: "Aircraft maintenance tracking is planned for a later phase.",
    icon: <FiTool />,
    to: null,
    active: false,
  },
];

const QuickNavigation = () => {
  return (
    <Card>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">
          Navigation
        </p>

        <h2 className="mt-2 text-xl font-semibold text-white">Quick Access</h2>

        <p className="mt-1 text-sm text-slate-400">
          Navigate directly to active operational modules.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {navigationItems.map((item) => {
          const content = (
            <>
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border text-xl ${
                  item.active
                    ? "border-sky-500/30 bg-sky-500/10 text-sky-400"
                    : "border-slate-700 bg-slate-900 text-slate-500"
                }`}
              >
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-white">{item.title}</h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {item.description}
              </p>

              <div
                className={`mt-5 flex items-center gap-2 text-sm font-medium ${
                  item.active ? "text-sky-400" : "text-slate-500"
                }`}
              >
                {item.active ? (
                  <>
                    Open Module
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                ) : (
                  <>
                    Coming Later
                    <FiLock />
                  </>
                )}
              </div>
            </>
          );

          if (!item.active) {
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6 opacity-70"
              >
                {content}
              </div>
            );
          }

          return (
            <Link
              key={item.title}
              to={item.to}
              className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/40"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickNavigation;
