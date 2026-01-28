# Radoss Agency Design System

> **MANDATORY READ** — All agents MUST consult this document before making ANY design-related changes.

---

## 1. LOGO

### Visible UI (TEXT-BASED ONLY)
| Element | Implementation | Details |
|---------|----------------|---------|
| **Header Logo** | TEXT | `Radoss.` using Inter 700 + gold dot |
| **Footer Logo** | TEXT | `Radoss.` using Inter 700 + gold dot |
| **Dot Color** | Gold | `var(--accent-punctuation)` / `var(--brand-gold)` |

### SEO / Knowledge (IMAGE-BASED)
| Element | File | Usage |
|---------|------|-------|
| **Open Graph** | `/public/radoss-logo.jpg` | Social sharing previews (Facebook, LinkedIn, Twitter) |
| **SEO Meta** | `/public/radoss-logo.jpg` | Structured data, search engine crawlers |

> ⚠️ **CRITICAL**: The image logo is NEVER displayed in the visible website UI.  
> It is EXCLUSIVELY for Open Graph images and SEO metadata.

**DO NOT use image logo in Header or Footer. TEXT ONLY.**


---

## 2. TYPOGRAPHY HIERARCHY

| Tag | Font | Weight | Role |
|-----|------|--------|------|
| **H1** | Inter | 300 (Light) | Hero sections, luxury feel, max negative space |
| **H2** | Inter | 700 (Bold) | Major section headers |
| **H3** | Inter | 500 (Medium) | Sub-headings |
| **Body (P)** | Manrope | 400 (Regular) | Paragraphs, UI text |
| **Logo** | Inter | 700 (Bold) | Header & Footer logos |

### CSS Variables
```css
--font-heading: var(--font-inter), system-ui, sans-serif;
--font-body: var(--font-manrope), system-ui, sans-serif;
--font-logo: var(--font-inter), system-ui, sans-serif;
```

---

## 3. COLOR PALETTE

### Primary Colors
| Variable | Hex | Usage |
|----------|-----|-------|
| `--brand-gold` | #FFD903 | Accents, dots, highlights |
| `--brand-blue` | #4745D6 | Secondary accent, links, card hover |
| `--brand-white` | #FFFFFF | Light mode backgrounds |

### Secondary Colors
| Variable | Hex | Usage |
|----------|-----|-------|
| `--brand-grey` | #6B7280 | Neutral elements |
| `--brand-grey-light` | #F4F5F7 | Light backgrounds |
| `--brand-sand` | #E8DFD0 | Card hover (e.g., Digital Maturity) |
| `--brand-sand-dark` | #C4B8A5 | Sand accent text |

### Theme-Specific
- **Dark Mode**: Gold particles sharper, starry background
- **Light Mode**: Blue particles sharper

---

## 4. BENTO CARD SYSTEM

### Card Classes
| Class | Hover Color | Card Number Color |
|-------|-------------|-------------------|
| `.bentoCard` | Default (no color change) | `--accent-secondary` (blue) |
| `.blueCard` | `--brand-blue` | `--brand-blue` |
| `.goldCard` | `--brand-gold` | `--brand-gold` |
| `.sandCard` | `--brand-sand` | `--brand-sand-dark` |

**RULE**: Card number color MUST match the hover color.

---

## 5. INTERACTIVE ELEMENTS

### FlowerOfLife
- **Dark Mode**: White borders (35% opacity), gold center, blue glow
- **Light Mode**: Blue borders (40% opacity), blue center, blue glow

### Theme Toggle
- **Style**: Minimal text labels ("Light" / "Dark")
- **Separator**: `|` divider between nav links and toggle


---

## 6. HEADER STRUCTURE

```
[Logo] ----- [Nav Links] | [Theme Toggle] ----- [Mobile Menu Btn]
```

- Logo: Text-based Inter 700
- Nav: Uppercase, 0.75rem, 0.2em letter-spacing
- Divider: `|` between nav and theme toggle
- Mobile: Hamburger ☰ / Close ✕, full-screen overlay

---

## 7. SECTION BACKGROUNDS

| Section | Background |
|---------|------------|
| Hero | Transparent (inherits starry background) |
| Intro/Metrics | Transparent |
| Capabilities | Transparent |
| Solutions | Transparent |
| CTA | May use subtle surface color |

**NO solid backgrounds on main content sections** — let the starry/particle background show through.

---

## 8. FAVICON

- **Design**: "R." in Inter Bold blue + gold dot
- **Files**: 
  - `/public/favicon.png` (512x512)
  - `/public/favicon-32.png`
  - `/public/favicon-16.png`
  - `/public/apple-touch-icon.png` (180x180)

---

## 9. NO-GO LIST

❌ Emoji icons in professional sections  
❌ Image logos in Header/Footer  
❌ Serif fonts (Playfair Display removed)  
❌ Solid background colors on main sections  
❌ Inconsistent card number colors  
❌ Asking user about established design decisions  

---

## 10. WHEN IN DOUBT

1. Check this document first
2. Review `globals.css` for CSS variables
3. Review component CSS modules for patterns
4. If still unclear, ASK — but only ONCE

---

*Last Updated: 2026-01-28*
