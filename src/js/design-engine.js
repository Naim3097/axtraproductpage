/**
 * AXTRA DESIGN ENGINE
 * Advanced design system that combines industries, styles, components, and user preferences
 * to generate comprehensive, customizable product page designs
 */

// ============================================
// DESIGN ENGINE CLASS
// ============================================

class DesignEngine {
    constructor() {
        this.industries = this.loadIndustries();
        this.designStyles = this.loadDesignStyles();
        this.components = this.loadComponents();
        this.typography = this.loadTypography();
        this.colorSystem = this.initColorSystem();
    }

    // ============================================
    // INDUSTRY DATABASE (11 industries)
    // ============================================
    
    loadIndustries() {
        return {
            saas: {
                name: "SaaS & Software",
                icon: "💻",
                description: "Software as a Service, B2B tools, cloud platforms",
                colors: { primary: "#667eea", secondary: "#764ba2", accent: "#48bb78" },
                fonts: { heading: "Inter", body: "Inter", accent: "JetBrains Mono" },
                layout: "centered",
                components: ["hero", "features", "pricing", "testimonials", "integrations", "cta"],
                keywords: ["automation", "productivity", "collaboration", "cloud", "API"],
                competitors: ["Stripe", "Notion", "Slack", "Linear", "Vercel"]
            },
            ecommerce: {
                name: "E-commerce & Retail",
                icon: "🛍️",
                description: "Online stores, product sales, retail brands",
                colors: { primary: "#e53e3e", secondary: "#c53030", accent: "#38a169" },
                fonts: { heading: "Playfair Display", body: "Inter", accent: "Montserrat" },
                layout: "grid",
                components: ["hero", "product-showcase", "benefits", "testimonials", "urgency", "cta"],
                keywords: ["shop", "buy", "products", "discount", "quality"],
                competitors: ["Shopify", "Warby Parker", "Allbirds", "Glossier"]
            },
            education: {
                name: "Education & E-Learning",
                icon: "📚",
                description: "Online courses, training platforms, educational content",
                colors: { primary: "#f093fb", secondary: "#f5576c", accent: "#4299e1" },
                fonts: { heading: "Poppins", body: "Open Sans", accent: "Merriweather" },
                layout: "sidebar",
                components: ["hero", "course-preview", "curriculum", "instructor", "testimonials", "pricing", "faq"],
                keywords: ["learn", "courses", "skills", "certification", "training"],
                competitors: ["Coursera", "Masterclass", "Duolingo", "Skillshare"]
            },
            finance: {
                name: "Finance & Fintech",
                icon: "💰",
                description: "Banking, payments, investment, financial services",
                colors: { primary: "#2b6cb0", secondary: "#2c5282", accent: "#48bb78" },
                fonts: { heading: "Montserrat", body: "Roboto", accent: "Space Grotesk" },
                layout: "professional",
                components: ["hero", "trust-indicators", "features", "security", "how-it-works", "pricing", "cta"],
                keywords: ["secure", "trusted", "financial", "investment", "savings"],
                competitors: ["Robinhood", "Revolut", "Coinbase", "Wise"]
            },
            healthcare: {
                name: "Healthcare & Wellness",
                icon: "🏥",
                description: "Medical services, wellness apps, health tech",
                colors: { primary: "#00b894", secondary: "#00cec9", accent: "#0984e3" },
                fonts: { heading: "Lato", body: "Source Sans Pro", accent: "Nunito" },
                layout: "calm",
                components: ["hero", "benefits", "how-it-works", "testimonials", "trust-badges", "cta"],
                keywords: ["health", "wellness", "care", "medical", "therapy"],
                competitors: ["Calm", "Headspace", "Hims", "ZocDoc"]
            },
            marketing: {
                name: "Marketing & Agency",
                icon: "📊",
                description: "Marketing agencies, creative studios, consulting",
                colors: { primary: "#f59e0b", secondary: "#d97706", accent: "#8b5cf6" },
                fonts: { heading: "Outfit", body: "Inter", accent: "DM Sans" },
                layout: "creative",
                components: ["hero", "portfolio", "services", "case-studies", "process", "team", "contact"],
                keywords: ["growth", "marketing", "creative", "strategy", "results"],
                competitors: ["Mailchimp", "HubSpot", "Webflow"]
            },
            realestate: {
                name: "Real Estate & Property",
                icon: "🏠",
                description: "Property listings, real estate services, rentals",
                colors: { primary: "#0f766e", secondary: "#115e59", accent: "#0891b2" },
                fonts: { heading: "Raleway", body: "Lato", accent: "Crimson Pro" },
                layout: "visual",
                components: ["hero-search", "featured-properties", "benefits", "how-it-works", "testimonials", "cta"],
                keywords: ["property", "home", "location", "investment", "neighborhood"],
                competitors: ["Zillow", "Airbnb", "Redfin"]
            },
            nonprofit: {
                name: "Non-Profit & Charity",
                icon: "❤️",
                description: "Charitable organizations, social causes, fundraising",
                colors: { primary: "#dc2626", secondary: "#991b1b", accent: "#059669" },
                fonts: { heading: "Merriweather", body: "Open Sans", accent: "Lora" },
                layout: "story-driven",
                components: ["hero", "mission", "impact-stats", "stories", "donation-form", "cta"],
                keywords: ["donate", "impact", "mission", "community", "cause"],
                competitors: ["Charity: Water", "The Ocean Cleanup"]
            },
            tech: {
                name: "Technology & Innovation",
                icon: "🚀",
                description: "Tech startups, innovation, emerging technology",
                colors: { primary: "#7c3aed", secondary: "#6d28d9", accent: "#ec4899" },
                fonts: { heading: "Space Grotesk", body: "Inter", accent: "Fira Code" },
                layout: "futuristic",
                components: ["hero", "technology-showcase", "features", "vision", "press", "cta"],
                keywords: ["innovation", "technology", "future", "breakthrough", "advanced"],
                competitors: ["OpenAI", "SpaceX", "Tesla"]
            },
            food: {
                name: "Food & Beverage",
                icon: "🍔",
                description: "Restaurants, food delivery, culinary services",
                colors: { primary: "#ff7675", secondary: "#fab1a0", accent: "#fdcb6e" },
                fonts: { heading: "Pacifico", body: "Nunito", accent: "Righteous" },
                layout: "warm",
                components: ["hero-image", "menu", "gallery", "reviews", "locations", "order"],
                keywords: ["fresh", "delicious", "quality", "local", "menu"],
                competitors: ["DoorDash", "Blue Apron", "Sweetgreen"]
            },
            other: {
                name: "Other / Custom",
                icon: "⚙️",
                description: "Custom industry or general purpose",
                colors: { primary: "#6366f1", secondary: "#4f46e5", accent: "#8b5cf6" },
                fonts: { heading: "Inter", body: "Inter", accent: "Space Grotesk" },
                layout: "flexible",
                components: ["hero", "features", "benefits", "testimonials", "cta"],
                keywords: [],
                competitors: []
            }
        };
    }

