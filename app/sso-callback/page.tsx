import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';

export default function SSOCallbackPage() {
  return (
    <div className="min-h-screen w-full bg-canvas flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
        <p className="font-sketch text-sm font-semibold text-ink">
          sketching your sign in...
        </p>
      </div>
      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl="/posts"
        signUpForceRedirectUrl="/posts"
      />
    </div>
  );
}

