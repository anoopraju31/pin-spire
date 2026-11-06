import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SketchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

/**
 * Hand-drawn sketchbook-style input with deliberately imperfect borders.
 * Uses asymmetric border-radius to simulate a pen-drawn rectangle.
 */
export const SketchInput = React.forwardRef<HTMLInputElement, SketchInputProps>(
  ({ className, type = 'text', error, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {startIcon && (
          <div className="text-ink-muted pointer-events-none absolute left-3 flex items-center justify-center">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            // Base
            'text-ink placeholder:text-ink-muted/70 w-full rounded bg-white px-4 py-2.5 text-sm font-medium transition-all duration-150',
            // Hand-drawn sketchy border
            'border-ink rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-3',
            // Focus ring
            'focus:border-brand-primary focus:ring-brand-primary/30 focus:ring-2 focus:outline-none',
            // Disabled
            'disabled:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-50',
            // Error
            'aria-invalid:border-error aria-invalid:ring-error/20',
            error && 'border-error focus:border-error focus:ring-error/20',
            // Icon padding
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            className,
          )}
          {...props}
        />
        {endIcon && <div className="text-ink-muted absolute right-3 flex items-center justify-center">{endIcon}</div>}
      </div>
    );
  },
);

SketchInput.displayName = 'SketchInput';
