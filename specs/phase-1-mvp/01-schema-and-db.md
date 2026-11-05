# Phase 1 Specification: PostgreSQL & Prisma Database Layer

## 1. Relational Database Contract (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Orientation {
  PORTRAIT
  LANDSCAPE
  SQUARE
}

model User {
  id         String   @id @default(cuid())
  clerkId    String   @unique @map("clerk_id")
  fullName   String   @map("fullname")
  username   String   @unique @map("user_id")
  email      String   @unique
  profileImg String?  @map("profile_img")
  createdAt  DateTime @default(now()) @map("create_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  // Relations
  posts      Post[]

  @@map("users")
}

model Category {
  id        String   @id @default(cuid())
  name      String   @unique
  createdAt DateTime @default(now()) @map("create_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // Relations
  posts     Post[]

  @@map("categories")
}

model Tag {
  id        String    @id @default(cuid())
  name      String    @unique
  createdAt DateTime  @default(now()) @map("create_at")
  updatedAt DateTime  @updatedAt @map("updated_at")

  // Relations
  postTags  PostTag[]

  @@map("tags")
}

model Post {
  id             String      @id @default(cuid())
  title          String
  description    String?     @db.Text
  imageUrl       String      @map("image_url")
  imageKey       String      @map("image_key")
  destinationUrl String?     @map("destination_url")
  orientation    Orientation @default(PORTRAIT)
  createdAt      DateTime    @default(now()) @map("create_at")
  updatedAt      DateTime    @updatedAt @map("updated_at")

  // Foreign keys
  categoryId     String      @map("category_id")
  userId         String      @map("user_id")

  // Relations
  category       Category    @relation(fields: [categoryId], references: [id], onDelete: Restrict)
  author         User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  postTags       PostTag[]

  // Performance Indexes for Feed sorting & filtering
  @@index([categoryId])
  @@index([userId])
  @@index([createdAt(sort: Desc)])
  @@map("posts")
}

model PostTag {
  id        String   @id @default(cuid())
  postId    String   @map("post_id")
  tagId     String   @map("tag_id")
  createdAt DateTime @default(now()) @map("create_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  // Relations
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  tag       Tag      @relation(fields: [tagId], references: [id], onDelete: Cascade)

  // Enforce unique post-tag pairing
  @@unique([postId, tagId])
  @@index([tagId])
  @@map("post_tags")
}
```

---

## 2. Key Schema Design Decisions

1. **`clerkId` on `User`**: Links the external Clerk authentication identity to our internal relational data without storing passwords locally.
2. **`imageKey` on `Post`**: Retains the AWS S3 object key so files can be deleted or cleaned up from the S3 bucket if a post is deleted.
3. **`destinationUrl` on `Post`**: Captured directly from the "Destination Link" field in the Create Post UI.
4. **`Orientation` Enum**: Native PostgreSQL enum (`PORTRAIT`, `LANDSCAPE`, `SQUARE`) to assist the masonry grid with layout calculations before image binaries finish loading.
5. **Cascading Deletes**: When a `Post` is deleted, all records in `PostTag` are automatically removed via `onDelete: Cascade`.

---

## 3. Prisma Singleton Pattern (`lib/prisma.ts`)

To avoid creating duplicate database connections during Next.js Hot Module Reloading (HMR), the Prisma client must be exported as a cached singleton:

```typescript
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
```

---

## 4. Step 2 Execution & Tracking Checklist

- [x] **Step 2: PostgreSQL & Prisma Database Layer**
  - [x] **Sub-step 2.1**: Install Prisma dependencies (`prisma`, `@prisma/client`)
  - [x] **Sub-step 2.2**: Write `prisma/schema.prisma` with `User`, `Category`, `Tag`, `Post`, `PostTag`
  - [x] **Sub-step 2.3**: Create cached Prisma singleton client in `lib/prisma.ts`
  - [x] **Sub-step 2.4**: Generate Prisma client types (`npx prisma generate`) and prepare `.env.example`
