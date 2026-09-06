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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-64 flex-shrink-0 flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          border-r border-white/[0.08] bg-[#0c0e14]
        `}
      >
        {/* Brand Header with Single Primary Logo */}
        <div className="h-14 px-5 border-b border-white/[0.08] flex items-center justify-between">
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
          <div className="mb-2 px-2 text-[11px] font-medium uppercase tracking-wider text-slate-500">
            Navigation
          </div>

          <nav className="space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.id)}
                  className="
                    w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg
                    text-sm font-medium text-slate-300
                    hover:text-white hover:bg-white/[0.05]
                    transition-colors duration-150 text-left
                  "
                >
                  <Icon
                    size={16}
                    className="text-slate-400 group-hover:text-slate-200"
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Clean, quiet bottom status indicator */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 px-2 py-1.5 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Validation engine ready</span>
          </div>
        </div>
      </aside>
    </>
  );
}