    // ============================================
    // DESIGN STYLES (8 styles)
    // ============================================
    
    loadDesignStyles() {
        return {
            minimal: {
                name: "Minimal & Clean",
                description: "Lots of whitespace, simple layouts, focuses on content",
                spacing: { scale: 1.2, base: 16 },
                borderRadius: { base: 4, cards: 8, buttons: 6 },
                shadows: { intensity: "subtle", elevation: "low" },
                animations: { speed: "slow", type: "fade" },
                typography: {
                    scale: 1.25,
                    lineHeight: { heading: 1.2, body: 1.7 },
                    weights: { heading: 600, body: 400 }
                },
                colorApproach: "monochrome-accent",
                characteristics: ["generous spacing", "limited palette", "clean typography", "subtle animations"]
            },
            bold: {
                name: "Bold & Impactful",
                description: "Strong visuals, vibrant colors, attention-grabbing",
                spacing: { scale: 1.0, base: 12 },
                borderRadius: { base: 8, cards: 16, buttons: 12 },
                shadows: { intensity: "dramatic", elevation: "high" },
                animations: { speed: "fast", type: "scale" },
                typography: {
                    scale: 1.5,
                    lineHeight: { heading: 1.1, body: 1.6 },
                    weights: { heading: 800, body: 500 }
                },
                colorApproach: "vibrant-contrast",
                characteristics: ["high contrast", "large typography", "strong CTAs", "dynamic layouts"]
            },
            professional: {
                name: "Professional & Corporate",
                description: "Trustworthy, established, business-oriented",
                spacing: { scale: 1.1, base: 16 },
                borderRadius: { base: 2, cards: 4, buttons: 4 },
                shadows: { intensity: "medium", elevation: "medium" },
                animations: { speed: "medium", type: "slide" },
                typography: {
                    scale: 1.2,
                    lineHeight: { heading: 1.3, body: 1.6 },
                    weights: { heading: 700, body: 400 }
                },
                colorApproach: "subdued-professional",
                characteristics: ["structured layouts", "professional imagery", "clear hierarchy", "trust indicators"]
            },
            creative: {
                name: "Creative & Artistic",
                description: "Unique, expressive, breaks conventional rules",
                spacing: { scale: 0.9, base: 20 },
                borderRadius: { base: 12, cards: 24, buttons: 20 },
                shadows: { intensity: "varied", elevation: "mixed" },
                animations: { speed: "varied", type: "playful" },
                typography: {
                    scale: 1.4,
                    lineHeight: { heading: 1.2, body: 1.7 },
                    weights: { heading: 700, body: 400 }
                },
                colorApproach: "experimental-multi",
                characteristics: ["unconventional layouts", "custom illustrations", "playful interactions", "unique typography"]
            },
            elegant: {
                name: "Elegant & Sophisticated",
                description: "Refined, luxurious, attention to detail",
                spacing: { scale: 1.3, base: 20 },
                borderRadius: { base: 0, cards: 0, buttons: 0 },
                shadows: { intensity: "subtle", elevation: "low" },
                animations: { speed: "slow", type: "fade" },
                typography: {
                    scale: 1.3,
                    lineHeight: { heading: 1.4, body: 1.8 },
                    weights: { heading: 400, body: 300 }
                },
                colorApproach: "muted-sophisticated",
                characteristics: ["premium aesthetics", "refined typography", "sophisticated palette", "high-quality imagery"]
            },
            modern: {
                name: "Modern & Trendy",
                description: "Current design trends, contemporary feel",
                spacing: { scale: 1.1, base: 16 },
                borderRadius: { base: 12, cards: 16, buttons: 24 },
                shadows: { intensity: "dramatic", elevation: "layered" },
                animations: { speed: "fast", type: "micro" },
                typography: {
                    scale: 1.3,
                    lineHeight: { heading: 1.2, body: 1.6 },
                    weights: { heading: 700, body: 400 }
                },
                colorApproach: "gradient-modern",
                characteristics: ["glassmorphism", "3D elements", "gradients", "micro-interactions"]
            },
            playful: {
                name: "Playful & Fun",
                description: "Friendly, approachable, energetic",
                spacing: { scale: 1.0, base: 16 },
                borderRadius: { base: 16, cards: 24, buttons: 32 },
                shadows: { intensity: "medium", elevation: "medium" },
                animations: { speed: "fast", type: "bounce" },
                typography: {
                    scale: 1.2,
                    lineHeight: { heading: 1.3, body: 1.7 },
                    weights: { heading: 700, body: 400 }
                },
                colorApproach: "bright-saturated",
                characteristics: ["rounded shapes", "cheerful colors", "illustrations", "animated elements"]
            },
            technical: {
                name: "Technical & Data-Driven",
                description: "Detailed, information-rich, analytical",
                spacing: { scale: 0.95, base: 12 },
                borderRadius: { base: 4, cards: 8, buttons: 4 },
                shadows: { intensity: "subtle", elevation: "low" },
                animations: { speed: "instant", type: "none" },
                typography: {
                    scale: 1.15,
                    lineHeight: { heading: 1.3, body: 1.6 },
                    weights: { heading: 600, body: 400 }
                },
                colorApproach: "dark-syntax",
                characteristics: ["data visualizations", "grid layouts", "monospace fonts", "dark mode"]
            }
        };
    }

