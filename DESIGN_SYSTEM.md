# Axtra Design System Documentation

## Overview
The Axtra Product Page Builder features a comprehensive, algorithm-driven design system that combines industry best practices, design styles, and component libraries to generate professional product pages with minimal user input.

## Architecture

### Design Engine (`design-engine.js`)
The core intelligence that powers the design system. It combines:
- **11 Industry Templates** - Pre-configured settings for different business types
- **8 Design Styles** - Visual approaches (minimal, bold, professional, etc.)
- **14 Component Types** - Reusable page sections with multiple variants
- **20+ Typography Pairings** - Professional Google Fonts combinations
- **Advanced Color System** - Automatic shade generation (50-900) for any color

### How It Works

```javascript
// User selects: Industry + Style
const design = designEngine.generateDesign({
    industry: 'ecommerce',
    style: 'bold'
});

// Engine returns comprehensive system:
{
    colors: { primary, secondary, accent, semantic, neutral },
    typography: { fonts, scale, lineHeight, weights },
    layout: { spacing, borderRadius, container, grid },
    components: [ /* recommended sections */ ],
    effects: { shadows, animations, transitions }
}
```

## Industry Templates (11)

### 1. SaaS & Software 💻
- **Colors**: Primary: #667eea, Secondary: #764ba2, Accent: #48bb78
- **Fonts**: Heading: Inter, Body: Inter, Accent: JetBrains Mono
- **Layout**: Centered, clean, developer-focused
- **Components**: Hero, Features, Pricing, Testimonials, Integrations, CTA
- **Competitors**: Stripe, Notion, Slack, Linear, Vercel
- **Tone**: Professional, clear, benefit-focused

### 2. E-commerce & Retail 🛍️
- **Colors**: Primary: #e53e3e, Secondary: #c53030, Accent: #38a169
- **Fonts**: Heading: Playfair Display, Body: Inter, Accent: Montserrat
- **Layout**: Grid, visual-heavy, conversion-focused
- **Components**: Hero, Product Showcase, Benefits, Testimonials, Urgency, CTA
- **Competitors**: Shopify, Warby Parker, Allbirds, Glossier
- **Tone**: Persuasive, urgent, value-driven

### 3. Education & E-Learning 📚
- **Colors**: Primary: #f093fb, Secondary: #f5576c, Accent: #4299e1
- **Fonts**: Heading: Poppins, Body: Open Sans, Accent: Merriweather
- **Layout**: Sidebar, content-rich, structured
- **Components**: Hero, Course Preview, Curriculum, Instructor, Testimonials, Pricing, FAQ
- **Competitors**: Coursera, Masterclass, Duolingo, Skillshare
- **Tone**: Encouraging, informative, accessible

### 4. Finance & Fintech 💰
- **Colors**: Primary: #2b6cb0, Secondary: #2c5282, Accent: #48bb78
- **Fonts**: Heading: Montserrat, Body: Roboto, Accent: Space Grotesk
- **Layout**: Professional, trust-focused, data-driven
- **Components**: Hero, Trust Indicators, Features, Security, How It Works, Pricing, CTA
- **Competitors**: Robinhood, Revolut, Coinbase, Wise
- **Tone**: Trustworthy, secure, authoritative

### 5. Healthcare & Wellness 🏥
- **Colors**: Primary: #00b894, Secondary: #00cec9, Accent: #0984e3
- **Fonts**: Heading: Lato, Body: Source Sans Pro, Accent: Nunito
- **Layout**: Calm, accessible, reassuring
- **Components**: Hero, Benefits, How It Works, Testimonials, Trust Badges, CTA
- **Competitors**: Calm, Headspace, Hims, ZocDoc
- **Tone**: Caring, reassuring, professional

### 6. Marketing & Agency 📊
- **Colors**: Primary: #f59e0b, Secondary: #d97706, Accent: #8b5cf6
- **Fonts**: Heading: Outfit, Body: Inter, Accent: DM Sans
- **Layout**: Creative, portfolio-style, results-focused
- **Components**: Hero, Portfolio, Services, Case Studies, Process, Team, Contact
- **Competitors**: Mailchimp, HubSpot, Webflow
- **Tone**: Creative, results-focused, energetic

