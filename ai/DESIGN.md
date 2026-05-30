---
name: AfterBody Health
description: Engineered for the body the GLP-1 leaves behind.
colors:
  gold: "oklch(0.78 0.13 85)"
  gold-soft: "oklch(0.86 0.10 88)"
  gold-deep: "oklch(0.62 0.13 78)"
  surface-base: "oklch(0.18 0.035 150)"
  surface-card: "oklch(0.22 0.04 150)"
  surface-mid: "oklch(0.28 0.05 150)"
  surface-deep: "oklch(0.21 0.04 150)"
  text-primary: "oklch(0.96 0.015 90)"
  text-secondary: "oklch(0.78 0.02 90)"
  border-subtle: "oklch(1 0 0 / 0.10)"
typography:
  display:
    fontFamily: "Space Grotesk, Inter, sans-serif"
    fontSize: "clamp(3rem, 7vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, Inter, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.22em"
rounded:
  sm: "10px"
  md: "12px"
  lg: "14px"
  xl: "18px"
  2xl: "22px"
  3xl: "26px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.surface-base}"
    rounded: "{rounded.full}"
    padding: "16px 28px"
  button-primary-hover:
    backgroundColor: "{colors.gold-soft}"
    textColor: "{colors.surface-base}"
    rounded: "{rounded.full}"
    padding: "16px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-ghost-hover:
    backgroundColor: "oklch(0.78 0.13 85 / 0.10)"
    textColor: "{colors.gold}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  input-field:
    backgroundColor: "oklch(1 0 0 / 0.05)"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
  glass-card:
    backgroundColor: "{colors.surface-mid}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.2xl}"
    padding: "48px"
---

# Design System: AfterBody Health

## 1. Overview

**Creative North Star: "The Quiet Authority"**

AfterBody Health operates in a space crowded with noise — brands that shout benefits, flash transformation photos, and stack social proof. This system does the opposite. It is quiet, precise, and unshakeable. The surface communicates: we've done the work, and we're not trying to convince you of it. The design earns credibility through restraint the same way the product earns trust through transparent labels.

The substrate is deep forest green — Boreal Night — not black, not charcoal, not navy. A color with a living quality: dense, grown, rooted. Against it, the only accent is Apothecary Gold: measured, warm, functional. Gold appears exclusively where it earns its place — action states, hierarchy signals, hover responses — never as decoration or wallpaper. The result is a surface where every gold element carries weight because there are so few of them.

Typography splits the work cleanly. Space Grotesk handles display and hierarchy — high-contrast weight at 700 for all headline roles, slightly negative tracking for density. Inter handles everything else with complete neutrality. The eyebrow label — 0.7rem, 0.22em tracking, uppercase, weight 500 — is a signature pattern used throughout to introduce and categorize, a quiet authority of its own.

**Key Characteristics:**
- Dark by design, not by convention — Boreal Night is structural, not cosmetic
- Gold as signal: used ≤15% of any surface; rarity is the mechanism
- Split-headline doctrine: white text fragment + gold text fragment for all major H1s
- Eyebrow labels in all-caps wide tracking on every section opener
- Fully rounded CTAs (pill shape) — softens the precision without undermining it
- No gradient text, no side-stripe borders, no wellness softness

## 2. Colors: The Apothecary Palette

A restrained single-accent system: deep forest neutrals hold the canvas; Apothecary Gold marks every point of action or hierarchy.

### Primary
- **Apothecary Gold** (`oklch(0.78 0.13 85)`): The sole accent. Used for CTA buttons (as gradient terminus), accordion open states, nav hover, eyebrow labels, section dividers, and interactive focus rings. Never used as a background fill or decorative pattern.
- **Gold Soft** (`oklch(0.86 0.10 88)`): Gradient highlight endpoint on the primary CTA button. Lighter and warmer — the "lit" end of the gold spectrum.
- **Gold Deep** (`oklch(0.62 0.13 78)`): Gradient shadow endpoint on the primary CTA button. Adds depth without going brown.

### Neutral
- **Boreal Night** (`oklch(0.18 0.035 150)`): The base background. Forest green with minimal chroma — enough to feel alive, not enough to read as green in peripheral vision.
- **Surface Card** (`oklch(0.22 0.04 150)`): One step above the base; card and popover backgrounds.
- **Surface Mid** (`oklch(0.28 0.05 150)`): Glass card base layer; form panel backgrounds.
- **Surface Deep** (`oklch(0.21 0.04 150)`): Announcement bar, deepest surface elements.
- **Ivory Warm** (`oklch(0.96 0.015 90)`): Primary text. Warm off-white — slightly amber-tinted, never pure white.
- **Stone Secondary** (`oklch(0.78 0.02 90)`): Secondary text, muted foreground. Low-chroma, slightly warm.
- **Border Subtle** (`oklch(1 0 0 / 0.10)`): All dividers and card borders at rest. 10% white over the substrate.

