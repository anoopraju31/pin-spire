'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/auth/session';
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '@/lib/validations/auth';

export type AuthActionResult = {
  success: boolean;
  error?: string;
};

/**
 * Server Action for User Registration.
 */
export async function registerAction(input: RegisterInput): Promise<AuthActionResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid registration information.',
    };
  }

  const { fullName, email, password } = parsed.data;
  const normalizedEmail = email.toLowerCase().trim();

  try {
    // Check if email already registered
    const existingEmail = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingEmail) {
      return {
        success: false,
        error: 'An account with this email address already exists. Please log in.',
      };
    }

    // Generate unique username from email handle or full name
    const rawUsername = normalizedEmail.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '_') || 'maker';
    let username = rawUsername;
    let counter = 1;
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${rawUsername}_${counter}`;
      counter++;
    }

    // Hash password with bcrypt
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user in PostgreSQL
    const user = await prisma.user.create({
      data: {
        fullName: fullName.trim(),
        email: normalizedEmail,
        username,
        passwordHash,
      } as any,
    });

    // Create cookie session
    await createSession(user.id);

    return { success: true };
  } catch (err) {
    console.error('Registration action error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred while creating your account. Please try again.',
    };
  }
}

/**
 * Server Action for User Login.
 */
export async function loginAction(input: LoginInput): Promise<AuthActionResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message || 'Invalid login details.',
    };
  }

  const { identifier, password } = parsed.data;
  const trimmedIdentifier = identifier.trim();

  try {
    // Find user by email or username
    const user = (await prisma.user.findFirst({
      where: {
        OR: [{ email: trimmedIdentifier.toLowerCase() }, { username: trimmedIdentifier }],
      },
    })) as {
      id: string;
      passwordHash: string;
      fullName: string;
      username: string;
      email: string;
    } | null;

    if (!user) {
      return {
        success: false,
        error: 'Invalid username/email or password. Please try again.',
      };
    }

    // Compare bcrypt password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Invalid username/email or password. Please try again.',
      };
    }

    // Create cookie session
    await createSession(user.id);

    return { success: true };
  } catch (err) {
    console.error('Login action error:', err);
    return {
      success: false,
      error: 'An unexpected error occurred while logging in. Please try again.',
    };
  }
}

/**
 * Server Action for User Logout.
 */
export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect('/');
}
