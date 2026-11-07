import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const COOKIE_NAME = 'pin_spire_session';
const SESSION_EXPIRATION_DAYS = 7;
const SESSION_EXPIRATION_SECONDS = SESSION_EXPIRATION_DAYS * 24 * 60 * 60;

const secretKey = process.env.SESSION_SECRET || 'pin-spire-super-secret-key-sketchbook-32-chars-min';
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload {
  userId: string;
  expiresAt: Date;
}

/**
 * Creates and signs a secure JWT session token.
 */
export async function encryptSession(payload: { userId: string }): Promise<string> {
  return new SignJWT({ userId: payload.userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_EXPIRATION_DAYS}d`)
    .sign(encodedKey);
}

/**
 * Verifies and decodes a JWT session token.
 * Safe for use in middleware/proxy as well as server components.
 */
export async function decryptSession(sessionToken: string | undefined): Promise<{ userId: string } | null> {
  if (!sessionToken) return null;

  try {
    const { payload } = await jwtVerify(sessionToken, encodedKey, {
      algorithms: ['HS256'],
    });

    if (typeof payload.userId === 'string') {
      return { userId: payload.userId };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Sets an HTTP-only secure cookie for the authenticated user.
 */
export async function createSession(userId: string): Promise<void> {
  const token = await encryptSession({ userId });
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_EXPIRATION_SECONDS,
  });
}

/**
 * Retrieves the current session payload from cookies.
 */
export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME)?.value;
  return decryptSession(sessionCookie);
}

/**
 * Deletes the session cookie (logs out the user).
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Fetches the currently authenticated user record from the database.
 */
export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        id: true,
        fullName: true,
        username: true,
        email: true,
        profileImg: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (err) {
    console.error('Failed to retrieve current user from database:', err);
    return null;
  }
}
