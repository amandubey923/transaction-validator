"use client";

import {
  LayoutDashboard,
  Upload,
  BarChart3,
  PieChart,
  AlertTriangle,
  Download,
  Table2,
  X,
} from "lucide-react";


interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    id: "dashboard",
  },
  {
    icon: Upload,
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
    icon: Table2,
    label: "Preview",
    id: "preview-section",
  },
  {
    icon: Table2,
    label: "Recent Uploads",
    id: "recent-uploads-section",
  },
];

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const scrollToSection = (
    sectionId: string
  ) => {
    const element =
      document.getElementById(
        sectionId
      );

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
      {open && (
        <div
          onClick={onClose}
          className="
          fixed
          inset-0
          z-40
          bg-black/60
          lg:hidden
        "
        />
      )}

      <aside
        className={`
    fixed
    lg:sticky
    top-0
    left-0
    z-50
    h-screen
    w-72
    flex-shrink-0
    transform
    transition-all
    duration-300
    ${
      open
        ? "translate-x-0"
        : "-translate-x-full lg:translate-x-0"
    }
    border-r
    border-white/10
    bg-slate-950/95
    backdrop-blur-xl
    overflow-y-auto
  `}
>
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h1
            className="
            text-xl
            font-bold
            bg-gradient-to-r
            from-cyan-400
            via-violet-400
            to-indigo-400
            bg-clip-text
            text-transparent
          "
          >
            Xeno Validator
          </h1>

          <button
            onClick={onClose}
            className="lg:hidden text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
            Navigation
          </p>

          <nav className="space-y-2">
            {menuItems.map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <button
                    key={item.label}
                    onClick={() =>
                      scrollToSection(
                        item.id
                      )
                    }
                    className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-2xl
                      text-slate-300
                      hover:text-white
                      hover:bg-white/10
                      transition-all
                      duration-300
                    "
                  >
                    <Icon
                      size={20}
                    />

                    <span>
                      {item.label}
                    </span>
                  </button>
                );
              }
            )}
          </nav>
        </div>

        <div className="absolute bottom-6 left-4 right-4">
          <div
            className="
            rounded-3xl
            border
            border-cyan-500/20
            bg-cyan-500/5
            p-4
          "
          >
            <p className="text-cyan-300 text-sm font-medium">
              Assignment Build
            </p>

            <p className="text-slate-400 text-xs mt-1">
              Transaction Validation &
              Processing Platform
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}