    // ============================================
    // COMPONENT LIBRARY (14 components)
    // ============================================
    
    loadComponents() {
        return {
            hero: {
                name: "Hero Section",
                required: true,
                variants: ["simple-centered", "split-image", "video-background", "gradient-animated", "product-showcase"],
                content: ["headline", "subheadline", "primary-cta", "secondary-cta", "hero-image"],
                bestFor: ["all"]
            },
            features: {
                name: "Features Section",
                required: false,
                variants: ["3-column-grid", "4-column-grid", "alternating-rows", "icon-list", "card-layout"],
                content: ["feature-title", "description", "icon", "optional-link"],
                bestFor: ["saas", "tech", "ecommerce"]
            },
            benefits: {
                name: "Benefits Section",
                required: false,
                variants: ["two-column-images", "single-column", "icon-grid", "comparison-table"],
                content: ["benefit-headline", "description", "visual", "proof-points"],
                bestFor: ["all"]
            },
            "how-it-works": {
                name: "How It Works",
                required: false,
                variants: ["numbered-steps", "timeline", "flowchart", "video-walkthrough"],
                content: ["step-number", "title", "description", "visual", "cta"],
                bestFor: ["saas", "finance", "healthcare"]
            },
            testimonials: {
                name: "Testimonials",
                required: false,
                variants: ["carousel", "grid", "featured", "video", "rating-stars"],
                content: ["quote", "name", "title", "company", "photo", "rating"],
                bestFor: ["all"]
            },
            pricing: {
                name: "Pricing Table",
                required: false,
                variants: ["3-tier-cards", "comparison-table", "single-plan", "usage-calculator"],
                content: ["plan-name", "price", "features", "cta", "popular-badge"],
                bestFor: ["saas", "education", "fitness"]
            },
            cta: {
                name: "Call-to-Action",
                required: true,
                variants: ["simple-centered", "banner", "two-column", "full-width"],
                content: ["headline", "supporting-text", "primary-cta", "trust-indicators"],
                bestFor: ["all"]
            },
            faq: {
                name: "FAQ Section",
                required: false,
                variants: ["accordion", "two-column", "categorized-tabs", "search-enabled"],
                content: ["question", "answer", "optional-link"],
                bestFor: ["saas", "ecommerce", "education"]
            },
            "logo-strip": {
                name: "Logo Strip",
                required: false,
                variants: ["single-row", "scrolling-carousel", "grid"],
                content: ["logos", "headline", "metrics"],
                bestFor: ["saas", "marketing", "finance"]
            },
            stats: {
                name: "Statistics Section",
                required: false,
                variants: ["4-column-grid", "large-centered", "animated-counters"],
                content: ["metric-number", "label", "icon", "description"],
                bestFor: ["nonprofit", "marketing", "realestate"]
            },
            team: {
                name: "Team Section",
                required: false,
                variants: ["grid-photos", "carousel", "founder-focus"],
                content: ["photo", "name", "title", "bio", "social-links"],
                bestFor: ["marketing", "nonprofit", "healthcare"]
            },
            form: {
                name: "Lead Capture Form",
                required: false,
                variants: ["email-only", "multi-field", "multi-step", "quiz"],
                content: ["form-fields", "submit-button", "privacy-notice", "success-message"],
                bestFor: ["saas", "education", "marketing"]
            },
            comparison: {
                name: "Comparison Table",
                required: false,
                variants: ["side-by-side", "checkmarks", "before-after"],
                content: ["feature-rows", "product-columns", "checkmarks", "cta"],
                bestFor: ["saas", "ecommerce", "finance"]
            },
            media: {
                name: "Media Section",
                required: false,
                variants: ["press-logos", "article-excerpts", "awards"],
                content: ["publication-logos", "quotes", "article-links"],
                bestFor: ["tech", "nonprofit", "marketing"]
            }
        };
    }

