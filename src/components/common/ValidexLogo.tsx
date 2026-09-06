import React from "react";
import ValidexIcon from "./ValidexIcon";

interface ValidexLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function ValidexLogo({
  size = "md",
  className = "",
}: ValidexLogoProps) {
  const iconSizes = {
    sm: 22,
    md: 28,
    lg: 36,
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl",
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <ValidexIcon size={iconSizes[size]} />
      <span className={`font-semibold tracking-tight text-white ${textSizes[size]}`}>
        VALID<span className="text-blue-500">ex</span>
      </span>
    </div>
  );
}


