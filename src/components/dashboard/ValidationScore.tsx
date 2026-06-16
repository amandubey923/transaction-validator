"use client";

import {
  Award,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface ValidationScoreProps {
  successRate: number;
}

export default function ValidationScore({
  successRate,
}: ValidationScoreProps) {
  const score = Math.round(successRate);

  const getGrade = () => {
    if (score >= 95) return "A+";
    if (score >= 85) return "A";
    if (score >= 75) return "B";
    if (score >= 60) return "C";
    return "D";
  };

  const getStatusColor = () => {
    if (score >= 95)
      return "text-emerald-400";

    if (score >= 85)
      return "text-cyan-400";

    if (score >= 75)
      return "text-yellow-400";

    return "text-rose-400";
  };

  return (
    <section id="validation-score-section">
      <div
        className="
        mt-8
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-gradient-to-br
        from-slate-900
        via-slate-950
        to-slate-900
        backdrop-blur-xl
      "
      >
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div
              className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              via-violet-500
              to-indigo-500
            "
            >
              <Award
                size={30}
                className="text-white"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">
                Dataset Quality Score
              </h2>

              <p className="text-slate-400 mt-1">
                Overall validation quality
                assessment
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col xl:flex-row items-center gap-10">
            <div className="relative">
              <div
                className="
                h-52
                w-52
                rounded-full
                border-[14px]
                border-cyan-500/20
                flex
                items-center
                justify-center
              "
              >
                <div className="text-center">
                  <h3 className="text-6xl font-bold text-white">
                    {score}
                  </h3>

                  <p className="text-slate-400">
                    /100
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="grid md:grid-cols-3 gap-5">
                <div
                  className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
                >
                  <ShieldCheck
                    size={24}
                    className="text-emerald-400 mb-3"
                  />

                  <p className="text-slate-400 text-sm">
                    Quality Grade
                  </p>

                  <h4
                    className={`text-4xl font-bold mt-2 ${getStatusColor()}`}
                  >
                    {getGrade()}
                  </h4>
                </div>

                <div
                  className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
                >
                  <TrendingUp
                    size={24}
                    className="text-cyan-400 mb-3"
                  />

                  <p className="text-slate-400 text-sm">
                    Success Rate
                  </p>

                  <h4 className="text-4xl font-bold text-white mt-2">
                    {score}%
                  </h4>
                </div>

                <div
                  className="
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                "
                >
                  <Award
                    size={24}
                    className="text-violet-400 mb-3"
                  />

                  <p className="text-slate-400 text-sm">
                    Status
                  </p>

                  <h4
                    className={`text-2xl font-bold mt-2 ${getStatusColor()}`}
                  >
                    Excellent
                  </h4>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-slate-400">
                    Dataset Quality
                  </span>

                  <span className="text-white">
                    {score}%
                  </span>
                </div>

                <div className="h-4 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-500
                    via-violet-500
                    to-indigo-500
                    transition-all
                    duration-1000
                  "
                    style={{
                      width: `${score}%`,
                    }}
                  />
                </div>
              </div>

              <div
                className="
                mt-8
                rounded-3xl
                border
                border-violet-500/20
                bg-violet-500/5
                p-6
              "
              >
                <p className="text-slate-300">
                  This score is calculated
                  using successful validation,
                  data consistency and overall
                  dataset quality metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}