    // ============================================
    // TYPOGRAPHY SYSTEM (20+ font pairings)
    // ============================================
    
    loadTypography() {
        return {
            pairings: [
                { id: "modern-sans", heading: "Inter", body: "Inter", accent: "JetBrains Mono", category: "Modern Sans" },
                { id: "classic-serif", heading: "Playfair Display", body: "Source Sans Pro", accent: "Lora", category: "Classic Serif" },
                { id: "editorial", heading: "Merriweather", body: "Open Sans", accent: "Crimson Pro", category: "Editorial" },
                { id: "tech-forward", heading: "Space Grotesk", body: "Inter", accent: "Fira Code", category: "Technical" },
                { id: "elegant-serif", heading: "Cormorant Garamond", body: "Lato", accent: "EB Garamond", category: "Elegant" },
                { id: "friendly-rounded", heading: "Outfit", body: "Nunito", accent: "Quicksand", category: "Friendly" },
                { id: "bold-display", heading: "Oswald", body: "Roboto", accent: "Bebas Neue", category: "Bold" },
                { id: "creative-fun", heading: "Righteous", body: "Poppins", accent: "Pacifico", category: "Creative" },
                { id: "professional", heading: "Montserrat", body: "Roboto", accent: "Work Sans", category: "Professional" },
                { id: "minimal-clean", heading: "DM Sans", body: "DM Sans", accent: "Space Mono", category: "Minimal" },
                { id: "geometric", heading: "Raleway", body: "Lato", accent: "Oxygen", category: "Geometric" },
                { id: "humanist", heading: "Lato", body: "Source Sans Pro", accent: "PT Sans", category: "Humanist" },
                { id: "luxury", heading: "Bodoni Moda", body: "Lato", accent: "Cinzel", category: "Luxury" },
                { id: "startup", heading: "Poppins", body: "Inter", accent: "IBM Plex Mono", category: "Startup" },
                { id: "magazine", heading: "Libre Baskerville", body: "Source Sans Pro", accent: "Spectral", category: "Magazine" },
                { id: "corporate", heading: "IBM Plex Sans", body: "IBM Plex Sans", accent: "IBM Plex Mono", category: "Corporate" },
                { id: "artistic", heading: "Abril Fatface", body: "Lato", accent: "Cardo", category: "Artistic" },
                { id: "tech-mono", heading: "JetBrains Mono", body: "Inter", accent: "Fira Code", category: "Monospace" },
                { id: "warm-friendly", heading: "Nunito", body: "Nunito", accent: "Patrick Hand", category: "Warm" },
                { id: "elegant-modern", heading: "Sora", body: "Inter", accent: "Space Grotesk", category: "Modern Elegant" }
            ],
            scales: {
                minimal: { base: 16, ratio: 1.25 },
                moderate: { base: 16, ratio: 1.333 },
                large: { base: 18, ratio: 1.5 },
                dramatic: { base: 18, ratio: 1.618 }
            }
        };
    }