### Named Rules
**The One Signal Rule.** Apothecary Gold is the only accent. It does not compete with a secondary color. It does not appear on more than 15% of any given screen. Its scarcity is why it lands.

**The Living Green Rule.** Every neutral in this system is tinted toward hue 150. Never use a pure gray (`chroma: 0`) anywhere — it kills the aliveness of the substrate.

## 3. Typography

**Display Font:** Space Grotesk (with Inter fallback, then system-ui, sans-serif)
**Body Font:** Inter (with ui-sans-serif, system-ui, sans-serif)

**Character:** Space Grotesk at 700 weight has a slightly geometric, confident personality — tight tracking makes headlines feel dense and certain, not airy. Inter is invisible by design: it carries body text without personality, letting the content and the Space Grotesk display anchors do all the work.

### Hierarchy
- **Display** (700, clamp(3rem, 7vw, 4.5rem), line-height 1.02, tracking -0.02em): Hero H1 only. Always split: one fragment in Ivory Warm (`text-foreground`), the next fragment in Apothecary Gold. Never both fragments the same color.
- **Headline** (700, 2rem, line-height 1.15, tracking -0.02em): Section H2s, page sub-heroes. Can be entirely Ivory Warm or split; follows the same two-color doctrine when used for emphasis.
- **Title** (500, 1.25rem, line-height 1.3, tracking -0.02em): H3 and card titles. Space Grotesk at medium weight — authority without volume.
- **Body** (400, 0.875rem / 14px, line-height 1.65): All paragraph text. 65–75ch max line length on reading surfaces (FAQ answers, protocol descriptions). Color at 70% opacity (`text-foreground/70`) for secondary body.
- **Label / Eyebrow** (500, 0.7rem, tracking 0.22em, uppercase): Section openers, category labels, nav links. The widest-tracked element in the system. Used consistently as the visual signal that a new content block is starting.

### Named Rules
**The Split-Headline Rule.** Every primary H1 on a brand page contains exactly two color fragments: one in Ivory Warm, one in Apothecary Gold. The gold fragment is always the second one (the conclusion, the emphasis). Never three colors; never gradient text.

**The Eyebrow Contract.** Every major content section opens with a Label-role eyebrow in Apothecary Gold (`oklch(0.78 0.13 85)`). This creates a reliable scanning pattern for users: gold small caps = new topic.

## 4. Elevation

AfterBody uses shadow-based elevation with two named levels. There are no borders as the primary depth signal — depth comes from the interplay of shadow and tonal surface layering (darker substrate, slightly lighter card surface).

The philosophy: surfaces should feel grounded, not floating. Shadows are ambient and diffuse — no hard edges, no dramatic drop shadows. The gold glow shadow is reserved exclusively for primary CTA buttons, where it communicates energy and action.

### Shadow Vocabulary
- **Shadow Luxe** (`0 20px 60px -20px color-mix(in oklab, black 55%, transparent)`): General container depth. Used on glass cards, overlays, and dialog panels. Diffuse and deep — the shadow spreads wide but never reads as dramatic.
- **Shadow Gold** (`0 10px 40px -10px color-mix(in oklab, oklch(0.78 0.13 85) 40%, transparent)`): CTA buttons only. A warm gold glow underneath that communicates "this is the action". Prohibited on any element that isn't a primary action button.
- **Gold Accent Line** (`height: 2px; background: linear-gradient(to right, transparent, oklch(0.78 0.13 85 / 0.50), transparent)`): Not a shadow — a signature surface detail. Applied as a 2px top border on overlay panels (search, contact dialog) and glass cards. Creates a sense of a lit threshold without a full border.

### Named Rules
**The Glow Gate.** Shadow Gold (the warm gold glow) is permitted on primary CTA buttons only. Applying it to cards, inputs, or nav elements dilutes its signal and makes the whole system feel promotional.

## 5. Components

### Buttons
Fully rounded pill shape at all sizes — the one soft element in an otherwise precise system.

- **Shape:** Full pill radius (9999px)
- **Primary CTA:** Gold gradient fill (`linear-gradient(135deg, gold-soft, gold-deep)`) with Boreal Night text. Padding 16px vertical / 28px horizontal. Shadow Gold beneath. Hover: `scale(1.02)`, 200ms ease-out. No border.
- **Focus:** `outline: 2px solid oklch(0.78 0.13 85)` at 3px offset.
- **Ghost:** Transparent fill, Apothecary Gold text, `border: 1px solid oklch(0.78 0.13 85 / 0.40)`. Hover: `background: oklch(0.78 0.13 85 / 0.10)`, 200ms ease-out.

