"use client";

import { Menu } from "lucide-react";
import ValidexLogo from "@/components/common/ValidexLogo";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="h-14 border-b border-white/[0.08] bg-[#090a0f]/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20">
      {/* Left side: Mobile menu toggle + Mobile Logo / Desktop breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-1.5 rounded-lg border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <Menu size={18} strokeWidth={1.75} />
        </button>

        {/* Show logo ONLY on mobile when sidebar is hidden */}
        <div className="lg:hidden">
          <ValidexLogo size="sm" />
        </div>

        {/* Desktop breadcrumb */}
        <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400">
          <span className="text-slate-300 font-medium">Workspace</span>
          <span className="text-slate-600">/</span>
          <span>Transaction Validation & Processing</span>
        </div>
      </div>

      {/* Right side: Clean, functional product status indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
          <span className="font-medium hidden sm:inline">System Ready</span>
        </div>
      </div>
    </header>
  );
}