### 7. Real Estate & Property 🏠
- **Colors**: Primary: #0f766e, Secondary: #115e59, Accent: #0891b2
- **Fonts**: Heading: Raleway, Body: Lato, Accent: Crimson Pro
- **Layout**: Visual, search-focused, location-driven
- **Components**: Hero Search, Featured Properties, Benefits, How It Works, Testimonials, CTA
- **Competitors**: Zillow, Airbnb, Redfin
- **Tone**: Aspirational, descriptive, trustworthy

### 8. Non-Profit & Charity ❤️
- **Colors**: Primary: #dc2626, Secondary: #991b1b, Accent: #059669
- **Fonts**: Heading: Merriweather, Body: Open Sans, Accent: Lora
- **Layout**: Story-driven, emotional, mission-focused
- **Components**: Hero, Mission, Impact Stats, Stories, Donation Form, CTA
- **Competitors**: Charity: Water, The Ocean Cleanup
- **Tone**: Emotional, mission-driven, inspiring

### 9. Technology & Innovation 🚀
- **Colors**: Primary: #7c3aed, Secondary: #6d28d9, Accent: #ec4899
- **Fonts**: Heading: Space Grotesk, Body: Inter, Accent: Fira Code
- **Layout**: Futuristic, technical, bold
- **Components**: Hero, Technology Showcase, Features, Vision, Press, CTA
- **Competitors**: OpenAI, SpaceX, Tesla
- **Tone**: Innovative, forward-thinking, technical

### 10. Food & Beverage 🍔
- **Colors**: Primary: #ff7675, Secondary: #fab1a0, Accent: #fdcb6e
- **Fonts**: Heading: Pacifico, Body: Nunito, Accent: Righteous
- **Layout**: Warm, appetite-driven, visual
- **Components**: Hero Image, Menu, Gallery, Reviews, Locations, Order
- **Competitors**: DoorDash, Blue Apron, Sweetgreen
- **Tone**: Appetizing, sensory, inviting

### 11. Other / Custom ⚙️
- **Colors**: Primary: #6366f1, Secondary: #4f46e5, Accent: #8b5cf6
- **Fonts**: Heading: Inter, Body: Inter, Accent: Space Grotesk
- **Layout**: Flexible, general-purpose
- **Components**: Hero, Features, Benefits, Testimonials, CTA
- **Tone**: Professional, clear, engaging

## Design Styles (8)

### 1. Minimal & Clean
- **Spacing**: 1.2× base (generous)
- **Border Radius**: 4-8px (subtle)
- **Shadows**: Subtle, low elevation
- **Animations**: Slow fade transitions
- **Typography**: Scale 1.25, line-height 1.7, weight 600/400
- **Color Approach**: Monochrome with single accent
- **Best For**: SaaS, Technology, Professional services

### 2. Bold & Impactful
- **Spacing**: 1.0× base (compact)
- **Border Radius**: 8-16px (rounded)
- **Shadows**: Dramatic, high elevation
- **Animations**: Fast scale effects
- **Typography**: Scale 1.5, line-height 1.6, weight 800/500
- **Color Approach**: Vibrant with strong contrasts
- **Best For**: E-commerce, Creative agencies, Entertainment

### 3. Professional & Corporate
- **Spacing**: 1.1× base (structured)
- **Border Radius**: 2-4px (sharp)
- **Shadows**: Medium intensity
- **Animations**: Medium slide transitions
- **Typography**: Scale 1.2, line-height 1.6, weight 700/400
- **Color Approach**: Blues, grays, subdued palette
- **Best For**: B2B, Finance, Healthcare, Enterprise

### 4. Creative & Artistic
- **Spacing**: 0.9× base (varied)
- **Border Radius**: 12-24px (expressive)
- **Shadows**: Varied, mixed elevation
- **Animations**: Playful, varied timing
- **Typography**: Scale 1.4, mixed fonts, creative hierarchy
- **Color Approach**: Experimental, multi-colored
- **Best For**: Design studios, Creative agencies, Startups

### 5. Elegant & Sophisticated
- **Spacing**: 1.3× base (generous)
- **Border Radius**: 0px (sharp)
- **Shadows**: Subtle, low elevation
- **Animations**: Slow fade
- **Typography**: Scale 1.3, line-height 1.8, weight 400/300
- **Color Approach**: Muted, sophisticated with gold/silver accents
- **Best For**: Luxury brands, High-end services, Premium products

