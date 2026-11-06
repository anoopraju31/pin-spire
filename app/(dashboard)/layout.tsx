import type { ReactNode } from 'react';
import { auth } from '@clerk/nextjs/server';
import { syncCurrentUser } from '@/lib/auth/sync-user';

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  await auth.protect();
  await syncCurrentUser();

  return <>{children}</>;
}
