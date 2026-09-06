import React from "react";

interface ValidexIconProps {
  size?: number | string;
  className?: string;
}

export default function ValidexIcon({
  size = 28,
  className = "",
}: ValidexIconProps) {
  return (
    <div
      className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <rect
          width="32"
          height="32"
          rx="8"
          fill="#161922"
          stroke="rgba(255, 255, 255, 0.12)"
          strokeWidth="1"
        />
        {/* Crisp checkmark/chevron validation glyph */}
        <path
          d="M8.5 16.5L13.5 21.5L23.5 11.5"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}


