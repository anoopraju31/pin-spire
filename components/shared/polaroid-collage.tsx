import * as React from 'react';
import { cn } from '@/lib/utils';

export interface PolaroidCollageProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const PolaroidCollage: React.FC<PolaroidCollageProps> = ({
  title = 'welcome to the creative corner!',
  subtitle = 'pin your ideas, sketch your dreams & inspire a community of makers.',
  className,
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col justify-between overflow-hidden rounded-3xl border-sketch bg-surface-tint p-8 lg:p-12',
        'shadow-sketch',
        className
      )}
    >
      {/* Top Header & Branding Doodle */}
      <div className="relative z-10 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border-sketch bg-canvas px-3.5 py-1 text-xs font-semibold text-ink shadow-sketch">
          <span>✨</span>
          <span>your creative scrapbook</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-md text-sm text-ink-muted">
          {subtitle}
        </p>
      </div>

      {/* Decorative Polaroid Cards Collage */}
      <div className="relative my-8 flex min-h-[340px] items-center justify-center">
        {/* Decorative Tape / Pushpin Behind */}
        <div className="absolute top-2 left-10 text-2xl" aria-hidden="true">
          📌
        </div>
        <div className="absolute top-4 right-14 text-2xl" aria-hidden="true">
          📍
        </div>

        {/* Polaroid 1 - Left / Top */}
        <div
          className={cn(
            'absolute -left-2 top-4 w-44 sm:w-52 -rotate-6 rounded-2xl border-sketch bg-surface p-3',
            'shadow-sketch transition-transform hover:scale-105 hover:z-20 duration-200'
          )}
        >
          {/* Pushpin indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-base">
            📌
          </div>
          <div className="aspect-[4/5] w-full rounded-xl bg-[#E8E2D9] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-4xl">☕</span>
            <span className="mt-2 text-xs font-medium text-ink-muted">morning coffee & ideation</span>
          </div>
          <p className="mt-2 text-center text-xs font-semibold text-ink">
            cozy cafe desk
          </p>
        </div>

        {/* Polaroid 2 - Center / Hero */}
        <div
          className={cn(
            'relative z-10 w-48 sm:w-56 rotate-2 rounded-2xl border-sketch bg-surface p-3',
            'shadow-sketch-hover transition-transform hover:scale-105 duration-200'
          )}
        >
          {/* Pushpin indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-base">
            📍
          </div>
          <div className="aspect-[4/5] w-full rounded-xl bg-[#F0E6D8] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-5xl">🌿</span>
            <span className="mt-2 text-xs font-medium text-ink-muted">botanical sketchbook study</span>
          </div>
          <p className="mt-2 text-center text-xs font-semibold text-ink">
            ink & watercolor
          </p>
        </div>

        {/* Polaroid 3 - Right / Bottom */}
        <div
          className={cn(
            'absolute -right-2 bottom-2 w-44 sm:w-52 rotate-6 rounded-2xl border-sketch bg-surface p-3',
            'shadow-sketch transition-transform hover:scale-105 hover:z-20 duration-200'
          )}
        >
          {/* Pushpin indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-base">
            📌
          </div>
          <div className="aspect-[4/5] w-full rounded-xl bg-[#E2DBD1] flex flex-col items-center justify-center p-4 text-center">
            <span className="text-4xl">🎨</span>
            <span className="mt-2 text-xs font-medium text-ink-muted">palette exploration</span>
          </div>
          <p className="mt-2 text-center text-xs font-semibold text-ink">
            warm earth tones
          </p>
        </div>
      </div>

      {/* Bottom Doodle Footnote */}
      <div className="relative z-10 flex items-center justify-between border-t-2 border-dashed border-ink/20 pt-4 text-xs text-ink-muted">
        <span className="flex items-center gap-1.5 font-medium">
          <span>✏️</span> hand-drawn scrapbook vibes
        </span>
        <span className="font-semibold text-brand-primary">
          #PinSpireCommunity
        </span>
      </div>
    </div>
  );
};
