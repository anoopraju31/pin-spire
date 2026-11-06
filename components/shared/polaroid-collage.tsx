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
        'border-sketch bg-surface-tint relative flex flex-col justify-between overflow-hidden rounded-3xl p-8 lg:p-12',
        'shadow-sketch',
        className,
      )}
    >
      {/* Top Header & Branding Doodle */}
      <div className="relative z-10 space-y-2">
        <div className="border-sketch bg-canvas text-ink shadow-sketch inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold">
          <span>✨</span>
          <span>your creative scrapbook</span>
        </div>
        <h2 className="text-ink text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        <p className="text-ink-muted max-w-md text-sm">{subtitle}</p>
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
            'border-sketch bg-surface absolute top-4 -left-2 w-44 -rotate-6 rounded-2xl p-3 sm:w-52',
            'shadow-sketch transition-transform duration-200 hover:z-20 hover:scale-105',
          )}
        >
          {/* Pushpin indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-base">📌</div>
          <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-xl bg-[#E8E2D9] p-4 text-center">
            <span className="text-4xl">☕</span>
            <span className="text-ink-muted mt-2 text-xs font-medium">morning coffee & ideation</span>
          </div>
          <p className="text-ink mt-2 text-center text-xs font-semibold">cozy cafe desk</p>
        </div>

        {/* Polaroid 2 - Center / Hero */}
        <div
          className={cn(
            'border-sketch bg-surface relative z-10 w-48 rotate-2 rounded-2xl p-3 sm:w-56',
            'shadow-sketch-hover transition-transform duration-200 hover:scale-105',
          )}
        >
          {/* Pushpin indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-base">📍</div>
          <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-xl bg-[#F0E6D8] p-4 text-center">
            <span className="text-5xl">🌿</span>
            <span className="text-ink-muted mt-2 text-xs font-medium">botanical sketchbook study</span>
          </div>
          <p className="text-ink mt-2 text-center text-xs font-semibold">ink & watercolor</p>
        </div>

        {/* Polaroid 3 - Right / Bottom */}
        <div
          className={cn(
            'border-sketch bg-surface absolute -right-2 bottom-2 w-44 rotate-6 rounded-2xl p-3 sm:w-52',
            'shadow-sketch transition-transform duration-200 hover:z-20 hover:scale-105',
          )}
        >
          {/* Pushpin indicator */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-base">📌</div>
          <div className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-xl bg-[#E2DBD1] p-4 text-center">
            <span className="text-4xl">🎨</span>
            <span className="text-ink-muted mt-2 text-xs font-medium">palette exploration</span>
          </div>
          <p className="text-ink mt-2 text-center text-xs font-semibold">warm earth tones</p>
        </div>
      </div>

      {/* Bottom Doodle Footnote */}
      <div className="border-ink/20 text-ink-muted relative z-10 flex items-center justify-between border-t-2 border-dashed pt-4 text-xs">
        <span className="flex items-center gap-1.5 font-medium">
          <span>✏️</span> hand-drawn scrapbook vibes
        </span>
        <span className="text-brand-primary font-semibold">#PinSpireCommunity</span>
      </div>
    </div>
  );
};
