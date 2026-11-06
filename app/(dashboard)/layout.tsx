import type { ReactNode } from 'react';
import { auth } from '@clerk/nextjs/server';
import { syncCurrentUser } from '@/lib/auth/sync-user';

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  await auth.protect();

  try {
    await syncCurrentUser();
  } catch (err) {
    console.error('Failed to sync user to database:', err);
  }

  return <>{children}</>;
}
