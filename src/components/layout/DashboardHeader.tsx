"use client";

import {
  Bell,
  Search,
  Sparkles,
} from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="h-20 border-b border-white/10 bg-[#080B14]/80 backdrop-blur-xl px-8 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">
          Transaction Validation Dashboard
        </h1>

        <p className="text-sm text-zinc-400">
          Upload • Validate • Clean • Download
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-zinc-400"
          />

          <input
            placeholder="Search..."
            className="w-[250px] bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <button className="relative">
          <Bell
            size={22}
            className="text-zinc-300"
          />

          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
            AK
          </div>

          <div>
            <p className="text-white text-sm font-medium">
              Aman Kumar
            </p>

            <p className="text-xs text-zinc-400">
              Admin
            </p>
          </div>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded-xl flex items-center gap-2 text-white">
          <Sparkles size={18} />
          AI Scan
        </button>
      </div>
    </header>
  );
}