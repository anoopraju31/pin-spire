import type { Metadata } from 'next';

import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Pin-Spire | Your Creative Sketchbook & Idea Board',
    template: '%s | Pin-Spire',
  },
  description: 'A cozy hand-drawn sketchbook community to find, pin, and share creative ideas.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col bg-canvas text-ink antialiased selection:bg-brand-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
