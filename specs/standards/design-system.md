# Project Standards: Design System & Visual Tokens

## 1. Aesthetic Vision: Hand-Drawn Sketchbook / Scrapbook

`pin-spire` is designed with a warm, cozy, tactile scrapbook visual identity. The UI feels like an artist's personal sketchbook, featuring hand-drawn sketchy borders, polaroid photo frames, pushpins (`📌`), pencil doodles (`✏️`), stars (`✨`), and coffee stains (`☕`).

Visual reference: [`specs/media/design.png`](../media/design.png)

---

## 2. Color Palette (Semantic Design Tokens)

All UI elements must derive their colors from these semantic tokens. Avoid arbitrary hex codes in component classes.

| Token                   | Hex Value | Semantic Role                                             | Tailwind Utility Class        |
| :---------------------- | :-------- | :-------------------------------------------------------- | :---------------------------- |
| `--color-canvas`        | `#FAF7F2` | Primary page background (warm sketchbook paper)           | `bg-canvas`                   |
| `--color-surface`       | `#FFFFFF` | Polaroid card surface, clean background                   | `bg-surface`                  |
| `--color-surface-tint`  | `#F4EFEB` | Tinted paper, dropdowns, input backgrounds                | `bg-surface-tint`             |
| `--color-brand-primary` | `#D95328` | Terracotta / Warm burnt orange (Primary buttons, accents) | `bg-brand-primary`            |
| `--color-brand-hover`   | `#BF431C` | Deep clay (Hover & active states)                         | `hover:bg-brand-hover`        |
| `--color-ink`           | `#2B2523` | Soft charcoal pencil (Borders, primary text)              | `text-ink` / `border-ink`     |
| `--color-ink-muted`     | `#7A726D` | Graphite pencil (Placeholders, secondary metadata, hints) | `text-ink-muted`              |
| `--color-accent-pin`    | `#C84B22` | Terracotta pushpin accent                                 | `text-accent-pin`             |
| `--color-error`         | `#D32F2F` | Form validation error text & borders                      | `text-error` / `border-error` |

---

## 3. Typography Scale

- **Display & Headings** (`h1`, `h2`, `h3`, brand logo): Casual, friendly display serif or hand-drawn font style.
- **Body & Inputs** (`p`, `input`, `button`, labels): Highly legible sans-serif (`Inter`, `system-ui`, or `sans-serif`) to maintain crisp readability on mobile and desktop.

---

## 4. Component Styling Rules

### A. Sketchy Borders (`.border-sketch`)

All primary cards, inputs, dropzones, and buttons use a hand-drawn sketchy border:

- Width: `2px`
- Color: `var(--color-ink)` (`#2B2523`)
- Border Radius:
  - Cards & Polaroids: `rounded-2xl` (`16px`) to `rounded-3xl` (`24px`)
  - Inputs & Dropdowns: `rounded-xl` (`12px`)
  - Pill Badges & Filter Buttons: `rounded-full`

### B. Buttons

1. **Primary Button ("Publish", "Sign Up", "Log In", "Save")**:
   - Background: `var(--color-brand-primary)` (`#D95328`)
   - Text: `#FFFFFF`
   - Border: `2px solid #2B2523`
   - Shadow: Slight tactile drop shadow `shadow-[2px_3px_0px_#2B2523]`
   - Hover: `bg-[#BF431C]` with active press `translate-x-[1px] translate-y-[1px] shadow-[1px_2px_0px_#2B2523]`
2. **Secondary / Drafts Button ("Drafts", "Save Draft")**:
   - Background: `var(--color-surface)` / transparent
   - Text: `var(--color-ink)` (`#2B2523`)
   - Border: `2px solid #2B2523`
   - Shadow: `shadow-[2px_3px_0px_#2B2523]`

### C. Inputs & Textareas

- Background: `var(--color-surface)` or `var(--color-surface-tint)`
- Border: `2px solid #2B2523`
- Focus: `outline-none ring-2 ring-brand-primary`
- Placeholder: `text-ink-muted`

### D. Accents & Doodles

- **Pushpin (`📌`)**: Displayed at the top center of detailed pin cards and modal titles.
- **Polaroid Frames**: Extra bottom padding (`pb-6`) below the media with handwritten caption text.
- **Doodle Elements**: Hand-drawn stars, arrows, and coffee rings positioned decoratively in empty spaces.
