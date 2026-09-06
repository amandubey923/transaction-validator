"use client";

import { Menu, Activity } from "lucide-react";
import ValidexLogo from "@/components/common/ValidexLogo";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/[0.08] bg-[#07090e]/80 backdrop-blur-xl px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Left side: Mobile menu toggle + breadcrumb/title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-slate-300 hover:text-white hover:bg-white/[0.1] transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            VALIDEX ENGINE
          </div>
          <span className="text-xs sm:text-sm text-slate-400 font-medium truncate">
            Transaction Validation & Ingestion Pipeline
          </span>
        </div>
      </div>

      {/* Right side: Telemetry badge + Validex logo */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.07] text-xs text-slate-300 font-mono">
          <Activity size={14} className="text-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">100% ONLINE</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">CSV v2.0 READY</span>
        </div>

        <div className="flex items-center p-1.5 px-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
          <ValidexLogo size="sm" showSubtitle={false} />
        </div>
      </div>
    </header>
  );
}
