# Phase 1: Granular Step-by-Step Execution Roadmap

This is the living execution checklist for Phase 1. Each sub-step is atomic: **implement -> verify -> test -> commit -> advance**.
Once all sub-steps in a step are completed, mark the parent step as `[x]`.

---

## - [x] Step 1: Design Tokens & Build Stability

- [x] **Sub-step 1.1**: Resolve Next.js 16 / Turbopack CSS configuration in `next.config.ts`.
  - Fix loader recursion issue causing build panics on Windows.
  - _Verify_: `npm run build` succeeds without Turbopack panic.
  - _Commit_: `chore: configure next.config for stable css compilation`.
- [x] **Sub-step 1.2**: Define Sketchbook Theme tokens in `app/globals.css`.
  - Add color tokens, sketchy border utility (`.border-sketch`), and tactile shadows using Tailwind CSS `@theme`.
  - _Verify_: `npx tsc --noEmit` and styles compile cleanly.
  - _Commit_: `style: define sketchbook design tokens and sketchy border utilities`.
- [x] **Sub-step 1.3**: Update root layout metadata and branding in `app/layout.tsx`.
  - Apply warm canvas background `#FAF7F2` and update page title to "Pin-Spire".
  - _Verify_: Root layout renders with warm canvas background.
  - _Commit_: `feat: set application branding metadata and root canvas layout`.

---

## - [x] Step 2: PostgreSQL & Prisma Database Layer

- [x] **Sub-step 2.1**: Install Prisma dependencies (`prisma`, `@prisma/client`).
  - _Verify_: `npm list prisma @prisma/client` shows clean installation.
  - _Commit_: `chore(db): install prisma and prisma-client`.
- [x] **Sub-step 2.2**: Write `prisma/schema.prisma` with `User`, `Category`, `Tag`, `Post`, `PostTag`.
  - _Verify_: Run `npx prisma validate`.
  - _Commit_: `feat(db): define complete prisma relational schema`.
- [x] **Sub-step 2.3**: Create Prisma singleton client in `lib/prisma.ts`.
  - _Verify_: `npx tsc --noEmit` passes.
  - _Commit_: `feat(db): create cached prisma singleton instance`.
- [x] **Sub-step 2.4**: Generate Prisma client types and prepare `.env.example`.
  - Add `DATABASE_URL` placeholder.
  - Run `npx prisma generate`.
  - _Verify_: Types import successfully in scratch test.
  - _Commit_: `chore(db): generate prisma types and add env template`.

---

## - [x] Step 3: AWS S3 Presigned URL Media Storage

