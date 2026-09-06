"use client";

interface ValidationScoreProps {
  successRate: number;
}

export default function ValidationScore({ successRate }: ValidationScoreProps) {
  const score = Math.round(successRate);

  const getStatus = () => {
    if (score >= 95) return { label: "High Quality", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/25", track: "from-blue-500 to-emerald-400" };
    if (score >= 80) return { label: "Acceptable", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/25", track: "from-blue-600 to-blue-400" };
    if (score >= 60) return { label: "Moderate Risk", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/25", track: "from-amber-500 to-orange-400" };
    return { label: "Action Required", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/25", track: "from-rose-500 to-amber-500" };
  };

  const status = getStatus();

  return (
    <div className="relative rounded-xl border border-white/[0.08] bg-[#0f121d] p-5 h-full flex flex-col justify-between shadow-sm overflow-hidden">
      {/* Subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500/30 via-indigo-500/15 to-transparent" />

      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300">Data Quality Score</span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${status.bg} ${status.border} ${status.color} border shadow-sm`}>
            {status.label}
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
            {score}%
          </span>
          <span className="text-xs text-slate-400 font-medium">valid records</span>
        </div>

        {/* Polished Linear Progress Track */}
        <div className="mt-5 h-2 w-full rounded-full bg-white/[0.06] overflow-hidden p-[1px]">
          <div
            className={`h-full rounded-full transition-all duration-300 bg-gradient-to-r ${status.track}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <p className="mt-5 pt-4 border-t border-white/[0.06] text-xs text-slate-400 leading-relaxed">
        Composite audit score verifying phone rules, date validity, duplicate prevention, and item pricing totals.
      </p>
    </div>
  );
}