import React from "react";

interface ValidexIconProps {
  size?: number | string;
  className?: string;
  withGlow?: boolean;
}

export default function ValidexIcon({
  size = 32,
  className = "",
  withGlow = false,
}: ValidexIconProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {withGlow && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/40 to-violet-600/40 blur-md -z-10" />
      )}
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="vx-grad-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00F0FF" />
            <stop offset="50%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          <linearGradient id="vx-grad-secondary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>

          <linearGradient id="vx-grad-node" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>

        {/* Outer Faceted Geometric Shield Base */}
        <rect
          x="2"
          y="2"
          width="36"
          height="36"
          rx="10"
          fill="#0C1220"
          stroke="url(#vx-grad-primary)"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        {/* Subtle grid accent inside icon */}
        <line x1="8" y1="20" x2="32" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="20" y1="8" x2="20" y2="32" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 2" />

        {/* Dynamic V-Check Vector (Validex Core Mark) */}
        {/* Left descending stroke */}
        <path
          d="M10 14L18.5 27L20.5 24L14 14H10Z"
          fill="url(#vx-grad-primary)"
        />

        {/* Right ascending validation beam */}
        <path
          d="M17.5 25.5L30 9H25.5L16 22.5L17.5 25.5Z"
          fill="url(#vx-grad-node)"
        />

        {/* Verified Apex Indicator Dot */}
        <circle cx="30.5" cy="8.5" r="2.5" fill="#00F0FF" />
        <circle cx="30.5" cy="8.5" r="4" stroke="#00F0FF" strokeOpacity="0.5" strokeWidth="1" />
      </svg>
    </div>
  );
}

