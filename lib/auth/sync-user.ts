import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

/**
 * Synchronizes the currently authenticated Clerk user to the PostgreSQL `users` table.
 * Guaranteed to create or update the user record upon their first session entry.
 */
export async function syncCurrentUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  if (!email) return null;

  const fullName =
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(' ') ||
    clerkUser.username ||
    'Creative Maker';

  const baseUsername =
    clerkUser.username ||
    email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_');

  // Check if user already exists by clerkId
  const existingUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  if (existingUser) {
    return await prisma.user.update({
      where: { clerkId: clerkUser.id },
      data: {
        fullName,
        email,
        profileImg: clerkUser.imageUrl,
      },
    });
  }

  // Ensure unique username
  let username = baseUsername;
  let counter = 1;
  while (await prisma.user.findUnique({ where: { username } })) {
    username = `${baseUsername}_${counter}`;
    counter++;
  }

  return await prisma.user.create({
    data: {
      clerkId: clerkUser.id,
      fullName,
      username,
      email,
      profileImg: clerkUser.imageUrl,
    },
  });
}
