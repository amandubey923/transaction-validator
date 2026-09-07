"use client";

interface ValidationScoreProps {
  successRate: number;
}

export default function ValidationScore({ successRate }: ValidationScoreProps) {
  const score = Math.round(successRate);

  const getStatus = () => {
    if (score >= 95)
      return {
        label: "High Quality",
        color: "text-emerald-300",
        bg: "bg-emerald-500/15",
        border: "border-emerald-500/30",
        track: "from-blue-500 via-cyan-400 to-emerald-400",
        glow: "shadow-emerald-500/25",
        topAccent: "from-emerald-500/50 via-teal-500/20 to-transparent",
      };
    if (score >= 80)
      return {
        label: "Acceptable",
        color: "text-blue-300",
        bg: "bg-blue-500/15",
        border: "border-blue-500/30",
        track: "from-blue-600 via-indigo-500 to-cyan-400",
        glow: "shadow-blue-500/25",
        topAccent: "from-blue-500/50 via-indigo-500/20 to-transparent",
      };
    if (score >= 60)
      return {
        label: "Moderate Risk",
        color: "text-amber-300",
        bg: "bg-amber-500/15",
        border: "border-amber-500/30",
        track: "from-amber-500 via-orange-400 to-amber-300",
        glow: "shadow-amber-500/25",
        topAccent: "from-amber-500/50 via-orange-500/20 to-transparent",
      };
    return {
      label: "Action Required",
      color: "text-rose-300",
      bg: "bg-rose-500/15",
      border: "border-rose-500/30",
      track: "from-rose-600 via-rose-500 to-amber-500",
      glow: "shadow-rose-500/25",
      topAccent: "from-rose-500/50 via-rose-500/20 to-transparent",
    };
  };

  const status = getStatus();

  return (
    <div className="card-interactive relative rounded-xl border border-white/[0.08] bg-[#0f121d] p-5 h-full flex flex-col justify-between shadow-sm overflow-hidden hover:border-white/[0.16] hover:shadow-xl hover:shadow-black/40 transition-all duration-200">
      {/* Dynamic top accent bar */}
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${status.topAccent}`} />

      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 tracking-wide">Data Quality Score</span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${status.bg} ${status.border} ${status.color} border shadow-xs`}>
            {status.label}
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
            {score}%
          </span>
          <span className="text-xs text-slate-400 font-medium">valid records</span>
        </div>

        {/* Polished Linear Progress Track with subtle glow */}
        <div className="mt-5 h-2.5 w-full rounded-full bg-white/[0.06] overflow-hidden p-[1px] border border-white/[0.06]">
          <div
            className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${status.track} ${status.glow} shadow-sm`}
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