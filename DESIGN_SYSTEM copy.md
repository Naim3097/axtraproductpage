# Microsoft-Inspired Design System Documentation

This document outlines the design system implemented for the X.IDE landing page, inspired by Microsoft's Fluent Design principles. It serves as a guide for maintaining consistency across future projects.

## 1. Color Palette

### Brand Colors
*   **Primary Action**: `#0078D4` (Microsoft Blue) - Used for primary buttons, links, and active states.
*   **Brand Teal**: `#5bc2c6`
*   **Brand Yellow**: `#fdd056`
*   **Brand Purple**: `#8479b2`

### Neutral Colors
*   **Text Primary**: `#242424` - Main headings and body text.
*   **Text Secondary**: `#616161` - Subtitles and supporting text.
*   **Text Tertiary**: `#8b8b8b` - Placeholders and low-emphasis text.
*   **Background**: `#f8f9fa` - Global page background.
*   **Surface**: `#ffffff` - Cards and elevated elements.

### Glassmorphism Variables
*   **Glass Background**: `rgba(255, 255, 255, 0.85)`
*   **Glass Border**: `rgba(255, 255, 255, 0.6)`
*   **Glass Shadow**: `0 8px 32px 0 rgba(31, 38, 135, 0.07)`

## 2. Typography

**Font Families**:
*   Primary: `'Segoe UI', 'Inter', sans-serif`
*   Headings: `font-weight: 600`, `letter-spacing: -0.02em`

**Hierarchy**:
*   **H1 (Hero)**: `56px`, `line-height: 1.1`, `font-weight: 700`
*   **H2 (Section)**: `36px`, `margin-bottom: 16px`
*   **H3 (Card)**: `24px`, `margin-bottom: 12px`
*   **H4 (Tool)**: `18px`, `font-weight: 600`
*   **Body Large**: `20px` (Hero description)
*   **Body Regular**: `15px` (Card text)
*   **Small**: `13px` (Footer, Nav links)

## 3. Layout & Spacing

*   **Container Width**: `1600px` (Max-width) with `5%` padding.
*   **Section Padding**: `100px 0`
*   **Grid Gap**: `24px` (Standard gap for grids)

## 4. Components

### Buttons (`.cta-button`)
*   **Shape**: `border-radius: 4px` (Slightly rounded, not pill-shaped).
*   **Padding**: `10px 24px`.
*   **Hover Effect**: `transform: translateY(-2px)`, `box-shadow: 0 4px 8px rgba(0,0,0,0.1)`.
*   **Primary**: White text on Primary Blue background.
*   **Outline**: Primary text with 2px solid border.

### Cards (`.feature-card`, `.tool-item`)
*   **Background**: Surface white (`#ffffff`) or Glass (`rgba(255, 255, 255, 0.6)`).
*   **Border Radius**: `8px` (`--radius-md`).
*   **Shadows**:
    *   Default: `0 1.6px 3.6px 0 rgba(0,0,0,0.132), 0 0.3px 0.9px 0 rgba(0,0,0,0.108)`
    *   Hover: `0 6.4px 14.4px 0 rgba(0,0,0,0.132), 0 1.2px 3.6px 0 rgba(0,0,0,0.108)`
*   **Interaction**: Lift on hover (`transform: translateY(-4px)`).

### Header
*   **Style**: Sticky, Glassmorphism (`backdrop-filter: blur(20px)`).
*   **Height**: `64px`.
*   **Background**: `rgba(255, 255, 255, 0.8)`.

### Footer
*   **Theme**: Dark Mode.
*   **Background**: `#000000`.
*   **Text**: White (`#ffffff`) for headers, Light Gray (`#cccccc`) for links.
*   **Border**: Dark Gray (`#333333`) for separators.

## 5. Visual Effects

### Background Gradients (`.gradient-bg`)
A complex, multi-layered gradient system to create a subtle, airy atmosphere:
```css
background: 
    radial-gradient(circle at 0% 0%, rgba(219, 234, 254, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 100% 0%, rgba(224, 242, 254, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 100% 100%, rgba(219, 234, 254, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 0% 100%, rgba(236, 254, 255, 0.4) 0%, transparent 50%),
    linear-gradient(180deg, #ffffff 0%, #f0f9ff 100%);
```

### Glass Sections (`.glass-section`)
Used for alternating sections to provide depth without heavy borders:
```css
background: 
    linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px);
background-size: 100% 100%, 40px 40px, 40px 40px;
backdrop-filter: blur(20px);
```

### Shadows
*   **Hero Image**: `0 32px 64px rgba(0,0,0,0.15)` (Deep shadow for floating effect).
*   **Card Images**: `0 4px 12px rgba(0,0,0,0.08)` (Subtle lift).

## 6. Implementation Guidelines

1.  **Clean vs. Glass**: Alternate between `.clean-section` (transparent) and `.glass-section` (frosted) to create rhythm.
2.  **Images**: Use high-quality, professional imagery. Avoid emojis. Use soft shadows on images to make them sit naturally on the canvas.
3.  **Spacing**: Maintain generous whitespace. Don't crowd elements. Use the `1600px` container to allow content to breathe.