### 6. Modern & Trendy
- **Spacing**: 1.1× base (balanced)
- **Border Radius**: 12-24px (rounded)
- **Shadows**: Dramatic, layered
- **Animations**: Fast micro-interactions
- **Typography**: Scale 1.3, modern sans-serif, variable fonts
- **Color Approach**: Gradients, modern combinations
- **Best For**: Startups, Tech companies, Modern brands

### 7. Playful & Fun
- **Spacing**: 1.0× base (comfortable)
- **Border Radius**: 16-32px (pill shapes)
- **Shadows**: Medium elevation
- **Animations**: Fast bounce effects
- **Typography**: Scale 1.2, rounded fonts, weight 700/400
- **Color Approach**: Bright, saturated, happy colors
- **Best For**: Consumer apps, Education, Wellness

### 8. Technical & Data-Driven
- **Spacing**: 0.95× base (compact)
- **Border Radius**: 4-8px (minimal)
- **Shadows**: Subtle, low elevation
- **Animations**: Instant (none)
- **Typography**: Scale 1.15, monospace for code, weight 600/400
- **Color Approach**: Dark backgrounds, syntax-highlighting
- **Best For**: Developer tools, Analytics, Technical products

## Component Library (14)

Each component has **multiple variants** and predefined content structure:

1. **Hero Section** (required)
   - Variants: Simple Centered, Split with Image, Video Background, Gradient Animated, Product Showcase
   
2. **Features Section**
   - Variants: 3-Column Grid, 4-Column Grid, Alternating Rows, Icon List, Card Layout
   
3. **Benefits Section**
   - Variants: Two-Column with Images, Single Column, Icon Grid, Comparison Table
   
4. **How It Works**
   - Variants: Numbered Steps, Timeline, Flowchart, Video Walkthrough
   
5. **Testimonials**
   - Variants: Carousel, Grid, Featured, Video, Rating Stars
   
6. **Pricing Table**
   - Variants: 3-Tier Cards, Comparison Table, Single Plan, Usage Calculator
   
7. **Call-to-Action** (required)
   - Variants: Simple Centered, Banner, Two-Column, Full-Width
   
8. **FAQ Section**
   - Variants: Accordion, Two-Column, Categorized Tabs, Search-Enabled
   
9. **Logo Strip**
   - Variants: Single Row, Scrolling Carousel, Grid
   
10. **Statistics Section**
    - Variants: 4-Column Grid, Large Centered, Animated Counters
    
11. **Team Section**
    - Variants: Grid of Photos, Carousel, Founder Focus
    
12. **Lead Capture Form**
    - Variants: Email Only, Multi-Field, Multi-Step, Quiz
    
13. **Comparison Table**
    - Variants: Side-by-Side, Checkmarks, Before/After
    
14. **Media Section**
    - Variants: Press Logos, Article Excerpts, Awards

## Advanced Customization

### Layout Options (Progressive Disclosure)

Users can click "⚙️ Customize Layout & Effects" to access:

#### Spacing
- **Compact**: 0.8× base (dense layouts)
- **Comfortable**: 1.0× base (default, balanced)
- **Spacious**: 1.2× base (generous whitespace)

#### Corners
- **Sharp**: 0px border-radius (modern, technical)
- **Rounded**: 4-12px (default, friendly)
- **Pill**: 24-32px (playful, modern)

#### Shadows
- **None**: No shadows (flat design)
- **Subtle**: Light shadows (minimal)
- **Dramatic**: Strong shadows (depth)

#### Animations
- **None**: No animations (accessibility, performance)
- **Subtle**: Fade/slide (default)
- **Playful**: Bounce/scale (fun)

### Color System

Users can customize 3 colors:
- **Primary Color**: Main brand color (auto-generates 50-900 shades)
- **Secondary Color**: Complementary color (auto-generates shades)
- **Accent Color**: Call-to-action, highlights

