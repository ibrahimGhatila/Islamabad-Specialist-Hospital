---
name: framer
description: Motion and interaction design in the style of a polished Framer site — springs, scroll-driven reveals, micro-interactions, and page transitions. Use this skill whenever adding animation or interactivity to any UI in this project, whether with Framer Motion (React), CSS animations, or the Web Animations API.
---

# Framer-Style Motion & Interaction

Make interfaces feel alive the way the best Framer-built sites do: motion that is quick, physical, and purposeful — it directs attention and confirms actions, and it never gets in the way.

## 1. Motion principles

- **Motion has a job.** Every animation either orients (where did this come from?), confirms (did my click work?), or focuses (look here). If it does none of these, cut it.
- **Fast by default.** Micro-interactions 150–250ms; entrances 300–500ms; large layout shifts up to 600ms. Nothing the user waits on.
- **Physical, not linear.** Use springs or strong ease-out curves (`cubic-bezier(0.22, 1, 0.36, 1)`). Linear easing only for continuous motion like marquees.
- **One hero moment per view.** A page gets one signature animation (hero entrance, marquee stat count-up); everything else stays subtle. Motion everywhere equals motion nowhere.
- **Calm for this brand.** This is a hospital site — motion should feel smooth and reassuring. Gentle fades and rises, moderate springs. No bounce-heavy, playful physics; no attention-grabbing loops near critical content like appointment forms.

## 2. Stack

- **React projects → Framer Motion (`framer-motion` / `motion`)**: `motion.*` elements, `variants`, `whileHover`/`whileTap`/`whileInView`, `AnimatePresence`, `useScroll` + `useTransform`, `layout` animations.
- **Plain HTML/CSS pages → CSS**: transitions, `@keyframes`, `animation-timeline: view()` where supported, IntersectionObserver for reveal-on-scroll fallbacks.
- Never mix systems on a single element. Prefer transform/opacity-only animation — never animate `width/height/top/left` when `transform` can do it (compositor-friendly, 60fps).

## 3. Core recipes

**Entrance (staggered reveal)** — the default for sections coming into view:

```tsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 28 } },
};

<motion.section variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
  {items.map(i => <motion.div key={i.id} variants={item}>…</motion.div>)}
</motion.section>
```

- Reveal once (`once: true`); re-triggering on every scroll is noise.
- Distance small (16–32px rise), opacity from 0, slight stagger (60–100ms) — never a slow one-by-one parade.

**Hover / tap micro-interactions** — every card, button, and link responds:

```tsx
<motion.a whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}>
```

- Cards: lift 2–6px + shadow deepen. Buttons: subtle scale (0.97–0.98 on tap) or background shift. Links: underline slide or color ease, 150ms.
- Hover states must also exist as focus-visible states.

**Scroll-linked effects** — depth, used sparingly:

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const y = useTransform(scrollYProgress, [0, 1], [40, -40]); // gentle parallax
```

- Parallax offsets small (±20–60px). Progress bars, image scale-on-scroll (1.0→1.08), and pinned sections are fine; scroll-jacking is not.

**Layout & presence** — accordions, tabs, filtering, modals:

```tsx
<AnimatePresence mode="popLayout">
  {open && (
    <motion.div layout initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }} />
  )}
</AnimatePresence>
```

- Use `layout` / `layoutId` for shared-element transitions (e.g. tab indicator sliding, card expanding to detail).
- Exit animations shorter than entrances (~60–70% of the duration).

**Count-ups and stats** — animate numbers into view once (`useMotionValue` + `animate()`, or a rAF counter), 800–1200ms with ease-out, triggered by `whileInView`.

## 4. Spring vocabulary

Keep a consistent feel by reusing a small set of named transitions:

| Name | Config | Use for |
|---|---|---|
| `snappy` | `{ type: "spring", stiffness: 400, damping: 25 }` | buttons, toggles, hover |
| `smooth` | `{ type: "spring", stiffness: 260, damping: 28 }` | entrances, cards |
| `gentle` | `{ type: "spring", stiffness: 120, damping: 20 }` | large panels, modals |
| `ease-out-quart` | `cubic-bezier(0.22, 1, 0.36, 1)`, 300–500ms | CSS fallbacks, height/opacity |

Define these once (a `transitions.ts` module or CSS custom properties) and import everywhere — no ad-hoc spring numbers scattered through components.

## 5. Accessibility and performance

- **Always respect reduced motion.** Framer Motion: wrap the app in `<MotionConfig reducedMotion="user">`. CSS: gate keyframes behind `@media (prefers-reduced-motion: no-preference)`. Reduced-motion users still get instant state changes and opacity fades — never a broken or frozen UI.
- Animate `transform` and `opacity` only where possible; add `will-change` sparingly and only on elements that actually animate.
- Entrances must not cause layout shift: reserve space; animate within the box.
- Interactive feedback (hover/tap) must never delay the actual action — navigation fires immediately, the animation rides along.
- Test scroll effects on mobile: heavy parallax on low-end devices should degrade to static.

## 6. Review checklist before delivering

1. Every interactive element responds to hover, focus, and press.
2. Sections reveal on scroll with the standard stagger — once, quickly.
3. Exactly one signature motion moment per page.
4. All transitions come from the shared vocabulary (§4).
5. `prefers-reduced-motion` verified.
6. Nothing animates layout properties; no jank at 4x CPU throttle.

Pair with the **frontend-design** skill: that skill owns static visual quality (type, color, layout); this one owns everything that moves.
