# Phase 1 Specification: Custom Cookie-Based Authentication & Route Security

## 1. Authentication Strategy

User authentication and session management are handled via a **Custom Cookie-Based Session System** using `jose` JWTs, `bcryptjs` password hashing, and direct PostgreSQL database persistence via Prisma.

### Core Requirements

1. **Custom Sketchbook UI**: Compound `<Form>` components with React Hook Form + Zod, matching mockups `media_1793795508828_e1cc5d8d.jpg` and `media_1793795508824_c8dfce2c.jpg`.
2. **Supported Auth Methods**:
   - Username or Email + Password login (`loginAction`)
   - Full registration with automatic password hashing (`registerAction`)
   - Secure HTTP-only `pin_spire_session` cookie signed with HS256 JWT
   - Clean logout action (`logoutAction`)
3. **Independence**: 100% self-contained, no external authentication providers, no bot detection blocking, and zero third-party rate limits.

---

## 2. Session Architecture (`lib/auth/session.ts`)

- **Token**: Signed JSON Web Token (`HS256`) containing `{ userId }` with 7-day expiration.
- **Cookie**:
  - Name: `pin_spire_session`
  - Attributes: `httpOnly: true`, `secure: production`, `sameSite: 'lax'`, `path: '/'`, `maxAge: 7 days`.
- **Helpers**:
  - `createSession(userId)`
  - `getSession()`
  - `deleteSession()`
  - `getCurrentUser()`

---

## 3. Route Protection & Proxy (`proxy.ts` & Dashboard Layout)

- **`proxy.ts`**: Intercepts requests, verifies `pin_spire_session` using `decryptSession(token)`.
  - Authenticated users attempting to visit `/` or `/register` are redirected to `/posts`.
  - Unauthenticated users attempting to visit `/posts(.*)` are redirected to `/`.
- **`app/(dashboard)/layout.tsx`**: Server component layout verifies `getSession()`. If not authenticated, redirects to `/`.

---

## 4. Environment Variables Required

```bash
SESSION_SECRET="your-32-character-secret-key"
```
