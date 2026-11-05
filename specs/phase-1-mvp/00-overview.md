# Phase 1 Specification: Minimum Viable Product (MVP) Overview

## 1. Objective & Scope

The goal of **Phase 1** is to launch a fully functional, production-ready version of **`pin-spire`** with the bare minimum core features:

1. **User Authentication**: Sign up and login via Clerk (Email/Password + Google/Apple OAuth).
2. **Post Creation**: Upload images directly to AWS S3 using presigned URLs, input title, description, category, tags, and destination link, and persist to PostgreSQL via Prisma.
3. **Feed & Masonry Grid**: Explore community pins in a responsive, hand-drawn sketchbook masonry layout with category, tag, and orientation filters.
4. **Post Detail**: View a specific pin with high-resolution image, author details, follow button, and a comment list mockup.

### Explicitly Out of Scope for Phase 1

- Real-time instant messaging / chat
- Interactive comment posting backend (comments UI is mocked in Phase 1)
- Advanced analytics / business accounts
- Algorithmic recommendation engine

---

## 2. Technology Stack Matrix

| Layer               | Technology                   | Details                                                  |
| :------------------ | :--------------------------- | :------------------------------------------------------- |
| **Framework**       | Next.js 16.4.5 (App Router)  | React 19.3.0, Turbopack, TypeScript 5 (Strict)           |
| **Styling**         | Tailwind CSS v4              | Custom `@theme` tokens, sketchy border utilities         |
| **Database**        | PostgreSQL                   | Relational schema with foreign keys, indexes, cascades   |
| **ORM**             | Prisma ORM                   | Type-safe client, migration tracking, singleton pattern  |
| **Media Storage**   | AWS S3                       | Direct browser-to-S3 binary upload via Presigned URLs    |
| **Authentication**  | Clerk Auth (`@clerk/nextjs`) | Custom hand-drawn UI using `useSignIn` & `useSignUp`     |
| **Form Management** | React Hook Form + Zod        | Compound `<Form>` components, client + server validation |

---

## 3. Page Matrix & Routing

```
app/
├── (auth)
│   └── page.tsx              # "/" -> Login page (Redirects to /posts if authenticated)
│   └── register/
│      └── page.tsx           # "/register" -> Sign up page
├── (dashboard)
|   └── posts/
│      ├── page.tsx              # "/posts" -> Main feed & Masonry grid with filter pills
│      ├── create/
│      |   └── page.tsx          # "/posts/create" -> Pin builder & S3 uploader
│      └── [id]/
│          └── page.tsx          # "/posts/:id" -> Pinned photo detail view & comments
```

---

## 4. UI Mockup Cross-Reference

| Route           | Design Reference     | Image Preview / Path                                          | Key Visual Elements                                                      |
| :-------------- | :------------------- | :------------------------------------------------------------ | :----------------------------------------------------------------------- |
| `/`             | Login Screen         | [`specs/media/login.png`](../media/login.png)                 | Split-view: "welcome to the creative corner!" polaroids + Login form     |
| `/register`     | Registration Screen  | [`specs/media/register.png`](../media/register.png)           | Split-view: "start your creative journey!" polaroids + Registration form |
| `/posts`        | Post Listings (Feed) | [`specs/media/post-listings.png`](../media/post-listings.png) | Header, search, Category/Tag/Orientation filter pills, Masonry Pin Grid  |
| `/posts/create` | Create New Post      | [`specs/media/create-post.png`](../media/create-post.png)     | Sketchy upload dropzone, Title, Description, Category, Tags, Link        |
| `/posts/:id`    | Post Details         | [`specs/media/post-details.png`](../media/post-details.png)   | Pushpin card, full image, author profile, comments list                  |
| _All Pages_     | Design Palette       | [`specs/media/design.png`](../media/design.png)               | Hand-drawn sketchbook / scrapbook visual language                        |

---

## 5. Phase 1 Master Progress Tracking Checklist

Track overall Phase 1 progress. Mark sub-steps as `[x]` upon verification and commit; mark the parent step as `[x]` once all its sub-steps are completed. Detailed verification criteria and commit instructions for each sub-step are located in [`05-execution-roadmap.md`](./05-execution-roadmap.md).

- [x] **Step 1: Design Tokens & Build Stability**
  - [x] Sub-step 1.1: Resolve Next.js 16 / Turbopack CSS configuration in `next.config.ts`
  - [x] Sub-step 1.2: Define Sketchbook Theme tokens in `app/globals.css`
  - [x] Sub-step 1.3: Update root layout metadata and canvas branding in `app/layout.tsx`

- [x] **Step 2: PostgreSQL & Prisma Database Layer**
  - [x] Sub-step 2.1: Install Prisma dependencies (`prisma`, `@prisma/client`)
  - [x] Sub-step 2.2: Define Prisma relational schema (`User`, `Category`, `Tag`, `Post`, `PostTag`)
  - [x] Sub-step 2.3: Create cached Prisma singleton client in `lib/prisma.ts`
  - [x] Sub-step 2.4: Generate Prisma client types and prepare `.env.example`

- [ ] **Step 3: AWS S3 Presigned URL Media Storage**
  - [x] Sub-step 3.1: Install AWS S3 SDK (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)
  - [ ] Sub-step 3.2: Create S3 client configuration and validation helpers in `lib/s3.ts`
  - [ ] Sub-step 3.3: Implement Server Action `getPresignedUrlAction` in `actions/s3.ts`

- [ ] **Step 4: UI Form Core & Clerk Authentication (`/` & `/register`)**
  - [ ] Sub-step 4.1: Install form dependencies & implement compound `<Form>` components
  - [ ] Sub-step 4.2: Install `@clerk/nextjs` & configure route protection middleware
  - [ ] Sub-step 4.3: Build reusable Sketchbook UI elements (inputs, buttons, polaroid collage)
  - [ ] Sub-step 4.4: Build custom Sketchbook Login Page (`app/(auth)/page.tsx`)
  - [ ] Sub-step 4.5: Build custom Sketchbook Registration Page (`app/(auth)/register/page.tsx`)
  - [ ] Sub-step 4.6: Implement user database synchronization to PostgreSQL `users` table

- [ ] **Step 5: Post Creation Feature (`/posts/create`)**
  - [ ] Sub-step 5.1: Build upload dropzone with client preview & orientation calculation
  - [ ] Sub-step 5.2: Build Post creation form matching sketchbook mockup
  - [ ] Sub-step 5.3: Wire direct S3 upload + `createPostAction` database persistence

- [ ] **Step 6: Feed Page & Masonry Grid (`/posts`)**
  - [ ] Sub-step 6.1: Build Main Navigation Header (`components/shared/app-header.tsx`)
  - [ ] Sub-step 6.2: Build Filter Pills Bar (Category, Tag, Orientation, Sort dropdowns)
  - [ ] Sub-step 6.3: Build Sketchbook Pin Card component
  - [ ] Sub-step 6.4: Implement responsive Masonry Grid layout on `/posts`

- [ ] **Step 7: Post Detail Page (`/posts/[id]`)**
  - [ ] Sub-step 7.1: Build Pin Detail Card with pushpin top, image, author panel, and follow button
  - [ ] Sub-step 7.2: Build Comments preview list and comment input container

- [ ] **Step 8: Production Smoke Test & Verification**
  - [ ] Sub-step 8.1: Full lint, typecheck, and production build verification
  - [ ] Sub-step 8.2: End-to-end user journey smoke test in production environment
