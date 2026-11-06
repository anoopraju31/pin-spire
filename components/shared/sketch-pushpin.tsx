import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SketchPushpinProps {
  className?: string;
  size?: number;
  rotation?: number;
}

export const SketchPushpin: React.FC<SketchPushpinProps> = ({ className, size = 36, rotation = -15 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)` }}
      className={cn('pointer-events-none drop-shadow-sm select-none', className)}
      aria-hidden="true"
    >
      {/* 1. Paper Cast Shadow (Spread out on paper where pin is stuck) */}
      <ellipse cx="27" cy="37" rx="9" ry="3.5" fill="rgba(43, 37, 35, 0.22)" />
      <ellipse cx="25" cy="36.5" rx="5" ry="2" fill="rgba(43, 37, 35, 0.35)" />

      {/* 2. Paper Puncture Hole / Piercing Slit (Where needle enters paper) */}
      <ellipse cx="24" cy="36" rx="3.2" ry="1.4" fill="#2B2523" opacity="0.8" />
      <path d="M21 36.6 L27 35.4" stroke="#2B2523" strokeWidth="1.2" strokeLinecap="round" />

      {/* 3. Short Metallic Needle (Buried into paper, only ~9px visible) */}
      <path
        d="M22.6 27 L23.3 36 L24.7 36 L25.4 27 Z"
        fill="#C4C9CE"
        stroke="#2B2523"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Needle metallic sheen highlight */}
      <line x1="23.8" y1="27.5" x2="23.8" y2="35.5" stroke="#FFFFFF" strokeWidth="0.8" />

      {/* 4. Pushpin Plastic Body (Terracotta #D95328) */}
      {/* Center Waist / Neck Grip */}
      <path
        d="M16.5 12 C16.5 16.5 20.5 18 20.5 20 C20.5 22 17 23.5 17 27 L31 27 C31 23.5 27.5 22 27.5 20 C27.5 18 31.5 16.5 31.5 12 Z"
        fill="#D95328"
        stroke="#2B2523"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Body Curved Highlight */}
      <path
        d="M19.5 13 C19.5 15.5 22 17.5 22 20 C22 21.5 20.5 23.5 19.5 25"
        stroke="rgba(255, 255, 255, 0.65)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Bottom Flange Rim Base (Resting near paper surface) */}
      <ellipse cx="24" cy="27" rx="8.5" ry="3.5" fill="#BF431C" stroke="#2B2523" strokeWidth="2" />

      {/* Top Cap Rim (Wide thumb-press surface) */}
      <ellipse cx="24" cy="12" rx="9" ry="4" fill="#D95328" stroke="#2B2523" strokeWidth="2" />
      {/* Top Dome Reflection */}
      <ellipse cx="24" cy="10.8" rx="7" ry="2.8" fill="#EE6B41" />
      <ellipse cx="22.5" cy="10.2" rx="2.2" ry="1.1" fill="rgba(255, 255, 255, 0.7)" />
    </svg>
  );
};