    // ============================================
    // COLOR SYSTEM (Advanced palette generation)
    // ============================================
    
    initColorSystem() {
        return {
            generatePalette: (baseColor) => {
                // Generate shades from 50 to 900
                const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
                const palette = {};
                
                // Convert hex to HSL for shade generation
                const hsl = this.hexToHSL(baseColor);
                
                shades.forEach(shade => {
                    const lightness = shade <= 500 
                        ? 95 - (shade / 500) * 45  // 50: 95%, 500: 50%
                        : 50 - ((shade - 500) / 400) * 40; // 500: 50%, 900: 10%
                    
                    palette[shade] = this.hslToHex(hsl.h, hsl.s, lightness);
                });
                
                return palette;
            },
            
            semanticColors: {
                success: "#10b981",
                warning: "#f59e0b",
                error: "#ef4444",
                info: "#3b82f6",
                neutral: "#64748b"
            }
        };
    }

    // ============================================
    // DESIGN GENERATION ALGORITHM
    // ============================================
    
    generateDesign(userPreferences) {
        const {
            industry,
            style,
            customColors = null,
            customFonts = null,
            layoutOptions = {}
        } = userPreferences;

        // Get base templates
        const industryData = this.industries[industry] || this.industries.other;
        const styleData = this.designStyles[style] || this.designStyles.minimal;

        // Generate comprehensive design system
        const design = {
            metadata: {
                industry: industryData.name,
                style: styleData.name,
                generated: new Date().toISOString()
            },
            
            // Color system (7 semantic colors with full palettes)
            colors: this.buildColorSystem(industryData.colors, customColors),
            
            // Typography system (heading, body, accent with full scales)
            typography: this.buildTypographySystem(industryData.fonts, styleData.typography, customFonts),
            
            // Layout system (spacing, sizing, breakpoints)
            layout: this.buildLayoutSystem(styleData.spacing, layoutOptions),
            
            // Component system (which components to use and their variants)
            components: this.selectComponents(industry, industryData.components),
            
            // Visual effects (shadows, borders, animations)
            effects: this.buildEffectsSystem(styleData),
            
            // Content strategy (keywords, tone, recommended sections)
            content: {
                keywords: industryData.keywords,
                competitors: industryData.competitors,
                tone: this.inferTone(industry, style)
            }
        };

        return design;
    }