### Cards / Containers
- **Glass Card:** The primary container surface. Two-layer background: a subtle gold gradient wash at 6% over the Surface Mid + black blend. Border: `1px solid oklch(0.78 0.13 85 / 0.25)`. Radius: 22px (`rounded-2xl`). Shadow: Shadow Luxe. `backdrop-filter: blur(8px)`. Internal padding: 48px. Gold Accent Line as a 2px top border on overlay variants (panels, search).
- **Usage rule:** Glass effect is reserved for feature cards and overlay panels. Content-section cards on a page background use Surface Card color with a border-subtle border only — no blur.

### Inputs / Fields
- **Style:** Rounded corners (12px, `rounded-xl`), `border: 1px solid oklch(1 0 0 / 0.60)`, background `oklch(1 0 0 / 0.05)` (5% white over substrate). Text: Ivory Warm. Placeholder: 30% opacity Ivory Warm.
- **Focus:** Border shifts to `oklch(0.78 0.13 85 / 0.60)`, ring `0 0 0 3px oklch(0.78 0.13 85 / 0.15)`. No background change.
- **Select:** Same shape and border as input. Native `<option>` elements require inline `background: #1a2e20; color: #f5f0e8` for cross-browser dark background.

### Navigation
- **Header:** Sticky, `background: oklch(0.18 0.035 150 / 0.85)` with `backdrop-blur-xl`. Border-bottom at border-subtle.
- **Nav links:** Label-role eyebrow style (0.6875rem, tracking 0.22em, uppercase, weight 500). Default color: 70% Ivory Warm. Hover: Apothecary Gold, 200ms transition.
- **Dropdown panel:** Glass Card variant — `backdrop-blur-2xl`, rounded-2xl, gold/20 border, Shadow Luxe. Appears on hover with `opacity-0 -translate-y-2` → `opacity-100 translate-y-0`, 250ms ease-out. Uses `padding-top: 16px` (not `margin-top`) on the hover target to keep the mouse zone continuous.
- **Mobile:** Not yet implemented.

### Accordion (FAQ)
- **Item border:** `border-bottom: 1px solid oklch(1 0 0 / 0.10)`.
- **Trigger:** Space Grotesk 500, 1rem, tracking -0.02em. Default: 90% Ivory Warm. Open state / hover: Apothecary Gold. Chevron rotates 180° on open, 200ms ease-out. No underline on hover.
- **Content:** Inter 400, 0.875rem, line-height 1.65, 70% Ivory Warm. Padding-bottom: 24px. Multi-paragraph answers separated by `margin-top: 12px`.

### Eyebrow Label (Signature Component)
The system's most-used signature element. Appears as a section opener before every major heading.

- **Spec:** `font-size: 0.7rem; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: oklch(0.78 0.13 85)` for primary (gold) variant. Secondary variant at `oklch(0.78 0.13 85 / 0.70)` for less prominent contexts.
- **Usage:** One eyebrow per section. Never two consecutive eyebrows. Always followed by a heading within 8px.

## 6. Recurring Visual Patterns

These patterns are used consistently across the site. Apply them by default on product surfaces and section heroes.

### Per-Product Color System

Each of the three formulas has its own accent color used for glows, SVG strokes, and hover states on its dedicated pages and cards. Gold remains the brand accent; these are product-level layering colors only.

| Product | Glow color | Use |
|---|---|---|
| RESET | `rgba(60, 180, 90, ...)` — muted green | Bottle glow, card hover, SVG stroke on /reset and stack card |
| REBUILD | `rgba(201, 168, 76, ...)` — brand gold | Same as global gold accent; no separate color needed |
| RECHARGE | `rgba(110, 150, 240, ...)` — muted blue-purple | Bottle glow, card hover, SVG stroke on /recharge and stack card |

**Background tints** (used as section backgrounds on product pages):
- RESET: `oklch(0.22 0.09 150)`
- REBUILD: `oklch(0.20 0.07 100)`
- RECHARGE: `oklch(0.20 0.06 260)`

### SVG Organic Swirl Background

Every section hero and accent band uses a layered SVG stroke pattern as a background texture. Three paths at decreasing opacity and stroke-width, curving across the full viewport. The stroke color uses the relevant product or brand accent at low opacity (0.10–0.20).

```jsx
<svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
  <g fill="none" strokeLinecap="round">
    <path d="M-200,500 C300,100 700,800 1200,300 S1700,50 2000,400"  stroke={lineColor} strokeWidth="1.5" />
    <path d="M-200,560 C300,160 700,860 1200,360 S1700,110 2000,460" stroke={lineColor} strokeWidth="0.75" opacity="0.6" />
    <path d="M-200,440 C400,40  800,740 1300,240 S1800,0   2000,340" stroke={lineColor} strokeWidth="0.5"  opacity="0.4" />
  </g>
</svg>
```

