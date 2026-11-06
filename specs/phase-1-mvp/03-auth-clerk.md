# Phase 1 Specification: Clerk Authentication & Route Security

## 1. Authentication Strategy

User authentication and session management are handled by **Clerk** (`@clerk/nextjs`).

### Core Requirements

1. **Custom Sketchbook UI**: Rather than default Clerk modal popups, we use Clerk's custom flow hooks (`useSignIn`, `useSignUp`) to render the custom polaroid split-screen layouts from mockups `media_1793795508828_e1cc5d8d.jpg` and `media_1793795508824_c8dfce2c.jpg`.
2. **Supported Auth Methods**:
   - Email & Password
   - Username or Email sign-in
   - Google OAuth (`/sign-in/sso-callback`)
   - Apple OAuth (`/sign-in/sso-callback`)

---

## 2. Route Protection & Middleware (`middleware.ts`)

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/', '/register(.*)', '/api/webhooks(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
```

---

## 3. User Database Synchronization

When a user signs up on Clerk, an internal `User` record must be created in PostgreSQL:

1. **Identity Link**: Clerk's unique `user.id` is stored in `users.clerk_id`.
2. **Default Profile Data**: `fullName`, `email`, `username`, and `profileImg` are mirrored from Clerk.
3. **Execution**: Handled through a Clerk Webhook (`user.created`) or a verified lazy-sync check upon first authenticated session.

---

## 4. Environment Variables Required

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/register"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/posts"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/posts"
```

---

## 5. Step 4 Execution & Tracking Checklist

- [ ] **Step 4: UI Form Core & Clerk Authentication (`/` & `/register`)**
  - [x] **Sub-step 4.1**: Install form dependencies & implement compound `<Form>` components
  - [x] **Sub-step 4.2**: Install `@clerk/nextjs` & configure route protection middleware in `middleware.ts`
  - [ ] **Sub-step 4.3**: Build reusable Sketchbook UI elements (`SketchInput`, `SketchButton`, `PolaroidCollage`)
  - [ ] **Sub-step 4.4**: Build custom Sketchbook Login Page (`app/(auth)/page.tsx`)
  - [ ] **Sub-step 4.5**: Build custom Sketchbook Registration Page (`app/(auth)/register/page.tsx`)
  - [ ] **Sub-step 4.6**: Implement user database synchronization to PostgreSQL `users` table
