import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SketchCoffeeStainProps {
  className?: string;
  size?: number;
}

export const SketchCoffeeStain: React.FC<SketchCoffeeStainProps> = ({ className, size = 120 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('pointer-events-none opacity-40 select-none', className)}
      aria-hidden="true"
    >
      {/* Outer irregular coffee ring */}
      <path
        d="M60 10C87 9 108 30 110 58C112 86 91 109 63 110C35 111 10 90 9 62C8 33 32 11 60 10Z"
        stroke="#8B5A2B"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="95 15 60 10 40 12"
        fill="rgba(195, 142, 92, 0.08)"
      />
      {/* Inner thinner coffee ring */}
      <path
        d="M61 18C83 17 101 34 102 57C103 80 85 99 62 101C39 102 19 84 18 61C17 38 38 19 61 18Z"
        stroke="#A06835"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="60 20 40 15"
      />
      {/* Coffee splatter / drops */}
      <circle cx="106" cy="38" r="2.5" fill="#8B5A2B" opacity="0.6" />
      <circle cx="114" cy="45" r="1.5" fill="#8B5A2B" opacity="0.5" />
      <circle cx="15" cy="85" r="2" fill="#8B5A2B" opacity="0.6" />
      <circle cx="8" cy="76" r="1.5" fill="#8B5A2B" opacity="0.4" />
      <path d="M28 28C32 25 35 27 34 31C33 34 30 35 27 33C25 31 26 29 28 28Z" fill="#8B5A2B" opacity="0.3" />
    </svg>
  );
};