Always `pointer-events-none absolute inset-0 h-full w-full` on the SVG. The parent section must be `relative overflow-hidden`.

### Card Hover System

The standard interactive card pattern established across ingredient cards, component cards, and product stack cards:

```
base:  border border-white/8, bg-[oklch(0.09_0.010_150)], rounded-2xl
hover: -translate-y-1, border-gold/35, shadow-[0_24px_60px_rgba(0,0,0,0.55)]
transition: duration-300
```

Three optional enhancement layers that appear on hover (add as needed):
1. **Top accent line** — `absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent opacity-0 group-hover:opacity-100`
2. **Corner glow** — `absolute right-0 top-0 h-40 w-40 opacity-0 group-hover:opacity-100` with `radial-gradient(circle at 90% 10%, rgba(201,168,76,0.13), transparent 70%)`
3. **Animated divider** — `h-px w-8 bg-gold/25 group-hover:w-14 group-hover:bg-gold/50 transition-all duration-300`

Always add `group` to the card element and use `group-hover:` for child transitions.

### Watermark Text

Oversized decorative text placed behind content to add depth. Used on every product page, science page, and ingredient section.

```jsx
<span
  className="pointer-events-none absolute select-none font-display font-black leading-none text-white/[0.04]"
  style={{ fontSize: "clamp(90px, 16vw, 180px)" }}
  aria-hidden="true"
>
  {productName}
</span>
```

Rules: always `aria-hidden="true"`, `pointer-events-none`, `select-none`. Opacity fixed at `text-white/[0.04]` — never higher or it competes with content. Numbers use `text-white/[0.04]` at `72px` for ingredient card watermarks.

### Atmospheric Bottle Glow

Used behind product bottle images on hero sections and stack cards:

```jsx
{/* Outer ambient glow — fills the container */}
<div className="absolute inset-0" style={{ background: meta.glow }} />
{/* Inner bloom — tighter, blurred circle for depth */}
<div className="absolute inset-[20%] rounded-full opacity-50 blur-3xl" style={{ background: meta.glow }} />
{/* Bottle — always z-10 */}
<img className="relative z-10 drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]" />
```

The `meta.glow` value is a `radial-gradient(ellipse 75% 75% at 55% 50%, ...)` using the per-product color at 0.28–0.30 opacity at center, fading to transparent at 80%.

## 7. Do's and Don'ts

### Do:
- **Do** use OKLCH for every color value — never hex, HSL, or RGB in source CSS. OKLCH is the canonical format for this project.
- **Do** tint every neutral toward hue 150 (forest green). A chroma of 0.005 minimum on all gray-like surfaces.
- **Do** apply the Split-Headline Rule on every primary page H1: Ivory Warm first fragment, Apothecary Gold second fragment.
- **Do** open every content section with an eyebrow label in Apothecary Gold before the heading.
- **Do** use the fully rounded pill shape (`border-radius: 9999px`) on all CTA buttons, at every size.
- **Do** keep the gold glow shadow (`shadow-gold`) exclusively on primary CTA buttons.
- **Do** use `padding-top` (not `margin-top`) between a hover trigger and its dropdown panel to maintain a continuous hover zone.
- **Do** use inline styles (`background: #1a2e20; color: #f5f0e8`) on native `<option>` elements to enforce dark styling cross-browser.

### Don't:
- **Don't** use generic supplement brand aesthetics — no bro-science layouts, no before/after transformation photo grids, no neon or high-chroma accent colors, no competitive bodybuilding imagery. These are the exact anti-references named in PRODUCT.md.
- **Don't** use gradient text (`background-clip: text` combined with a gradient background). Prohibited across the entire system; use Apothecary Gold as a solid color for text emphasis.
- **Don't** use white or light backgrounds anywhere. Boreal Night is the base; inverted surfaces are not part of this system.
- **Don't** use wellness-soft aesthetics — no pastels, no airy whitespace, no crystal/botanical/ritual-adjacent imagery or copy. AfterBody is science-grounded.
- **Don't** use pharma-white clinical styling — no white backgrounds with blue trust-signal icons, no design that could belong in a doctor's waiting room.
- **Don't** apply `border-left` or `border-right` greater than 1px as a colored accent stripe on any card, alert, or list item.
- **Don't** put Apothecary Gold on more than 15% of any screen surface. Its scarcity is its mechanism.
- **Don't** use identical card grids — same-sized cards with icon + heading + body text, repeated. Vary the layout, the card depth, and the hierarchy between items.
- **Don't** use glassmorphism (`backdrop-filter: blur`) decoratively. Glass cards are purposeful containers for significant content — not a default card pattern.
- **Don't** use `margin-top` to gap a hover trigger from its dropdown panel — the gap breaks the hover zone.
