import React from "react";
import ValidexIcon from "./ValidexIcon";

interface ValidexLogoProps {
  size?: "sm" | "md" | "lg";
  showSubtitle?: boolean;
  className?: string;
}

export default function ValidexLogo({
  size = "md",
  showSubtitle = true,
  className = "",
}: ValidexLogoProps) {
  const iconSizes = {
    sm: 28,
    md: 38,
    lg: 48,
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-xl",
    lg: "text-3xl",
  };

  const subSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <ValidexIcon size={iconSizes[size]} withGlow={size !== "sm"} />

      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white font-sans ${titleSizes[size]}`}>
            VALID
          </span>
          <span
            className={`font-black tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent font-sans ${titleSizes[size]}`}
          >
            EX
          </span>
          <span className="text-[9px] font-mono uppercase tracking-widest text-cyan-400/90 bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.2 rounded ml-1">
            CORE
          </span>
        </div>

        {showSubtitle && (
          <span
            className={`font-mono text-slate-400 tracking-wider uppercase mt-1 font-medium ${subSizes[size]}`}
          >
            Transaction Intelligence
          </span>
        )}
      </div>
    </div>
  );
}

