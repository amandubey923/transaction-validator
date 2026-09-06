"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  UploadCloud,
  BarChart3,
  PieChart,
  AlertTriangle,
  Download,
  TableProperties,
  History,
  X,
  CheckCircle2,
} from "lucide-react";
import ValidexLogo from "@/components/common/ValidexLogo";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Overview",
    id: "dashboard",
  },
  {
    icon: UploadCloud,
    label: "Upload CSV",
    id: "upload",
  },
  {
    icon: BarChart3,
    label: "Statistics",
    id: "stats",
  },
  {
    icon: PieChart,
    label: "Analytics",
    id: "country-chart-section",
  },
  {
    icon: AlertTriangle,
    label: "Validation Errors",
    id: "error-download-section",
  },
  {
    icon: Download,
    label: "Export Datasets",
    id: "downloads-section",
  },
  {
    icon: TableProperties,
    label: "Data Preview",
    id: "preview-section",
  },
  {
    icon: History,
    label: "Recent Files",
    id: "recent-uploads-section",
  },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const [activeSection, setActiveSection] = useState("dashboard");

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    onClose();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-64 flex-shrink-0 flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          border-r border-white/[0.08] bg-[#0c0e15]
        `}
      >
        {/* Brand Header with Single Primary Logo */}
        <div className="h-16 px-5 border-b border-white/[0.08] flex items-center justify-between">
          <ValidexLogo size="md" />

          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-2.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Platform Menu
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    text-xs font-medium transition-all duration-150 text-left group
                    ${
                      isActive
                        ? "bg-blue-600/10 text-blue-400 font-semibold border-l-2 border-blue-500 shadow-sm shadow-blue-500/5"
                        : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"
                    }
                  `}
                >
                  <Icon
                    size={17}
                    strokeWidth={1.75}
                    className={`transition-colors duration-150 flex-shrink-0 ${
                      isActive
                        ? "text-blue-400"
                        : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Polished quiet bottom status indicator */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-slate-300">Engine Operational</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">v1.0</span>
          </div>
        </div>
      </aside>
    </>
  );
}