'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp, useSignIn } from '@clerk/nextjs/legacy';

import { registerSchema, type RegisterInput } from '@/lib/validations/auth';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { SketchInput } from '@/components/ui/sketch-input';
import { SketchButton } from '@/components/ui/sketch-button';
import { WarningDoodle, SketchLine } from '@/components/shared/sketch-doodles';

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const [authError, setAuthError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // Email verification state
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState('');
  const [verificationError, setVerificationError] = React.useState<string | null>(null);
  const [isVerifying, setIsVerifying] = React.useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: true,
    },
  });

  const onSubmit = async (values: RegisterInput) => {
    if (!isLoaded || !signUp) return;
    setIsLoading(true);
    setAuthError(null);

    const [firstName, ...rest] = values.fullName.trim().split(' ');
    const lastName = rest.join(' ') || undefined;

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        firstName,
        lastName,
      });

      if (signUp.status === 'missing_requirements') {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
        setPendingVerification(true);
      } else if (signUp.status === 'complete') {
        await setActive({ session: signUp.createdSessionId });
        window.location.href = '/posts';
      } else {
        window.location.href = '/posts';
      }
    } catch (err: unknown) {
      const clerkError = (err as { errors?: Array<{ code?: string; longMessage?: string; message?: string }> })
        ?.errors?.[0];
      if (clerkError?.code === 'session_exists' || clerkError?.message?.toLowerCase().includes('already signed in')) {
        window.location.href = '/posts';
        return;
      }
      const message =
        clerkError?.longMessage ||
        clerkError?.message ||
        'Unable to create account. Please check your information and try again.';
      setAuthError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp || !verificationCode.trim()) return;

    setIsVerifying(true);
    setVerificationError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode.trim(),
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        window.location.href = '/posts';
      } else {
        setVerificationError('Verification incomplete. Please check your code or try again.');
      }
    } catch (err: unknown) {
      const clerkError = (err as { errors?: Array<{ code?: string; longMessage?: string; message?: string }> })
        ?.errors?.[0];
      if (clerkError?.code === 'session_exists' || clerkError?.message?.toLowerCase().includes('already signed in')) {
        window.location.href = '/posts';
        return;
      }
      const message = clerkError?.longMessage || clerkError?.message || 'Invalid verification code. Please try again.';
      setVerificationError(message);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOAuth = async (strategy: 'oauth_google' | 'oauth_apple') => {
    setIsLoading(true);
    setAuthError(null);
    try {
      if (signUp) {
        await signUp.authenticateWithRedirect({
          strategy,
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/posts',
        });
      } else if (signIn) {
        await signIn.authenticateWithRedirect({
          strategy,
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/posts',
        });
      }
    } catch (err: unknown) {
      const clerkError = (err as { errors?: Array<{ code?: string; longMessage?: string; message?: string }> })
        ?.errors?.[0];
      if (clerkError?.code === 'session_exists' || clerkError?.message?.toLowerCase().includes('already signed in')) {
        window.location.href = '/posts';
        return;
      }
      const message =
        clerkError?.longMessage ||
        clerkError?.message ||
        'OAuth authentication failed. If in development, disable Bot Detection in your Clerk Dashboard under Attack Protection.';
      setAuthError(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <div className="flex w-full max-w-[340px] flex-col items-center sm:max-w-[360px]">
        <h2 className="font-sketch text-ink mt-3 mb-2 text-center text-2xl font-extrabold sm:text-3xl">
          Verify your email
        </h2>
        <p className="font-sketch text-ink-muted mb-4 text-center text-xs">
          we sent a confirmation code to your email. enter it below to activate your sketchbook.
        </p>

        {verificationError && (
          <div
            role="alert"
            className="border-error bg-error/10 text-error mb-4 flex w-full items-center gap-2 rounded-xl border-2 p-2.5 text-xs font-semibold"
          >
            <WarningDoodle size={18} />
            <span>{verificationError}</span>
          </div>
        )}

        <form onSubmit={onVerifyEmail} className="w-full space-y-3.5">
          <div className="space-y-1">
            <SketchInput
              placeholder="Verification Code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isVerifying}
              autoFocus
            />
          </div>

          <div className="pt-1">
            <SketchButton
              type="submit"
              variant="primary"
              size="lg"
              loading={isVerifying}
              className="font-sketch w-full py-2.5 text-base font-bold"
            >
              Verify &amp; Activate
            </SketchButton>
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={async () => {
                if (!signUp) return;
                await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
              }}
              className="font-sketch text-brand-primary hover:text-brand-hover cursor-pointer text-xs font-semibold underline"
            >
              Didn&apos;t receive code? Resend
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[340px] flex-col items-center sm:max-w-[360px]">
      {/* Top Branding */}
      <div className="mb-1 text-center">
        <div className="mb-2 flex items-center justify-center gap-2 lg:hidden">
          <div className="bg-brand-primary border-ink flex h-9 w-9 items-center justify-center rounded-full border-2 text-base text-white shadow-[1px_2px_0px_#2B2523]">
            ✏️
          </div>
          <span className="font-display text-brand-primary text-3xl font-black tracking-wider">PIN-SPIRE</span>
        </div>

        <div className="hidden lg:block">
          <h1 className="font-display text-brand-primary text-4xl font-black tracking-wider">PIN-SPIRE</h1>
          <p className="font-sketch text-ink mt-0.5 text-base font-semibold tracking-wide">
            your space to find &amp; save ideas
          </p>
        </div>
      </div>

      {/* Greeting Title */}
      <h2 className="font-sketch text-ink mt-3 mb-4 text-center text-2xl font-extrabold sm:text-3xl">
        Create your account
      </h2>

      {/* Global Auth Error Alert */}
      {authError && (
        <div
          role="alert"
          className="border-error bg-error/10 text-error mb-4 flex w-full items-center gap-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 p-2.5 text-xs font-semibold"
        >
          <WarningDoodle size={18} />
          <span>{authError}</span>
        </div>
      )}

      {/* Compound Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel className="sr-only">Full Name</FormLabel>
                <FormControl>
                  <SketchInput {...field} placeholder="Full Name" autoComplete="name" disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Address */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel className="sr-only">Email Address</FormLabel>
                <FormControl>
                  <SketchInput
                    {...field}
                    type="email"
                    placeholder="Email Address"
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel className="sr-only">Create Password</FormLabel>
                <FormControl>
                  <SketchInput
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    endIcon={
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-ink-muted hover:text-ink cursor-pointer px-1 text-xs font-bold"
                        tabIndex={-1}
                      >
                        {showPassword ? 'hide' : 'show'}
                      </button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <FormLabel className="sr-only">Confirm Password</FormLabel>
                <FormControl>
                  <SketchInput
                    {...field}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    endIcon={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="text-ink-muted hover:text-ink cursor-pointer px-1 text-xs font-bold"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? 'hide' : 'show'}
                      </button>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms & Conditions Checkbox */}
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="space-y-0.5">
                <div className="flex items-center gap-2 pt-1 select-none">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className="border-ink text-brand-primary accent-brand-primary h-4 w-4 cursor-pointer rounded border-2"
                    disabled={isLoading}
                  />
                  <label htmlFor="terms" className="font-sketch text-ink cursor-pointer text-xs">
                    I agree to the <span className="font-bold underline">terms &amp; privacy policy</span>
                  </label>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sign Up Button */}
          <div className="pt-1">
            <SketchButton
              type="submit"
              variant="primary"
              size="lg"
              loading={isLoading}
              className="font-sketch w-full py-2.5 text-base font-bold"
            >
              Sign Up
            </SketchButton>
          </div>

          {/* Clerk CAPTCHA container for challenge verification */}
          <div id="clerk-captcha" className="flex w-full justify-center empty:hidden" />
        </form>
      </Form>

      {/* Hand-Drawn Styled Divider: — or sign up with — */}
      <div className="my-3.5 flex w-full items-center gap-2 select-none">
        <SketchLine className="flex-1" />
        <span className="font-sketch text-ink px-1 text-xs font-bold whitespace-nowrap">or sign up with</span>
        <SketchLine className="flex-1 -scale-x-100" />
      </div>

      {/* OAuth Social Buttons */}
      <div className="grid w-full grid-cols-2 gap-3">
        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleOAuth('oauth_google')}
          className="border-ink font-sketch text-ink hover:bg-surface-tint flex cursor-pointer items-center justify-center gap-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 bg-white px-3 py-2 text-xs font-bold shadow-[1px_2px_0px_#2B2523] transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Google</span>
        </button>

        <button
          type="button"
          disabled={isLoading}
          onClick={() => handleOAuth('oauth_apple')}
          className="border-ink font-sketch text-ink hover:bg-surface-tint flex cursor-pointer items-center justify-center gap-2 rounded-[255px_15px_225px_15px/15px_225px_15px_255px] border-2 bg-white px-3 py-2 text-xs font-bold shadow-[1px_2px_0px_#2B2523] transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none disabled:opacity-50"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.99.6-2.64 1.35-.58.65-1.09 1.72-.95 2.74 1 .08 2.04-.51 2.67-1.24z" />
          </svg>
          <span>Apple</span>
        </button>
      </div>

      {/* Switch to Login Link */}
      <div className="font-sketch text-ink mt-5 text-center text-sm font-semibold">
        <span>Already have an account? </span>
        <Link href="/" className="hover:text-brand-primary font-bold underline">
          Log in
        </Link>
      </div>
    </div>
  );
};
