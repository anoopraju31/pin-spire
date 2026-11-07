import * as React from 'react';
import { cn } from '@/lib/utils';

export const StarDoodle: React.FC<{ className?: string; size?: number; fill?: string }> = ({
  className,
  size = 20,
  fill = '#E89838',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('pointer-events-none select-none', className)}
    aria-hidden="true"
  >
    <path
      d="M12 2C12.5 7 15 9.5 20 10C15 10.5 12.5 13 12 18C11.5 13 9 10.5 4 10C9 9.5 11.5 7 12 2Z"
      fill={fill}
      stroke="#2B2523"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const OutlineStarDoodle: React.FC<{ className?: string; size?: number }> = ({ className, size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('pointer-events-none select-none', className)}
    aria-hidden="true"
  >
    {/* Organic hand-drawn sketchy outline with gentle curve wobble */}
    <path
      d="M11.8 2.4 Q13.2 6.4 14.3 9 Q17.8 9.4 21.3 10 Q18.6 12.5 16.2 14.7 Q16.8 18.1 17.2 20.5 Q14.3 18.4 11.8 16.6 Q9.3 18.6 6.3 20.3 Q6.9 17.1 7.3 14.5 Q4.8 12 2.5 9.8 Q6.1 9.4 9.1 8.8 Q10.4 5.1 11.8 2.4 Z"
      stroke="#2B2523"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Subtle hand-drawn pencil accent tick on top vertex */}
    <path d="M11.4 3.8 Q11.8 2.1 12.4 2.8" stroke="#2B2523" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

export const SwirlDoodle: React.FC<{ className?: string; size?: number }> = ({ className, size = 28 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('pointer-events-none select-none', className)}
    aria-hidden="true"
  >
    <path
      d="M6 14C8 8 16 6 22 10C27 13 27 21 21 25C15 28 8 25 8 18C8 12 13 9 18 11C22 13 23 18 20 21C17 23 13 21 14 18"
      stroke="#2B2523"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const HatchLinesDoodle: React.FC<{ className?: string; size?: number }> = ({ className, size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('pointer-events-none opacity-40 select-none', className)}
    aria-hidden="true"
  >
    <line x1="5" y1="35" x2="35" y2="5" stroke="#2B2523" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="38" x2="38" y2="12" stroke="#2B2523" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="41" x2="41" y2="19" stroke="#2B2523" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const LeafyBranchDoodle: React.FC<{ className?: string; size?: number }> = ({ className, size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('pointer-events-none opacity-60 select-none', className)}
    aria-hidden="true"
  >
    <path d="M24 75C24 50 25 25 24 5" stroke="#2B2523" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M24 60C32 58 38 52 38 45C33 46 27 52 24 60Z"
      stroke="#2B2523"
      strokeWidth="1.2"
      fill="rgba(217, 83, 40, 0.15)"
    />
    <path
      d="M24 45C16 43 10 37 10 30C15 31 21 37 24 45Z"
      stroke="#2B2523"
      strokeWidth="1.2"
      fill="rgba(217, 83, 40, 0.15)"
    />
    <path
      d="M24 30C32 28 36 22 36 15C31 16 26 22 24 30Z"
      stroke="#2B2523"
      strokeWidth="1.2"
      fill="rgba(217, 83, 40, 0.15)"
    />
    <path
      d="M24 15C18 13 14 7 14 2C19 3 23 8 24 15Z"
      stroke="#2B2523"
      strokeWidth="1.2"
      fill="rgba(217, 83, 40, 0.15)"
    />
  </svg>
);

export const CurvedArrowDoodle: React.FC<{
  className?: string;
  size?: number;
  direction?: 'left' | 'right';
}> = ({ className, size = 32, direction = 'right' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: direction === 'left' ? 'scaleX(-1)' : undefined }}
    className={cn('pointer-events-none select-none', className)}
    aria-hidden="true"
  >
    {/* Curved arrow arc */}
    <path d="M6 28 C10 16 18 8 28 10" stroke="#2B2523" strokeWidth="1.8" strokeLinecap="round" />
    {/* Arrowhead */}
    <path d="M22 6 L29 10 L25 17" stroke="#2B2523" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const SpringLoopDoodle: React.FC<{ className?: string; size?: number }> = ({ className, size = 36 }) => (
  <svg
    width={size}
    height={size * 0.45}
    viewBox="0 0 48 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('pointer-events-none select-none', className)}
    aria-hidden="true"
  >
    {/* Telephone-cord looping scribble */}
    <path
      d="M3 16 C5 10 9 4 12 8 C15 12 12 18 9 17 C6 16 7 9 16 8 C20 7 22 13 20 16 C17 18 16 15 17 10 C18 6 25 6 28 10 C31 14 29 18 26 17 C23 16 25 8 34 8 C38 8 41 12 45 15"
      stroke="#2B2523"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const SparkleBurstDoodle: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className, size = 20, color = '#E89838' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('pointer-events-none select-none', className)}
    aria-hidden="true"
  >
    <path d="M12 2 L12 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 18 L12 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M2 12 L6 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M18 12 L22 12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M5 5 L8 8" stroke="#2B2523" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 16 L19 19" stroke="#2B2523" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19 5 L16 8" stroke="#2B2523" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M5 19 L8 16" stroke="#2B2523" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const HeartDoodle: React.FC<{
  className?: string;
  size?: number;
  fill?: string;
}> = ({ className, size = 22, fill = 'none' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('pointer-events-none select-none', className)}
    aria-hidden="true"
  >
    {/* Hand-sketched heart with slightly uneven lobes and crossing bottom stroke */}
    <path
      d="M12 20.5 C10.5 19.5 3 14 3 8.5 C3 5.5 5.5 3 8.5 3 C10.3 3 11.5 4 12 4.8 C12.5 4 13.7 3 15.5 3 C18.5 3 21 5.5 21 8.5 C21 14 13.5 19.5 12 20.5 Q11.2 21 12.8 19.5"
      fill={fill}
      stroke="#D95328"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const TapeDoodle: React.FC<{
  className?: string;
  width?: number;
  height?: number;
  rotation?: number;
}> = ({ className, width = 50, height = 18, rotation = -5 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 50 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: `rotate(${rotation}deg)` }}
    className={cn('pointer-events-none opacity-60 drop-shadow-xs select-none', className)}
    aria-hidden="true"
  >
    {/* Semi-translucent washi tape strip with torn jagged edges */}
    <path d="M3 1 L47 2 L46 17 L2 16 Z" fill="#F5E6CC" stroke="rgba(43, 37, 35, 0.2)" strokeWidth="0.8" />
    {/* Left jagged tear */}
    <path d="M2 1 L4 4 L1 8 L3 12 L2 16" stroke="#2B2523" strokeWidth="0.8" opacity="0.4" />
    {/* Right jagged tear */}
    <path d="M47 2 L49 6 L46 10 L48 14 L46 17" stroke="#2B2523" strokeWidth="0.8" opacity="0.4" />
  </svg>
);

export const WarningDoodle: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className, size = 18, color = '#D32F2F' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn('shrink-0 select-none pointer-events-none', className)}
    aria-hidden="true"
  >
    {/* Hand-drawn sketchy warning triangle */}
    <path
      d="M10.8 3.5 C11.3 2.5 12.7 2.5 13.2 3.5 L21.6 18.2 C22.1 19.1 21.4 20.3 20.4 20.3 L3.6 20.3 C2.6 20.3 1.9 19.1 2.4 18.2 L10.8 3.5 Z"
      fill={`${color}18`}
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Hand-drawn exclamation stem */}
    <path
      d="M12 8.5 L12 13.5"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Hand-drawn exclamation dot */}
    <circle
      cx="12"
      cy="16.8"
      r="1.1"
      fill={color}
    />
  </svg>
);

export const SketchLine: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 120 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    className={cn('h-1.5 flex-1 select-none pointer-events-none', className)}
    aria-hidden="true"
  >
    <path
      d="M2 3.2 C25 2.2, 45 4.1, 70 2.8 C95 1.6, 110 3.8, 118 2.9"
      stroke="#2B2523"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeOpacity="0.75"
    />
  </svg>
);