The engine automatically generates:
- **Neutral Palette**: 50-900 gray shades
- **Semantic Colors**: Success (#10b981), Warning (#f59e0b), Error (#ef4444), Info (#3b82f6)

### Typography System

20+ Professional Font Pairings:
- Modern Sans, Classic Serif, Editorial, Tech Forward
- Elegant Serif, Friendly Rounded, Bold Display, Creative Fun
- Professional, Minimal Clean, Geometric, Humanist
- Luxury, Startup, Magazine, Corporate
- Artistic, Tech Mono, Warm Friendly, Elegant Modern

Each pairing includes:
- **Heading Font**: Display, large sizes
- **Body Font**: Readable, comfortable
- **Accent Font**: Special use (code, quotes, highlights)

## Smart Defaults

The DesignEngine uses smart defaults based on industry + style combination:

```javascript
// Example: E-commerce + Bold
{
    colors: { vibrant, high-contrast },
    typography: { large scale, bold weights },
    layout: { grid-based, compact spacing },
    components: [ 'hero', 'product-showcase', 'urgency', 'testimonials', 'cta' ],
    effects: { dramatic shadows, fast animations }
}
```

## User Experience Philosophy

### Progressive Disclosure
- **Simple by Default**: Users see only industry and style selection
- **Power When Needed**: Advanced options hidden behind "Customize" button
- **Smart Recommendations**: Engine suggests best components for industry

### Instant Preview
- Every change updates live preview immediately
- No configuration required - works out of the box
- Can customize every detail if desired

### Future Admin Dashboard Integration
All settings are designed to be manageable via Firebase admin dashboard later:
- **Builder Mode**: Wizard for first-time setup
- **Management Mode**: Tabs for editing after setup
- **Component Library**: Drag-and-drop sections in admin

## Technical Implementation

### CSS Variables
The design system generates CSS custom properties:

```css
:root {
    --color-primary-50: #f0f9ff;
    --color-primary-500: #667eea;
    --color-primary-900: #1e3a8a;
    
    --font-heading: 'Inter', sans-serif;
    --font-body: 'Inter', sans-serif;
    
    --spacing-base: 16px;
    --spacing-scale: 1.0;
    
    --border-radius-base: 8px;
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
}
```

### LocalStorage Structure

```json
{
    "design": {
        "industry": "ecommerce",
        "style": "bold",
        "primaryColor": "#e53e3e",
        "secondaryColor": "#c53030",
        "accentColor": "#38a169",
        "layoutOptions": {
            "spacing": "comfortable",
            "borderRadius": "rounded",
            "shadows": "subtle",
            "animations": "subtle"
        }
    },
    "products": [ /* array */ ],
    "content": { /* hero, features, etc */ },
    "integrations": { /* Lean X, email, etc */ }
}
```

## API Reference

### DesignEngine Class

```javascript
// Initialize
const engine = new DesignEngine();

// Generate comprehensive design
const design = engine.generateDesign({
    industry: 'saas',
    style: 'minimal',
    customColors: { primary: '#667eea', secondary: '#764ba2', accent: '#48bb78' },
    layoutOptions: { spacing: 'spacious', borderRadius: 'rounded' }
});

// Access data
engine.industries // 11 industry templates
engine.designStyles // 8 style definitions
engine.components // 14 component types
engine.typography.pairings // 20+ font combinations
```

## Best Practices

### For Users
1. **Start with Industry**: Selects appropriate components and colors
2. **Choose Style**: Defines visual approach (minimal, bold, etc.)
3. **Customize Colors**: Optional - use brand colors
4. **Advanced Options**: Only if you need fine control

### For Developers
1. **Load design-engine.js before app-v2.js**
2. **Check DesignEngine availability** before using
3. **Fall back to basic templates** if engine not loaded
4. **Store layoutOptions in appState** for persistence

## Roadmap

### Phase 1 (Current)
✅ 11 industries, 8 styles, 14 components
✅ Color system with auto-shade generation
✅ Typography pairings
✅ Layout customization options
✅ Progressive disclosure UI

### Phase 2 (Next)
- Real-time component preview (see actual sections)
- Component variant selector (choose from multiple layouts)
- Typography preview (see fonts in action)
- Export design system as CSS file

### Phase 3 (Future)
- Firebase admin dashboard integration
- Drag-and-drop component builder
- Custom component creation
- A/B testing different designs
- Analytics on design performance

## Support

For questions or issues:
- Check console logs: `console.log(appState.designEngine)`
- Verify DesignEngine loaded: `typeof DesignEngine !== 'undefined'`
- Review generated design: `engine.generateDesign({ industry, style })`

---

Built with ❤️ by Axtra
