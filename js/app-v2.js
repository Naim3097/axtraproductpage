/**
 * AXTRA PRODUCT PAGE BUILDER V2
 * Professional Edition with Multi-Product & Industry Templates
 */

// ============================================
// STATE MANAGEMENT
// ============================================

const appState = {
    currentStep: 1,
    products: [],
    design: {
        industry: null,
        style: null,
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        accentColor: '#48bb78',
        layoutOptions: {
            spacing: 'comfortable',
            borderRadius: 'rounded',
            shadows: 'subtle',
            animations: 'subtle'
        }
    },
    sections: {
        hero: {
            enabled: true,
            layout: 'centered',
            headline: '',
            subheadline: '',
            ctaText: 'Shop Now',
            showCTA: true,
            splitImage: null,
            // Design controls
            backgroundType: 'solid', // solid, gradient, image
            backgroundColor: '#667eea',
            textColor: '#ffffff',
            gradientStart: '#667eea',
            gradientEnd: '#764ba2',
            gradientAngle: 135,
            backgroundImage: null,
            imageOverlay: 50,
            headlineSize: 48,
            fontWeight: 700,
            ctaBackground: '#ffffff',
            ctaTextColor: '#667eea',
            ctaHoverBg: '#f0f0f0',
            ctaBorderRadius: 8,
            height: 600,
            contentWidth: 1000,
            padding: 60
        },
        products: {
            enabled: true,
            headline: 'Our Products',
            subheadline: '',
            layout: 'grid',
            columns: 3,
            showPricing: true,
            showDescription: true,
            // Design controls
            sectionBg: '#f8f9fa',
            cardBg: '#ffffff',
            textColor: '#1e293b',
            cardRadius: 8,
            cardShadow: 'sm',
            hoverEffect: 'lift',
            hoverBorder: '#667eea',
            titleSize: 16,
            titleWeight: 600,
            priceColor: '#667eea',
            priceSize: 20,
            cardPadding: 16,
            gap: 24,
            headerSpacing: 8,
            sectionSpacing: 48
        },
        about: {
            enabled: false,
            layout: 'two-column',
            headline: 'About Us',
            content: '',
            // Design controls
            backgroundColor: '#ffffff',
            textColor: '#1e293b',
            headingSize: 32,
            headingWeight: 700,
            contentSize: 16,
            lineHeight: 1.6,
            padding: 60,
            contentWidth: 1000,
            accentColor: '#667eea',
            borderStyle: 'left'
        },
        features: {
            enabled: false,
            layout: 'grid',
            items: []
        },
        testimonials: {
            enabled: false,
            layout: 'carousel',
            items: []
        },
        contact: {
            enabled: false,
            layout: 'form',
            email: '',
            phone: '',
            address: '',
            mapEmbed: '',
            // Design controls
            backgroundColor: '#f8f9fa',
            textColor: '#1e293b',
            inputBg: '#ffffff',
            inputBorder: '#e2e8f0',
            focusBorder: '#667eea',
            inputRadius: 8,
            buttonBg: '#667eea',
            buttonText: '#ffffff',
            buttonHover: '#5568d3',
            buttonSize: 'md',
            labelSize: 14,
            labelWeight: 500,
            padding: 60,
            formWidth: 600
        },
        whatsapp: {
            enabled: false,
            number: '',
            message: 'Hi! I\'m interested in your products',
            position: 'bottom-right',
            // Design controls
            bgColor: '#25D366',
            iconColor: '#ffffff',
            size: 60,
            shadow: 'md',
            hoverBg: '#20ba5a',
            hoverEffect: 'scale'
        }
    },
    content: {
        heroHeadline: '',
        heroSubheadline: '',
        features: [],
        benefits: [],
        testimonials: []
    },
    integrations: {
        leanxApiKey: '',
        emailProvider: '',
        emailApiKey: '',
        googleAnalytics: '',
        facebookPixel: ''
    },
    editingProductIndex: null,
    designEngine: null
};

// ============================================
// INDUSTRY TEMPLATES
// ============================================

const industryTemplates = {
    fashion: {
        colors: { primary: '#FF6B9D', secondary: '#C44569' },
        fonts: { heading: 'Playfair Display', body: 'Montserrat' },
        layout: 'masonry',
        sections: ['hero', 'featured-products', 'lookbook', 'testimonials', 'instagram-feed']
    },
    saas: {
        colors: { primary: '#667eea', secondary: '#764ba2' },
        fonts: { heading: 'Inter', body: 'Inter' },
        layout: 'centered',
        sections: ['hero', 'features', 'pricing', 'testimonials', 'cta']
    },
    courses: {
        colors: { primary: '#f093fb', secondary: '#f5576c' },
        fonts: { heading: 'Poppins', body: 'Open Sans' },
        layout: 'sidebar',
        sections: ['hero', 'curriculum', 'instructor', 'testimonials', 'faq']
    },
    beauty: {
        colors: { primary: '#ffeaa7', secondary: '#fd79a8' },
        fonts: { heading: 'Cormorant Garamond', body: 'Lato' },
        layout: 'elegant',
        sections: ['hero', 'ingredients', 'before-after', 'testimonials', 'cta']
    },
    fitness: {
        colors: { primary: '#00b894', secondary: '#00cec9' },
        fonts: { heading: 'Oswald', body: 'Roboto' },
        layout: 'bold',
        sections: ['hero', 'transformation', 'programs', 'testimonials', 'cta']
    },
    food: {
        colors: { primary: '#ff7675', secondary: '#fab1a0' },
        fonts: { heading: 'Pacifico', body: 'Nunito' },
        layout: 'warm',
        sections: ['hero', 'menu', 'gallery', 'reviews', 'order']
    }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    attachEventListeners();
    loadFromLocalStorage();
    
    // Initialize preview panel as visible (active) by default on desktop
    const previewPanel = document.getElementById('previewPanel');
    if (previewPanel && window.innerWidth > 768) {
        previewPanel.classList.add('active');
    }
});

function initializeApp() {
    console.log('🚀 Axtra Product Page Builder V2 - Professional Edition');
    
    // Initialize DesignEngine
    if (typeof DesignEngine !== 'undefined') {
        appState.designEngine = new DesignEngine();
        console.log('✅ DesignEngine initialized with 11 industries, 8 styles, 14 components');
    } else {
        console.warn('⚠️ DesignEngine not loaded. Include design-engine.js before app-v2.js');
    }
    
    // Desktop: preview always visible, no need for active class
    // Mobile: preview hidden by default, toggle with active class
    
    updatePreview();
}

