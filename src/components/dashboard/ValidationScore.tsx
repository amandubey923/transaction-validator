"use client";

import {
  Award,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface ValidationScoreProps {
  successRate: number;
}

export default function ValidationScore({ successRate }: ValidationScoreProps) {
  const score = Math.round(successRate);

  const getGrade = () => {
    if (score >= 95) return "A+";
    if (score >= 85) return "A";
    if (score >= 75) return "B";
    if (score >= 60) return "C";
    return "D";
  };

  const getStatus = () => {
    if (score >= 95) return { label: "Optimal Integrity", color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-950/60" };
    if (score >= 85) return { label: "High Quality", color: "text-cyan-400", border: "border-cyan-500/30", bg: "bg-cyan-950/60" };
    if (score >= 75) return { label: "Moderate Risk", color: "text-yellow-400", border: "border-yellow-500/30", bg: "bg-yellow-950/60" };
    return { label: "Attention Required", color: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-950/60" };
  };

  const status = getStatus();

  // SVG Gauge calculations
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <section id="validation-score-section">
      <div className="rounded-3xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-xl shadow-xl overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
              <Award size={26} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Dataset Quality Score
                </h2>
                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${status.bg} ${status.border} border ${status.color} text-[10px] font-mono font-semibold`}>
                  GRADE {getGrade()}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Composite evaluation of record integrity, formatting, and mathematical consistency
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* SVG Circular Ring Gauge */}
            <div className="relative flex-shrink-0 flex items-center justify-center">
              <svg className="w-48 h-48 sm:w-56 sm:h-56 transform -rotate-90">
                {/* Background track circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="#162032"
                  strokeWidth="14"
                  fill="transparent"
                />

                {/* Animated gradient progress circle */}
                <circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke="url(#scoreGradient)"
                  strokeWidth="14"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />

                {/* SVG Gradient Definition */}
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Gauge Center Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                  {score}
                </span>
                <span className="text-xs text-slate-400 font-mono mt-0.5">
                  out of 100
                </span>
                <span className={`mt-2 text-xs font-mono font-bold px-2 py-0.5 rounded-full ${status.bg} border ${status.border} ${status.color}`}>
                  {getGrade()} Tier
                </span>
              </div>
            </div>

            {/* Right Metric Grid & Progress */}
            <div className="flex-1 w-full space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2">
                    <ShieldCheck size={16} className="text-emerald-400" />
                    <span>Quality Grade</span>
                  </div>
                  <div className={`text-3xl font-extrabold font-mono ${status.color}`}>
                    {getGrade()}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Algorithmic tier</p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2">
                    <TrendingUp size={16} className="text-cyan-400" />
                    <span>Success Rate</span>
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-white">
                    {score}%
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Clean records ratio</p>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-2">
                    <Sparkles size={16} className="text-violet-400" />
                    <span>Health Status</span>
                  </div>
                  <div className={`text-lg sm:text-xl font-bold font-mono truncate ${status.color}`}>
                    {status.label}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">Audit status</p>
                </div>
              </div>

              {/* Linear Progress Bar */}
              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-slate-400">Composite Integrity Index</span>
                  <span className="text-cyan-400 font-bold">{score} / 100</span>
                </div>

                <div className="h-2.5 rounded-full bg-slate-900 border border-white/[0.06] overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-indigo-500 transition-all duration-1000 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>

              {/* Informative Note */}
              <div className="rounded-2xl border border-violet-500/20 bg-violet-950/20 p-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                Calculated dynamically via telephone schema compliance, international jurisdiction mapping, timestamp validation, price calculation verification, and duplicate key detection.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}