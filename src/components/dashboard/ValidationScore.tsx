"use client";

interface ValidationScoreProps {
  successRate: number;
}

export default function ValidationScore({ successRate }: ValidationScoreProps) {
  const score = Math.round(successRate);

  const getStatus = () => {
    if (score >= 95) return { label: "High Quality", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
    if (score >= 80) return { label: "Acceptable", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    if (score >= 60) return { label: "Moderate Risk", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    return { label: "Action Required", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20" };
  };

  const status = getStatus();

  return (
    <div className="rounded-xl border border-white/[0.08] bg-[#0f1118] p-5 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400">Data Quality Score</span>
          <span className={`text-xs px-2 py-0.5 rounded font-medium ${status.bg} ${status.border} ${status.color} border`}>
            {status.label}
          </span>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-semibold text-white font-mono">{score}%</span>
          <span className="text-xs text-slate-500">valid rows</span>
        </div>

        {/* Minimal Linear Progress Track */}
        <div className="mt-4 h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              score >= 80 ? "bg-emerald-500" : score >= 60 ? "bg-amber-500" : "bg-rose-500"
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <p className="mt-4 pt-4 border-t border-white/[0.06] text-xs text-slate-400 leading-relaxed">
        Calculated based on phone formatting, date integrity, duplicate order detection, and price calculations.
      </p>
    </div>
  );
}