// Section Controls Management
function initializeSectionControls() {
    // Hero Section
    const heroEnabled = document.getElementById('heroEnabled');
    const heroOptions = document.getElementById('heroOptions');
    const heroShowCTA = document.getElementById('heroShowCTA');
    
    heroEnabled.addEventListener('change', (e) => {
        appState.sections.hero.enabled = e.target.checked;
        heroOptions.style.display = e.target.checked ? 'block' : 'none';
        updatePreview();
        saveToLocalStorage();
    });
    
    document.querySelectorAll('input[name="heroLayout"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.sections.hero.layout = e.target.value;
            // Show/hide split image upload based on layout
            const heroSplitImageGroup = document.getElementById('heroSplitImageGroup');
            if (heroSplitImageGroup) {
                heroSplitImageGroup.style.display = e.target.value === 'split' ? 'block' : 'none';
            }
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    heroShowCTA.addEventListener('change', (e) => {
        appState.sections.hero.showCTA = e.target.checked;
        const ctaTextGroup = document.getElementById('ctaTextGroup');
        const heroCtaDesignGroup = document.getElementById('heroCtaDesignGroup');
        if (ctaTextGroup) {
            ctaTextGroup.style.display = e.target.checked ? 'block' : 'none';
        }
        if (heroCtaDesignGroup) {
            heroCtaDesignGroup.style.display = e.target.checked ? 'block' : 'none';
        }
        updatePreview();
        saveToLocalStorage();
    });
    
    // CTA Text customization
    const ctaTextPreset = document.getElementById('ctaTextPreset');
    const ctaTextCustom = document.getElementById('ctaTextCustom');
    const ctaTextGroup = document.getElementById('ctaTextGroup');
    
    if (ctaTextPreset) {
        ctaTextPreset.addEventListener('change', (e) => {
            if (e.target.value === 'custom') {
                ctaTextCustom.style.display = 'block';
                ctaTextCustom.focus();
            } else {
                ctaTextCustom.style.display = 'none';
                appState.sections.hero.ctaText = e.target.value;
                updatePreview();
                saveToLocalStorage();
            }
        });
    }
    
    if (ctaTextCustom) {
        ctaTextCustom.addEventListener('input', debounce((e) => {
            appState.sections.hero.ctaText = e.target.value || 'Shop Now';
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }
    
    // Initialize CTA text group visibility
    if (ctaTextGroup) {
        ctaTextGroup.style.display = appState.sections.hero.showCTA ? 'block' : 'none';
    }
    
    // Initialize CTA design group visibility
    const heroCtaDesignGroup = document.getElementById('heroCtaDesignGroup');
    if (heroCtaDesignGroup) {
        heroCtaDesignGroup.style.display = appState.sections.hero.showCTA ? 'block' : 'none';
    }
    
    // Hero section styling controls
    const heroBackgroundColor = document.getElementById('heroBackgroundColor');
    const heroTextColor = document.getElementById('heroTextColor');
    const heroUseGradient = document.getElementById('heroUseGradient');
    
    if (heroBackgroundColor) {
        heroBackgroundColor.addEventListener('input', debounce((e) => {
            appState.sections.hero.backgroundColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (heroTextColor) {
        heroTextColor.addEventListener('input', debounce((e) => {
            appState.sections.hero.textColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    // Hero Text Color for Gradient Background
    const heroTextColorGradient = document.getElementById('heroTextColorGradient');
    if (heroTextColorGradient) {
        heroTextColorGradient.addEventListener('input', debounce((e) => {
            appState.sections.hero.textColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    // Hero Text Color for Image Background
    const heroTextColorImage = document.getElementById('heroTextColorImage');
    if (heroTextColorImage) {
        heroTextColorImage.addEventListener('input', debounce((e) => {
            appState.sections.hero.textColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (heroUseGradient) {
        heroUseGradient.addEventListener('change', (e) => {
            appState.sections.hero.useGradient = e.target.checked;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Hero background image upload
    const heroBackgroundImage = document.getElementById('heroBackgroundImage');
    const heroImagePreview = document.getElementById('heroImagePreview');
    const heroImagePreviewImg = document.getElementById('heroImagePreviewImg');
    const heroImageRemove = document.getElementById('heroImageRemove');
    const heroImageOverlayGroup = document.getElementById('heroImageOverlayGroup');
    const heroImageOverlay = document.getElementById('heroImageOverlay');
    const heroOverlayValue = document.getElementById('heroOverlayValue');
    
    if (heroBackgroundImage) {
        heroBackgroundImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    appState.sections.hero.backgroundImage = event.target.result;
                    if (heroImagePreviewImg) heroImagePreviewImg.src = event.target.result;
                    if (heroImagePreview) heroImagePreview.style.display = 'block';
                    if (heroImageOverlayGroup) heroImageOverlayGroup.style.display = 'block';
                    updatePreview();
                    saveToLocalStorage();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (heroImageRemove) {
        heroImageRemove.addEventListener('click', () => {
            appState.sections.hero.backgroundImage = null;
            if (heroBackgroundImage) heroBackgroundImage.value = '';
            if (heroImagePreview) heroImagePreview.style.display = 'none';
            if (heroImageOverlayGroup) heroImageOverlayGroup.style.display = 'none';
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Hero Design Controls - Background Type
    const heroBackgroundTypeRadios = document.querySelectorAll('input[name="heroBackgroundType"]');
    const heroSolidBg = document.getElementById('heroSolidBg');
    const heroGradientBg = document.getElementById('heroGradientBg');
    const heroImageBg = document.getElementById('heroImageBg');
    
    heroBackgroundTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const newType = e.target.value;
            appState.sections.hero.backgroundType = newType;
            
            // Clear opposing state properties to prevent conflicts
            if (newType === 'solid') {
                // When switching to solid, clear gradient and image data
                appState.sections.hero.gradientStart = null;
                appState.sections.hero.gradientEnd = null;
                appState.sections.hero.gradientAngle = null;
                appState.sections.hero.backgroundImage = null;
                appState.sections.hero.imageOverlay = null;
            } else if (newType === 'gradient') {
                // When switching to gradient, clear solid and image data
                appState.sections.hero.backgroundColor = null;
                appState.sections.hero.backgroundImage = null;
                appState.sections.hero.imageOverlay = null;
            } else if (newType === 'image') {
                // When switching to image, clear solid and gradient data
                appState.sections.hero.backgroundColor = null;
                appState.sections.hero.gradientStart = null;
                appState.sections.hero.gradientEnd = null;
                appState.sections.hero.gradientAngle = null;
            }
            
            // Show/hide relevant controls
            if (heroSolidBg) heroSolidBg.style.display = newType === 'solid' ? 'grid' : 'none';
            if (heroGradientBg) heroGradientBg.style.display = newType === 'gradient' ? 'block' : 'none';
            if (heroImageBg) heroImageBg.style.display = newType === 'image' ? 'block' : 'none';
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    // Hero Gradient Controls
    const heroGradientStart = document.getElementById('heroGradientStart');
    const heroGradientEnd = document.getElementById('heroGradientEnd');
    const heroGradientAngle = document.getElementById('heroGradientAngle');
    const heroGradientAngleValue = document.getElementById('heroGradientAngleValue');
    
    if (heroGradientStart) {
        heroGradientStart.addEventListener('input', debounce((e) => {
            appState.sections.hero.gradientStart = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (heroGradientEnd) {
        heroGradientEnd.addEventListener('input', debounce((e) => {
            appState.sections.hero.gradientEnd = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (heroGradientAngle) {
        heroGradientAngle.addEventListener('input', (e) => {
            appState.sections.hero.gradientAngle = parseInt(e.target.value);
            if (heroGradientAngleValue) heroGradientAngleValue.textContent = e.target.value + '°';
            updatePreview();
        });
        heroGradientAngle.addEventListener('change', () => saveToLocalStorage());
    }
    
    // Hero Typography Controls
    const heroHeadlineSize = document.getElementById('heroHeadlineSize');
    const heroFontWeight = document.getElementById('heroFontWeight');
    
    if (heroHeadlineSize) {
        heroHeadlineSize.addEventListener('change', (e) => {
            appState.sections.hero.headlineSize = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (heroFontWeight) {
        heroFontWeight.addEventListener('change', (e) => {
            appState.sections.hero.fontWeight = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Hero CTA Button Design
    const heroCtaBackground = document.getElementById('heroCtaBackground');
    const heroCtaTextColor = document.getElementById('heroCtaTextColor');
    const heroCtaHoverBg = document.getElementById('heroCtaHoverBg');
    const heroCtaBorderRadius = document.getElementById('heroCtaBorderRadius');
    
    if (heroCtaBackground) {
        heroCtaBackground.addEventListener('input', debounce((e) => {
            appState.sections.hero.ctaBackground = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (heroCtaTextColor) {
        heroCtaTextColor.addEventListener('input', debounce((e) => {
            appState.sections.hero.ctaTextColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (heroCtaHoverBg) {
        heroCtaHoverBg.addEventListener('input', debounce((e) => {
            appState.sections.hero.ctaHoverBg = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (heroCtaBorderRadius) {
        heroCtaBorderRadius.addEventListener('change', (e) => {
            appState.sections.hero.ctaBorderRadius = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Hero Spacing Controls
    const heroPadding = document.getElementById('heroPadding');
    const heroHeight = document.getElementById('heroHeight');
    const heroContentWidth = document.getElementById('heroContentWidth');
    
    if (heroPadding) {
        heroPadding.addEventListener('input', (e) => {
            appState.sections.hero.padding = parseInt(e.target.value);
            updatePreview();
        });
        
        heroPadding.addEventListener('change', () => {
            saveToLocalStorage();
        });
    }
    
    if (heroHeight) {
        heroHeight.addEventListener('change', (e) => {
            const value = e.target.value;
            // Store as-is: either a number string like "600" or "100vh"
            appState.sections.hero.height = value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (heroContentWidth) {
        heroContentWidth.addEventListener('change', (e) => {
            const value = e.target.value;
            // Store as-is: either a number string like "1000" or "100%"
            appState.sections.hero.contentWidth = value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (heroImageOverlay) {
        heroImageOverlay.addEventListener('input', (e) => {
            appState.sections.hero.imageOverlay = parseInt(e.target.value);
            if (heroOverlayValue) heroOverlayValue.textContent = e.target.value + '%';
            updatePreview();
        });
        
        heroImageOverlay.addEventListener('change', () => {
            saveToLocalStorage();
        });
    }
    
    // Hero Split Layout Image Upload
    const heroSplitImage = document.getElementById('heroSplitImage');
    const heroSplitImagePreview = document.getElementById('heroSplitImagePreview');
    const heroSplitImagePreviewImg = document.getElementById('heroSplitImagePreviewImg');
    const heroSplitImageRemove = document.getElementById('heroSplitImageRemove');
    const heroSplitImageGroup = document.getElementById('heroSplitImageGroup');
    
    if (heroSplitImage) {
        heroSplitImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    appState.sections.hero.splitImage = event.target.result;
                    if (heroSplitImagePreviewImg) heroSplitImagePreviewImg.src = event.target.result;
                    if (heroSplitImagePreview) heroSplitImagePreview.style.display = 'block';
                    updatePreview();
                    saveToLocalStorage();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (heroSplitImageRemove) {
        heroSplitImageRemove.addEventListener('click', () => {
            appState.sections.hero.splitImage = null;
            if (heroSplitImage) heroSplitImage.value = '';
            if (heroSplitImagePreview) heroSplitImagePreview.style.display = 'none';
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Initialize split image group visibility based on current layout
    if (heroSplitImageGroup) {
        heroSplitImageGroup.style.display = appState.sections.hero.layout === 'split' ? 'block' : 'none';
    }
    
    // Products Section
    const productsEnabled = document.getElementById('productsEnabled');
    const productsOptions = document.getElementById('productsOptions');
    const productsHeadline = document.getElementById('productsHeadline');
    const productsSubheadline = document.getElementById('productsSubheadline');
    const productsShowDescription = document.getElementById('productsShowDescription');
    const productsShowPricing = document.getElementById('productsShowPricing');
    
    if (!productsShowDescription || !productsShowPricing) {
        console.error('Product description/pricing toggles not found');
    }
    
    productsEnabled.addEventListener('change', (e) => {
        appState.sections.products.enabled = e.target.checked;
        productsOptions.style.display = e.target.checked ? 'block' : 'none';
        updatePreview();
        saveToLocalStorage();
    });
    
    if (productsHeadline) {
        productsHeadline.addEventListener('input', debounce(() => {
            appState.sections.products.headline = productsHeadline.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }
    
    if (productsSubheadline) {
        productsSubheadline.addEventListener('input', debounce(() => {
            appState.sections.products.subheadline = productsSubheadline.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }
    
    document.querySelectorAll('input[name="productsLayout"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.sections.products.layout = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    const productsColumns = document.getElementById('productsColumns');
    if (productsColumns) {
        productsColumns.addEventListener('input', (e) => {
            let value = parseInt(e.target.value);
            // Clamp between 1-6
            if (value < 1) value = 1;
            if (value > 6) value = 6;
            appState.sections.products.columns = value;
            updatePreview();
        });
        
        productsColumns.addEventListener('change', () => {
            saveToLocalStorage();
        });
    }
    
    productsShowDescription.addEventListener('change', (e) => {
        appState.sections.products.showDescription = e.target.checked;
        console.log('Show description toggled:', e.target.checked);
        updatePreview();
        saveToLocalStorage();
    });
    
    productsShowPricing.addEventListener('change', (e) => {
        appState.sections.products.showPricing = e.target.checked;
        updatePreview();
        saveToLocalStorage();
    });
    
    // Products Design Controls
    const productsSectionBg = document.getElementById('productsSectionBg');
    const productsCardBg = document.getElementById('productsCardBg');
    const productsTextColor = document.getElementById('productsTextColor');
    const productsCardRadius = document.getElementById('productsCardRadius');
    const productsCardShadow = document.getElementById('productsCardShadow');
    const productsHoverEffect = document.getElementById('productsHoverEffect');
    const productsHoverBorder = document.getElementById('productsHoverBorder');
    const productsTitleSize = document.getElementById('productsTitleSize');
    const productsTitleWeight = document.getElementById('productsTitleWeight');
    const productsPriceColor = document.getElementById('productsPriceColor');
    const productsPriceSize = document.getElementById('productsPriceSize');
    const productsCardPadding = document.getElementById('productsCardPadding');
    const productsGap = document.getElementById('productsGap');
    
    if (productsSectionBg) {
        productsSectionBg.addEventListener('input', debounce((e) => {
            appState.sections.products.sectionBg = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (productsCardBg) {
        productsCardBg.addEventListener('input', debounce((e) => {
            appState.sections.products.cardBg = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (productsTextColor) {
        productsTextColor.addEventListener('input', debounce((e) => {
            appState.sections.products.textColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (productsCardRadius) {
        productsCardRadius.addEventListener('change', (e) => {
            appState.sections.products.cardRadius = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (productsCardShadow) {
        productsCardShadow.addEventListener('change', (e) => {
            appState.sections.products.cardShadow = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (productsHoverEffect) {
        productsHoverEffect.addEventListener('change', (e) => {
            appState.sections.products.hoverEffect = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (productsHoverBorder) {
        productsHoverBorder.addEventListener('input', debounce((e) => {
            appState.sections.products.hoverBorder = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (productsTitleSize) {
        productsTitleSize.addEventListener('change', (e) => {
            appState.sections.products.titleSize = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (productsTitleWeight) {
        productsTitleWeight.addEventListener('change', (e) => {
            appState.sections.products.titleWeight = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (productsPriceColor) {
        productsPriceColor.addEventListener('input', debounce((e) => {
            appState.sections.products.priceColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (productsPriceSize) {
        productsPriceSize.addEventListener('change', (e) => {
            appState.sections.products.priceSize = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (productsCardPadding) {
        productsCardPadding.addEventListener('change', (e) => {
            appState.sections.products.cardPadding = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (productsGap) {
        productsGap.addEventListener('change', (e) => {
            appState.sections.products.gap = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    const productsHeaderSpacing = document.getElementById('productsHeaderSpacing');
    const productsSectionSpacing = document.getElementById('productsSectionSpacing');
    
    if (productsHeaderSpacing) {
        productsHeaderSpacing.addEventListener('change', (e) => {
            appState.sections.products.headerSpacing = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (productsSectionSpacing) {
        productsSectionSpacing.addEventListener('change', (e) => {
            appState.sections.products.sectionSpacing = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // About Section
    const aboutEnabled = document.getElementById('aboutEnabled');
    const aboutOptions = document.getElementById('aboutOptions');
    
    aboutEnabled.addEventListener('change', (e) => {
        appState.sections.about.enabled = e.target.checked;
        aboutOptions.style.display = e.target.checked ? 'block' : 'none';
        updatePreview();
        saveToLocalStorage();
    });
    
    document.querySelectorAll('input[name="aboutLayout"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.sections.about.layout = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    // Contact Section
    const contactEnabled = document.getElementById('contactEnabled');
    const contactOptions = document.getElementById('contactOptions');
    
    contactEnabled.addEventListener('change', (e) => {
        appState.sections.contact.enabled = e.target.checked;
        contactOptions.style.display = e.target.checked ? 'block' : 'none';
        updatePreview();
        saveToLocalStorage();
    });
    
    document.querySelectorAll('input[name="contactLayout"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.sections.contact.layout = e.target.value;
            // Show/hide map embed field based on layout
            const mapLinkGroup = document.getElementById('mapLinkGroup');
            const contactFormStyleGroup = document.getElementById('contactFormStyleGroup');
            const contactButtonGroup = document.getElementById('contactButtonGroup');
            
            if (mapLinkGroup) {
                mapLinkGroup.style.display = e.target.value === 'map' ? 'block' : 'none';
            }
            // Show form styling and button styling only for 'form' layout
            if (contactFormStyleGroup) {
                contactFormStyleGroup.style.display = e.target.value === 'form' ? 'block' : 'none';
            }
            if (contactButtonGroup) {
                contactButtonGroup.style.display = e.target.value === 'form' ? 'block' : 'none';
            }
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    // WhatsApp Section
    const whatsappEnabled = document.getElementById('whatsappEnabled');
    const whatsappOptions = document.getElementById('whatsappOptions');
    
    if (whatsappEnabled) {
        whatsappEnabled.addEventListener('change', (e) => {
            appState.sections.whatsapp.enabled = e.target.checked;
            whatsappOptions.style.display = e.target.checked ? 'block' : 'none';
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    document.querySelectorAll('input[name="whatsappPosition"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.sections.whatsapp.position = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    // Initialize visibility based on enabled state
    heroOptions.style.display = appState.sections.hero.enabled ? 'block' : 'none';
    productsOptions.style.display = appState.sections.products.enabled ? 'block' : 'none';
    aboutOptions.style.display = appState.sections.about.enabled ? 'block' : 'none';
    contactOptions.style.display = appState.sections.contact.enabled ? 'block' : 'none';
    if (whatsappOptions) {
        whatsappOptions.style.display = appState.sections.whatsapp.enabled ? 'block' : 'none';
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

function attachEventListeners() {
    // Step navigation
    document.querySelectorAll('[data-next]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nextStep = parseInt(e.target.dataset.next);
            goToStep(nextStep);
        });
    });
    
    document.querySelectorAll('[data-prev]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const prevStep = parseInt(e.target.dataset.prev);
            goToStep(prevStep);
        });
    });
    
    // Product modal
    document.getElementById('addProductBtn').addEventListener('click', openProductModal);
    document.getElementById('saveProductBtn').addEventListener('click', saveProduct);
    
    // Section Controls
    initializeSectionControls();
    
    // Device toggle
    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const device = btn.dataset.device;
            document.querySelector('.preview-viewport').dataset.device = device;
        });
    });
    
    // Preview toggle (mobile)
    const previewToggleBtn = document.getElementById('previewToggleBtn');
    const previewCloseBtn = document.getElementById('previewCloseBtn');
    
    // Toggle button behavior - works for both mobile and desktop
    if (previewToggleBtn) {
        previewToggleBtn.addEventListener('click', () => {
            const previewPanel = document.getElementById('previewPanel');
            previewPanel.classList.toggle('active');
            const isActive = previewPanel.classList.contains('active');
            
            previewToggleBtn.querySelector('.toggle-text').textContent = isActive ? 'Hide Preview' : 'Show Preview';
            
            // Update mobile menu text if exists
            const mobileToggleText = document.querySelector('.mobile-toggle-text');
            if (mobileToggleText) {
                mobileToggleText.textContent = isActive ? 'Hide Preview' : 'Show Preview';
            }
        });
    }
    
    // Close button - only for mobile overlay
    if (previewCloseBtn) {
        previewCloseBtn.addEventListener('click', () => {
            const previewPanel = document.getElementById('previewPanel');
            previewPanel.classList.remove('active');
            
            if (previewToggleBtn) {
                previewToggleBtn.querySelector('.toggle-text').textContent = 'Show Preview';
            }
            const mobileToggleText = document.querySelector('.mobile-toggle-text');
            if (mobileToggleText) {
                mobileToggleText.textContent = 'Show Preview';
            }
        });
    }
    
    // Industry selection
    document.querySelectorAll('input[name="industry"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.design.industry = e.target.value;
            applyIndustryTemplate(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    // Design style selection
    document.querySelectorAll('input[name="designStyle"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.design.style = e.target.value;
            console.log(`🎨 Style changed to: ${e.target.value}`);
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    // Accent color input (if it exists from old design system)
    const accentColorInput = document.getElementById('accentColor');
    if (accentColorInput) {
        accentColorInput.addEventListener('change', (e) => {
            appState.design.accentColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Advanced design options toggle
    const toggleAdvancedBtn = document.getElementById('toggleAdvancedDesign');
    if (toggleAdvancedBtn) {
        toggleAdvancedBtn.addEventListener('click', () => {
            const advancedOptions = document.getElementById('advancedDesignOptions');
            const isVisible = advancedOptions.style.display !== 'none';
            advancedOptions.style.display = isVisible ? 'none' : 'block';
            toggleAdvancedBtn.textContent = isVisible ? 'Customize Layout & Effects' : 'Hide Advanced Options';
        });
    }
    
    // Layout options (spacing, borderRadius, shadows, animations)
    ['spacing', 'borderRadius', 'shadows', 'animations'].forEach(option => {
        document.querySelectorAll(`input[name="${option}"]`).forEach(radio => {
            radio.addEventListener('change', (e) => {
                appState.design.layoutOptions[option] = e.target.value;
                console.log(`⚙️ Layout option changed: ${option} = ${e.target.value}`);
                updatePreview();
                saveToLocalStorage();
            });
        });
    });
    
    // Content inputs with debounce
    ['heroHeadline', 'heroSubheadline'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', debounce(() => {
                appState.content[id] = element.value;
                // Also update sections state
                if (id === 'heroHeadline') appState.sections.hero.headline = element.value;
                if (id === 'heroSubheadline') appState.sections.hero.subheadline = element.value;
                updatePreview();
                saveToLocalStorage();
            }, 500));
        }
    });
    
    // About section content
    const aboutHeadline = document.getElementById('aboutHeadline');
    const aboutContent = document.getElementById('aboutContent');
    const aboutImage = document.getElementById('aboutImage');
    const aboutImagePreview = document.getElementById('aboutImagePreview');
    const aboutImagePreviewImg = document.getElementById('aboutImagePreviewImg');
    const aboutImageRemove = document.getElementById('aboutImageRemove');
    
    if (aboutHeadline) {
        aboutHeadline.addEventListener('input', debounce(() => {
            appState.sections.about.headline = aboutHeadline.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }
    if (aboutContent) {
        aboutContent.addEventListener('input', debounce(() => {
            appState.sections.about.content = aboutContent.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }
    if (aboutImage) {
        aboutImage.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    appState.sections.about.image = event.target.result;
                    if (aboutImagePreviewImg) aboutImagePreviewImg.src = event.target.result;
                    if (aboutImagePreview) aboutImagePreview.style.display = 'block';
                    updatePreview();
                    saveToLocalStorage();
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (aboutImageRemove) {
        aboutImageRemove.addEventListener('click', () => {
            appState.sections.about.image = null;
            if (aboutImage) aboutImage.value = '';
            if (aboutImagePreview) aboutImagePreview.style.display = 'none';
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // About Design Controls
    const aboutBackgroundColor = document.getElementById('aboutBackgroundColor');
    const aboutTextColor = document.getElementById('aboutTextColor');
    const aboutHeadingSize = document.getElementById('aboutHeadingSize');
    const aboutHeadingWeight = document.getElementById('aboutHeadingWeight');
    const aboutContentSize = document.getElementById('aboutContentSize');
    const aboutLineHeight = document.getElementById('aboutLineHeight');
    const aboutPadding = document.getElementById('aboutPadding');
    const aboutContentWidth = document.getElementById('aboutContentWidth');
    const aboutAccentColor = document.getElementById('aboutAccentColor');
    const aboutBorderStyle = document.getElementById('aboutBorderStyle');
    
    if (aboutBackgroundColor) {
        aboutBackgroundColor.addEventListener('input', debounce((e) => {
            appState.sections.about.backgroundColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (aboutTextColor) {
        aboutTextColor.addEventListener('input', debounce((e) => {
            appState.sections.about.textColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (aboutHeadingSize) {
        aboutHeadingSize.addEventListener('change', (e) => {
            appState.sections.about.headingSize = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (aboutHeadingWeight) {
        aboutHeadingWeight.addEventListener('change', (e) => {
            appState.sections.about.headingWeight = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (aboutContentSize) {
        aboutContentSize.addEventListener('change', (e) => {
            appState.sections.about.contentSize = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (aboutLineHeight) {
        aboutLineHeight.addEventListener('change', (e) => {
            appState.sections.about.lineHeight = parseFloat(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (aboutPadding) {
        aboutPadding.addEventListener('change', (e) => {
            appState.sections.about.padding = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (aboutContentWidth) {
        aboutContentWidth.addEventListener('change', (e) => {
            const value = e.target.value;
            // Store as-is to support future percentage values
            appState.sections.about.contentWidth = value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    if (aboutAccentColor) {
        aboutAccentColor.addEventListener('input', debounce((e) => {
            appState.sections.about.accentColor = e.target.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    
    if (aboutBorderStyle) {
        aboutBorderStyle.addEventListener('change', (e) => {
            appState.sections.about.borderStyle = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Contact section content
    const contactEmail = document.getElementById('contactEmail');
    const contactPhone = document.getElementById('contactPhone');
    const contactAddress = document.getElementById('contactAddress');
    if (contactEmail) {
        contactEmail.addEventListener('input', debounce(() => {
            appState.sections.contact.email = contactEmail.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }
    if (contactPhone) {
        contactPhone.addEventListener('input', debounce(() => {
            appState.sections.contact.phone = contactPhone.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }
    if (contactAddress) {
        contactAddress.addEventListener('input', debounce(() => {
            appState.sections.contact.address = contactAddress.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }
    
    // Contact map embed
    const contactMapEmbed = document.getElementById('contactMapEmbed');
    if (contactMapEmbed) {
        contactMapEmbed.addEventListener('input', debounce(() => {
            appState.sections.contact.mapEmbed = contactMapEmbed.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }

    // Contact Design Controls
    const contactBackgroundColor = document.getElementById('contactBackgroundColor');
    const contactTextColor = document.getElementById('contactTextColor');
    const contactInputBg = document.getElementById('contactInputBg');
    const contactInputBorder = document.getElementById('contactInputBorder');
    const contactFocusBorder = document.getElementById('contactFocusBorder');
    const contactInputRadius = document.getElementById('contactInputRadius');
    const contactButtonBg = document.getElementById('contactButtonBg');
    const contactButtonText = document.getElementById('contactButtonText');
    const contactButtonHover = document.getElementById('contactButtonHover');
    const contactButtonSize = document.getElementById('contactButtonSize');
    const contactLabelSize = document.getElementById('contactLabelSize');
    const contactLabelWeight = document.getElementById('contactLabelWeight');
    const contactPadding = document.getElementById('contactPadding');
    const contactFormWidth = document.getElementById('contactFormWidth');

    if (contactBackgroundColor) {
        contactBackgroundColor.addEventListener('input', debounce(() => {
            appState.sections.contact.backgroundColor = contactBackgroundColor.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (contactTextColor) {
        contactTextColor.addEventListener('input', debounce(() => {
            appState.sections.contact.textColor = contactTextColor.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (contactInputBg) {
        contactInputBg.addEventListener('input', debounce(() => {
            appState.sections.contact.inputBg = contactInputBg.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (contactInputBorder) {
        contactInputBorder.addEventListener('input', debounce(() => {
            appState.sections.contact.inputBorder = contactInputBorder.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (contactFocusBorder) {
        contactFocusBorder.addEventListener('input', debounce(() => {
            appState.sections.contact.focusBorder = contactFocusBorder.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (contactInputRadius) {
        contactInputRadius.addEventListener('change', () => {
            appState.sections.contact.inputRadius = parseInt(contactInputRadius.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    if (contactButtonBg) {
        contactButtonBg.addEventListener('input', debounce(() => {
            appState.sections.contact.buttonBg = contactButtonBg.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (contactButtonText) {
        contactButtonText.addEventListener('input', debounce(() => {
            appState.sections.contact.buttonText = contactButtonText.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (contactButtonHover) {
        contactButtonHover.addEventListener('input', debounce(() => {
            appState.sections.contact.buttonHover = contactButtonHover.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (contactButtonSize) {
        contactButtonSize.addEventListener('change', () => {
            appState.sections.contact.buttonSize = contactButtonSize.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    if (contactLabelSize) {
        contactLabelSize.addEventListener('change', () => {
            appState.sections.contact.labelSize = parseInt(contactLabelSize.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    if (contactLabelWeight) {
        contactLabelWeight.addEventListener('change', () => {
            appState.sections.contact.labelWeight = parseInt(contactLabelWeight.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    if (contactPadding) {
        contactPadding.addEventListener('change', () => {
            appState.sections.contact.padding = parseInt(contactPadding.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    if (contactFormWidth) {
        contactFormWidth.addEventListener('change', () => {
            const value = contactFormWidth.value;
            // Store as-is to support future percentage values
            appState.sections.contact.formWidth = value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // WhatsApp inputs
    const whatsappNumber = document.getElementById('whatsappNumber');
    const whatsappMessage = document.getElementById('whatsappMessage');
    if (whatsappNumber) {
        whatsappNumber.addEventListener('input', debounce(() => {
            appState.sections.whatsapp.number = whatsappNumber.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }
    if (whatsappMessage) {
        whatsappMessage.addEventListener('input', debounce(() => {
            appState.sections.whatsapp.message = whatsappMessage.value;
            updatePreview();
            saveToLocalStorage();
        }, 500));
    }

    // WhatsApp Design Controls
    const whatsappBgColor = document.getElementById('whatsappBgColor');
    const whatsappIconColor = document.getElementById('whatsappIconColor');
    const whatsappSize = document.getElementById('whatsappSize');
    const whatsappShadow = document.getElementById('whatsappShadow');
    const whatsappHoverBg = document.getElementById('whatsappHoverBg');
    const whatsappHoverEffect = document.getElementById('whatsappHoverEffect');

    if (whatsappBgColor) {
        whatsappBgColor.addEventListener('input', debounce(() => {
            appState.sections.whatsapp.bgColor = whatsappBgColor.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (whatsappIconColor) {
        whatsappIconColor.addEventListener('input', debounce(() => {
            appState.sections.whatsapp.iconColor = whatsappIconColor.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (whatsappSize) {
        whatsappSize.addEventListener('change', () => {
            appState.sections.whatsapp.size = parseInt(whatsappSize.value);
            updatePreview();
            saveToLocalStorage();
        });
    }
    if (whatsappShadow) {
        whatsappShadow.addEventListener('change', () => {
            appState.sections.whatsapp.shadow = whatsappShadow.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    if (whatsappHoverBg) {
        whatsappHoverBg.addEventListener('input', debounce(() => {
            appState.sections.whatsapp.hoverBg = whatsappHoverBg.value;
            updatePreview();
            saveToLocalStorage();
        }, 300));
    }
    if (whatsappHoverEffect) {
        whatsappHoverEffect.addEventListener('change', () => {
            appState.sections.whatsapp.hoverEffect = whatsappHoverEffect.value;
            updatePreview();
            saveToLocalStorage();
        });
    }
    
    // Generate button
    document.getElementById('generatePageBtn').addEventListener('click', generatePage);
    
    // Clear Data button
    const clearDataBtn = document.getElementById('clearDataBtn');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all data and start fresh? This cannot be undone.')) {
                localStorage.removeItem('axtra_builder_v2');
                location.reload();
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
        
        // Mobile menu actions
        document.getElementById('mobilePreviewToggle')?.addEventListener('click', () => {
            document.getElementById('previewToggleBtn')?.click();
            mobileMenu.classList.remove('active');
            // Update mobile menu text
            const isVisible = document.getElementById('livePreview')?.parentElement?.classList.contains('active');
            document.querySelector('.mobile-toggle-text').textContent = isVisible ? 'Show Preview' : 'Hide Preview';
        });
        
        document.getElementById('mobileSaveDraft')?.addEventListener('click', () => {
            document.getElementById('saveDraftBtn')?.click();
            mobileMenu.classList.remove('active');
        });
        
        document.getElementById('mobileClearData')?.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            if (confirm('Are you sure you want to clear all data and start fresh? This cannot be undone.')) {
                localStorage.removeItem('axtra_builder_v2');
                location.reload();
            }
        });
    }
    
    // Handle window resize - desktop preview always visible, mobile is overlay
    window.addEventListener('resize', debounce(() => {
        const previewPanel = document.getElementById('previewPanel');
        if (previewPanel && window.innerWidth <= 768) {
            // On mobile, remove active class to hide overlay
            previewPanel.classList.remove('active');
        }
        // On desktop (> 768px), preview is always visible via CSS flex layout
        // No need to add/remove active class
    }, 300));
    
    // Variant toggles
    const hasVariantsCheckbox = document.getElementById('hasVariants');
    if (hasVariantsCheckbox) {
        hasVariantsCheckbox.addEventListener('change', (e) => {
            document.getElementById('variantsSection').style.display = e.target.checked ? 'block' : 'none';
            document.getElementById('inventoryFields').style.display = e.target.checked ? 'none' : 'flex';
        });
    }
    
    const trackInventoryCheckbox = document.getElementById('trackInventory');
    if (trackInventoryCheckbox) {
        trackInventoryCheckbox.addEventListener('change', (e) => {
            document.getElementById('inventoryFields').style.display = e.target.checked ? 'flex' : 'none';
        });
    }
    
    // Product type change
    const productTypeSelect = document.getElementById('productType');
    if (productTypeSelect) {
        productTypeSelect.addEventListener('change', (e) => {
            const shippingSection = document.getElementById('shippingSection');
            shippingSection.style.display = e.target.value === 'physical' ? 'block' : 'none';
        });
    }
    
    // Multiple image preview
    const productImagesInput = document.getElementById('productImages');
    if (productImagesInput) {
        productImagesInput.addEventListener('change', handleMultipleImageUpload);
    }
}

// ============================================
// VARIANT MANAGEMENT
// ============================================

let variantOptionsData = []; // Store variant options like [{name: "Size", values: ["S","M","L"]}]

function addVariantOption() {
    const container = document.getElementById('variantOptions');
    const optionIndex = variantOptionsData.length;
    
    const optionDiv = document.createElement('div');
    optionDiv.className = 'variant-option-row';
    optionDiv.dataset.index = optionIndex;
    optionDiv.innerHTML = `
        <input type="text" class="form-input" placeholder="Option name (e.g., Size, Color)" data-option-index="${optionIndex}" onchange="updateVariantOptionName(${optionIndex}, this.value)">
        <input type="text" class="form-input" placeholder="Values (separate with commas: S, M, L)" data-option-index="${optionIndex}" onchange="updateVariantOptionValues(${optionIndex}, this.value)">
        <button class="btn-icon" onclick="removeVariantOption(${optionIndex})">×</button>
    `;
    
    container.appendChild(optionDiv);
    variantOptionsData.push({ name: '', values: [] });
}

function updateVariantOptionName(index, name) {
    variantOptionsData[index].name = name;
    generateVariantCombinations();
}

function updateVariantOptionValues(index, valuesString) {
    const values = valuesString.split(',').map(v => v.trim()).filter(v => v);
    variantOptionsData[index].values = values;
    generateVariantCombinations();
}

function removeVariantOption(index) {
    const row = document.querySelector(`.variant-option-row[data-index="${index}"]`);
    if (row) row.remove();
    variantOptionsData.splice(index, 1);
    generateVariantCombinations();
}

function generateVariantCombinations() {
    const container = document.getElementById('variantCombinations');
    
    // Filter out empty options
    const validOptions = variantOptionsData.filter(opt => opt.name && opt.values.length > 0);
    
    if (validOptions.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    // Generate all combinations
    const combinations = cartesianProduct(validOptions.map(opt => opt.values));
    
    let html = `
        <label style="margin-bottom: 8px; display: block;"><strong>Variant Combinations</strong></label>
        <table class="variant-combinations-table">
            <thead>
                <tr>
                    ${validOptions.map(opt => `<th>${opt.name}</th>`).join('')}
                    <th>Price (RM)</th>
                    <th>Stock</th>
                    <th>SKU</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    combinations.forEach((combo, index) => {
        html += `<tr data-combo-index="${index}">`;
        combo.forEach(value => {
            html += `<td>${value}</td>`;
        });
        html += `
            <td><input type="number" step="0.01" placeholder="0.00" data-combo-field="price" data-combo-index="${index}"></td>
            <td><input type="number" placeholder="0" data-combo-field="stock" data-combo-index="${index}"></td>
            <td><input type="text" placeholder="SKU" data-combo-field="sku" data-combo-index="${index}"></td>
        </tr>`;
    });
    
    html += `</tbody></table>`;
    container.innerHTML = html;
}

function cartesianProduct(arrays) {
    return arrays.reduce((acc, array) => {
        return acc.flatMap(x => array.map(y => [...(Array.isArray(x) ? x : [x]), y]));
    }, [[]]);
}

// Make functions global
window.addVariantOption = addVariantOption;
window.updateVariantOptionName = updateVariantOptionName;
window.updateVariantOptionValues = updateVariantOptionValues;
window.removeVariantOption = removeVariantOption;

// ============================================
// IMAGE HANDLING
// ============================================

function handleMultipleImageUpload(event) {
    const files = event.target.files;
    const container = document.getElementById('imagePreviewContainer');
    container.innerHTML = '';
    
    Array.from(files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'image-preview-thumb';
            img.title = index === 0 ? 'Main image' : `Image ${index + 1}`;
            container.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

// ============================================
// STEP NAVIGATION
// ============================================

function goToStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step-content').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show target step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Update step indicator
    document.querySelectorAll('.step').forEach(step => {
        const stepNum = parseInt(step.dataset.step);
        step.classList.remove('active', 'completed');
        
        if (stepNum === stepNumber) {
            step.classList.add('active');
        } else if (stepNum < stepNumber) {
            step.classList.add('completed');
        }
    });
    
    appState.currentStep = stepNumber;
    
    // Scroll to top
    document.querySelector('.form-panel').scrollTop = 0;
}

// ============================================
// PRODUCT MANAGEMENT
// ============================================

function openProductModal(index = null) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    
    // Handle case where it's called from a button click event
    if (index && typeof index === 'object' && index.target) {
        index = null;
    }
    
    if (index !== null && typeof index === 'number') {
        // Edit mode - TODO: Implement edit functionality
        appState.editingProductIndex = index;
        modalTitle.textContent = 'Edit Product';
        
        const product = appState.products[index];
        document.getElementById('productName').value = product.name || '';
        document.getElementById('productType').value = product.type || 'physical';
        document.getElementById('productPrice').value = product.price || '';
        document.getElementById('productComparePrice').value = product.comparePrice || '';
        document.getElementById('productDescription').value = product.description || '';
        document.getElementById('productStock').value = product.stock || '';
        document.getElementById('productSKU').value = product.sku || '';
        document.getElementById('productWeight').value = product.weight || '';
        document.getElementById('productDimensions').value = product.dimensions || '';
        document.getElementById('trackInventory').checked = product.trackInventory !== false;
        document.getElementById('hasVariants').checked = product.hasVariants || false;
        
        // Show/hide sections based on product data
        document.getElementById('variantsSection').style.display = product.hasVariants ? 'block' : 'none';
        document.getElementById('inventoryFields').style.display = product.hasVariants ? 'none' : 'flex';
        document.getElementById('shippingSection').style.display = product.type === 'physical' ? 'block' : 'none';
    } else {
        // Add mode
        appState.editingProductIndex = null;
        modalTitle.textContent = 'Add Product';
        
        // Clear form
        document.getElementById('productName').value = '';
        document.getElementById('productType').value = 'physical';
        document.getElementById('productPrice').value = '';
        document.getElementById('productComparePrice').value = '';
        document.getElementById('productDescription').value = '';
        document.getElementById('productStock').value = '';
        document.getElementById('productSKU').value = '';
        document.getElementById('productWeight').value = '';
        document.getElementById('productDimensions').value = '';
        document.getElementById('trackInventory').checked = true;
        document.getElementById('hasVariants').checked = false;
        document.getElementById('variantsSection').style.display = 'none';
        document.getElementById('inventoryFields').style.display = 'flex';
        document.getElementById('shippingSection').style.display = 'block';
        document.getElementById('imagePreviewContainer').innerHTML = '';
        
        // Clear variant options
        variantOptionsData = [];
        document.getElementById('variantOptions').innerHTML = '';
        document.getElementById('variantCombinations').innerHTML = '';
        
        // Clear file input
        const imagesInput = document.getElementById('productImages');
        if (imagesInput) imagesInput.value = '';
    }
    
    modal.classList.add('active');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    appState.editingProductIndex = null;
}

function saveProduct() {
    const name = document.getElementById('productName').value;
    const type = document.getElementById('productType').value;
    const price = document.getElementById('productPrice').value;
    const comparePrice = document.getElementById('productComparePrice').value;
    const description = document.getElementById('productDescription').value;
    const imagesInput = document.getElementById('productImages');
    const trackInventory = document.getElementById('trackInventory').checked;
    const stock = document.getElementById('productStock').value;
    const sku = document.getElementById('productSKU').value;
    const hasVariants = document.getElementById('hasVariants').checked;
    const weight = document.getElementById('productWeight').value;
    const dimensions = document.getElementById('productDimensions').value;
    
    if (!name || !price) {
        alert('Please fill in product name and price');
        return;
    }
    
    const product = {
        name,
        type,
        price: parseFloat(price),
        comparePrice: comparePrice ? parseFloat(comparePrice) : null,
        currency: 'MYR', // Fixed to Malaysian Ringgit
        description,
        images: [],
        trackInventory,
        stock: trackInventory && !hasVariants ? parseInt(stock) || 0 : null,
        sku: !hasVariants ? sku : null,
        hasVariants,
        variants: [],
        weight: weight ? parseFloat(weight) : null,
        dimensions: dimensions || null,
        id: appState.editingProductIndex !== null ? appState.products[appState.editingProductIndex].id : Date.now()
    };
    
    // Handle variants
    if (hasVariants) {
        const validOptions = variantOptionsData.filter(opt => opt.name && opt.values.length > 0);
        product.variantOptions = validOptions;
        
        // Collect variant data from table
        const variantRows = document.querySelectorAll('.variant-combinations-table tbody tr');
        variantRows.forEach((row, index) => {
            const combo = [];
            row.querySelectorAll('td:not(:has(input))').forEach(td => {
                combo.push(td.textContent);
            });
            
            const variantPrice = row.querySelector('input[data-combo-field="price"]').value;
            const variantStock = row.querySelector('input[data-combo-field="stock"]').value;
            const variantSku = row.querySelector('input[data-combo-field="sku"]').value;
            
            product.variants.push({
                combination: combo,
                price: variantPrice ? parseFloat(variantPrice) : product.price,
                stock: variantStock ? parseInt(variantStock) : 0,
                sku: variantSku || `${sku || 'VAR'}-${index + 1}`
            });
        });
    }
    
    // Handle multiple images
    if (imagesInput.files && imagesInput.files.length > 0) {
        let loadedImages = 0;
        const totalImages = imagesInput.files.length;
        
        Array.from(imagesInput.files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                product.images.push(e.target.result);
                loadedImages++;
                
                if (loadedImages === totalImages) {
                    finishSavingProduct(product);
                }
            };
            reader.readAsDataURL(file);
        });
    } else {
        // Keep existing images if editing
        if (appState.editingProductIndex !== null && appState.products[appState.editingProductIndex].images) {
            product.images = appState.products[appState.editingProductIndex].images;
        }
        finishSavingProduct(product);
    }
}

function finishSavingProduct(product) {
    if (appState.editingProductIndex !== null) {
        // Update existing product
        appState.products[appState.editingProductIndex] = product;
    } else {
        // Add new product
        appState.products.push(product);
    }
    
    closeProductModal();
    renderProductsList();
    updatePreview();
    saveToLocalStorage();
}

function renderProductsList() {
    const productsList = document.getElementById('productsList');
    const emptyState = document.getElementById('emptyProducts');
    
    if (!productsList) return;
    
    if (appState.products.length === 0) {
        if (emptyState) emptyState.style.display = 'block';
        // Remove any existing product cards
        const existingCards = productsList.querySelectorAll('.product-card');
        existingCards.forEach(card => card.remove());
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    const productsHTML = appState.products.map((product, index) => {
        const priceDisplay = `RM ${product.price.toFixed(2)}`;
        const compareDisplay = product.comparePrice ? `<del style="color: var(--gray-400); margin-right: 8px;">RM ${product.comparePrice.toFixed(2)}</del>` : '';
        const variantInfo = product.hasVariants ? `<span style="font-size: 12px; color: var(--gray-500);">${product.variants.length} variants</span>` : '';
        const stockInfo = !product.hasVariants && product.trackInventory ? `<span style="font-size: 12px; color: var(--gray-500);">Stock: ${product.stock}</span>` : '';
        const mainImage = product.images && product.images[0];
        
        return `
            <div class="product-card">
                ${mainImage ? `<img src="${mainImage}" alt="${product.name}" class="product-image">` : '<div class="product-image"></div>'}
                <div class="product-info">
                    <div class="product-name">${escapeHtml(product.name)}</div>
                    <div class="product-price">${compareDisplay}${priceDisplay} • ${product.type}</div>
                    <div style="display: flex; gap: 12px; margin-top: 4px;">
                        ${variantInfo}
                        ${stockInfo}
                    </div>
                    <div class="product-actions" style="margin-top: 8px;">
                        <button class="btn-ghost btn-sm" onclick="openProductModal(${index})">Edit</button>
                        <button class="btn-ghost btn-sm" onclick="deleteProduct(${index})">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    productsList.innerHTML = productsHTML;
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        appState.products.splice(index, 1);
        renderProductsList();
        updatePreview();
        saveToLocalStorage();
    }
}

// Make functions global for onclick
window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;
window.deleteProduct = deleteProduct;

// ============================================
// INDUSTRY TEMPLATES
// ============================================

function applyIndustryTemplate(industry) {
    // Use DesignEngine if available
    if (appState.designEngine) {
        const template = appState.designEngine.industries[industry];
        if (template) {
            appState.design.primaryColor = template.colors.primary;
            appState.design.secondaryColor = template.colors.secondary;
            appState.design.accentColor = template.colors.accent;
            
            // Update color pickers
            document.getElementById('primaryColor').value = template.colors.primary;
            document.getElementById('secondaryColor').value = template.colors.secondary;
            const accentInput = document.getElementById('accentColor');
            if (accentInput) accentInput.value = template.colors.accent;
            
            console.log(`✅ Applied ${template.name} industry template`);
        }
    } else {
        // Fallback to old templates
        const template = industryTemplates[industry];
        if (template) {
            appState.design.primaryColor = template.colors.primary;
            appState.design.secondaryColor = template.colors.secondary;
            
            document.getElementById('primaryColor').value = template.colors.primary;
            document.getElementById('secondaryColor').value = template.colors.secondary;
        }
    }
}

// ============================================
// LIVE PREVIEW
// ============================================

function updatePreview() {
    const previewContainer = document.getElementById('livePreview');
    
    if (!previewContainer) return;
    
    // Generate preview regardless of products - sections can exist independently
    const html = generatePreviewHTML();
    previewContainer.innerHTML = html;
}

function generatePreviewHTML() {
    console.log('🎨 Generating preview with per-section design controls');
    
    // Extract per-section design values
    const hero = appState.sections.hero;
    const products = appState.sections.products;
    const about = appState.sections.about;
    const contact = appState.sections.contact;
    const whatsapp = appState.sections.whatsapp;
    
    // Hero Section Styles
    const heroBackgroundType = hero.backgroundType || 'solid';
    const heroBgColor = hero.backgroundColor || '#6366f1';
    const heroTextColor = hero.textColor || '#ffffff';
    const heroGradientStart = hero.gradientStart || '#6366f1';
    const heroGradientEnd = hero.gradientEnd || '#8b5cf6';
    const heroGradientAngle = hero.gradientAngle || 135;
    const heroBackgroundImage = hero.backgroundImage;
    const heroImageOverlay = hero.imageOverlay || 50;
    const heroHeadlineSize = hero.headlineSize || 48;
    const heroFontWeight = hero.fontWeight || 700;
    const heroCtaBackground = hero.ctaBackground || '#ffffff';
    const heroCtaTextColor = hero.ctaTextColor || '#6366f1';
    const heroCtaHoverBg = hero.ctaHoverBg || '#f3f4f6';
    const heroCtaBorderRadius = hero.ctaBorderRadius || 8;
    const heroHeightValue = hero.height || 600;
    const heroHeight = typeof heroHeightValue === 'string' && heroHeightValue.includes('vh') ? heroHeightValue : `${heroHeightValue}px`;
    const heroContentWidthValue = hero.contentWidth || 1200;
    const heroContentWidth = typeof heroContentWidthValue === 'string' && heroContentWidthValue.includes('%') ? heroContentWidthValue : `${heroContentWidthValue}px`;
    const heroPadding = hero.padding || 60;
    
    // Products Section Styles
    const productsSectionBg = products.sectionBg || '#f7fafc';
    const productsCardBg = products.cardBg || '#ffffff';
    const productsTextColor = products.textColor || '#1a202c';
    const productsCardRadius = products.cardRadius || 8;
    const productsCardShadow = products.cardShadow || 'md';
    const productsHoverEffect = products.hoverEffect || 'lift';
    const productsHoverBorder = products.hoverBorder || '#6366f1';
    const productsTitleSize = products.titleSize || 18;
    const productsTitleWeight = products.titleWeight || 600;
    const productsPriceColor = products.priceColor || '#6366f1';
    const productsPriceSize = products.priceSize || 24;
    const productsCardPadding = products.cardPadding || 20;
    const productsGap = products.gap || 24;
    const productsHeaderSpacing = products.headerSpacing || 12;
    const productsSectionSpacing = products.sectionSpacing || 48;
    
    // About Section Styles
    const aboutBackgroundColor = about.backgroundColor || '#ffffff';
    const aboutTextColor = about.textColor || '#4a5568';
    const aboutHeadingSize = about.headingSize || 32;
    const aboutHeadingWeight = about.headingWeight || 700;
    const aboutContentSize = about.contentSize || 16;
    const aboutLineHeight = about.lineHeight || 1.6;
    const aboutPadding = about.padding || 60;
    const aboutContentWidthValue = about.contentWidth || 1000;
    const aboutContentWidth = typeof aboutContentWidthValue === 'string' && aboutContentWidthValue.includes('%') ? aboutContentWidthValue : `${aboutContentWidthValue}px`;
    const aboutAccentColor = about.accentColor || '#6366f1';
    const aboutBorderStyle = about.borderStyle || 'none';
    
    // Contact Section Styles
    const contactBackgroundColor = contact.backgroundColor || '#f8f9fa';
    const contactTextColor = contact.textColor || '#1e293b';
    const contactInputBg = contact.inputBg || '#ffffff';
    const contactInputBorder = contact.inputBorder || '#e2e8f0';
    const contactFocusBorder = contact.focusBorder || '#667eea';
    const contactInputRadius = contact.inputRadius || 8;
    const contactButtonBg = contact.buttonBg || '#667eea';
    const contactButtonText = contact.buttonText || '#ffffff';
    const contactButtonHover = contact.buttonHover || '#5568d3';
    const contactButtonSize = contact.buttonSize || 'md';
    const contactLabelSize = contact.labelSize || 14;
    const contactLabelWeight = contact.labelWeight || 500;
    const contactPadding = contact.padding || 60;
    const contactFormWidthValue = contact.formWidth || 600;
    const contactFormWidth = typeof contactFormWidthValue === 'string' && contactFormWidthValue.includes('%') ? contactFormWidthValue : `${contactFormWidthValue}px`;
    
    // WhatsApp Button Styles
    const whatsappBgColor = whatsapp.bgColor || '#25D366';
    const whatsappIconColor = whatsapp.iconColor || '#ffffff';
    const whatsappSize = whatsapp.size || 60;
    const whatsappShadow = whatsapp.shadow || 'lg';
    const whatsappHoverBg = whatsapp.hoverBg || '#128C7E';
    const whatsappHoverEffect = whatsapp.hoverEffect || 'scale';
    
    // Shadow mapping
    const shadowMap = {
        'none': 'none',
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 4px 6px rgba(0,0,0,0.1)',
        'lg': '0 10px 15px rgba(0,0,0,0.1)',
        'xl': '0 20px 25px rgba(0,0,0,0.15)'
    };
    
    const shadowHoverMap = {
        'none': 'none',
        'sm': '0 2px 4px rgba(0,0,0,0.1)',
        'md': '0 8px 12px rgba(0,0,0,0.15)',
        'lg': '0 15px 25px rgba(0,0,0,0.15)',
        'xl': '0 25px 35px rgba(0,0,0,0.2)'
    };
    
    // Generate hero background based on settings
    let heroBackgroundStyle;
    
    if (heroBackgroundType === 'image' && heroBackgroundImage) {
        const overlayOpacity = heroImageOverlay / 100;
        heroBackgroundStyle = `
            background-image: linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url('${heroBackgroundImage}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        `;
    } else if (heroBackgroundType === 'gradient') {
        heroBackgroundStyle = `background: linear-gradient(${heroGradientAngle}deg, ${heroGradientStart} 0%, ${heroGradientEnd} 100%);`;
    } else {
        heroBackgroundStyle = `background: ${heroBgColor};`;
    }
    
    let html = `<style>
        .preview-content {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            max-width: 100%;
            overflow-x: hidden;
        }
        
        /* Hero Section Styles */
        .preview-hero-v2 {
            min-height: ${heroHeight};
            padding: ${heroPadding}px 20px;
            text-align: center;
            ${heroBackgroundStyle}
            color: ${heroTextColor};
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .preview-hero-v2 .hero-content {
            width: 100%;
            max-width: ${heroContentWidth};
            margin: 0 auto;
        }
        .preview-hero-v2 h1 {
            font-size: clamp(32px, 5vw, ${heroHeadlineSize}px);
            font-weight: ${heroFontWeight};
            margin-bottom: 24px;
            line-height: 1.2;
        }
        .preview-hero-v2 p {
            font-size: 20px;
            opacity: 0.95;
            margin-bottom: 32px;
            line-height: 1.6;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .preview-cta-btn {
            display: inline-block;
            padding: 16px 40px;
            background: ${heroCtaBackground};
            color: ${heroCtaTextColor};
            border-radius: ${heroCtaBorderRadius}px;
            text-decoration: none;
            font-weight: 600;
            box-shadow: ${shadowMap[productsCardShadow]};
            transition: all 0.3s ease;
        }
        .preview-cta-btn:hover {
            background: ${heroCtaHoverBg};
            transform: translateY(-2px);
            box-shadow: ${shadowHoverMap[productsCardShadow]};
        }
        
        /* Products Section Styles */
        .preview-products-section {
            padding: 60px 20px;
            background: ${productsSectionBg};
        }
        .preview-section-header {
            text-align: center;
            margin-bottom: ${productsSectionSpacing}px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }
        .preview-section-title {
            font-size: 32px;
            font-weight: 700;
            margin-bottom: ${productsHeaderSpacing}px;
            color: ${productsTextColor};
        }
        .preview-section-subtitle {
            font-size: 16px;
            color: ${productsTextColor};
            opacity: 0.8;
            line-height: 1.6;
        }
        .preview-products-section h2 {
            font-size: 36px;
            font-weight: 700;
            text-align: center;
            margin-bottom: 48px;
            color: ${productsTextColor};
        }
        .preview-products-grid {
            display: grid;
            grid-template-columns: repeat(${products.columns || 3}, 1fr);
            gap: ${productsGap}px;
            max-width: 1200px;
            margin: 0 auto;
        }
        @media (max-width: 768px) {
            .preview-products-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            .preview-about-two-column,
            .preview-about-side-image {
                grid-template-columns: 1fr !important;
                flex-direction: column-reverse !important;
            }
        }
        @media (max-width: 480px) {
            .preview-products-grid {
                grid-template-columns: 1fr;
            }
        }
        .preview-product-card {
            background: ${productsCardBg};
            border-radius: ${productsCardRadius}px;
            overflow: hidden;
            box-shadow: ${shadowMap[productsCardShadow]};
            transition: all 0.3s ease;
            ${productsHoverEffect === 'none' ? '' : 'cursor: pointer;'}
        }
        .preview-product-card:hover {
            ${productsHoverEffect === 'lift' ? 'transform: translateY(-8px);' : ''}
            ${productsHoverEffect === 'scale' ? 'transform: scale(1.03);' : ''}
            ${productsHoverEffect === 'shadow' ? `box-shadow: ${shadowHoverMap[productsCardShadow]};` : `box-shadow: ${shadowHoverMap[productsCardShadow]};`}
            ${productsHoverEffect !== 'none' ? `border: 2px solid ${productsHoverBorder};` : ''}
        }
        .preview-product-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%);
        }
        .preview-product-info {
            padding: ${productsCardPadding}px;
        }
        .preview-product-name {
            font-size: ${productsTitleSize}px;
            font-weight: ${productsTitleWeight};
            color: ${productsTextColor};
            margin-bottom: 8px;
        }
        .preview-product-desc {
            font-size: 14px;
            color: ${productsTextColor};
            opacity: 0.7;
            margin-bottom: 16px;
            line-height: 1.6;
        }
        .preview-product-price {
            font-size: ${productsPriceSize}px;
            font-weight: ${productsTitleWeight};
            color: ${productsPriceColor};
            margin-bottom: 16px;
        }
        .preview-buy-btn {
            width: 100%;
            padding: 12px;
            background: ${productsPriceColor};
            color: white;
            border: none;
            border-radius: ${productsCardRadius}px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .preview-buy-btn:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
        .compare-price {
            font-size: 18px;
            color: #a0aec0;
            text-decoration: line-through;
            margin-right: 8px;
        }
        
        /* About Section Styles */
        .preview-about-section {
            padding: ${aboutPadding}px 20px;
            background: ${aboutBackgroundColor};
            ${aboutBorderStyle === 'top' ? `border-top: 3px solid ${aboutAccentColor};` : ''}
            ${aboutBorderStyle === 'bottom' ? `border-bottom: 3px solid ${aboutAccentColor};` : ''}
            ${aboutBorderStyle === 'left' ? `border-left: 3px solid ${aboutAccentColor};` : ''}
        }
        .preview-about-two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            max-width: ${aboutContentWidth};
            margin: 0 auto;
            align-items: center;
        }
        .preview-about-side-image {
            display: flex;
            gap: 48px;
            max-width: ${aboutContentWidth};
            margin: 0 auto;
            align-items: center;
        }
        .preview-about-side-image > div:first-child {
            flex: 0 0 300px;
        }
        .preview-about-side-image > div:last-child {
            flex: 1;
        }
        .about-image-placeholder {
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${aboutTextColor};
            opacity: 0.5;
            font-size: 14px;
            border: 2px dashed ${aboutAccentColor}33;
        }
        .preview-about-centered {
            max-width: ${aboutContentWidth};
            margin: 0 auto;
            text-align: center;
        }
        .preview-about-section h2 {
            font-size: ${aboutHeadingSize}px;
            font-weight: ${aboutHeadingWeight};
            margin-bottom: 24px;
            color: ${aboutTextColor};
        }
        .preview-about-section p {
            font-size: ${aboutContentSize}px;
            line-height: ${aboutLineHeight};
            color: ${aboutTextColor};
        }
        @media (max-width: 768px) {
            .preview-about-two-column,
            .preview-about-side-image {
                grid-template-columns: 1fr;
                flex-direction: column;
            }
        }
        
        /* Contact Section Styles */
        .preview-contact-section {
            padding: ${contactPadding}px 20px;
            background: ${contactBackgroundColor};
        }
        .preview-contact-section h2 {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 48px;
            color: ${contactTextColor};
            text-align: center;
        }
        .preview-contact-form {
            max-width: ${contactFormWidth};
            margin: 0 auto;
        }
        .contact-form-field {
            margin-bottom: 20px;
        }
        .contact-form-field label {
            display: block;
            margin-bottom: 8px;
            font-weight: ${contactLabelWeight};
            font-size: ${contactLabelSize}px;
            color: ${contactTextColor};
        }
        .contact-form-field input,
        .contact-form-field textarea {
            width: 100%;
            padding: ${contactButtonSize === 'sm' ? '10px' : contactButtonSize === 'lg' ? '16px' : '12px'};
            background: ${contactInputBg};
            border: 2px solid ${contactInputBorder};
            border-radius: ${contactInputRadius}px;
            font-family: inherit;
            font-size: 14px;
            color: ${contactTextColor};
            transition: all 0.3s ease;
        }
        .contact-form-field input:focus,
        .contact-form-field textarea:focus {
            outline: none;
            border-color: ${contactFocusBorder};
        }
        .contact-submit-btn {
            width: 100%;
            padding: ${contactButtonSize === 'sm' ? '12px' : contactButtonSize === 'lg' ? '20px' : '16px'};
            background: ${contactButtonBg};
            color: ${contactButtonText};
            border: none;
            border-radius: ${contactInputRadius}px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .contact-submit-btn:hover {
            background: ${contactButtonHover};
            transform: translateY(-2px);
        }
        .preview-contact-map {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            align-items: start;
        }
        .preview-contact-details {
            max-width: 800px;
            margin: 0 auto;
        }
        .contact-info-item {
            margin-bottom: 24px;
            padding: 20px;
            background: white;
            border-radius: ${contactInputRadius}px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .contact-info-item strong {
            display: block;
            margin-bottom: 8px;
            color: ${contactTextColor};
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .map-placeholder {
            width: 100%;
            height: 400px;
            background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%);
            border-radius: ${contactInputRadius}px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
            font-weight: 500;
        }
        
        /* WhatsApp Button */
        .whatsapp-button {
            position: fixed;
            bottom: 24px;
            z-index: 1000;
            width: ${whatsappSize}px;
            height: ${whatsappSize}px;
            background: ${whatsappBgColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: ${shadowMap[whatsappShadow]};
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        .whatsapp-button:hover {
            background: ${whatsappHoverBg};
            ${whatsappHoverEffect === 'scale' ? 'transform: scale(1.15);' : ''}
            ${whatsappHoverEffect === 'pulse' ? 'animation: pulse 1s infinite;' : ''}
            ${whatsappHoverEffect === 'bounce' ? 'animation: bounce 0.5s;' : ''}
            box-shadow: ${shadowHoverMap[whatsappShadow]};
        }
        .whatsapp-button.position-right {
            right: 24px;
        }
        .whatsapp-button.position-left {
            left: 24px;
        }
        .whatsapp-button svg {
            width: ${parseInt(whatsappSize) * 0.5}px;
            height: ${parseInt(whatsappSize) * 0.5}px;
            fill: ${whatsappIconColor};
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
    </style>`;
    
    // Hero Section - Use sections state
    const heroSection = appState.sections.hero;
    const headline = heroSection.headline || appState.content.heroHeadline || 'Welcome to Our Store';
    const subheadline = heroSection.subheadline || appState.content.heroSubheadline || 'Discover amazing products that transform your life';
    const ctaText = heroSection.ctaText || 'Shop Now';
    
    // Only render hero if enabled
    if (heroSection.enabled) {
        const heroLayout = heroSection.layout || 'centered';
        
        if (heroLayout === 'split') {
            // Split layout: text left, image right - full width, auto height
            html += `<section class="preview-hero-v2" style="min-height: 0 !important; text-align: left; padding: ${heroPadding}px 40px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; width: 100%;">
                    <div>
                        <h1>${escapeHtml(headline)}</h1>
                        <p>${escapeHtml(subheadline)}</p>
                        ${heroSection.showCTA ? `<a href="#" class="preview-cta-btn">${escapeHtml(ctaText)}</a>` : ''}
                    </div>
                    ${heroSection.splitImage ? 
                        `<img src="${heroSection.splitImage}" alt="${escapeHtml(headline)}" style="width: 100%; height: 100%; max-height: 500px; object-fit: cover; border-radius: ${heroCtaBorderRadius}px;">` :
                        `<div style="width: 100%; height: 400px; background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%); border-radius: ${heroCtaBorderRadius}px; display: flex; align-items: center; justify-content: center; font-size: 14px; backdrop-filter: blur(10px);">
                            Hero Image
                        </div>`
                    }
                </div>
            </section>`;
        } else if (heroLayout === 'minimal') {
            // Minimal layout: compact header style - full width, auto height
            html += `<section class="preview-hero-v2" style="min-height: 0 !important; padding: ${heroPadding}px 40px;">
                <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 24px; text-align: left;">
                    <div style="flex: 1; min-width: 250px;">
                        <h1 style="font-size: ${parseInt(heroHeadlineSize) * 0.7}px !important; margin-bottom: 8px;">${escapeHtml(headline)}</h1>
                        <p style="font-size: 16px; margin-bottom: 0;">${escapeHtml(subheadline)}</p>
                    </div>
                    ${heroSection.showCTA ? `<a href="#" class="preview-cta-btn" style="padding: 12px 32px; font-size: 14px;">${escapeHtml(ctaText)}</a>` : ''}
                </div>
            </section>`;
        } else {
            // Centered layout (default) - keeps min-height for full hero banner effect
            html += `<section class="preview-hero-v2">
                <div class="hero-content">
                    <h1>${escapeHtml(headline)}</h1>
                    <p>${escapeHtml(subheadline)}</p>
                    ${heroSection.showCTA ? `<a href="#" class="preview-cta-btn">${escapeHtml(ctaText)}</a>` : ''}
                </div>
            </section>`;
        }
    }
    
    // Products Section - Use sections state
    const productsSection = appState.sections.products;
    if (productsSection.enabled && appState.products.length > 0) {
        const productsLayout = productsSection.layout || 'grid';
        const productsHeadline = productsSection.headline || 'Our Products';
        const productsSubheadline = productsSection.subheadline || '';
        
        console.log('Products section showDescription:', productsSection.showDescription);
        console.log('First product:', appState.products[0]);
        
        html += `<section class="preview-products-section">`;
        
        // Section header
        if (productsHeadline || productsSubheadline) {
            html += `<div class="preview-section-header">`;
            if (productsHeadline) {
                html += `<h2 class="preview-section-title">${escapeHtml(productsHeadline)}</h2>`;
            }
            if (productsSubheadline) {
                html += `<p class="preview-section-subtitle">${escapeHtml(productsSubheadline)}</p>`;
            }
            html += `</div>`;
        }
        
        if (productsLayout === 'list') {
            // List layout: full width cards with horizontal layout
            html += `<div class="preview-products-list">`;
            appState.products.forEach(product => {
                const currencySymbol = product.currency === 'USD' ? '$' : product.currency === 'EUR' ? '€' : product.currency === 'GBP' ? '£' : product.currency;
                const priceDisplay = ['USD', 'EUR', 'GBP'].includes(product.currency) 
                    ? `${currencySymbol}${product.price}` 
                    : `${product.price} ${product.currency}`;
                
                html += `
                    <div class="preview-product-list-item">
                        ${product.images && product.images[0] ? `<img src="${product.images[0]}" alt="${escapeHtml(product.name)}" class="preview-product-list-image" style="object-fit: cover;">` : '<div class="preview-product-list-image"></div>'}
                        <div class="preview-product-list-content">
                            <div class="preview-product-name">${escapeHtml(product.name)}</div>
                            ${productsSection.showDescription && product.description ? `<div class="preview-product-desc">${escapeHtml(product.description)}</div>` : ''}
                            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: auto;">
                                ${productsSection.showPricing ? `<div class="preview-product-price">${priceDisplay}</div>` : '<div></div>'}
                                <button class="preview-buy-btn">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        } else if (productsLayout === 'masonry') {
            // Masonry layout: pinterest-style variable heights
            html += `<div class="preview-products-masonry">`;
            appState.products.forEach((product, index) => {
                const currencySymbol = product.currency === 'USD' ? '$' : product.currency === 'EUR' ? '€' : product.currency === 'GBP' ? '£' : product.currency;
                const priceDisplay = ['USD', 'EUR', 'GBP'].includes(product.currency) 
                    ? `${currencySymbol}${product.price}` 
                    : `${product.price} ${product.currency}`;
                
                // Vary card heights for masonry effect
                const heights = ['300px', '350px', '280px', '320px'];
                const cardHeight = heights[index % heights.length];
                
                html += `
                    <div class="preview-product-card" style="height: ${cardHeight};">
                        ${product.images && product.images[0] ? `<img src="${product.images[0]}" alt="${escapeHtml(product.name)}" class="preview-product-image" style="height: 60%; object-fit: cover;">` : `<div class="preview-product-image" style="height: 60%;"></div>`}
                        <div class="preview-product-info" style="padding: 16px;">
                            <div class="preview-product-name">${escapeHtml(product.name)}</div>
                            ${productsSection.showDescription && product.description ? `<div class="preview-product-desc" style="font-size: 13px; margin: 8px 0;">${escapeHtml(product.description)}</div>` : ''}
                            ${productsSection.showPricing ? `<div class="preview-product-price">${priceDisplay}</div>` : ''}
                            <button class="preview-buy-btn" style="padding: 8px 16px; font-size: 13px; margin-top: 8px;">Add to Cart</button>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        } else {
            // Grid layout (default)
            html += `<div class="preview-products-grid">`;
            
            appState.products.forEach(product => {
                const currencySymbol = product.currency === 'USD' ? '$' : product.currency === 'EUR' ? '€' : product.currency === 'GBP' ? '£' : product.currency;
                const priceDisplay = ['USD', 'EUR', 'GBP'].includes(product.currency) 
                    ? `${currencySymbol}${product.price}` 
                    : `${product.price} ${product.currency}`;
                
                html += `
                    <div class="preview-product-card">
                        ${product.images && product.images[0] ? `<img src="${product.images[0]}" alt="${escapeHtml(product.name)}" class="preview-product-image" style="object-fit: cover;">` : '<div class="preview-product-image"></div>'}
                        <div class="preview-product-info">
                            <div class="preview-product-name">${escapeHtml(product.name)}</div>
                            ${productsSection.showDescription && product.description ? `<div class="preview-product-desc">${escapeHtml(product.description)}</div>` : ''}
                            ${productsSection.showPricing ? `<div class="preview-product-price">${priceDisplay}</div>` : ''}
                            <button class="preview-buy-btn">Add to Cart</button>
                        </div>
                    </div>
                `;
            });
            
            html += `</div>`;
        }
        
        html += `</section>`;
    }
    
    // About Section
    const aboutSection = appState.sections.about;
    if (aboutSection.enabled) {
        const aboutHeadline = aboutSection.headline || 'About Us';
        const aboutContent = aboutSection.content || 'We are passionate about delivering exceptional products and services. Our mission is to make a positive impact on our customers\' lives through innovation and quality.';
        const aboutImage = aboutSection.image || '';
        
        html += `<section class="preview-about-section">`;
        
        if (aboutSection.layout === 'two-column') {
            html += `
                <div class="preview-about-two-column">
                    ${aboutImage ? 
                        `<img src="${aboutImage}" alt="${escapeHtml(aboutHeadline)}" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px;">` :
                        `<div class="about-image-placeholder">About Image</div>`
                    }
                    <div>
                        <h2>${escapeHtml(aboutHeadline)}</h2>
                        <p>${escapeHtml(aboutContent)}</p>
                    </div>
                </div>
            `;
        } else if (aboutSection.layout === 'side-image') {
            html += `
                <div class="preview-about-side-image">
                    ${aboutImage ? 
                        `<img src="${aboutImage}" alt="${escapeHtml(aboutHeadline)}" style="width: 300px; height: 300px; object-fit: cover; border-radius: 12px;">` :
                        `<div class="about-image-placeholder">About Image</div>`
                    }
                    <div>
                        <h2>${escapeHtml(aboutHeadline)}</h2>
                        <p>${escapeHtml(aboutContent)}</p>
                    </div>
                </div>
            `;
        } else {
            // Centered layout
            html += `
                <div class="preview-about-centered">
                    <h2>${escapeHtml(aboutHeadline)}</h2>
                    <p>${escapeHtml(aboutContent)}</p>
                </div>
            `;
        }
        
        html += `</section>`;
    }
    
    // Contact Section
    const contactSection = appState.sections.contact;
    if (contactSection.enabled) {
        const email = contactSection.email || 'hello@example.com';
        const phone = contactSection.phone || '+1 (555) 123-4567';
        const address = contactSection.address || '123 Business Street, City, State 12345';
        
        html += `<section class="preview-contact-section">`;
        html += `<h2>Contact Us</h2>`;
        
        if (contactSection.layout === 'form') {
            html += `
                <div class="preview-contact-form">
                    <div class="contact-form-field">
                        <label>Name</label>
                        <input type="text" placeholder="Your name">
                    </div>
                    <div class="contact-form-field">
                        <label>Email</label>
                        <input type="email" placeholder="your@email.com">
                    </div>
                    <div class="contact-form-field">
                        <label>Message</label>
                        <textarea rows="5" placeholder="Your message"></textarea>
                    </div>
                    <button class="contact-submit-btn">Send Message</button>
                </div>
            `;
        } else if (contactSection.layout === 'map') {
            // Extract iframe src from embed code
            let mapSrc = '';
            if (contactSection.mapEmbed) {
                const srcMatch = contactSection.mapEmbed.match(/src="([^"]+)"/);
                if (srcMatch) {
                    mapSrc = srcMatch[1];
                } else if (contactSection.mapEmbed.includes('google.com/maps')) {
                    mapSrc = contactSection.mapEmbed;
                }
            }
            
            html += `
                <div class="preview-contact-map">
                    ${mapSrc ? 
                        `<iframe src="${mapSrc}" width="100%" height="400" style="border:0; border-radius: 8px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>` :
                        `<div class="map-placeholder">Add Google Maps embed link in settings</div>`
                    }
                    <div>
                        <div class="contact-info-item">
                            <strong>Email</strong>
                            ${escapeHtml(email)}
                        </div>
                        <div class="contact-info-item">
                            <strong>Phone</strong>
                            ${escapeHtml(phone)}
                        </div>
                        <div class="contact-info-item">
                            <strong>Address</strong>
                            ${escapeHtml(address)}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Details layout
            html += `
                <div class="preview-contact-details">
                    <div class="contact-info-item">
                        <strong>Email</strong>
                        ${escapeHtml(email)}
                    </div>
                    <div class="contact-info-item">
                        <strong>Phone</strong>
                        ${escapeHtml(phone)}
                    </div>
                    <div class="contact-info-item">
                        <strong>Address</strong>
                        ${escapeHtml(address)}
                    </div>
                </div>
            `;
        }
        
        html += `</section>`;
    }
    
    // WhatsApp Button
    const whatsappSection = appState.sections.whatsapp;
    if (whatsappSection && whatsappSection.enabled) {
        const whatsappNumber = whatsappSection.number ? whatsappSection.number.replace(/[^0-9]/g, '') : ''; // Remove non-numeric
        const message = encodeURIComponent(whatsappSection.message || 'Hi!');
        const position = whatsappSection.position === 'bottom-left' ? 'position-left' : 'position-right';
        const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : '#';
        const opacity = whatsappNumber ? '1' : '0.5';
        const pointerEvents = whatsappNumber ? 'auto' : 'none';
        const title = whatsappNumber ? 'Chat on WhatsApp' : 'Add WhatsApp number in settings';
        
        html += `
            <a href="${whatsappUrl}" class="whatsapp-button ${position}" target="_blank" title="${title}" style="opacity: ${opacity}; pointer-events: ${pointerEvents};">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0C7.164 0 0 7.164 0 16c0 2.82.736 5.464 2.024 7.76L0 32l8.416-2.208A15.932 15.932 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.344c-2.4 0-4.672-.632-6.624-1.736l-.48-.28-4.848 1.272 1.296-4.728-.312-.496A13.232 13.232 0 012.656 16C2.656 8.636 8.636 2.656 16 2.656S29.344 8.636 29.344 16 23.364 29.344 16 29.344zm7.312-10.016c-.4-.2-2.368-1.168-2.736-1.304-.368-.128-.632-.2-.904.2-.264.4-1.04 1.304-1.272 1.568-.232.272-.472.304-.872.104-.4-.2-1.688-.624-3.216-1.984-1.184-1.056-1.992-2.368-2.224-2.768-.232-.4-.024-.616.176-.816.176-.184.4-.472.6-.712.2-.232.264-.4.4-.664.136-.272.072-.504-.032-.712-.104-.2-.904-2.176-1.24-2.976-.328-.784-.664-.68-.904-.688-.232-.008-.496-.008-.76-.008s-.696.096-1.064.496c-.368.4-1.4 1.36-1.4 3.328s1.432 3.864 1.632 4.128c.2.272 2.816 4.296 6.824 6.024.952.416 1.696.664 2.272.848.952.304 1.824.264 2.512.16.768-.112 2.368-.968 2.704-1.904.336-.936.336-1.736.232-1.904-.096-.176-.36-.272-.76-.472z"/>
                </svg>
            </a>
        `;
    }
    
    return html;
}

// ============================================
// DYNAMIC LIST MANAGEMENT
// ============================================

function addFeature() {
    const container = document.getElementById('featuresList');
    const div = document.createElement('div');
    div.className = 'dynamic-input';
    div.innerHTML = `
        <input type="text" class="form-input" placeholder="Feature ${container.children.length + 1}">
        <button class="btn-icon" onclick="removeInput(this)">×</button>
    `;
    container.appendChild(div);
}

function addBenefit() {
    const container = document.getElementById('benefitsList');
    const div = document.createElement('div');
    div.className = 'dynamic-input';
    div.innerHTML = `
        <textarea class="form-textarea" rows="2" placeholder="Benefit description"></textarea>
        <button class="btn-icon" onclick="removeInput(this)">×</button>
    `;
    container.appendChild(div);
}

function addTestimonial() {
    const container = document.getElementById('testimonialsList');
    const div = document.createElement('div');
    div.className = 'testimonial-input';
    div.innerHTML = `
        <textarea class="form-textarea" rows="3" placeholder="Testimonial text"></textarea>
        <input type="text" class="form-input" placeholder="Customer name">
        <button class="btn-icon" onclick="removeInput(this)">×</button>
    `;
    container.appendChild(div);
}

function removeInput(button) {
    button.parentElement.remove();
}

// Make functions global
window.addFeature = addFeature;
window.addBenefit = addBenefit;
window.addTestimonial = addTestimonial;
window.removeInput = removeInput;

// ============================================
// GENERATE PAGE
// ============================================

function generatePage() {
    console.log('🚀 Generating complete product page...');
    
    // Generate complete HTML page - products are optional, sections can exist independently
    const fullHTML = generateCompleteHTML();
    
    // Open in new window with proper viewport
    const newWindow = window.open('', '_blank', 'width=1200,height=800');
    if (newWindow) {
        newWindow.document.open();
        newWindow.document.write(fullHTML);
        newWindow.document.close();
        
        // Force scroll to top and focus
        setTimeout(() => {
            newWindow.scrollTo(0, 0);
            newWindow.focus();
        }, 100);
        
        console.log('✅ Product page opened in new window');
    } else {
        // If popup blocked, offer download
        alert('Pop-up blocked! Click OK to download the HTML file instead.');
        downloadHTML(fullHTML);
    }
}

// Generate complete standalone HTML page
function generateCompleteHTML() {
    const industry = appState.design.industry || 'saas';
    const style = appState.design.style || 'minimal';
    const primaryColor = appState.design.primaryColor || '#667eea';
    const secondaryColor = appState.design.secondaryColor || '#764ba2';
    const accentColor = appState.design.accentColor || '#48bb78';
    const layoutOptions = appState.design.layoutOptions || {};
    
    // Get style configuration
    let styleConfig = {
        spacing: 1.0,
        borderRadius: 8,
        shadow: '0 2px 8px rgba(0,0,0,0.08)',
        shadowHover: '0 8px 24px rgba(0,0,0,0.12)',
        fontWeight: 600,
        fontSize: 1.0,
        transition: '0.2s ease'
    };
    
    if (appState.designEngine && appState.designEngine.designStyles[style]) {
        const engineStyle = appState.designEngine.designStyles[style];
        styleConfig.spacing = engineStyle.spacing.scale;
        styleConfig.borderRadius = engineStyle.borderRadius.cards;
        
        if (engineStyle.shadows.intensity === 'none') {
            styleConfig.shadow = 'none';
            styleConfig.shadowHover = 'none';
        } else if (engineStyle.shadows.intensity === 'subtle') {
            styleConfig.shadow = '0 1px 3px rgba(0,0,0,0.08)';
            styleConfig.shadowHover = '0 4px 12px rgba(0,0,0,0.1)';
        } else if (engineStyle.shadows.intensity === 'dramatic') {
            styleConfig.shadow = '0 4px 16px rgba(0,0,0,0.15)';
            styleConfig.shadowHover = '0 12px 32px rgba(0,0,0,0.25)';
        }
        
        styleConfig.fontWeight = engineStyle.typography.weights.heading;
        styleConfig.fontSize = engineStyle.typography.scale;
        styleConfig.transition = engineStyle.animations.speed === 'instant' ? 'none' : 
                                engineStyle.animations.speed === 'fast' ? '0.15s ease' :
                                engineStyle.animations.speed === 'slow' ? '0.5s ease' : '0.3s ease';
    }
    
    // Apply user overrides
    if (layoutOptions.spacing === 'compact') styleConfig.spacing = 0.8;
    if (layoutOptions.spacing === 'spacious') styleConfig.spacing = 1.3;
    if (layoutOptions.borderRadius === 'sharp') styleConfig.borderRadius = 0;
    if (layoutOptions.borderRadius === 'pill') styleConfig.borderRadius = 24;
    if (layoutOptions.shadows === 'none') {
        styleConfig.shadow = 'none';
        styleConfig.shadowHover = 'none';
    } else if (layoutOptions.shadows === 'dramatic') {
        styleConfig.shadow = '0 4px 16px rgba(0,0,0,0.15)';
        styleConfig.shadowHover = '0 12px 32px rgba(0,0,0,0.25)';
    }
    
    if (layoutOptions.animations === 'none') {
        styleConfig.transition = 'none';
    } else if (layoutOptions.animations === 'playful') {
        styleConfig.transition = '0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    }
    
    const basePadding = 40 * styleConfig.spacing;
    const sectionPadding = 80 * styleConfig.spacing;
    const cardPadding = 24 * styleConfig.spacing;
    const gap = 32 * styleConfig.spacing;
    
    const heroSection = appState.sections.hero;
    const productsSection = appState.sections.products;
    const headline = heroSection.headline || appState.content.heroHeadline || 'Welcome to Our Store';
    const subheadline = heroSection.subheadline || appState.content.heroSubheadline || 'Discover amazing products that transform your life';
    const ctaText = heroSection.ctaText || 'Shop Now';
    
    // Get hero section styling (match generatePreviewHTML)
    const heroBackgroundType = heroSection.backgroundType || 'solid';
    const heroBgColor = heroSection.backgroundColor || '#6366f1';
    const heroTextColor = heroSection.textColor || '#ffffff';
    const heroGradientStart = heroSection.gradientStart || '#6366f1';
    const heroGradientEnd = heroSection.gradientEnd || '#8b5cf6';
    const heroGradientAngle = heroSection.gradientAngle || 135;
    const heroBackgroundImage = heroSection.backgroundImage;
    const heroImageOverlay = heroSection.imageOverlay || 50;
    const heroCtaBackground = heroSection.ctaBackground || '#ffffff';
    const heroCtaTextColor = heroSection.ctaTextColor || '#6366f1';
    const heroCtaHoverBg = heroSection.ctaHoverBg || '#f3f4f6';
    const heroCtaBorderRadius = heroSection.ctaBorderRadius || 8;
    const heroHeadlineSize = heroSection.headlineSize || 48;
    const heroFontWeight = heroSection.fontWeight || 700;
    const heroPadding = heroSection.padding || 60;
    const heroHeightValue = heroSection.height || 600;
    const heroHeight = typeof heroHeightValue === 'string' && heroHeightValue.includes('vh') ? heroHeightValue : `${heroHeightValue}px`;
    const heroContentWidthValue = heroSection.contentWidth || 1200;
    const heroContentWidth = typeof heroContentWidthValue === 'string' && heroContentWidthValue.includes('%') ? heroContentWidthValue : `${heroContentWidthValue}px`;
    
    // Get products section styling (match generatePreviewHTML)
    const productsSectionBg = productsSection.sectionBg || '#f7fafc';
    const productsCardBg = productsSection.cardBg || '#ffffff';
    const productsTextColor = productsSection.textColor || '#1a202c';
    const productsCardRadius = productsSection.cardRadius || 8;
    const productsCardShadow = productsSection.cardShadow || 'md';
    const productsHoverEffect = productsSection.hoverEffect || 'lift';
    const productsHoverBorder = productsSection.hoverBorder || '#6366f1';
    const productsTitleSize = productsSection.titleSize || 18;
    const productsTitleWeight = productsSection.titleWeight || 600;
    const productsPriceColor = productsSection.priceColor || '#6366f1';
    const productsPriceSize = productsSection.priceSize || 24;
    const productsCardPadding = productsSection.cardPadding || 20;
    const productsGap = productsSection.gap || 24;
    const productsHeaderSpacing = productsSection.headerSpacing || 12;
    const productsSectionSpacing = productsSection.sectionSpacing || 48;
    
    // Get about section styling (match generatePreviewHTML)
    const aboutSection = appState.sections.about;
    const aboutBackgroundColor = aboutSection.backgroundColor || '#ffffff';
    const aboutTextColor = aboutSection.textColor || '#4a5568';
    const aboutHeadingSize = aboutSection.headingSize || 32;
    const aboutHeadingWeight = aboutSection.headingWeight || 700;
    const aboutContentSize = aboutSection.contentSize || 16;
    const aboutLineHeight = aboutSection.lineHeight || 1.6;
    const aboutPadding = aboutSection.padding || 60;
    const aboutContentWidthValue = aboutSection.contentWidth || 1000;
    const aboutContentWidth = typeof aboutContentWidthValue === 'string' && aboutContentWidthValue.includes('%') ? aboutContentWidthValue : `${aboutContentWidthValue}px`;
    const aboutAccentColor = aboutSection.accentColor || '#6366f1';
    const aboutBorderStyle = aboutSection.borderStyle || 'none';
    
    // Get contact section styling (match generatePreviewHTML)
    const contactSection = appState.sections.contact;
    const contactBackgroundColor = contactSection.backgroundColor || '#f8f9fa';
    const contactTextColor = contactSection.textColor || '#1e293b';
    const contactInputBg = contactSection.inputBg || '#ffffff';
    const contactInputBorder = contactSection.inputBorder || '#e2e8f0';
    const contactFocusBorder = contactSection.focusBorder || '#667eea';
    const contactInputRadius = contactSection.inputRadius || 8;
    const contactButtonBg = contactSection.buttonBg || '#667eea';
    const contactButtonText = contactSection.buttonText || '#ffffff';
    const contactButtonHover = contactSection.buttonHover || '#5568d3';
    const contactButtonSize = contactSection.buttonSize || 'md';
    const contactLabelSize = contactSection.labelSize || 14;
    const contactLabelWeight = contactSection.labelWeight || 500;
    const contactPadding = contactSection.padding || 60;
    const contactFormWidthValue = contactSection.formWidth || 600;
    const contactFormWidth = typeof contactFormWidthValue === 'string' && contactFormWidthValue.includes('%') ? contactFormWidthValue : `${contactFormWidthValue}px`;
    
    // Get WhatsApp section styling (match generatePreviewHTML)
    const whatsappSection = appState.sections.whatsapp;
    const whatsappBgColor = whatsappSection.bgColor || '#25D366';
    const whatsappIconColor = whatsappSection.iconColor || '#ffffff';
    const whatsappSize = whatsappSection.size || 60;
    const whatsappShadow = whatsappSection.shadow || 'lg';
    const whatsappHoverBg = whatsappSection.hoverBg || '#128C7E';
    const whatsappHoverEffect = whatsappSection.hoverEffect || 'scale';
    
    // Shadow mapping (same as generatePreviewHTML)
    const shadowMap = {
        'none': 'none',
        'sm': '0 1px 2px rgba(0,0,0,0.05)',
        'md': '0 4px 6px rgba(0,0,0,0.1)',
        'lg': '0 10px 15px rgba(0,0,0,0.1)',
        'xl': '0 20px 25px rgba(0,0,0,0.15)'
    };
    
    const shadowHoverMap = {
        'none': 'none',
        'sm': '0 2px 4px rgba(0,0,0,0.1)',
        'md': '0 8px 12px rgba(0,0,0,0.15)',
        'lg': '0 15px 25px rgba(0,0,0,0.15)',
        'xl': '0 25px 35px rgba(0,0,0,0.2)'
    };
    
    // Generate hero background (match generatePreviewHTML logic)
    let heroBackgroundStyle;
    if (heroBackgroundType === 'image' && heroBackgroundImage) {
        const overlayOpacity = heroImageOverlay / 100;
        heroBackgroundStyle = `
            background-image: linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url('${heroBackgroundImage}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        `;
    } else if (heroBackgroundType === 'gradient') {
        heroBackgroundStyle = `background: linear-gradient(${heroGradientAngle}deg, ${heroGradientStart} 0%, ${heroGradientEnd} 100%);`;
    } else {
        heroBackgroundStyle = `background: ${heroBgColor};`;
    }
    
    // Build complete HTML document
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(headline)} - Product Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background: #ffffff;
        }
        
        /* Hero Section */
        .hero {
            min-height: ${heroHeight};
            padding: ${heroPadding}px ${basePadding}px;
            text-align: center;
            ${heroBackgroundStyle}
            color: ${heroTextColor};
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .hero > div {
            width: 100%;
            max-width: ${heroContentWidth};
        }
        
        .hero-split {
            min-height: ${heroHeight};
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            align-items: center;
            padding: ${heroPadding}px ${basePadding}px;
            ${heroBackgroundStyle}
            color: ${heroTextColor};
            text-align: left;
        }
        
        .hero-minimal {
            min-height: ${heroHeight === '100vh' ? 'auto' : heroHeight};
            padding: ${heroPadding}px ${basePadding}px;
            text-align: left;
            ${heroBackgroundImage ? heroBackgroundStyle : `background: ${heroBgColor};`}
            color: ${heroTextColor};
            border-bottom: 4px solid ${secondaryColor};
        }
        
        .hero-minimal .hero-content {
            max-width: ${heroContentWidth};
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
        }
        
        .hero-image-placeholder {
            width: 100%;
            height: 300px;
            background: rgba(255,255,255,0.2);
            border-radius: ${styleConfig.borderRadius}px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            backdrop-filter: blur(10px);
        }
        
        .hero h1 {
            font-size: clamp(32px, 5vw, ${heroHeadlineSize}px);
            font-weight: ${heroFontWeight};
            margin-bottom: ${16 * styleConfig.spacing}px;
            line-height: 1.2;
        }
        
        .hero-minimal h1 {
            font-size: ${parseInt(heroHeadlineSize) * 0.7}px;
            font-weight: ${heroFontWeight};
            margin-bottom: 8px;
        }
        
        .hero p {
            font-size: 20px;
            opacity: 0.95;
            margin-bottom: ${32 * styleConfig.spacing}px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .hero-split p {
            margin-left: 0;
        }
        
        .hero-minimal p {
            font-size: 16px;
            margin-bottom: 16px;
        }
        
        .cta-button {
            display: inline-block;
            padding: ${16 * styleConfig.spacing}px ${40 * styleConfig.spacing}px;
            background: ${heroCtaBackground};
            color: ${heroCtaTextColor};
            border-radius: ${heroCtaBorderRadius}px;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            box-shadow: ${styleConfig.shadow};
            transition: ${styleConfig.transition};
            cursor: pointer;
            border: none;
        }
        
        .cta-button:hover {
            background: ${heroCtaHoverBg};
            box-shadow: ${styleConfig.shadowHover};
            transform: ${styleConfig.transition === 'none' ? 'none' : 'translateY(-2px)'};
        }
        
        /* Products Section */
        .products-section {
            padding: ${sectionPadding}px ${basePadding}px;
            background: ${productsSectionBg};
        }
        
        .section-title {
            text-align: center;
            font-size: ${36 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            margin-bottom: ${48 * styleConfig.spacing}px;
            color: ${productsTextColor};
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(${productsSection.columns || 3}, 1fr);
            gap: ${productsGap}px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .product-card {
            background: ${productsCardBg};
            border-radius: ${productsCardRadius}px;
            overflow: hidden;
            box-shadow: ${shadowMap[productsCardShadow]};
            transition: ${styleConfig.transition};
            cursor: pointer;
        }
        
        .product-card:hover {
            transform: ${productsHoverEffect === 'lift' ? 'translateY(-8px)' : productsHoverEffect === 'grow' ? 'scale(1.05)' : 'none'};
            box-shadow: ${shadowHoverMap[productsCardShadow]};
            ${productsHoverEffect === 'glow' ? `border: 2px solid ${productsHoverBorder};` : ''}
        }
        
        .product-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%);
        }
        
        .product-info {
            padding: ${productsCardPadding}px;
        }
        
        .product-name {
            font-size: ${productsTitleSize}px;
            font-weight: ${productsTitleWeight};
            color: ${productsTextColor};
            margin-bottom: 8px;
        }
        
        .product-description {
            font-size: 14px;
            color: #718096;
            margin-bottom: 16px;
            line-height: 1.6;
        }
        
        .product-price {
            font-size: ${productsPriceSize}px;
            font-weight: ${productsTitleWeight};
            color: ${productsPriceColor};
            margin-bottom: 16px;
        }
        
        .compare-price {
            font-size: 18px;
            color: #a0aec0;
            text-decoration: line-through;
            margin-right: 8px;
        }
        
        .variant-info {
            font-size: 12px;
            color: #718096;
            margin-bottom: 12px;
            padding: 8px 12px;
            background: #f7fafc;
            border-radius: 4px;
            display: inline-block;
        }
        
        .buy-button {
            width: 100%;
            padding: 12px;
            background: ${productsPriceColor};
            color: white;
            border: none;
            border-radius: ${productsCardRadius}px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .buy-button:hover {
            opacity: 0.9;
            transform: translateY(-2px);
        }
        
        /* About Section */
        .about-section {
            padding: ${aboutPadding}px 20px;
            background: ${aboutBackgroundColor};
        }
        
        .about-section h2 {
            font-size: ${aboutHeadingSize}px;
            font-weight: ${aboutHeadingWeight};
            margin-bottom: 24px;
            color: ${aboutTextColor};
        }
        
        .about-section p {
            font-size: ${aboutContentSize}px;
            line-height: ${aboutLineHeight};
            color: ${aboutTextColor};
        }
        
        /* Contact Section */
        .contact-section {
            padding: ${contactPadding}px 20px;
            background: ${contactBackgroundColor};
        }
        
        .contact-section h2 {
            font-size: 36px;
            font-weight: 700;
            margin-bottom: 48px;
            color: ${contactTextColor};
            text-align: center;
        }
        
        /* Features Section */
        .features-section {
            padding: ${sectionPadding}px ${basePadding}px;
            background: white;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: ${gap}px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .feature-card {
            text-align: center;
            padding: ${cardPadding}px;
        }
        
        .feature-icon {
            font-size: 48px;
            margin-bottom: ${16 * styleConfig.spacing}px;
        }
        
        .feature-title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: ${8 * styleConfig.spacing}px;
            color: #1a202c;
        }
        
        .feature-text {
            font-size: 14px;
            color: #718096;
            line-height: 1.6;
        }
        
        /* WhatsApp Button */
        .whatsapp-btn {
            position: fixed;
            bottom: 24px;
            width: ${whatsappSize}px;
            height: ${whatsappSize}px;
            background: ${whatsappBgColor};
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: ${shadowMap[whatsappShadow]};
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            z-index: 1000;
        }
        .whatsapp-btn:hover {
            background: ${whatsappHoverBg};
            transform: ${whatsappHoverEffect === 'scale' ? 'scale(1.15)' : whatsappHoverEffect === 'rotate' ? 'rotate(15deg)' : 'none'};
            box-shadow: ${shadowHoverMap[whatsappShadow]};
        }
        .whatsapp-btn svg {
            width: ${parseInt(whatsappSize) * 0.5}px;
            height: ${parseInt(whatsappSize) * 0.5}px;
            fill: ${whatsappIconColor};
        }
        .whatsapp-bottom-right {
            right: 24px;
        }
        .whatsapp-bottom-left {
            left: 24px;
        }
        
        /* Footer */
        .footer {
            padding: ${basePadding}px;
            text-align: center;
            background: #1a202c;
            color: white;
        }
        
        .footer p {
            opacity: 0.8;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 32px;
            }
            
            .hero-split {
                grid-template-columns: 1fr;
            }
            
            .products-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .section-title {
                font-size: 28px;
            }
        }
        
        @media (max-width: 480px) {
            .products-grid {
                grid-template-columns: 1fr;
            }
            
            .about-container {
                grid-template-columns: 1fr !important;
                flex-direction: column-reverse !important;
            }
            
            .about-image {
                grid-row: 1 !important;
            }
            
            .about-text {
                grid-row: 2 !important;
            }
            
            .contact-section > div {
                grid-template-columns: 1fr !important;
            }
        }
    </style>
</head>
<body>
    ${heroSection.enabled ? `
    <!-- Hero Section -->
    <section class="${heroSection.layout === 'split' ? 'hero-split' : heroSection.layout === 'minimal' ? 'hero-minimal' : 'hero'}">
        ${heroSection.layout === 'split' ? `
            <div>
                <h1>${escapeHtml(headline)}</h1>
                <p>${escapeHtml(subheadline)}</p>
                ${heroSection.showCTA ? `<button class="cta-button" onclick="document.querySelector('.products-section').scrollIntoView({behavior: 'smooth'})">${escapeHtml(ctaText)}</button>` : ''}
            </div>
            ${heroSection.splitImage ? `<img src="${heroSection.splitImage}" alt="${escapeHtml(headline)}" style="width: 100%; height: 100%; max-height: 500px; object-fit: cover; border-radius: ${styleConfig.borderRadius}px;">` : '<div class="hero-image-placeholder">Hero Image</div>'}
        ` : heroSection.layout === 'minimal' ? `
            <div class="hero-content">
                <div>
                    <h1>${escapeHtml(headline)}</h1>
                    <p>${escapeHtml(subheadline)}</p>
                </div>
                ${heroSection.showCTA ? `<button class="cta-button" style="padding: 12px 24px; font-size: 14px;" onclick="document.querySelector('.products-section').scrollIntoView({behavior: 'smooth'})">${escapeHtml(ctaText)}</button>` : ''}
            </div>
        ` : `
            <div>
                <h1>${escapeHtml(headline)}</h1>
                <p>${escapeHtml(subheadline)}</p>
                ${heroSection.showCTA ? `<button class="cta-button" onclick="document.querySelector('.products-section').scrollIntoView({behavior: 'smooth'})">${escapeHtml(ctaText)}</button>` : ''}
            </div>
        `}
    </section>
    ` : ''}
    
    ${productsSection.enabled && appState.products.length > 0 ? `
    <!-- Products Section -->
    <section class="products-section">
        ${productsSection.headline ? `<h2 class="section-title" style="margin-bottom: ${productsHeaderSpacing}px;">${escapeHtml(productsSection.headline)}</h2>` : ''}
        ${productsSection.subheadline ? `<p style="text-align: center; font-size: 16px; color: ${productsTextColor}; opacity: 0.8; max-width: 800px; margin: 0 auto ${productsSectionSpacing}px auto; line-height: 1.6;">${escapeHtml(productsSection.subheadline)}</p>` : ''}
        <div class="products-grid">
            ${appState.products.map(product => {
                const imageHtml = product.images && product.images.length > 0 
                    ? `<img src="${product.images[0]}" alt="${escapeHtml(product.name)}" class="product-image">`
                    : '<div class="product-image"></div>';
                
                const priceDisplay = `RM ${parseFloat(product.price).toFixed(2)}`;
                const comparePriceHtml = product.comparePrice 
                    ? `<span class="compare-price">RM ${parseFloat(product.comparePrice).toFixed(2)}</span>`
                    : '';
                
                const variantInfo = product.hasVariants && product.variants && product.variants.length > 0
                    ? `<div class="variant-info">${product.variants.length} variants available</div>`
                    : '';
                
                return `
                    <div class="product-card">
                        ${imageHtml}
                        <div class="product-info">
                            <div class="product-name">${escapeHtml(product.name)}</div>
                            ${productsSection.showDescription && product.description ? `<div class="product-description">${escapeHtml(product.description)}</div>` : ''}
                            ${productsSection.showPricing ? `
                            <div class="product-price">
                                ${comparePriceHtml}
                                ${priceDisplay}
                            </div>
                            ` : ''}
                            ${variantInfo}
                            <button class="buy-button" onclick="alert('Add to cart functionality coming soon!')">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    </section>
    ` : ''}
    
    ${appState.content.features && appState.content.features.length > 0 ? `
    <!-- Features Section -->
    <section class="features-section">
        <h2 class="section-title">Why Choose Us</h2>
        <div class="features-grid">
            ${appState.content.features.map(feature => `
                <div class="feature-card">
                    <div class="feature-title">${escapeHtml(feature)}</div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}
    
    ${appState.sections.about.enabled ? `
    <!-- About Section -->
    <section class="about-section" style="padding: ${aboutPadding}px 20px; background: ${aboutBackgroundColor};">
        <div class="about-container" style="max-width: ${aboutContentWidth}; margin: 0 auto; ${appState.sections.about.layout === 'two-column' || appState.sections.about.layout === 'side-image' ? 'display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;' : 'text-align: center; max-width: 800px;'}">
            ${appState.sections.about.layout !== 'centered' ? (appState.sections.about.image ? 
                `<img src="${appState.sections.about.image}" alt="${escapeHtml(appState.sections.about.headline || 'About Us')}" class="about-image" style="width: 100%; height: 300px; object-fit: cover; border-radius: 12px; grid-row: ${appState.sections.about.layout === 'two-column' ? '1' : 'auto'};">` : 
                '<div class="about-image" style="width: 100%; height: 300px; background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #6b7280; grid-row: ${appState.sections.about.layout === \'two-column\' ? \'1\' : \'auto\'};">About Image</div>') : ''}
            <div class="about-text">
                <h2 style="font-size: ${aboutHeadingSize}px; font-weight: ${aboutHeadingWeight}; margin-bottom: 24px; color: ${aboutTextColor};">${escapeHtml(appState.sections.about.headline || 'About Us')}</h2>
                <p style="font-size: ${aboutContentSize}px; line-height: ${aboutLineHeight}; color: ${aboutTextColor};">${escapeHtml(appState.sections.about.content || 'We are passionate about delivering exceptional products and services.')}</p>
            </div>
        </div>
    </section>
    ` : ''}
    
    ${appState.sections.contact.enabled ? `
    <!-- Contact Section -->
    <section class="contact-section" style="padding: ${contactPadding}px; background: ${contactBackgroundColor};">
        <h2 style="text-align: center; font-size: 36px; font-weight: ${styleConfig.fontWeight}; margin-bottom: 48px; color: ${contactTextColor};">Contact Us</h2>
        ${appState.sections.contact.layout === 'form' ? `
        <div style="max-width: ${contactFormWidth}; margin: 0 auto;">
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: ${contactLabelWeight}; font-size: ${contactLabelSize}px; color: ${contactTextColor};">Name</label>
                <input type="text" placeholder="Your name" style="width: 100%; padding: 12px; border: 1px solid ${contactInputBorder}; background: ${contactInputBg}; border-radius: ${contactInputRadius}px; font-family: inherit; font-size: 14px;">
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: ${contactLabelWeight}; font-size: ${contactLabelSize}px; color: ${contactTextColor};">Email</label>
                <input type="email" placeholder="your@email.com" style="width: 100%; padding: 12px; border: 1px solid ${contactInputBorder}; background: ${contactInputBg}; border-radius: ${contactInputRadius}px; font-family: inherit; font-size: 14px;">
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: ${contactLabelWeight}; font-size: ${contactLabelSize}px; color: ${contactTextColor};">Message</label>
                <textarea rows="5" placeholder="Your message" style="width: 100%; padding: 12px; border: 1px solid ${contactInputBorder}; background: ${contactInputBg}; border-radius: ${contactInputRadius}px; font-family: inherit; font-size: 14px;"></textarea>
            </div>
            <button style="width: 100%; padding: 16px; background: ${contactButtonBg}; color: ${contactButtonText}; border: none; border-radius: ${contactInputRadius}px; font-weight: 600; font-size: 16px; cursor: pointer;" onmouseover="this.style.background='${contactButtonHover}'" onmouseout="this.style.background='${contactButtonBg}'">Send Message</button>
        </div>
        ` : appState.sections.contact.layout === 'map' ? `
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
            ${(() => {
                let mapSrc = '';
                if (appState.sections.contact.mapEmbed) {
                    const srcMatch = appState.sections.contact.mapEmbed.match(/src="([^"]+)"/);
                    if (srcMatch) {
                        mapSrc = srcMatch[1];
                    } else if (appState.sections.contact.mapEmbed.includes('google.com/maps')) {
                        mapSrc = appState.sections.contact.mapEmbed;
                    }
                }
                return mapSrc 
                    ? `<iframe src="${mapSrc}" width="100%" height="400" style="border:0; border-radius: ${styleConfig.borderRadius}px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
                    : `<div style="width: 100%; height: 400px; background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%); border-radius: ${styleConfig.borderRadius}px; display: flex; align-items: center; justify-content: center; color: #6b7280;">Map Location</div>`;
            })()}
            <div>
                <div style="margin-bottom: 24px; padding: 20px; background: white; border-radius: ${styleConfig.borderRadius}px; box-shadow: ${styleConfig.shadow};">
                    <strong style="display: block; margin-bottom: 8px; color: ${primaryColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">EMAIL</strong>
                    ${escapeHtml(appState.sections.contact.email || 'hello@example.com')}
                </div>
                <div style="margin-bottom: 24px; padding: 20px; background: white; border-radius: ${styleConfig.borderRadius}px; box-shadow: ${styleConfig.shadow};">
                    <strong style="display: block; margin-bottom: 8px; color: ${primaryColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">PHONE</strong>
                    ${escapeHtml(appState.sections.contact.phone || '+1 (555) 123-4567')}
                </div>
                <div style="margin-bottom: 24px; padding: 20px; background: white; border-radius: ${styleConfig.borderRadius}px; box-shadow: ${styleConfig.shadow};">
                    <strong style="display: block; margin-bottom: 8px; color: ${primaryColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">ADDRESS</strong>
                    ${escapeHtml(appState.sections.contact.address || '123 Business Street, City, State 12345')}
                </div>
            </div>
        </div>
        ` : `
        <div style="max-width: 800px; margin: 0 auto;">
            <div style="margin-bottom: 24px; padding: 20px; background: white; border-radius: ${styleConfig.borderRadius}px; box-shadow: ${styleConfig.shadow};">
                <strong style="display: block; margin-bottom: 8px; color: ${primaryColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">EMAIL</strong>
                ${escapeHtml(appState.sections.contact.email || 'hello@example.com')}
            </div>
            <div style="margin-bottom: 24px; padding: 20px; background: white; border-radius: ${styleConfig.borderRadius}px; box-shadow: ${styleConfig.shadow};">
                <strong style="display: block; margin-bottom: 8px; color: ${primaryColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">PHONE</strong>
                ${escapeHtml(appState.sections.contact.phone || '+1 (555) 123-4567')}
            </div>
            <div style="margin-bottom: 24px; padding: 20px; background: white; border-radius: ${styleConfig.borderRadius}px; box-shadow: ${styleConfig.shadow};">
                <strong style="display: block; margin-bottom: 8px; color: ${primaryColor}; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">ADDRESS</strong>
                ${escapeHtml(appState.sections.contact.address || '123 Business Street, City, State 12345')}
            </div>
        </div>
        `}
    </section>
    ` : ''}
    
    ${appState.sections.whatsapp && appState.sections.whatsapp.enabled && appState.sections.whatsapp.number ? `
    <!-- WhatsApp Button -->
    <a href="https://wa.me/${appState.sections.whatsapp.number.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(appState.sections.whatsapp.message || 'Hi!')}" 
       class="whatsapp-btn whatsapp-${appState.sections.whatsapp.position}" 
       target="_blank" 
       title="Chat on WhatsApp">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="32" height="32">
            <path fill="white" d="M16 0C7.164 0 0 7.164 0 16c0 2.82.736 5.464 2.024 7.76L0 32l8.416-2.208A15.932 15.932 0 0016 32c8.836 0 16-7.164 16-16S24.836 0 16 0zm0 29.344c-2.4 0-4.672-.632-6.624-1.736l-.48-.28-4.848 1.272 1.296-4.728-.312-.496A13.232 13.232 0 012.656 16C2.656 8.636 8.636 2.656 16 2.656S29.344 8.636 29.344 16 23.364 29.344 16 29.344zm7.312-10.016c-.4-.2-2.368-1.168-2.736-1.304-.368-.128-.632-.2-.904.2-.264.4-1.04 1.304-1.272 1.568-.232.272-.472.304-.872.104-.4-.2-1.688-.624-3.216-1.984-1.184-1.056-1.992-2.368-2.224-2.768-.232-.4-.024-.616.176-.816.176-.184.4-.472.6-.712.2-.232.264-.4.4-.664.136-.272.072-.504-.032-.712-.104-.2-.904-2.176-1.24-2.976-.328-.784-.664-.68-.904-.688-.232-.008-.496-.008-.76-.008s-.696.096-1.064.496c-.368.4-1.4 1.36-1.4 3.328s1.432 3.864 1.632 4.128c.2.272 2.816 4.296 6.824 6.024.952.416 1.696.664 2.272.848.952.304 1.824.264 2.512.16.768-.112 2.368-.968 2.704-1.904.336-.936.336-1.736.232-1.904-.096-.176-.36-.272-.76-.472z"/>
        </svg>
    </a>
    ` : ''}
    
    <!-- Footer -->
    <footer class="footer">
        <p>© ${new Date().getFullYear()} ${escapeHtml(headline)}. Built with Axtra Product Page Builder.</p>
    </footer>
</body>
</html>`;
}

// Download HTML file as fallback
function downloadHTML(html) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `product-page-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('✅ HTML file downloaded');
}

// ============================================
// LOCAL STORAGE
// ============================================

function saveToLocalStorage() {
    localStorage.setItem('axtra_builder_v2', JSON.stringify(appState));
}

function loadFromLocalStorage() {
    const saved = localStorage.getItem('axtra_builder_v2');
    if (saved) {
        const loadedState = JSON.parse(saved);
        
        // Deep merge function that preserves defaults
        function deepMerge(target, source) {
            for (const key in source) {
                if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                    if (!target[key]) target[key] = {};
                    deepMerge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
            return target;
        }
        
        // Deep merge loaded state while preserving new defaults
        deepMerge(appState, loadedState);
        
        // Ensure layoutOptions exists (for backward compatibility)
        if (!appState.design.layoutOptions) {
            appState.design.layoutOptions = {
                spacing: 'comfortable',
                borderRadius: 'rounded',
                shadows: 'subtle',
                animations: 'subtle'
            };
        }
        
        // Ensure whatsapp section exists (for backward compatibility)
        if (!appState.sections.whatsapp) {
            appState.sections.whatsapp = {
                enabled: false,
                number: '',
                message: 'Hi! I\'m interested in your products',
                position: 'bottom-right'
            };
        }
        
        // Ensure hero section has all new properties (for backward compatibility)
        if (!appState.sections.hero.hasOwnProperty('showCTA')) {
            appState.sections.hero.showCTA = true;
        }
        if (!appState.sections.hero.hasOwnProperty('useGradient')) {
            appState.sections.hero.useGradient = true;
        }
        if (!appState.sections.hero.hasOwnProperty('backgroundColor')) {
            appState.sections.hero.backgroundColor = null;
        }
        if (!appState.sections.hero.hasOwnProperty('textColor')) {
            appState.sections.hero.textColor = '#ffffff';
        }
        if (!appState.sections.hero.hasOwnProperty('backgroundImage')) {
            appState.sections.hero.backgroundImage = null;
        }
        if (!appState.sections.hero.hasOwnProperty('imageOverlay')) {
            appState.sections.hero.imageOverlay = 50;
        }
        
        // Ensure contact section has mapEmbed property (for backward compatibility)
        if (!appState.sections.contact.hasOwnProperty('mapEmbed')) {
            appState.sections.contact.mapEmbed = '';
        }
        
        // Restore products list
        if (appState.products.length > 0) {
            renderProductsList();
        }
        
        // Restore design selections
        if (appState.design.industry) {
            const industryRadio = document.querySelector(`input[name="industry"][value="${appState.design.industry}"]`);
            if (industryRadio) industryRadio.checked = true;
        }
        
        if (appState.design.style) {
            const styleRadio = document.querySelector(`input[name="designStyle"][value="${appState.design.style}"]`);
            if (styleRadio) styleRadio.checked = true;
        }
        
        // Restore colors (if elements exist - removed in new per-section design)
        const primaryColorInput = document.getElementById('primaryColor');
        const secondaryColorInput = document.getElementById('secondaryColor');
        if (primaryColorInput) primaryColorInput.value = appState.design.primaryColor;
        if (secondaryColorInput) secondaryColorInput.value = appState.design.secondaryColor;
        
        // Restore layout options
        if (appState.design.layoutOptions) {
            ['spacing', 'borderRadius', 'shadows', 'animations'].forEach(option => {
                const value = appState.design.layoutOptions[option];
                if (value) {
                    const radio = document.querySelector(`input[name="${option}"][value="${value}"]`);
                    if (radio) radio.checked = true;
                }
            });
        }
        
        // Restore section controls
        if (appState.sections) {
            // Hero
            const heroEnabled = document.getElementById('heroEnabled');
            const heroShowCTA = document.getElementById('heroShowCTA');
            if (heroEnabled) heroEnabled.checked = appState.sections.hero.enabled;
            if (heroShowCTA) heroShowCTA.checked = appState.sections.hero.showCTA;
            
            const heroLayoutRadio = document.querySelector(`input[name="heroLayout"][value="${appState.sections.hero.layout}"]`);
            if (heroLayoutRadio) heroLayoutRadio.checked = true;
            
            // Hero styling
            const heroBackgroundColor = document.getElementById('heroBackgroundColor');
            const heroTextColor = document.getElementById('heroTextColor');
            const heroTextColorGradient = document.getElementById('heroTextColorGradient');
            const heroTextColorImage = document.getElementById('heroTextColorImage');
            const heroUseGradient = document.getElementById('heroUseGradient');
            const ctaTextPreset = document.getElementById('ctaTextPreset');
            const ctaTextCustom = document.getElementById('ctaTextCustom');
            
            if (heroBackgroundColor && appState.sections.hero.backgroundColor) {
                heroBackgroundColor.value = appState.sections.hero.backgroundColor;
            }
            if (heroTextColor && appState.sections.hero.textColor) {
                heroTextColor.value = appState.sections.hero.textColor;
            }
            if (heroTextColorGradient && appState.sections.hero.textColor) {
                heroTextColorGradient.value = appState.sections.hero.textColor;
            }
            if (heroTextColorImage && appState.sections.hero.textColor) {
                heroTextColorImage.value = appState.sections.hero.textColor;
            }
            if (heroUseGradient) {
                heroUseGradient.checked = appState.sections.hero.useGradient !== false;
            }
            if (ctaTextPreset && appState.sections.hero.ctaText) {
                const ctaText = appState.sections.hero.ctaText;
                const presetExists = Array.from(ctaTextPreset.options).some(opt => opt.value === ctaText);
                if (presetExists) {
                    ctaTextPreset.value = ctaText;
                } else {
                    ctaTextPreset.value = 'custom';
                    if (ctaTextCustom) {
                        ctaTextCustom.style.display = 'block';
                        ctaTextCustom.value = ctaText;
                    }
                }
            }
            
            // Hero background type
            if (appState.sections.hero.backgroundType) {
                const heroBackgroundTypeRadio = document.querySelector(`input[name="heroBackgroundType"][value="${appState.sections.hero.backgroundType}"]`);
                if (heroBackgroundTypeRadio) heroBackgroundTypeRadio.checked = true;
            }
            
            // Hero gradient colors
            const heroGradientStart = document.getElementById('heroGradientStart');
            const heroGradientEnd = document.getElementById('heroGradientEnd');
            const heroGradientAngle = document.getElementById('heroGradientAngle');
            if (heroGradientStart && appState.sections.hero.gradientStart) {
                heroGradientStart.value = appState.sections.hero.gradientStart;
            }
            if (heroGradientEnd && appState.sections.hero.gradientEnd) {
                heroGradientEnd.value = appState.sections.hero.gradientEnd;
            }
            if (heroGradientAngle && appState.sections.hero.gradientAngle !== undefined) {
                heroGradientAngle.value = appState.sections.hero.gradientAngle;
            }
            
            // Hero background image and overlay
            const heroImageOverlay = document.getElementById('heroImageOverlay');
            if (heroImageOverlay && appState.sections.hero.imageOverlay !== undefined) {
                heroImageOverlay.value = appState.sections.hero.imageOverlay;
            }
            
            // Hero typography
            const heroHeadlineSize = document.getElementById('heroHeadlineSize');
            const heroFontWeight = document.getElementById('heroFontWeight');
            if (heroHeadlineSize && appState.sections.hero.headlineSize !== undefined) {
                heroHeadlineSize.value = appState.sections.hero.headlineSize;
            }
            if (heroFontWeight && appState.sections.hero.fontWeight !== undefined) {
                heroFontWeight.value = appState.sections.hero.fontWeight;
            }
            
            // Hero CTA design
            const heroCtaBackground = document.getElementById('heroCtaBackground');
            const heroCtaTextColor = document.getElementById('heroCtaTextColor');
            const heroCtaHoverBg = document.getElementById('heroCtaHoverBg');
            const heroCtaBorderRadius = document.getElementById('heroCtaBorderRadius');
            if (heroCtaBackground && appState.sections.hero.ctaBackground) {
                heroCtaBackground.value = appState.sections.hero.ctaBackground;
            }
            if (heroCtaTextColor && appState.sections.hero.ctaTextColor) {
                heroCtaTextColor.value = appState.sections.hero.ctaTextColor;
            }
            if (heroCtaHoverBg && appState.sections.hero.ctaHoverBg) {
                heroCtaHoverBg.value = appState.sections.hero.ctaHoverBg;
            }
            if (heroCtaBorderRadius && appState.sections.hero.ctaBorderRadius !== undefined) {
                heroCtaBorderRadius.value = appState.sections.hero.ctaBorderRadius;
            }
            
            // Hero dimensions
            const heroPadding = document.getElementById('heroPadding');
            const heroHeight = document.getElementById('heroHeight');
            const heroContentWidth = document.getElementById('heroContentWidth');
            if (heroPadding && appState.sections.hero.padding !== undefined) {
                heroPadding.value = appState.sections.hero.padding;
            }
            if (heroHeight && appState.sections.hero.height !== undefined) {
                heroHeight.value = appState.sections.hero.height;
            }
            if (heroContentWidth && appState.sections.hero.contentWidth !== undefined) {
                heroContentWidth.value = appState.sections.hero.contentWidth;
            }
            
            // Products
            const productsEnabled = document.getElementById('productsEnabled');
            const productsHeadline = document.getElementById('productsHeadline');
            const productsSubheadline = document.getElementById('productsSubheadline');
            const productsShowDescription = document.getElementById('productsShowDescription');
            const productsShowPricing = document.getElementById('productsShowPricing');
            if (productsEnabled) productsEnabled.checked = appState.sections.products.enabled;
            if (productsHeadline && appState.sections.products.headline) productsHeadline.value = appState.sections.products.headline;
            if (productsSubheadline && appState.sections.products.subheadline) productsSubheadline.value = appState.sections.products.subheadline;
            if (productsShowDescription) productsShowDescription.checked = appState.sections.products.showDescription;
            if (productsShowPricing) productsShowPricing.checked = appState.sections.products.showPricing;
            
            const productsLayoutRadio = document.querySelector(`input[name="productsLayout"][value="${appState.sections.products.layout}"]`);
            if (productsLayoutRadio) productsLayoutRadio.checked = true;
            
            const productsColumnsInput = document.getElementById('productsColumns');
            if (productsColumnsInput) productsColumnsInput.value = appState.sections.products.columns || 3;
            
            // Restore products design controls
            const productsSectionBg = document.getElementById('productsSectionBg');
            const productsCardBg = document.getElementById('productsCardBg');
            const productsTextColor = document.getElementById('productsTextColor');
            const productsCardRadius = document.getElementById('productsCardRadius');
            const productsCardShadow = document.getElementById('productsCardShadow');
            const productsHoverEffect = document.getElementById('productsHoverEffect');
            const productsHoverBorder = document.getElementById('productsHoverBorder');
            const productsTitleSize = document.getElementById('productsTitleSize');
            const productsTitleWeight = document.getElementById('productsTitleWeight');
            const productsPriceColor = document.getElementById('productsPriceColor');
            const productsPriceSize = document.getElementById('productsPriceSize');
            const productsCardPadding = document.getElementById('productsCardPadding');
            const productsGap = document.getElementById('productsGap');
            const productsHeaderSpacing = document.getElementById('productsHeaderSpacing');
            const productsSectionSpacing = document.getElementById('productsSectionSpacing');
            
            if (productsSectionBg && appState.sections.products.sectionBg) productsSectionBg.value = appState.sections.products.sectionBg;
            if (productsCardBg && appState.sections.products.cardBg) productsCardBg.value = appState.sections.products.cardBg;
            if (productsTextColor && appState.sections.products.textColor) productsTextColor.value = appState.sections.products.textColor;
            if (productsCardRadius && appState.sections.products.cardRadius !== undefined) productsCardRadius.value = appState.sections.products.cardRadius;
            if (productsCardShadow && appState.sections.products.cardShadow) productsCardShadow.value = appState.sections.products.cardShadow;
            if (productsHoverEffect && appState.sections.products.hoverEffect) productsHoverEffect.value = appState.sections.products.hoverEffect;
            if (productsHoverBorder && appState.sections.products.hoverBorder) productsHoverBorder.value = appState.sections.products.hoverBorder;
            if (productsTitleSize && appState.sections.products.titleSize !== undefined) productsTitleSize.value = appState.sections.products.titleSize;
            if (productsTitleWeight && appState.sections.products.titleWeight !== undefined) productsTitleWeight.value = appState.sections.products.titleWeight;
            if (productsPriceColor && appState.sections.products.priceColor) productsPriceColor.value = appState.sections.products.priceColor;
            if (productsPriceSize && appState.sections.products.priceSize !== undefined) productsPriceSize.value = appState.sections.products.priceSize;
            if (productsCardPadding && appState.sections.products.cardPadding !== undefined) productsCardPadding.value = appState.sections.products.cardPadding;
            if (productsGap && appState.sections.products.gap !== undefined) productsGap.value = appState.sections.products.gap;
            if (productsHeaderSpacing && appState.sections.products.headerSpacing !== undefined) productsHeaderSpacing.value = appState.sections.products.headerSpacing;
            if (productsSectionSpacing && appState.sections.products.sectionSpacing !== undefined) productsSectionSpacing.value = appState.sections.products.sectionSpacing;
            
            // About
            const aboutEnabled = document.getElementById('aboutEnabled');
            if (aboutEnabled) aboutEnabled.checked = appState.sections.about.enabled;
            
            const aboutLayoutRadio = document.querySelector(`input[name="aboutLayout"][value="${appState.sections.about.layout}"]`);
            if (aboutLayoutRadio) aboutLayoutRadio.checked = true;
            
            // Restore about design controls
            const aboutBackgroundColor = document.getElementById('aboutBackgroundColor');
            const aboutTextColor = document.getElementById('aboutTextColor');
            const aboutHeadingSize = document.getElementById('aboutHeadingSize');
            const aboutHeadingWeight = document.getElementById('aboutHeadingWeight');
            const aboutContentSize = document.getElementById('aboutContentSize');
            const aboutLineHeight = document.getElementById('aboutLineHeight');
            const aboutPadding = document.getElementById('aboutPadding');
            const aboutContentWidth = document.getElementById('aboutContentWidth');
            const aboutAccentColor = document.getElementById('aboutAccentColor');
            const aboutBorderStyle = document.getElementById('aboutBorderStyle');
            
            if (aboutBackgroundColor && appState.sections.about.backgroundColor) aboutBackgroundColor.value = appState.sections.about.backgroundColor;
            if (aboutTextColor && appState.sections.about.textColor) aboutTextColor.value = appState.sections.about.textColor;
            if (aboutHeadingSize && appState.sections.about.headingSize !== undefined) aboutHeadingSize.value = appState.sections.about.headingSize;
            if (aboutHeadingWeight && appState.sections.about.headingWeight !== undefined) aboutHeadingWeight.value = appState.sections.about.headingWeight;
            if (aboutContentSize && appState.sections.about.contentSize !== undefined) aboutContentSize.value = appState.sections.about.contentSize;
            if (aboutLineHeight && appState.sections.about.lineHeight !== undefined) aboutLineHeight.value = appState.sections.about.lineHeight;
            if (aboutPadding && appState.sections.about.padding !== undefined) aboutPadding.value = appState.sections.about.padding;
            if (aboutContentWidth && appState.sections.about.contentWidth !== undefined) aboutContentWidth.value = appState.sections.about.contentWidth;
            if (aboutAccentColor && appState.sections.about.accentColor) aboutAccentColor.value = appState.sections.about.accentColor;
            if (aboutBorderStyle && appState.sections.about.borderStyle) aboutBorderStyle.value = appState.sections.about.borderStyle;
            
            // Contact
            const contactEnabled = document.getElementById('contactEnabled');
            if (contactEnabled) contactEnabled.checked = appState.sections.contact.enabled;
            
            const contactLayoutRadio = document.querySelector(`input[name="contactLayout"][value="${appState.sections.contact.layout}"]`);
            if (contactLayoutRadio) contactLayoutRadio.checked = true;
            
            // Restore contact design controls
            const contactBackgroundColor = document.getElementById('contactBackgroundColor');
            const contactTextColor = document.getElementById('contactTextColor');
            const contactInputBg = document.getElementById('contactInputBg');
            const contactInputBorder = document.getElementById('contactInputBorder');
            const contactFocusBorder = document.getElementById('contactFocusBorder');
            const contactInputRadius = document.getElementById('contactInputRadius');
            const contactButtonBg = document.getElementById('contactButtonBg');
            const contactButtonText = document.getElementById('contactButtonText');
            const contactButtonHover = document.getElementById('contactButtonHover');
            const contactButtonSize = document.getElementById('contactButtonSize');
            const contactLabelSize = document.getElementById('contactLabelSize');
            const contactLabelWeight = document.getElementById('contactLabelWeight');
            const contactPadding = document.getElementById('contactPadding');
            
            if (contactBackgroundColor && appState.sections.contact.backgroundColor) contactBackgroundColor.value = appState.sections.contact.backgroundColor;
            if (contactTextColor && appState.sections.contact.textColor) contactTextColor.value = appState.sections.contact.textColor;
            if (contactInputBg && appState.sections.contact.inputBg) contactInputBg.value = appState.sections.contact.inputBg;
            if (contactInputBorder && appState.sections.contact.inputBorder) contactInputBorder.value = appState.sections.contact.inputBorder;
            if (contactFocusBorder && appState.sections.contact.focusBorder) contactFocusBorder.value = appState.sections.contact.focusBorder;
            if (contactInputRadius && appState.sections.contact.inputRadius !== undefined) contactInputRadius.value = appState.sections.contact.inputRadius;
            if (contactButtonBg && appState.sections.contact.buttonBg) contactButtonBg.value = appState.sections.contact.buttonBg;
            if (contactButtonText && appState.sections.contact.buttonText) contactButtonText.value = appState.sections.contact.buttonText;
            if (contactButtonHover && appState.sections.contact.buttonHover) contactButtonHover.value = appState.sections.contact.buttonHover;
            if (contactButtonSize && appState.sections.contact.buttonSize !== undefined) contactButtonSize.value = appState.sections.contact.buttonSize;
            if (contactLabelSize && appState.sections.contact.labelSize !== undefined) contactLabelSize.value = appState.sections.contact.labelSize;
            if (contactLabelWeight && appState.sections.contact.labelWeight !== undefined) contactLabelWeight.value = appState.sections.contact.labelWeight;
            if (contactPadding && appState.sections.contact.padding !== undefined) contactPadding.value = appState.sections.contact.padding;
            
            // WhatsApp
            const whatsappEnabled = document.getElementById('whatsappEnabled');
            if (whatsappEnabled && appState.sections.whatsapp) {
                whatsappEnabled.checked = appState.sections.whatsapp.enabled;
            }
            
            const whatsappPositionRadio = document.querySelector(`input[name="whatsappPosition"][value="${appState.sections.whatsapp?.position || 'bottom-right'}"]`);
            if (whatsappPositionRadio) whatsappPositionRadio.checked = true;
        }
        
        // Restore content
        if (appState.content.heroHeadline) {
            document.getElementById('heroHeadline').value = appState.content.heroHeadline;
        }
        if (appState.content.heroSubheadline) {
            document.getElementById('heroSubheadline').value = appState.content.heroSubheadline;
        }
        
        // Restore about section content
        if (appState.sections && appState.sections.about) {
            const aboutHeadline = document.getElementById('aboutHeadline');
            const aboutContent = document.getElementById('aboutContent');
            const aboutImagePreview = document.getElementById('aboutImagePreview');
            const aboutImagePreviewImg = document.getElementById('aboutImagePreviewImg');
            
            if (aboutHeadline && appState.sections.about.headline) {
                aboutHeadline.value = appState.sections.about.headline;
            }
            if (aboutContent && appState.sections.about.content) {
                aboutContent.value = appState.sections.about.content;
            }
            if (appState.sections.about.image) {
                if (aboutImagePreviewImg) aboutImagePreviewImg.src = appState.sections.about.image;
                if (aboutImagePreview) aboutImagePreview.style.display = 'block';
            }
        }
        
        // Restore contact section content
        if (appState.sections && appState.sections.contact) {
            const contactEmail = document.getElementById('contactEmail');
            const contactPhone = document.getElementById('contactPhone');
            const contactAddress = document.getElementById('contactAddress');
            if (contactEmail && appState.sections.contact.email) {
                contactEmail.value = appState.sections.contact.email;
            }
            if (contactPhone && appState.sections.contact.phone) {
                contactPhone.value = appState.sections.contact.phone;
            }
            if (contactAddress && appState.sections.contact.address) {
                contactAddress.value = appState.sections.contact.address;
            }
        }
        
        // Restore WhatsApp content
        if (appState.sections && appState.sections.whatsapp) {
            const whatsappNumber = document.getElementById('whatsappNumber');
            const whatsappMessage = document.getElementById('whatsappMessage');
            if (whatsappNumber && appState.sections.whatsapp.number) {
                whatsappNumber.value = appState.sections.whatsapp.number;
            }
            if (whatsappMessage && appState.sections.whatsapp.message) {
                whatsappMessage.value = appState.sections.whatsapp.message;
            }
        }
        
        // Sync section options display with enabled state
        syncSectionOptionsDisplay();
        
        updatePreview();
    }
}

// Sync section options display based on enabled state
function syncSectionOptionsDisplay() {
    const heroOptions = document.getElementById('heroOptions');
    const productsOptions = document.getElementById('productsOptions');
    const aboutOptions = document.getElementById('aboutOptions');
    const contactOptions = document.getElementById('contactOptions');
    const whatsappOptions = document.getElementById('whatsappOptions');
    
    if (heroOptions) {
        heroOptions.style.display = appState.sections.hero.enabled ? 'block' : 'none';
    }
    if (productsOptions) {
        productsOptions.style.display = appState.sections.products.enabled ? 'block' : 'none';
    }
    if (aboutOptions) {
        aboutOptions.style.display = appState.sections.about.enabled ? 'block' : 'none';
    }
    if (contactOptions) {
        contactOptions.style.display = appState.sections.contact.enabled ? 'block' : 'none';
    }
    if (whatsappOptions) {
        whatsappOptions.style.display = appState.sections.whatsapp.enabled ? 'block' : 'none';
    }
    
    // Sync conditional design controls
    // Hero: CTA Button Design only when CTA is enabled
    const heroCtaDesignGroup = document.getElementById('heroCtaDesignGroup');
    if (heroCtaDesignGroup) {
        heroCtaDesignGroup.style.display = appState.sections.hero.showCTA ? 'block' : 'none';
    }
    
    // Contact: Form styling and button only for 'form' layout
    const contactFormStyleGroup = document.getElementById('contactFormStyleGroup');
    const contactButtonGroup = document.getElementById('contactButtonGroup');
    if (contactFormStyleGroup) {
        contactFormStyleGroup.style.display = appState.sections.contact.layout === 'form' ? 'block' : 'none';
    }
    if (contactButtonGroup) {
        contactButtonGroup.style.display = appState.sections.contact.layout === 'form' ? 'block' : 'none';
    }
}

// ============================================
// UTILITIES
// ============================================

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

console.log('✅ Axtra Product Page Builder V2 loaded successfully!');
