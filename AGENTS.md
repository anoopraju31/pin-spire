<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Pin-Spire Project Guidelines

## 1. Spec-Driven Development (SDD)

- All features, architecture, and coding must adhere strictly to specifications located in `/specs/`.
- Phase 1 roadmap and sub-steps are defined in `/specs/phase-1-mvp/05-execution-roadmap.md`.
- Always work on **one granular sub-step at a time**: implement -> verify -> test -> commit -> advance.

## 2. Design System & Tokens

- Follow design tokens and styling rules in `/specs/standards/design-system.md`.
- Theme: Hand-drawn sketchbook / scrapbook aesthetic (cream canvas `#FAF7F2`, terracotta `#D95328`, sketchy pencil borders `#2B2523`, pushpins).

## 3. Form Architecture

- Follow conventions in `/specs/standards/nextjs-rules.md`.
- **MANDATORY**: All forms must strictly use the compound `<Form>` components located in `components/ui/form` with React Hook Form + Zod.
