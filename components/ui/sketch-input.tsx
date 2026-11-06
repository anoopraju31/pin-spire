import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SketchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const SketchInput = React.forwardRef<HTMLInputElement, SketchInputProps>(
  ({ className, type = 'text', error, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center">
        {startIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center justify-center text-ink-muted">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            'w-full rounded-xl border-sketch bg-surface px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted',
            'shadow-sketch transition-all duration-150',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-tint',
            'aria-invalid:border-error aria-invalid:ring-error/20',
            error && 'border-error focus:border-error focus:ring-error/20',
            startIcon && 'pl-10',
            endIcon && 'pr-10',
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 flex items-center justify-center text-ink-muted">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);

SketchInput.displayName = 'SketchInput';
