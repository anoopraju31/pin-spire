'use client';

import * as React from 'react';
import Link from 'next/link';
import { AuthenticateWithRedirectCallback, useAuth } from '@clerk/nextjs';

export default function SSOCallbackPage() {
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const [timedOut, setTimedOut] = React.useState(false);

  React.useEffect(() => {
    if (isAuthLoaded && isSignedIn) {
      window.location.href = '/posts';
    }
  }, [isAuthLoaded, isSignedIn]);

  React.useEffect(() => {
    // If Clerk handshake takes longer than 6 seconds, surface recovery actions
    const timer = setTimeout(() => {
      setTimedOut(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-canvas flex min-h-screen w-full flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="border-brand-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
        <p className="font-sketch text-ink text-base font-semibold">sketching your sign in...</p>

        {timedOut && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <p className="text-ink/70 text-xs">Taking longer than usual?</p>
            <div className="flex items-center gap-3">
              <Link href="/posts" className="font-sketch text-brand-primary text-xs font-bold underline">
                Go to Feed
              </Link>
              <span className="text-ink/40 text-xs">•</span>
              <Link href="/" className="font-sketch text-ink/70 text-xs font-bold underline">
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>

      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl="/posts"
        signUpForceRedirectUrl="/posts"
        signInFallbackRedirectUrl="/posts"
        signUpFallbackRedirectUrl="/posts"
        continueSignUpUrl="/posts"
      />
    </div>
  );
}
