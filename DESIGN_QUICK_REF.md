# Quick Reference: Design System

## For Users

### Step 1: Choose Your Industry
```
💻 SaaS          🛍️ E-commerce    📚 Education      💰 Finance
🏥 Healthcare    📊 Marketing     🏠 Real Estate    ❤️ Non-Profit
🚀 Technology    🍔 Food          ⚙️ Other
```

### Step 2: Choose Your Style
```
Minimal      → Clean, spacious, simple
Bold         → Strong, vibrant, attention-grabbing
Professional → Corporate, trustworthy, structured
Creative     → Artistic, unique, expressive
Elegant      → Luxurious, refined, sophisticated
Modern       → Trendy, contemporary, cutting-edge
Playful      → Fun, friendly, energetic
Technical    → Data-driven, precise, detailed
```

### Step 3: Customize (Optional)
Click "⚙️ Customize Layout & Effects" for:
- **Spacing**: Compact / Comfortable / Spacious
- **Corners**: Sharp / Rounded / Pill
- **Shadows**: None / Subtle / Dramatic
- **Animations**: None / Subtle / Playful

## For Developers

### Quick Integration
```html
<!-- In HTML -->
<script src="js/design-engine.js"></script>
<script src="js/app-v2.js"></script>
```

```javascript
// In JS
const engine = new DesignEngine();
const design = engine.generateDesign({
    industry: 'ecommerce',
    style: 'bold'
});
```

### Check if Loaded
```javascript
if (typeof DesignEngine !== 'undefined') {
    appState.designEngine = new DesignEngine();
}
```

### Access Industry Data
```javascript
engine.industries.saas
// Returns: { name, icon, colors, fonts, layout, components, keywords, competitors }
```

### Access Style Data
```javascript
engine.designStyles.minimal
// Returns: { name, spacing, borderRadius, shadows, animations, typography, colorApproach }
```

### Generate Color Palette
```javascript
engine.colorSystem.generatePalette('#667eea')
// Returns: { 50: '#...', 100: '#...', ..., 900: '#...' }
```

## Industry Recommendations

### SaaS & Software
- **Best Styles**: Minimal, Professional, Technical
- **Key Components**: Features, Pricing, Integrations
- **Tone**: Clear, benefit-focused

### E-commerce & Retail
- **Best Styles**: Bold, Modern, Playful
- **Key Components**: Product Showcase, Urgency, Reviews
- **Tone**: Persuasive, value-driven

### Education & E-Learning
- **Best Styles**: Minimal, Playful, Professional
- **Key Components**: Curriculum, Instructor Bio, FAQ
- **Tone**: Encouraging, informative

### Finance & Fintech
- **Best Styles**: Professional, Minimal, Elegant
- **Key Components**: Trust Indicators, Security, Pricing
- **Tone**: Trustworthy, secure

### Healthcare & Wellness
- **Best Styles**: Minimal, Playful, Elegant
- **Key Components**: Benefits, Trust Badges, How It Works
- **Tone**: Caring, reassuring

### Marketing & Agency
- **Best Styles**: Creative, Bold, Modern
- **Key Components**: Portfolio, Case Studies, Process
- **Tone**: Creative, results-focused

### Real Estate & Property
- **Best Styles**: Elegant, Professional, Modern
- **Key Components**: Featured Properties, Search, Location
- **Tone**: Aspirational, trustworthy

### Non-Profit & Charity
- **Best Styles**: Elegant, Minimal, Professional
- **Key Components**: Mission, Impact Stats, Donation Form
- **Tone**: Emotional, inspiring

### Technology & Innovation
- **Best Styles**: Technical, Modern, Bold
- **Key Components**: Technology Showcase, Vision, Press
- **Tone**: Innovative, technical

### Food & Beverage
- **Best Styles**: Playful, Creative, Modern
- **Key Components**: Menu, Gallery, Reviews
- **Tone**: Appetizing, inviting

## Style Specifications

| Style | Spacing | Radius | Shadows | Animation | Typography Scale |
|-------|---------|--------|---------|-----------|------------------|
| Minimal | 1.2× | 4-8px | Subtle | Slow fade | 1.25 |
| Bold | 1.0× | 8-16px | Dramatic | Fast scale | 1.5 |
| Professional | 1.1× | 2-4px | Medium | Medium slide | 1.2 |
| Creative | 0.9× | 12-24px | Varied | Playful | 1.4 |
| Elegant | 1.3× | 0px | Subtle | Slow fade | 1.3 |
| Modern | 1.1× | 12-24px | Dramatic | Fast micro | 1.3 |
| Playful | 1.0× | 16-32px | Medium | Fast bounce | 1.2 |
| Technical | 0.95× | 4-8px | Subtle | Instant | 1.15 |

## Component Variants

### Hero Section (5 variants)
- Simple Centered
- Split with Image
- Video Background
- Gradient Animated
- Product Showcase

