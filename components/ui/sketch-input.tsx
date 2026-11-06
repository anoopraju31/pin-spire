import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SketchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

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
            'border-sketch bg-surface text-ink placeholder:text-ink-muted w-full rounded-xl px-4 py-2.5 text-sm',
            'shadow-sketch transition-all duration-150',
            'focus:ring-brand-primary focus:border-brand-primary focus:ring-2 focus:outline-none',
            'disabled:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-50',
            'aria-invalid:border-error aria-invalid:ring-error/20',
            error && 'border-error focus:border-error focus:ring-error/20',
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
