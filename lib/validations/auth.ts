import { z } from 'zod';

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Please enter your username or email address').trim(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters').max(50).trim(),
    email: z.email('Please enter a valid email address').toLowerCase().trim(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    termsAccepted: z.literal(true, {
      message: 'You must accept the terms & privacy policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.infer<typeof registerSchema>;