- [x] **Sub-step 3.1**: Install AWS S3 SDK (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`).
  - _Verify_: Packages installed without dependency conflicts.
  - _Commit_: `chore(s3): install aws s3 and presigner packages`.
- [x] **Sub-step 3.2**: Create S3 client configuration and validation helpers in `lib/s3.ts`.
  - Validate image MIME types (JPEG, PNG, WebP) and maximum file size (10MB).
  - _Verify_: `npx tsc --noEmit` passes.
  - _Commit_: `feat(s3): configure s3 client and upload validation utilities`.
- [x] **Sub-step 3.3**: Implement Server Action `getPresignedUrlAction` in `actions/s3.ts`.
  - Sign `PutObjectCommand` with a 60-second expiration.
  - _Verify_: Typecheck passes.
  - _Commit_: `feat(s3): create presigned url generation server action`.

---

## - [ ] Step 4: UI Form Core & Clerk Authentication (`/` & `/register`)

- [ ] **Sub-step 4.1**: Install form dependencies (`react-hook-form`, `zod`, `@hookform/resolvers`).
  - Implement compound `<Form>` components in `components/ui/form/index.tsx` using pure Tailwind CSS.
  - Implement Zod schemas in `lib/validations/auth.ts` and `lib/validations/post.ts`.
  - _Verify_: Typecheck passes.
  - _Commit_: `feat(ui): implement compound form components and zod schemas`.
- [ ] **Sub-step 4.2**: Install `@clerk/nextjs` and configure Clerk middleware in `middleware.ts`.
  - Define public routes (`/`, `/register`) and protected routes (`/posts(.*)`).
  - _Verify_: Unauthenticated requests to `/posts` are intercepted.
  - _Commit_: `feat(auth): configure clerk middleware and route protection`.
- [ ] **Sub-step 4.3**: Build reusable Sketchbook UI elements:
  - `components/ui/sketch-input.tsx` (sketchy pencil border input).
  - `components/ui/sketch-button.tsx` (terracotta primary and draft buttons).
  - `components/shared/polaroid-collage.tsx` (hand-drawn illustrations from mockups).
  - _Verify_: Components render in isolation.
  - _Commit_: `feat(ui): build sketchbook inputs, buttons, and polaroid collage`.
- [ ] **Sub-step 4.4**: Build Login Page at `app/(auth)/page.tsx`.
  - Match mockup `login.png` using `<Form>` + Clerk `useSignIn()`.
  - _Verify_: Submits credentials, displays validation errors, redirects to `/posts`.
  - _Commit_: `feat(auth): implement custom sketchbook login page`.
- [ ] **Sub-step 4.5**: Build Register Page at `app/(auth)/register/page.tsx`.
  - Match mockup `register.png` using `<Form>` + Clerk `useSignUp()`.
  - _Verify_: Validates matching passwords & terms checkbox, registers user in Clerk.
  - _Commit_: `feat(auth): implement custom sketchbook registration page`.
- [ ] **Sub-step 4.6**: Sync Clerk user to PostgreSQL `users` table.
  - _Verify_: Database contains matching user row with `clerk_id`.
  - _Commit_: `feat(auth): sync authenticated clerk users to postgresql`.

---

## - [ ] Step 5: Post Creation Feature (`/posts/create`)

- [ ] **Sub-step 5.1**: Build upload dropzone with client preview in `components/pages/create/media-dropzone.tsx`.
  - Auto-calculate image aspect ratio and set `orientation` (`PORTRAIT`, `LANDSCAPE`, `SQUARE`).
  - _Verify_: Dragging an image displays preview and computes orientation.
  - _Commit_: `feat(posts): build media dropzone with preview and orientation detection`.
- [ ] **Sub-step 5.2**: Build Post creation form matching mockup `create-post.png`.
  - Uses compound `<Form>` with Title, Description, Category select, Tag select, Destination Link.
  - _Verify_: Form validates against `createPostSchema`.
  - _Commit_: `feat(posts): create pin builder form matching sketchbook design`.
- [ ] **Sub-step 5.3**: Wire direct S3 upload + `createPostAction`.
  - Request presigned URL -> PUT binary to S3 -> Persist Post & PostTags in PostgreSQL.
  - _Verify_: Complete upload flow saves file in S3 and writes record to database.
  - _Commit_: `feat(posts): implement end-to-end s3 direct upload and post creation`.

---

## - [ ] Step 6: Feed Page & Masonry Grid (`/posts`)

- [ ] **Sub-step 6.1**: Build Main Navigation Header (`components/shared/app-header.tsx`).
  - Logo, search input ("search for ideas..."), bell, message bubble, profile avatar.
  - _Verify_: Responsive on mobile, tablet, and desktop.
  - _Commit_: `feat(ui): build sketchbook navigation header`.
- [ ] **Sub-step 6.2**: Build Filter Pills Bar (`components/pages/feed/filter-bar.tsx`).
  - Category, Tag, Orientation, and Sort dropdowns. Updates URL search params.
  - _Verify_: Clicking filters updates query parameters.
  - _Commit_: `feat(feed): implement filter pills bar with url state synchronisation`.
- [ ] **Sub-step 6.3**: Build Sketchbook Pin Card (`components/shared/pin-card.tsx`).
  - Hand-drawn border, image, title, author avatar + username, Heart & Save buttons.
  - _Verify_: Matches mockup `post-listings.png`.
  - _Commit_: `feat(feed): build sketchbook pin card component`.
- [ ] **Sub-step 6.4**: Implement Masonry Grid on `app/(dashboard)/posts/page.tsx`.
  - Query posts from Prisma matching active filters, render in responsive masonry columns.
  - _Verify_: Layout renders cleanly across mobile (2 cols), tablet (3 cols), desktop (4-5 cols).
  - _Commit_: `feat(feed): implement responsive masonry grid on posts page`.

---

## - [ ] Step 7: Post Detail Page (`/posts/[id]`)

- [ ] **Sub-step 7.1**: Build Pin Detail Card matching mockup `post-details.png`.
  - Pushpin top (`📌`), full-resolution image, share/bookmark buttons, title, description.
  - Author badge with follower count and "Follow" button.
  - _Verify_: Dynamic route `/posts/[id]` loads correct post data from Prisma.
  - _Commit_: `feat(post-detail): implement pushpin detail card with author panel`.
- [ ] **Sub-step 7.2**: Build Comments preview and input container.
  - Comment count, list of comments with avatars, and hand-drawn comment input + Post button.
  - _Verify_: Matches layout in mockup.
  - _Commit_: `feat(post-detail): implement comment list and comment input ui`.

---

## - [ ] Step 8: Production Smoke Test & Verification

- [ ] **Sub-step 8.1**: Full code quality and build verification:
  - `npm run lint` -> Zero warnings/errors.
  - `npx tsc --noEmit` -> Zero type errors.
  - `npm run build` -> Clean production compilation.
  - _Commit_: `chore: verify production build integrity`.
- [ ] **Sub-step 8.2**: End-to-End User Journey Verification:
  - Sign up new user on `/register`.
  - Log in on `/`.
  - Create new post on `/posts/create` (upload S3 image, fill fields, publish).
  - Verify post appears in `/posts` masonry grid.
  - Click into pin and verify `/posts/[id]` details.