### Features Section (5 variants)
- 3-Column Grid
- 4-Column Grid
- Alternating Rows
- Icon List
- Card Layout

### Testimonials (5 variants)
- Carousel
- Grid
- Featured
- Video
- Rating Stars

### Pricing Table (4 variants)
- 3-Tier Cards
- Comparison Table
- Single Plan
- Usage Calculator

## Color Palette Generation

Input any color, get full palette:
```javascript
generatePalette('#667eea')

Returns:
{
    50: '#f0f9ff',   // 95% lightness
    100: '#e0f2fe',  // 85%
    200: '#bae6fd',  // 75%
    300: '#7dd3fc',  // 65%
    400: '#38bdf8',  // 55%
    500: '#667eea',  // 50% (base)
    600: '#0284c7',  // 40%
    700: '#0369a1',  // 30%
    800: '#075985',  // 20%
    900: '#0c4a6e'   // 10%
}
```

## Typography Pairings (Top 10)

1. **Modern Sans**: Inter + Inter + JetBrains Mono
2. **Classic Serif**: Playfair Display + Source Sans Pro + Lora
3. **Editorial**: Merriweather + Open Sans + Crimson Pro
4. **Tech Forward**: Space Grotesk + Inter + Fira Code
5. **Elegant Serif**: Cormorant Garamond + Lato + EB Garamond
6. **Friendly Rounded**: Outfit + Nunito + Quicksand
7. **Bold Display**: Oswald + Roboto + Bebas Neue
8. **Professional**: Montserrat + Roboto + Work Sans
9. **Minimal Clean**: DM Sans + DM Sans + Space Mono
10. **Startup**: Poppins + Inter + IBM Plex Mono

## Semantic Colors

Always available:
- **Success**: #10b981 (green)
- **Warning**: #f59e0b (amber)
- **Error**: #ef4444 (red)
- **Info**: #3b82f6 (blue)
- **Neutral**: #64748b (slate)

## Best Practices

### DO ✅
- Choose industry first (auto-selects best components)
- Use recommended style for your industry
- Customize colors to match brand
- Test with real content
- Keep advanced options default unless needed

### DON'T ❌
- Mix too many styles (pick one)
- Use too many colors (3 max)
- Over-customize spacing (defaults work well)
- Ignore industry recommendations
- Skip testing on mobile

## Troubleshooting

### DesignEngine not loading?
```javascript
// Check in console:
console.log(typeof DesignEngine);
// Should return: "function"

// If "undefined", check:
// 1. design-engine.js loaded before app-v2.js?
// 2. Correct file path?
// 3. Any JavaScript errors?
```

### Colors not applying?
```javascript
// Check appState:
console.log(appState.design);
// Should show: { industry, style, primaryColor, secondaryColor, accentColor, layoutOptions }
```

### Preview not updating?
```javascript
// Force update:
updatePreview();

// Check if products exist:
console.log(appState.products);
```

## File Structure

```
axtra-product-page-builder/
├── src/
│   ├── index-v2.html          ← Main UI
│   ├── css/
│   │   └── styles-v2.css      ← Styles (includes new design system CSS)
│   └── js/
│       ├── design-engine.js   ← NEW: Core algorithm (850 lines)
│       └── app-v2.js          ← Updated: Integration (957 lines)
├── DESIGN_SYSTEM.md           ← NEW: Complete documentation
└── DESIGN_SYSTEM_SUMMARY.md   ← NEW: This summary
```

## API Cheatsheet

```javascript
// Initialize
const engine = new DesignEngine();

// Get all industries
engine.industries // Object with 11 industries

// Get all styles
engine.designStyles // Object with 8 styles

// Get all components
engine.components // Object with 14 component types

// Get all typography pairings
engine.typography.pairings // Array of 20+ pairings

// Generate design
const design = engine.generateDesign({
    industry: 'saas',
    style: 'minimal',
    customColors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#48bb78'
    },
    customFonts: null, // or { heading, body, accent }
    layoutOptions: {
        spacing: 'comfortable',
        borderRadius: 'rounded',
        shadows: 'subtle',
        animations: 'subtle'
    }
});

// Design object structure
design = {
    metadata: { industry, style, generated },
    colors: { primary, secondary, accent, semantic, neutral },
    typography: { fonts, scale, lineHeight, weights, sizes },
    layout: { spacing, borderRadius, container, grid, breakpoints },
    components: [ /* selected components */ ],
    effects: { shadows, animations, transitions },
    content: { keywords, competitors, tone }
}
```

## Version Info

- **Design Engine**: v1.0
- **Industries**: 11
- **Styles**: 8
- **Components**: 14 (70+ variants)
- **Typography Pairings**: 20+
- **Total Lines**: ~1,200 (engine + updates)
- **Documentation**: ~1,000 lines

---

**Pro Tip**: Start simple (just pick industry + style), then customize only what you need. The engine's smart defaults work great! 🎨