    // ============================================
    // HELPER METHODS
    // ============================================
    
    buildColorSystem(industryColors, customColors) {
        const colors = customColors || industryColors;
        
        return {
            primary: {
                base: colors.primary,
                palette: this.colorSystem.generatePalette(colors.primary)
            },
            secondary: {
                base: colors.secondary,
                palette: this.colorSystem.generatePalette(colors.secondary)
            },
            accent: {
                base: colors.accent,
                palette: this.colorSystem.generatePalette(colors.accent)
            },
            semantic: this.colorSystem.semanticColors,
            neutral: this.colorSystem.generatePalette("#64748b")
        };
    }

    buildTypographySystem(industryFonts, styleTypography, customFonts) {
        const fonts = customFonts || industryFonts;
        
        return {
            fonts: {
                heading: fonts.heading,
                body: fonts.body,
                accent: fonts.accent
            },
            scale: styleTypography.scale,
            lineHeight: styleTypography.lineHeight,
            weights: styleTypography.weights,
            sizes: this.generateTypographyScale(styleTypography.scale)
        };
    }

    buildLayoutSystem(styleSpacing, customOptions) {
        const spacing = customOptions.spacing || styleSpacing.scale;
        const borderRadius = customOptions.borderRadius || "rounded";
        const containerWidth = customOptions.containerWidth || 1200;
        
        return {
            spacing: {
                unit: styleSpacing.base,
                scale: spacing,
                values: this.generateSpacingScale(styleSpacing.base, spacing)
            },
            borderRadius: this.getBorderRadiusValues(borderRadius),
            container: {
                maxWidth: containerWidth,
                padding: { mobile: 16, tablet: 24, desktop: 32 }
            },
            grid: {
                columns: 12,
                gap: styleSpacing.base * spacing
            },
            breakpoints: {
                mobile: 640,
                tablet: 768,
                desktop: 1024,
                wide: 1280
            }
        };
    }

    selectComponents(industry, baseComponents) {
        const allComponents = this.components;
        const selected = [];

        baseComponents.forEach(componentId => {
            if (allComponents[componentId]) {
                selected.push({
                    id: componentId,
                    ...allComponents[componentId],
                    defaultVariant: allComponents[componentId].variants[0]
                });
            }
        });

        return selected;
    }

    buildEffectsSystem(styleData) {
        return {
            shadows: this.getShadowValues(styleData.shadows.intensity),
            animations: {
                speed: this.getAnimationSpeed(styleData.animations.speed),
                type: styleData.animations.type
            },
            transitions: {
                default: "all 0.3s ease",
                fast: "all 0.15s ease",
                slow: "all 0.5s ease"
            }
        };
    }

