import type { Metadata } from 'next';
import { PolaroidCollage } from '@/components/shared/polaroid-collage';
import { LoginForm } from '@/components/pages/auth/login-form';

export const metadata: Metadata = {
  title: 'Log In',
  description: 'Sign in to your Pin-Spire sketchbook to save and share creative ideas.',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-12">
      <div className="grid w-full max-w-5xl grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
        <PolaroidCollage
          title="welcome to the creative corner!"
          subtitle="pin your ideas, sketch your dreams & inspire a community of makers."
          className="hidden lg:flex"
        />
        <div className="flex w-full items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
