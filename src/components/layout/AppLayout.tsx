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
    <div className="h-screen bg-[#090a0f] text-slate-100 flex overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0 z-30">
        <Sidebar open={true} onClose={() => {}} />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 sm:p-8 lg:p-10 scroll-smooth">
          <div className="max-w-6xl mx-auto pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}