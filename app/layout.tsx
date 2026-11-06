import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Pin-Spire | Your Creative Sketchbook & Idea Board',
    template: '%s | Pin-Spire',
  },
  description: 'A cozy hand-drawn sketchbook community to find, pin, and share creative ideas.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-canvas text-ink selection:bg-brand-primary flex min-h-full flex-col antialiased selection:text-white">
        {children}
      </body>
    </html>
  );
}
