# Project Standards: Next.js 16 & Engineering Conventions

## 1. Architectural Guardrails (Next.js 16 App Router)

### A. Server Components by Default

- All components inside `app/` are **React Server Components (RSC)** by default.
- Never add `'use client'` at the page level. Keep page wrappers as Server Components to leverage streaming, partial pre-rendering (PPR), and server-side metadata generation.
- Add `'use client'` only at the leaf component level where user interactivity, hooks (`useState`, `useForm`), or browser APIs are required.

### B. Data Mutations via Server Actions

- All mutations (creating pins, updating user profile, generating presigned S3 URLs) must use Next.js **Server Actions** located in `actions/` or feature directories.
- Never use unauthenticated or raw internal API route handlers when a typed Server Action suffices.
- Every Server Action must validate user authentication session and input arguments with Zod before touching S3 or PostgreSQL.

### C. Image Optimization & Layout Stability

- Always use Next.js `<Image />` (`next/image`) for pin thumbnails and full-size images.
- Set explicit dimensions or `aspect-ratio` to prevent Cumulative Layout Shift (CLS), which is vital for Pinterest masonry feeds.
- Configure remote image hostnames in `next.config.ts` for AWS S3 and CDN domains.

---

## 2. Mandatory Form Architecture: Compound `<Form />` Components

> **PROJECT-WIDE ENFORCEMENT**: All forms without exception must use the compound `<Form>` component system located in `components/ui/form`. Writing raw unmanaged `<form>` or `<input>` tags directly without these wrappers is strictly prohibited.

### Required Imports

```tsx
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
```

### Standard Form Composition Pattern

```tsx
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Field Label</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormDescription>Optional helper hint</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

---

## 3. Validation Single Source of Truth: Zod + React Hook Form

- Form schemas must be placed in `lib/validations/`.
- Forms must use `useForm({ resolver: zodResolver(schema) })`.
- TypeScript input types must be inferred via `z.infer<typeof schema>`. Never duplicate interface definitions manually.
- Server Actions must validate payloads against the same Zod schema using `schema.safeParse(data)`.

---

## 4. File Structure & Path Aliasing

- Use the `@/*` path alias configured in `tsconfig.json` for all internal imports:
  - `@/components/*`: Reusable UI, shared components, and page sections
  - `@/lib/*`: Core utilities, clients (Prisma, S3), and Zod validations
  - `@/actions/*`: Next.js Server Actions
  - `@/styles/*`: Global CSS utilities
