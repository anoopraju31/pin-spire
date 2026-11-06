import * as React from 'react';
import { cn } from '@/lib/utils';
import { SketchPushpin } from './sketch-pushpin';
import {
  StarDoodle,
  OutlineStarDoodle,
  SwirlDoodle,
  LeafyBranchDoodle,
  HatchLinesDoodle,
  CurvedArrowDoodle,
  SpringLoopDoodle,
  SparkleBurstDoodle,
  HeartDoodle,
  TapeDoodle,
} from './sketch-doodles';

export interface PolaroidCollageProps {
  className?: string;
  mode?: 'login' | 'register';
}

export const PolaroidCollage: React.FC<PolaroidCollageProps> = ({ className, mode = 'login' }) => {
  const isLogin = mode === 'login';

  return (
    <div className={cn('relative flex flex-col items-center justify-center p-6 select-none lg:p-8', className)}>
      {/* Decorative Doodles in the Margins */}
      <div className="absolute top-2 left-6">
        <StarDoodle size={22} fill="#E89838" />
      </div>
      <div className="absolute top-8 left-16">
        <SwirlDoodle size={26} />
      </div>
      <div className="absolute top-1 left-28">
        <SparkleBurstDoodle size={18} color="#D95328" />
      </div>
      <div className="absolute top-4 right-12 rotate-12">
        <OutlineStarDoodle size={18} />
      </div>
      <div className="absolute top-12 right-4">
        <SpringLoopDoodle size={34} />
      </div>
      <div className="absolute top-1/3 -right-2">
        <LeafyBranchDoodle size={42} />
      </div>
      <div className="absolute top-1/2 -left-4">
        <CurvedArrowDoodle size={28} direction="right" />
      </div>
      <div className="absolute bottom-16 left-2">
        <HatchLinesDoodle size={36} />
      </div>
      <div className="absolute -right-1 bottom-28">
        <HeartDoodle size={20} />
      </div>
      <div className="absolute right-6 bottom-20">
        <StarDoodle size={20} fill="#E89838" />
      </div>
      <div className="absolute -bottom-1 left-16">
        <CurvedArrowDoodle size={26} direction="left" />
      </div>
      <div className="absolute right-12 -bottom-2">
        <OutlineStarDoodle size={16} />
      </div>
      <div className="absolute right-2 bottom-2">
        <SparkleBurstDoodle size={16} color="#E89838" />
      </div>

      {/* 5-Polaroid Cluster */}
      <div className="relative flex h-85 w-85 items-center justify-center sm:h-95 sm:w-95">
        {/* Washi Tape Strip on Top-Left Polaroid */}
        <div className="absolute top-2 left-6 z-25">
          <TapeDoodle width={44} height={16} rotation={-25} />
        </div>

        {/* 1. TOP-LEFT POLAROID ("explore" / "inspire") */}
        <div
          className="bg-surface border-ink absolute top-0 left-2 z-10 w-40 rounded-sm border-2 p-2 pb-5 shadow-[2px_3px_0px_rgba(43,37,35,0.15)] transition-transform hover:scale-105 sm:w-44"
          style={{ transform: 'rotate(-7deg)' }}
        >
          {/* Inner Photo Area */}
          <div className="border-ink/40 relative flex aspect-4/3 w-full flex-col justify-between overflow-hidden rounded-xs border bg-[#FDF6E2] p-1.5">
            {/* Hand-drawn artwork: Pumpkin/Bowl with watercolor wash + pencil */}
            <svg viewBox="0 0 100 75" className="h-full w-full" fill="none">
              {/* Table wash */}
              <ellipse cx="50" cy="55" rx="42" ry="16" fill="#F7E6C4" />
              {/* Bowl / Pumpkin */}
              <ellipse cx="48" cy="42" rx="20" ry="14" fill="#E26D3F" stroke="#2B2523" strokeWidth="1.5" />
              <path d="M48 28C48 24 50 22 52 20" stroke="#5A7D36" strokeWidth="2" strokeLinecap="round" />
              <path d="M40 32C40 40 44 54 48 56" stroke="#C84B22" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M56 32C56 40 52 54 48 56" stroke="#C84B22" strokeWidth="1.2" strokeLinecap="round" />
              {/* Pencil lying beside */}
              <path d="M68 56L78 32" stroke="#2B2523" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="78,32 80,26 76,28" fill="#2B2523" />
            </svg>
          </div>
          {/* Handwritten Caption */}
          <div className="font-sketch text-ink mt-1 text-center text-xs font-bold">
            {isLogin ? 'explore' : 'inspire'}
          </div>
        </div>

        {/* 2. TOP-RIGHT POLAROID ("collect" / "travel") */}
        <div
          className="bg-surface border-ink absolute top-2 right-2 z-10 w-40 rounded-sm border-2 p-2 pb-5 shadow-[2px_3px_0px_rgba(43,37,35,0.15)] transition-transform hover:scale-105 sm:w-44"
          style={{ transform: 'rotate(6deg)' }}
        >
          <div className="border-ink/40 relative flex aspect-4/3 w-full flex-col justify-between overflow-hidden rounded-xs border bg-[#EAF2F8] p-1.5">
            {/* Hand-drawn landscape: Rolling hills, river, bright sun */}
            <svg viewBox="0 0 100 75" className="h-full w-full" fill="none">
              {/* Sky wash */}
              <rect width="100" height="75" fill="#E6F2F7" />
              {/* Sun */}
              <circle cx="75" cy="22" r="10" fill="#F7CA44" stroke="#2B2523" strokeWidth="1.2" />
              {/* Hills */}
              <path d="M-10 60Q25 35 60 55T110 50L110 75L-10 75Z" fill="#A4C28D" stroke="#2B2523" strokeWidth="1.2" />
              {/* River */}
              <path d="M35 50Q45 58 40 75L55 75Q60 62 48 50Z" fill="#6EA8D9" stroke="#2B2523" strokeWidth="1" />
            </svg>
          </div>
          <div className="font-sketch text-ink mt-1 text-center text-xs font-bold">
            {isLogin ? 'collect' : 'travel'}
          </div>
        </div>

        {/* 3. BOTTOM-LEFT POLAROID */}
        <div
          className="bg-surface border-ink absolute bottom-2 left-4 z-10 w-40 rounded-sm border-2 p-2 pb-5 shadow-[2px_3px_0px_rgba(43,37,35,0.15)] transition-transform hover:scale-105 sm:w-44"
          style={{ transform: 'rotate(-5deg)' }}
        >
          <div className="border-ink/40 relative aspect-4/3 w-full overflow-hidden rounded-xs border bg-[#EBF0F5] p-1.5">
            {/* Night Mountain & Swirl Waves */}
            <svg viewBox="0 0 100 75" className="h-full w-full" fill="none">
              <rect width="100" height="75" fill="#2E3C54" />
              <circle cx="25" cy="22" r="7" fill="#F4E07B" />
              {/* Mountain */}
              <polygon points="55,20 20,70 90,70" fill="#4A5B78" stroke="#FFFFFF" strokeWidth="1" />
              {/* Wavy lines */}
              <path d="M0 60Q25 52 50 60T100 58" stroke="#E6F0FA" strokeWidth="1.2" fill="none" />
              <path d="M0 68Q25 60 50 68T100 66" stroke="#E6F0FA" strokeWidth="1.2" fill="none" />
            </svg>
          </div>
          <div className="font-sketch text-ink mt-1 text-center text-xs font-bold">
            {isLogin ? 'explore' : 'discover'}
          </div>
        </div>

        {/* 4. BOTTOM-RIGHT POLAROID */}
        <div
          className="bg-surface border-ink absolute right-4 bottom-0 z-10 w-40 rounded-sm border-2 p-2 pb-5 shadow-[2px_3px_0px_rgba(43,37,35,0.15)] transition-transform hover:scale-105 sm:w-44"
          style={{ transform: 'rotate(7deg)' }}
        >
          <div className="border-ink/40 relative aspect-4/3 w-full overflow-hidden rounded-xs border bg-[#FAF0E6] p-1.5">
            {/* Girl with sketchbook */}
            <svg viewBox="0 0 100 75" className="h-full w-full" fill="none">
              <rect width="100" height="75" fill="#FDF3E7" />
              {/* Character head & long hair */}
              <circle cx="50" cy="28" r="10" fill="#F5CBA7" stroke="#2B2523" strokeWidth="1.2" />
              <path d="M42 22C42 16 58 16 58 22C58 26 56 36 56 42L44 42C44 36 42 26 42 22Z" fill="#2B2523" />
              {/* Orange sweater */}
              <path d="M38 42C38 38 62 38 62 42L66 65L34 65Z" fill="#D95328" stroke="#2B2523" strokeWidth="1.2" />
              {/* Open sketchbook */}
              <polygon points="40,50 50,54 60,50 60,62 50,66 40,62" fill="#FFFFFF" stroke="#2B2523" strokeWidth="1.2" />
            </svg>
          </div>
          <div className="font-sketch text-ink mt-1 text-center text-xs font-bold">{isLogin ? 'create' : 'create'}</div>
        </div>

        {/* 5. CENTER HERO POLAROID (Pinned with Pushpin at top) */}
        <div
          className="bg-surface border-ink absolute top-1/2 left-1/2 z-30 w-44 -translate-x-1/2 -translate-y-1/2 rounded-sm border-2 p-2.5 pb-6 shadow-[3px_5px_0px_rgba(43,37,35,0.2)] transition-transform hover:scale-105 sm:w-48"
          style={{ transform: 'translate(-50%, -50%) rotate(-1deg)' }}
        >
          {/* Real Terracotta Pushpin Pinned at Top */}
          <div className="absolute -top-5 left-1/2 z-40 -translate-x-1/2">
            <SketchPushpin size={34} rotation={-5} />
          </div>

          <div className="border-ink/40 relative flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-xs border bg-[#FFF8EE] p-1">
            {/* Vintage Camera & Map Pin Artwork */}
            <svg viewBox="0 0 100 75" className="h-full w-full" fill="none">
              <rect width="100" height="75" fill="#FAF6EE" />
              {/* Dotted paths */}
              <path d="M20 55Q35 30 50 48T80 35" stroke="#2B2523" strokeWidth="1" strokeDasharray="3 3" />
              {/* Camera */}
              <rect x="22" y="24" width="28" height="20" rx="3" fill="#D95328" stroke="#2B2523" strokeWidth="1.4" />
              <circle cx="36" cy="34" r="6" fill="#FDFBF7" stroke="#2B2523" strokeWidth="1.4" />
              <rect x="26" y="20" width="8" height="4" fill="#2B2523" />
              {/* Map Marker Pin */}
              <path
                d="M68 22C64 22 61 25 61 29C61 34 68 42 68 42C68 42 75 34 75 29C75 25 72 22 68 22Z"
                fill="#D95328"
                stroke="#2B2523"
                strokeWidth="1.4"
              />
              <circle cx="68" cy="29" r="2.5" fill="#FFFFFF" />
              {/* Mini photo frame */}
              <rect x="52" y="46" width="16" height="12" fill="#FFFFFF" stroke="#2B2523" strokeWidth="1" />
            </svg>
          </div>
          <div className="font-sketch text-ink mt-1.5 text-center text-sm font-bold">
            {isLogin ? 'share' : 'discover'}
          </div>
        </div>
      </div>

      {/* Prominent Handwritten Tagline Below Polaroid Collage */}
      <div className="mt-8 text-center">
        <h2 className="font-sketch text-ink text-2xl leading-tight font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
          {isLogin ? (
            <>
              welcome to the
              <br />
              creative corner!
            </>
          ) : (
            <>
              start your
              <br />
              creative journey!
            </>
          )}
        </h2>
      </div>
    </div>
  );
};
