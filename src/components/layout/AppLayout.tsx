"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-[#07090e] text-slate-100 flex overflow-hidden font-sans relative selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Ambient background visual layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Subtle dot matrix pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        
        {/* Radial subtle atmospheric glow */}
        <div className="absolute inset-0 bg-radial-vignette" />

        {/* Ambient colored orbs - gentle & deep, not blinding */}
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.04] blur-[160px] animate-pulse-glow" />
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] rounded-full bg-violet-600/[0.04] blur-[180px] animate-pulse-glow" style={{ animationDelay: "-2s" }} />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 flex-shrink-0 z-30">
        <Sidebar open={true} onClose={() => {}} />
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative z-10">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 xl:p-10 relative scroll-smooth">
          <div className="max-w-7xl mx-auto pb-16">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}