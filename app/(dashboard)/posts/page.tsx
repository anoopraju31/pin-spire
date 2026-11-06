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
    <div className="min-h-screen w-full bg-canvas flex flex-col">
      {/* Top Sketchbook Header */}
      <header className="w-full border-b-2 border-ink bg-surface px-6 py-4 shadow-sketch sticky top-0 z-30">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/posts" className="flex items-center gap-2">
            <span className="text-xl">✏️</span>
            <span className="font-display text-2xl font-black text-brand-primary tracking-wider">
              PIN-SPIRE
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/posts/create"
              className="font-sketch font-bold text-xs sm:text-sm bg-brand-primary text-white border-2 border-ink px-4 py-2 rounded-xl shadow-[2px_2px_0px_#2B2523] hover:bg-brand-hover active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              + Create Pin
            </Link>
            <UserButton />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 sm:p-8 flex flex-col items-center justify-center text-center">
        <div className="relative max-w-md w-full bg-surface border-2 border-ink rounded-3xl p-8 shadow-sketch">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 select-none text-2xl">
            📌
          </div>

          <h1 className="font-sketch text-2xl sm:text-3xl font-extrabold text-ink mt-2">
            Welcome to Pin-Spire!
          </h1>
          <p className="font-sketch text-sm text-ink-muted mt-2">
            Hello, <span className="text-ink font-bold">{user?.firstName || user?.emailAddresses?.[0]?.emailAddress || 'Maker'}</span>! You are successfully signed in to your sketchbook.
          </p>

          <div className="mt-6 pt-4 border-t-2 border-dashed border-ink/20 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/posts/create"
              className="font-sketch font-bold text-sm bg-brand-primary text-white border-2 border-ink px-5 py-2.5 rounded-xl shadow-[2px_2px_0px_#2B2523] hover:bg-brand-hover transition-all"
            >
              Start Creating Pins
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
