import * as React from 'react';
import { cn } from '@/lib/utils';

export type SketchButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type SketchButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface SketchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SketchButtonVariant;
  size?: SketchButtonSize;
  loading?: boolean;
}

const variantStyles: Record<SketchButtonVariant, string> = {
  primary:
    'bg-brand-primary text-white border-2 border-ink shadow-[2px_3px_0px_#2B2523] hover:bg-brand-hover active:shadow-[1px_1px_0px_#2B2523] active:translate-x-[1px] active:translate-y-[1px]',
  secondary:
    'bg-white text-ink border-2 border-ink shadow-[1px_2px_0px_#2B2523] hover:bg-surface-tint active:shadow-none active:translate-x-[1px] active:translate-y-[1px]',
  outline:
    'bg-transparent text-ink border-2 border-ink hover:bg-surface-tint active:translate-x-[1px] active:translate-y-[1px]',
  ghost: 'bg-transparent text-ink hover:bg-surface-tint/60 active:bg-surface-tint',
};

const sizeStyles: Record<SketchButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg font-medium',
  md: 'px-4 py-2 text-xs font-bold rounded-[14px]',
  lg: 'px-6 py-2.5 text-base font-bold rounded-[18px]',
  icon: 'p-2.5 rounded-[14px] flex items-center justify-center',
};

export const SketchButton = React.forwardRef<HTMLButtonElement, SketchButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center gap-2 transition-all duration-150 select-none',
          'disabled:translate-x-0 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

SketchButton.displayName = 'SketchButton';
