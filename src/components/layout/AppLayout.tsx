"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({
  children,
}: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div
      className="
      h-screen
      bg-slate-950
      text-white
      flex
      overflow-hidden
    "
    >
      {/* Sidebar */}

      <div
        className="
        hidden
        lg:block
        w-72
        flex-shrink-0
      "
      >
        <Sidebar
          open={true}
          onClose={() => {}}
        />
      </div>

      {/* Mobile Sidebar */}

      <div className="lg:hidden">
        <Sidebar
          open={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />
      </div>

      {/* Right Content */}

      <div
        className="
        flex-1
        flex
        flex-col
        min-w-0
        h-screen
      "
      >
        <DashboardHeader
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main
          className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
          p-4
          md:p-6
          lg:p-8
          relative
        "
        >
          {/* Background Effects */}

          <div
            className="
            absolute
            inset-0
            -z-10
            overflow-hidden
          "
          >
            <div
              className="
              absolute
              top-0
              left-0
              w-[500px]
              h-[500px]
              rounded-full
              bg-cyan-500/10
              blur-3xl
            "
            />

            <div
              className="
              absolute
              bottom-0
              right-0
              w-[500px]
              h-[500px]
              rounded-full
              bg-violet-500/10
              blur-3xl
            "
            />
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}