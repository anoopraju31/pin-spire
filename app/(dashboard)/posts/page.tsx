import type { Metadata } from 'next';
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export const metadata: Metadata = {
  title: 'Posts Feed',
  description: 'Explore creative ideas, sketches, and pins from the community.',
};

export default async function PostsFeedPage() {
  const user = await currentUser();

  return (
    <div className="bg-canvas flex min-h-screen w-full flex-col">
      {/* Top Sketchbook Header */}
      <header className="border-ink bg-surface shadow-sketch sticky top-0 z-30 w-full border-b-2 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/posts" className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <span className="font-display text-brand-primary text-2xl font-black tracking-wider">PIN-SPIRE</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/posts/create"
              className="font-sketch bg-brand-primary border-ink hover:bg-brand-hover rounded-xl border-2 px-4 py-2 text-xs font-bold text-white shadow-[2px_2px_0px_#2B2523] transition-all active:translate-x-0.5 active:translate-y-0.5 sm:text-sm"
            >
              + Create Pin
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center p-6 text-center sm:p-8">
        <div className="bg-surface border-ink shadow-sketch relative w-full max-w-md rounded-3xl border-2 p-8">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl select-none">📌</div>

          <h1 className="font-sketch text-ink mt-2 text-2xl font-extrabold sm:text-3xl">Welcome to Pin-Spire!</h1>
          <p className="font-sketch text-ink-muted mt-2 text-sm">
            Hello,{' '}
            <span className="text-ink font-bold">
              {user?.firstName || user?.emailAddresses?.[0]?.emailAddress || 'Maker'}
            </span>
            ! You are successfully signed in to your sketchbook.
          </p>

          <div className="border-ink/20 mt-6 flex flex-col justify-center gap-3 border-t-2 border-dashed pt-4 sm:flex-row">
            <Link
              href="/posts/create"
              className="font-sketch bg-brand-primary border-ink hover:bg-brand-hover rounded-xl border-2 px-5 py-2.5 text-sm font-bold text-white shadow-[2px_2px_0px_#2B2523] transition-all"
            >
              Start Creating Pins
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