    inferTone(industry, style) {
        const tones = {
            saas: "professional, clear, benefit-focused",
            ecommerce: "persuasive, urgent, value-driven",
            education: "encouraging, informative, accessible",
            finance: "trustworthy, secure, authoritative",
            healthcare: "caring, reassuring, professional",
            marketing: "creative, results-focused, energetic",
            realestate: "aspirational, descriptive, trustworthy",
            nonprofit: "emotional, mission-driven, inspiring",
            tech: "innovative, forward-thinking, technical",
            food: "appetizing, sensory, inviting",
            other: "professional, clear, engaging"
        };

        return tones[industry] || tones.other;
    }

    // Utility functions
    generateTypographyScale(ratio) {
        const base = 16;
        return {
            xs: Math.round(base / Math.pow(ratio, 2)),
            sm: Math.round(base / ratio),
            base: base,
            lg: Math.round(base * ratio),
            xl: Math.round(base * Math.pow(ratio, 2)),
            "2xl": Math.round(base * Math.pow(ratio, 3)),
            "3xl": Math.round(base * Math.pow(ratio, 4)),
            "4xl": Math.round(base * Math.pow(ratio, 5))
        };
    }

    generateSpacingScale(base, scale) {
        return {
            xs: base * 0.25 * scale,
            sm: base * 0.5 * scale,
            base: base * scale,
            lg: base * 1.5 * scale,
            xl: base * 2 * scale,
            "2xl": base * 3 * scale,
            "3xl": base * 4 * scale,
            "4xl": base * 6 * scale
        };
    }

    getBorderRadiusValues(type) {
        const values = {
            sharp: { base: 0, card: 0, button: 0 },
            rounded: { base: 4, card: 8, button: 6 },
            pill: { base: 12, card: 16, button: 24 }
        };
        return values[type] || values.rounded;
    }

    getShadowValues(intensity) {
        const shadows = {
            none: { sm: "none", md: "none", lg: "none" },
            subtle: {
                sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                md: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
            },
            medium: {
                sm: "0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                md: "0 8px 12px -2px rgba(0, 0, 0, 0.15)",
                lg: "0 20px 25px -5px rgba(0, 0, 0, 0.15)"
            },
            dramatic: {
                sm: "0 4px 8px 0 rgba(0, 0, 0, 0.15)",
                md: "0 12px 24px -4px rgba(0, 0, 0, 0.25)",
                lg: "0 30px 40px -10px rgba(0, 0, 0, 0.3)"
            }
        };
        return shadows[intensity] || shadows.subtle;
    }

    getAnimationSpeed(speed) {
        const speeds = {
            instant: "0ms",
            fast: "150ms",
            medium: "300ms",
            slow: "500ms"
        };
        return speeds[speed] || speeds.medium;
    }

    hexToHSL(hex) {
        // Remove # if present
        hex = hex.replace("#", "");
        
        // Convert hex to RGB
        const r = parseInt(hex.substr(0, 2), 16) / 255;
        const g = parseInt(hex.substr(2, 2), 16) / 255;
        const b = parseInt(hex.substr(4, 2), 16) / 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    }

    hslToHex(h, s, l) {
        s /= 100;
        l /= 100;
        
        const c = (1 - Math.abs(2 * l - 1)) * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        let r, g, b;
        
        if (h >= 0 && h < 60) {
            r = c; g = x; b = 0;
        } else if (h >= 60 && h < 120) {
            r = x; g = c; b = 0;
        } else if (h >= 120 && h < 180) {
            r = 0; g = c; b = x;
        } else if (h >= 180 && h < 240) {
            r = 0; g = x; b = c;
        } else if (h >= 240 && h < 300) {
            r = x; g = 0; b = c;
        } else {
            r = c; g = 0; b = x;
        }
        
        const toHex = (n) => {
            const hex = Math.round((n + m) * 255).toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        };
        
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }
}

// Export for use in app
window.DesignEngine = DesignEngine;
