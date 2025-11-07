# Axtra Design System
**Version 1.0** | Updated November 2025

A minimal, sophisticated design system built on grayscale foundations with strategic accent colors. Perfect for professional digital marketing, SaaS, and learning platforms.

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Layout & Grid](#layout--grid)
6. [Components](#components)
7. [Icons](#icons)
8. [Interactions & Animations](#interactions--animations)
9. [Responsive Design](#responsive-design)
10. [Usage Guidelines](#usage-guidelines)

---

## Design Philosophy

### Core Principles
- **Minimal & Sophisticated**: Less is more. Clean interfaces with purposeful design.
- **Grayscale Foundation**: Primary palette uses shades of gray for timeless elegance.
- **Strategic Color**: Accent colors used sparingly for maximum impact.
- **Content First**: Typography and spacing designed to enhance readability.
- **Performance**: Lightweight CSS with no external dependencies.

### Design Goals
- Professional appearance suitable for B2B and educational platforms
- Excellent readability across all devices
- Consistent visual hierarchy
- Accessible and inclusive design (WCAG 2.1 AA compliant)

---

## Color System

### Grayscale Palette
The foundation of the design system. Use these for 90% of your interface.

```css
--color-black: #1a1a1a;        /* Primary text, headers */
--color-gray-900: #2d2d2d;     /* Dark backgrounds */
--color-gray-800: #3d3d3d;     /* Secondary dark elements */
--color-gray-700: #4a4a4a;     /* Hover states */
--color-gray-600: #6b6b6b;     /* Body text */
--color-gray-500: #8b8b8b;     /* Tertiary text */
--color-gray-400: #9ca3af;     /* Muted text, placeholders */
--color-gray-300: #d1d5db;     /* Light borders */
--color-gray-200: #e5e5e5;     /* Borders, dividers */
--color-gray-100: #f3f4f6;     /* Light backgrounds */
--color-gray-50: #fafafa;      /* Surface, cards */
--color-white: #ffffff;        /* Pure white */
```

### Semantic Colors
Purpose-driven colors mapped to common UI needs.

```css
--color-primary: #1a1a1a;      /* Primary brand color (black) */
--color-secondary: #4a4a4a;    /* Secondary brand color (dark gray) */
--color-accent: #2563eb;       /* Links, CTAs, focus states (blue) */
--color-success: #059669;      /* Success states (green) */
--color-warning: #d97706;      /* Warning states (amber) */
--color-error: #dc2626;        /* Error states (red) */
--color-info: #0891b2;         /* Info messages (cyan) */
```

### Surface Colors
For backgrounds, cards, and containers.

```css
--color-background: #ffffff;            /* Main page background */
--color-surface: #fafafa;               /* Cards, modules */
--color-surface-raised: #ffffff;        /* Elevated cards */
--color-border: #e5e5e5;                /* Default borders */
--color-border-light: #f3f4f6;          /* Subtle borders */
--color-border-dark: #d1d5db;           /* Stronger borders */
```

### Text Colors
Hierarchy for readable content.

```css
--color-text-primary: #1a1a1a;     /* Headlines, important text */
--color-text-secondary: #6b6b6b;   /* Body text, descriptions */
--color-text-tertiary: #8b8b8b;    /* Supporting text */
--color-text-muted: #9ca3af;       /* Timestamps, metadata */
--color-text-inverse: #ffffff;     /* Text on dark backgrounds */
```

### Interactive States
For hover, active, focus, and disabled states.

```css
--color-hover: #4a4a4a;           /* Hover state */
--color-active: #1a1a1a;          /* Active/pressed state */
--color-focus: #2563eb;           /* Focus rings */
--color-disabled: #d1d5db;        /* Disabled elements */
```

### Category Colors
For service/module categorization (used in badges).

```css
/* Digital Marketing Funnel */
--category-funnel-bg: #f3f4f6;
--category-funnel-text: #374151;
--category-funnel-border: #d1d5db;

/* Brand Identity */
--category-brand-bg: #fef3c7;
--category-brand-text: #78350f;
--category-brand-border: #fcd34d;

/* Social Media Marketing */
--category-social-bg: #dbeafe;
--category-social-text: #1e40af;
--category-social-border: #93c5fd;

/* Website Design & Development */
--category-website-bg: #e0e7ff;
--category-website-text: #3730a3;
--category-website-border: #a5b4fc;

/* Search Engine Visibility */
--category-seo-bg: #dcfce7;
--category-seo-text: #166534;
--category-seo-border: #86efac;
```

### Color Usage Guidelines

**Do:**
- Use grayscale for 90% of the interface
- Reserve accent blue for important actions and links
- Maintain consistent contrast ratios (4.5:1 for text)
- Use semantic colors for their intended purpose

**Don't:**
- Mix multiple bright colors in one section
- Use pure black (#000000) - always use --color-black (#1a1a1a)
- Override semantic colors for decorative purposes
- Use gray text on gray backgrounds

---

## Typography

### Font Stack

```css
/* Primary Font (UI & Body) */
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

/* Display Font (Headlines) */
--font-display: var(--font-primary);

/* Monospace Font (Code) */
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', 
             Consolas, monospace;
```

### Font Sizes
Based on a modular scale for visual hierarchy.

```css
--text-xs: 0.75rem;      /* 12px - Tiny labels, metadata */
--text-sm: 0.875rem;     /* 14px - Small text, captions */
--text-base: 1rem;       /* 16px - Body text (default) */
--text-lg: 1.125rem;     /* 18px - Large body, subheadings */
--text-xl: 1.25rem;      /* 20px - Small headlines */
--text-2xl: 1.5rem;      /* 24px - Section headers */
--text-3xl: 1.875rem;    /* 30px - Page headers */
--text-4xl: 2.25rem;     /* 36px - Hero text */
--text-5xl: 3rem;        /* 48px - Large hero text */
```

### Font Weights

```css
--font-normal: 400;      /* Regular text */
--font-medium: 500;      /* Slightly emphasized */
--font-semibold: 600;    /* Subheadings, buttons */
--font-bold: 700;        /* Strong emphasis, headlines */
```

### Line Heights

```css
--leading-none: 1;           /* Tight (headlines) */
--leading-tight: 1.2;        /* Headlines, display */
--leading-snug: 1.375;       /* Subheadings */
--leading-normal: 1.5;       /* Body text (default) */
--leading-relaxed: 1.625;    /* Comfortable reading */
--leading-loose: 2;          /* Very spacious */
```

### Letter Spacing

```css
--tracking-tighter: -0.05em;   /* Very tight (large headlines) */
--tracking-tight: -0.025em;    /* Tight (headlines) */
--tracking-normal: 0;          /* Default */
--tracking-wide: 0.025em;      /* Slightly wide */
--tracking-wider: 0.05em;      /* Wide (small caps) */
--tracking-widest: 0.1em;      /* Very wide (labels) */
```

### Typography Scale Implementation

```css
/* H1 - Hero Headlines */
h1 {
  font-size: 3rem;              /* 48px */
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

/* H2 - Section Headers */
h2 {
  font-size: 2.25rem;           /* 36px */
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--color-text-primary);
}

/* H3 - Subsection Headers */
h3 {
  font-size: 1.5rem;            /* 24px */
  font-weight: 600;
  line-height: 1.3;
  color: var(--color-text-primary);
}

/* H4 - Card Titles */
h4 {
  font-size: 1.25rem;           /* 20px */
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-text-primary);
}

/* Body Text */
p {
  font-size: 1rem;              /* 16px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--color-text-secondary);
}

/* Small Text */
.text-sm {
  font-size: 0.875rem;          /* 14px */
  line-height: 1.5;
}

/* Labels & Metadata */
.text-xs {
  font-size: 0.75rem;           /* 12px */
  line-height: 1.4;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Typography Guidelines

**Do:**
- Use h1-h6 for proper semantic structure
- Limit line length to 60-80 characters for readability
- Use font-weight: 600 (semibold) for headings
- Maintain consistent vertical rhythm

**Don't:**
- Use more than 3 font sizes on a single page section
- Set body text smaller than 16px
- Use all caps for long passages
- Mix multiple font families

---

## Spacing System

### Base Spacing Scale
8px base unit with consistent increments.

```css
--space-0: 0;
--space-1: 0.25rem;      /* 4px */
--space-2: 0.5rem;       /* 8px */
--space-3: 0.75rem;      /* 12px */
--space-4: 1rem;         /* 16px */
--space-5: 1.25rem;      /* 20px */
--space-6: 1.5rem;       /* 24px */
--space-8: 2rem;         /* 32px */
--space-10: 2.5rem;      /* 40px */
--space-12: 3rem;        /* 48px */
--space-16: 4rem;        /* 64px */
--space-20: 5rem;        /* 80px */
--space-24: 6rem;        /* 96px */
```

### Semantic Spacing
Human-readable spacing tokens.

```css
--space-xs: 0.5rem;      /* 8px - Tight spacing */
--space-sm: 1rem;        /* 16px - Compact spacing */
--space-md: 1.5rem;      /* 24px - Default spacing */
--space-lg: 2.5rem;      /* 40px - Comfortable spacing */
--space-xl: 4rem;        /* 64px - Generous spacing */
--space-2xl: 6rem;       /* 96px - Section spacing */
```

### Spacing Usage

**Component Internal Spacing:**
- **Buttons**: `padding: var(--space-3) var(--space-6)`
- **Cards**: `padding: var(--space-lg)`
- **Input Fields**: `padding: var(--space-3) var(--space-4)`
- **List Items**: `padding: var(--space-md) 0`

**Component External Spacing:**
- **Between elements**: `margin-bottom: var(--space-md)`
- **Between sections**: `margin-bottom: var(--space-2xl)`
- **Page padding**: `padding: 0 var(--space-md)`

### Spacing Guidelines

**Do:**
- Use spacing consistently (8px increments)
- Apply more spacing around important elements
- Use spacing to create visual grouping
- Maintain consistent padding within component types

**Don't:**
- Use arbitrary spacing values (e.g., 13px, 27px)
- Mix different spacing systems
- Compress spacing too much on mobile
- Use negative margins excessively

---

## Layout & Grid

### Container System

```css
--container-xs: 320px;     /* Mobile phones */
--container-sm: 640px;     /* Large phones */
--container-md: 768px;     /* Tablets */
--container-lg: 1024px;    /* Small laptops */
--container-xl: 1200px;    /* Desktop (default max-width) */
--container-2xl: 1400px;   /* Large desktop */
--container-full: 100%;    /* Full width */

--max-width: 1200px;       /* Primary container width */
```

### Breakpoints

```css
--breakpoint-sm: 640px;     /* Small devices */
--breakpoint-md: 768px;     /* Medium devices (tablets) */
--breakpoint-lg: 1024px;    /* Large devices */
--breakpoint-xl: 1280px;    /* Extra large devices */
--breakpoint-2xl: 1536px;   /* 2X large devices */
```

**Media Query Usage:**
```css
/* Mobile First Approach */
@media (max-width: 768px) {
  /* Tablet and below */
}

@media (max-width: 480px) {
  /* Mobile only */
}
```

### Layout Components

**Container:**
```css
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}
```

**Section Spacing:**
```css
.section {
  padding: var(--space-2xl) 0;      /* 96px top/bottom */
}

.section-tight {
  padding: var(--space-xl) 0;       /* 64px top/bottom */
}
```

**Grid Systems:**
```css
/* Service Cards Grid */
.service-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-lg);
}

/* Module Cards Grid */
.module-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

/* Responsive Behavior */
@media (max-width: 768px) {
  .module-grid {
    grid-template-columns: 1fr;
  }
}
```

### Z-Index Scale
Layering system for consistent stacking.

```css
--z-base: 0;              /* Default layer */
--z-dropdown: 100;        /* Dropdowns */
--z-sticky: 200;          /* Sticky elements */
--z-fixed: 300;           /* Fixed navigation */
--z-modal-backdrop: 400;  /* Modal backdrop */
--z-modal: 500;           /* Modal content */
--z-popover: 600;         /* Popovers */
--z-tooltip: 700;         /* Tooltips */
--z-notification: 800;    /* Notifications */
```

---

## Components

### Buttons

**Primary Button (Filled):**
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  border: 1px solid var(--color-primary);
  border-radius: var(--radius);
  cursor: pointer;
  transition: var(--transition);
}

.btn:hover {
  background: var(--color-hover);
  border-color: var(--color-hover);
}
```

**Secondary Button (Outline):**
```css
.btn-secondary {
  background: transparent;
  color: var(--color-primary);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background: var(--color-surface);
  border-color: var(--color-primary);
}
```

**Ghost Button:**
```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: none;
}

.btn-ghost:hover {
  background: var(--color-surface);
}
```

**Button Sizes:**
```css
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  height: 32px;
}

.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
  height: 48px;
}
```

### Cards

**Basic Card:**
```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-lg);
  transition: var(--transition);
}

.card:hover {
  border-color: var(--color-border-dark);
  box-shadow: var(--shadow-sm);
}
```

**Service Card:**
```css
.service-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-lg);
  transition: var(--transition);
}

.service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.service-card h3 {
  font-size: var(--text-xl);
  margin-bottom: var(--space-sm);
}
```

**Module Card (Marketplace):**
```css
.module-card {
  display: flex;
  gap: var(--space-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: var(--space-md);
  transition: var(--transition);
}

.module-card:hover {
  border-color: var(--color-secondary);
  box-shadow: var(--shadow-sm);
}

.module-card:hover h3 {
  color: var(--color-accent);
}
```

### Forms

**Input Field:**
```css
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: var(--transition);
}

.input:focus {
  outline: none;
  border-color: var(--color-focus);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

**Textarea:**
```css
.textarea {
  width: 100%;
  min-height: 120px;
  padding: var(--space-3) var(--space-4);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  resize: vertical;
}
```

**Select Dropdown:**
```css
.select {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
}
```

### Badges

**Service Category Badge:**
```css
.service-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
  font-weight: var(--font-semibold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  border-radius: var(--radius);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

**Status Badge:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  border-radius: var(--radius);
  background: var(--color-surface);
  color: var(--color-text-primary);
}

.badge-success {
  background: var(--color-success);
  color: white;
}

.badge-warning {
  background: var(--color-warning);
  color: white;
}
```

### Navigation

**Top Navigation Bar:**
```css
.nav {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  z-index: var(--z-sticky);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  max-width: var(--max-width);
  margin: 0 auto;
}

.nav-links a {
  font-size: 0.9375rem;
  font-weight: var(--font-medium);
  padding: var(--space-xs) 0;
  border-bottom: 2px solid transparent;
  color: var(--color-text-primary);
  transition: var(--transition);
}

.nav-links a:hover,
.nav-links a.active {
  border-bottom-color: var(--color-accent);
}
```

**Mobile Hamburger Menu:**
```css
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-text-primary);
  transition: var(--transition);
  border-radius: 2px;
}

/* Mobile: Show hamburger, hide nav links */
@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
  
  .nav-links {
    position: fixed;
    top: 65px;
    right: -100%;
    width: 280px;
    height: calc(100vh - 65px);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    border-left: 1px solid var(--color-border);
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    transition: right 0.3s ease;
  }
  
  .nav-links.active {
    right: 0;
  }
}
```

### Footer

```css
.footer {
  background: var(--color-primary);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  padding: var(--space-2xl) 0 var(--space-lg);
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-lg);
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.footer a {
  color: rgba(255, 255, 255, 0.6);
  transition: var(--transition);
}

.footer a:hover {
  color: white;
}
```

---

## Icons

### Icon System
SVG icons with consistent sizing and styling.

**Icon Sizes:**
```css
--icon-xs: 12px;
--icon-sm: 16px;
--icon-base: 20px;
--icon-md: 24px;
--icon-lg: 32px;
--icon-xl: 40px;
--icon-2xl: 48px;
```

**Icon Base Styles:**
```css
.icon {
  display: inline-block;
  width: var(--icon-base);
  height: var(--icon-base);
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

**Icon Container (with background):**
```css
.icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

### Available Icons
- **Navigation**: menu, close, chevron-left, chevron-right, chevron-down
- **Content**: bookmark, eye, clock, calendar, file
- **Actions**: plus, minus, edit, trash, download, upload
- **Social**: share, heart, message, bell
- **Business**: briefcase, users, trending-up, bar-chart
- **Marketing**: funnel, target, megaphone, monitor

---

## Interactions & Animations

### Transitions

**Duration:**
```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

**Easing:**
```css
--ease-linear: linear;
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

**Default Transition:**
```css
--transition: all var(--duration-base) var(--ease-out);
```

### Hover Effects

**Subtle Lift (Cards):**
```css
.card {
  transition: transform var(--duration-base) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
}
```

**Color Change (Links):**
```css
a {
  color: var(--color-text-primary);
  transition: color var(--duration-fast) var(--ease-out);
}

a:hover {
  color: var(--color-accent);
}
```

**Border Highlight:**
```css
.module-card {
  border: 1px solid var(--color-border);
  transition: border-color var(--duration-base) var(--ease-out);
}

.module-card:hover {
  border-color: var(--color-secondary);
}
```

### Focus States

```css
.input:focus,
.btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  border-color: var(--color-focus);
}
```

### Loading States

```css
.loading {
  position: relative;
  pointer-events: none;
  opacity: 0.6;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Responsive Design

### Mobile-First Approach
Start with mobile styles, enhance for larger screens.

### Breakpoint Strategy

**Mobile (< 640px):**
- Single column layouts
- Full-width cards
- Stacked navigation
- Larger touch targets (min 44px)

**Tablet (640px - 1024px):**
- 2-column grids
- Side-by-side cards
- Adjusted spacing

**Desktop (> 1024px):**
- 3+ column grids
- Hover interactions
- Maximum content width (1200px)

### Responsive Grid Example

```css
/* Mobile: 1 column */
.module-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-md);
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .module-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .module-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Typography Scaling

```css
/* Mobile */
h1 { font-size: 2.25rem; }
h2 { font-size: 1.75rem; }

/* Desktop */
@media (min-width: 768px) {
  h1 { font-size: 3rem; }
  h2 { font-size: 2.25rem; }
}
```

---

## Usage Guidelines

### Quick Start

1. **Include CSS Files:**
```html
<link rel="stylesheet" href="css/design-system.css">
<link rel="stylesheet" href="css/global.css">
<link rel="stylesheet" href="css/components.css">
```

2. **Use Design Tokens:**
```css
/* Instead of hardcoded values */
.my-element {
  color: #1a1a1a;
  padding: 24px;
}

/* Use design tokens */
.my-element {
  color: var(--color-text-primary);
  padding: var(--space-lg);
}
```

3. **Build Components:**
```html
<button class="btn">Primary Action</button>
<button class="btn btn-secondary">Secondary Action</button>

<div class="card">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</div>
```

### Best Practices

**DO:**
✓ Use CSS custom properties (variables)
✓ Follow the 8px spacing system
✓ Maintain grayscale-first approach
✓ Test on mobile devices first
✓ Use semantic HTML elements
✓ Keep contrast ratios accessible (4.5:1)

**DON'T:**
✗ Hardcode color values
✗ Use arbitrary spacing (11px, 23px)
✗ Mix multiple accent colors
✗ Override base styles excessively
✗ Ignore responsive breakpoints
✗ Use inline styles

### Customization

To customize for your project:

1. **Update Colors:**
```css
:root {
  --color-accent: #your-brand-color;
  --color-primary: #your-primary-color;
}
```

2. **Adjust Spacing:**
```css
:root {
  --space-md: 2rem; /* Increase default spacing */
}
```

3. **Change Typography:**
```css
:root {
  --font-primary: 'Your Font', sans-serif;
}
```

### Component Library

All components are documented with:
- HTML structure
- CSS classes
- Variants and modifiers
- Usage examples
- Accessibility notes

Refer to `components.css` for the complete component library.

---

## File Structure

```
css/
├── design-system.css    # Design tokens and variables
├── global.css           # Global styles and base components
├── components.css       # Component library
└── marketplace.css      # Browse page specific styles

js/
└── main.js             # Global JavaScript (hamburger menu, utilities)

assets/
├── LOGO 1.png          # White logo (for dark backgrounds)
└── LOGO 3.png          # Color logo (for light backgrounds)
```

---

## Credits & License

**Axtra Design System v1.0**
Created for minimal, sophisticated digital platforms.

Free to use and modify for your projects. Attribution appreciated but not required.

---

## Changelog

### Version 1.0 (November 2025)
- Initial release
- Complete color system with grayscale foundation
- Typography scale and rules
- Spacing system (8px base)
- Component library
- Mobile-first responsive design
- Hamburger navigation for mobile
- Icon system
- Form components
- Card variants

---

- No Use of Emojis and Colourful Icons

**Questions or Improvements?**
This design system is living documentation. Update as your project evolves.
