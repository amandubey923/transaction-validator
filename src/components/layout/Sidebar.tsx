"use client";

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
} from "lucide-react";
import ValidexLogo from "@/components/common/ValidexLogo";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    id: "dashboard",
    badge: "Core",
  },
  {
    icon: UploadCloud,
    label: "Upload CSV",
    id: "upload",
    badge: "Dropzone",
  },
  {
    icon: BarChart3,
    label: "Statistics",
    id: "stats",
  },
  {
    icon: PieChart,
    label: "Charts",
    id: "country-chart-section",
  },
  {
    icon: AlertTriangle,
    label: "Errors",
    id: "error-download-section",
  },
  {
    icon: Download,
    label: "Downloads",
    id: "downloads-section",
  },
  {
    icon: TableProperties,
    label: "Data Preview",
    id: "preview-section",
  },
  {
    icon: History,
    label: "Recent Uploads",
    id: "recent-uploads-section",
  },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const scrollToSection = (sectionId: string) => {
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
          className="fixed inset-0 z-40 bg-[#07090e]/80 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-72 flex-shrink-0 flex flex-col
          transform transition-all duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          border-r border-white/[0.08] bg-[#090d16]/95 backdrop-blur-2xl
        `}
      >
        {/* Brand Header with Validex Logo */}
        <div className="p-6 border-b border-white/[0.07] flex items-center justify-between">
          <ValidexLogo size="md" showSubtitle={true} />

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          <div>
            <div className="flex items-center justify-between px-3 mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-medium">
                Workspace Modules
              </span>
              <span className="text-[10px] text-cyan-400/80 font-mono">
                {menuItems.length} ACTIVE
              </span>
            </div>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.id)}
                    className="
                      group w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl
                      text-sm font-medium text-slate-300
                      hover:text-white hover:bg-white/[0.06] hover:border hover:border-white/[0.08]
                      transition-all duration-200 text-left relative
                    "
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className="text-slate-400 group-hover:text-cyan-400 transition-colors"
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-400 border border-white/[0.06] group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Telemetry Footer Card */}
        <div className="p-4 border-t border-white/[0.07]">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c121e]/80 p-4 relative overflow-hidden">
            {/* Subtle glow edge */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-xs font-semibold text-slate-200">
                  Validex Core
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                READY
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              International rules: 45+ country specs, ISO date/time, deduplication & split engine.
            </p>

            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Engine v2.4</span>
              <span className="text-cyan-400">Turbopack OK</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}