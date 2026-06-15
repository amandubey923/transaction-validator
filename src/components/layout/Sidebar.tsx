"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  FileCheck,
  Download,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Upload CSV",
    icon: Upload,
    href: "/",
  },
  {
    title: "Results",
    icon: FileCheck,
    href: "/result",
  },
  {
    title: "Downloads",
    icon: Download,
    href: "/result",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "#",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] h-screen border-r border-white/10 bg-[#0A0F1E] sticky top-0">
      <div className="h-20 flex items-center px-6 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white">
            AI Empowerment
          </h1>

          <p className="text-xs text-zinc-400">
            Transaction Validator
          </p>
        </div>
      </div>

      <div className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
              
              ${
                active
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }
              
              `}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}
      </div>

      <div className="absolute bottom-5 left-5 right-5">
        <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
          <h3 className="text-white font-semibold">
            Validation Engine
          </h3>

          <p className="text-sm text-white/80 mt-1">
            Supports global phone, date & CSV validation.
          </p>
        </div>
      </div>
    </aside>
  );
}