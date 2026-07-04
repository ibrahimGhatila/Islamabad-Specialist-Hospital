---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill whenever building, styling, or reviewing any UI for this project — pages, components, layouts, landing pages, dashboards, or forms. It guides aesthetic direction, typography, color, spacing, and finish so the result avoids generic "AI-generated" design.
---

# Frontend Design

Build interfaces that look deliberately designed — like a senior product designer shipped them — not assembled from framework defaults. Every screen should have a point of view.

## 1. Commit to an aesthetic direction first

Before writing any markup, decide the design direction in one or two sentences and hold every subsequent choice against it. For this project (a hospital / healthcare brand) the direction should communicate **calm competence and trust**: clean, spacious, precise, warm — never clinical-cold, never toy-like.

A direction is specific: "editorial and warm — serif display headings, generous whitespace, deep teal anchor color, soft photography" is a direction. "Modern and clean" is not.

## 2. Typography carries the design

Typography is the highest-leverage decision. Get it right before touching color or components.

- **Pick real typefaces, deliberately paired.** One display/heading face with character and one quiet text face. Never leave system defaults or a single font doing every job. Load via `@font-face` or a hosted font pipeline the project already uses.
- **Contrast in scale.** Headings should be genuinely large (clamp-based fluid sizes, e.g. `clamp(2.5rem, 6vw, 4.5rem)` for a hero), with tight line-height (1.05–1.2) and slight negative letter-spacing. Body text stays 16–18px with line-height ~1.6.
- **Establish a type scale** (e.g. 1.25 ratio) and use only steps from it. No ad-hoc font sizes.
- **Weight range**: use the extremes (e.g. 300/700), not a mush of 400/500/600 everywhere.

## 3. Color: one committed palette, used with restraint

- Define the palette as design tokens (CSS custom properties) before styling anything: one dominant brand hue, one accent used sparingly, and a tinted neutral ramp (neutrals should carry a trace of the brand hue — never pure `#888` grays).
- Backgrounds are not always white. Use warm off-whites, deep tinted darks, or a subtle wash to set atmosphere. Reserve pure white for elevated surfaces.
- Accent color appears where you want the eye to go — primary actions, key stats, active states — and almost nowhere else.
- Check contrast: body text ≥ 4.5:1, large text ≥ 3:1. Healthcare users skew older; err toward higher contrast and larger text.

## 4. Layout and space

- **Whitespace is the design.** Double the padding you first reach for. Section spacing on marketing pages: 96–160px vertical.
- Compose on a grid, then break it intentionally — an offset image, an overlapping card, an asymmetric two-column split — so the page has rhythm instead of a centered-stack monotony.
- Constrain line lengths (~65–75ch) and content widths; full-bleed only for imagery and color fields.
- Vary section shapes. If every section is "centered heading + three cards," the page reads as template output. Alternate: split layouts, bento grids, stat bands, full-bleed imagery with overlaid content.

## 5. Depth, texture, and finish

Flat default surfaces read as unfinished. Add atmosphere with a light hand:

- Layered soft shadows (`0 1px 2px rgba(...), 0 8px 24px rgba(...)`), not single hard drops.
- Subtle borders (`1px` at 5–10% opacity) to define surfaces on tinted backgrounds.
- Gradients used quietly: a barely-perceptible radial wash behind a hero, a duotone treatment on imagery.
- Consistent radius scale (e.g. 8 / 12 / 20 / full) — pick once, apply everywhere.
- Real content over lorem ipsum: plausible department names, doctor names, appointment times. Placeholder text kills credibility.

## 6. Components and states

- Every interactive element needs hover, focus-visible, active, and disabled states. Focus rings must be visible and on-brand (not the browser default blue outline, but never removed).
- Buttons: one primary style per view; secondary/ghost variants for everything else. Padding generous (`12px 24px`+), text never cramped.
- Forms (appointment booking, contact): large touch targets (44px+), labels always visible (no placeholder-as-label), inline validation messages, obvious required-field marking.
- Empty, loading, and error states are designed states, not afterthoughts — skeletons matching final layout, friendly empty-state copy with a next action.

## 7. Accessibility and responsiveness are part of design quality

- Semantic HTML first: `header/nav/main/section/footer`, one `h1`, ordered heading levels, `alt` text, ARIA only where semantics fall short.
- Design mobile and desktop simultaneously. Fluid type and spacing (`clamp()`), stacking that preserves hierarchy, no horizontal scroll ever.
- Respect `prefers-reduced-motion` and `prefers-color-scheme` where the project supports dark mode.

## 8. What "generic AI design" looks like — avoid all of it

- Bootstrap/Tailwind default blues and grays with no palette customization
- `Inter` at 400/600 for everything, 14px seas of text
- Three identical icon-cards in a row, repeated as every section
- Purple-to-blue gradients on white, glassmorphism everywhere
- Centered hero → features grid → testimonial carousel → CTA, all symmetric
- Emoji as icons; stock icon sets mixed from multiple families
- Uniform 16px padding everywhere, no spatial rhythm

If the output could be mistaken for a template, redo the weakest section before delivering.

## 9. Working method

1. State the aesthetic direction (one sentence) and the token set (fonts, palette, radius, spacing scale).
2. Build the design tokens as CSS custom properties / theme config first.
3. Build the most important screen fully polished before scaffolding others — quality bar first, coverage second.
4. Review at mobile and desktop widths before calling anything done.
5. Pair with the **framer** skill for all motion and interaction work — static polish here, motion polish there.
