"use client";

import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({
  children,
}: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-[#080B14] text-white">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <DashboardHeader />

          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}