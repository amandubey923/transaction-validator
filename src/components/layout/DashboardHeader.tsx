"use client";

import { Menu,  } from "lucide-react";



interface DashboardHeaderProps {
onMenuClick: () => void;
}

export default function DashboardHeader({
onMenuClick,
}: DashboardHeaderProps) {
return (
  <header
    className="
      lg:hidden
      sticky
      top-0
      z-30
      border-b
      border-white/10
      bg-slate-950/70
      backdrop-blur-xl
    "
  >
    <div className="flex items-center px-4 py-2">
      <button
        onClick={onMenuClick}
        className="
          p-2
          rounded-xl
          bg-white/5
          hover:bg-white/10
        "
      >
        <Menu
          size={22}
          className="text-white"
        />
      </button>
    </div>
  </header>
);
}
