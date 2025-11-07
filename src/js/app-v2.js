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
            layout: 'centered', // centered, split, minimal
            headline: '',
            subheadline: '',
            ctaText: 'Shop Now',
            showCTA: true,
            backgroundColor: null, // null = use primary color from design
            textColor: '#ffffff',
            useGradient: true,
            backgroundImage: null, // base64 image data
            imageOverlay: 50 // 0-100 opacity
        },
        products: {
            enabled: true,
            layout: 'grid', // grid, carousel, masonry, list
            columns: 3, // 2, 3, 4
            showPricing: true,
            showDescription: true
        },
        about: {
            enabled: false,
            layout: 'two-column', // two-column, centered, side-image
            headline: 'About Us',
            content: ''
        },
        features: {
            enabled: false,
            layout: 'grid', // grid, list, icons
            items: []
        },
        testimonials: {
            enabled: false,
            layout: 'carousel', // carousel, grid, single
            items: []
        },
        contact: {
            enabled: false,
            layout: 'form', // form, details, map
            email: '',
            phone: '',
            address: '',
            mapEmbed: '' // Google Maps iframe embed code
        },
        whatsapp: {
            enabled: false,
            number: '',
            message: 'Hi! I\'m interested in your products',
            position: 'bottom-right' // bottom-right, bottom-left
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
    
    // Show preview panel by default on desktop
    const previewPanel = document.getElementById('previewPanel');
    if (previewPanel && window.innerWidth > 1024) {
        previewPanel.classList.add('active');
        const previewToggleBtn = document.getElementById('previewToggleBtn');
        if (previewToggleBtn) {
            const toggleText = previewToggleBtn.querySelector('.toggle-text');
            if (toggleText) toggleText.textContent = 'Hide Preview';
        }
    }
    
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
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    heroShowCTA.addEventListener('change', (e) => {
        appState.sections.hero.showCTA = e.target.checked;
        const ctaTextGroup = document.getElementById('ctaTextGroup');
        if (ctaTextGroup) {
            ctaTextGroup.style.display = e.target.checked ? 'block' : 'none';
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
    
    // Products Section
    const productsEnabled = document.getElementById('productsEnabled');
    const productsOptions = document.getElementById('productsOptions');
    const productsShowDescription = document.getElementById('productsShowDescription');
    const productsShowPricing = document.getElementById('productsShowPricing');
    
    productsEnabled.addEventListener('change', (e) => {
        appState.sections.products.enabled = e.target.checked;
        productsOptions.style.display = e.target.checked ? 'block' : 'none';
        updatePreview();
        saveToLocalStorage();
    });
    
    document.querySelectorAll('input[name="productsLayout"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.sections.products.layout = e.target.value;
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    document.querySelectorAll('input[name="productsColumns"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            appState.sections.products.columns = parseInt(e.target.value);
            updatePreview();
            saveToLocalStorage();
        });
    });
    
    productsShowDescription.addEventListener('change', (e) => {
        appState.sections.products.showDescription = e.target.checked;
        updatePreview();
        saveToLocalStorage();
    });
    
    productsShowPricing.addEventListener('change', (e) => {
        appState.sections.products.showPricing = e.target.checked;
        updatePreview();
        saveToLocalStorage();
    });
    
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
            if (mapLinkGroup) {
                mapLinkGroup.style.display = e.target.value === 'map' ? 'block' : 'none';
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
    if (previewToggleBtn) {
        previewToggleBtn.addEventListener('click', () => {
            const previewPanel = document.getElementById('previewPanel');
            previewPanel.classList.toggle('active');
            const isActive = previewPanel.classList.contains('active');
            
            // Set flag to remember user's preference
            if (isActive) {
                previewPanel.removeAttribute('data-user-hidden');
            } else {
                previewPanel.setAttribute('data-user-hidden', 'true');
            }
            
            previewToggleBtn.querySelector('.toggle-text').textContent = isActive ? 'Hide Preview' : 'Show Preview';
            
            // Update mobile menu text if exists
            const mobileToggleText = document.querySelector('.mobile-toggle-text');
            if (mobileToggleText) {
                mobileToggleText.textContent = isActive ? 'Hide Preview' : 'Show Preview';
            }
        });
    }
    
    if (previewCloseBtn) {
        previewCloseBtn.addEventListener('click', () => {
            const previewPanel = document.getElementById('previewPanel');
            previewPanel.classList.remove('active');
            previewPanel.setAttribute('data-user-hidden', 'true');
            
            if (previewToggleBtn) {
                previewToggleBtn.querySelector('.toggle-text').textContent = 'Show Preview';
            }
            const mobileToggleText = document.querySelector('.mobile-toggle-text');
            if (mobileToggleText) {
                mobileToggleText.textContent = 'Show Preview';
            }
        });
    }
    
    // Full preview button (opens in new window)
    const openFullPreviewBtn = document.getElementById('openFullPreviewBtn');
    if (openFullPreviewBtn) {
        openFullPreviewBtn.addEventListener('click', generatePage);
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
    
    // Color inputs
    document.getElementById('primaryColor').addEventListener('change', (e) => {
        appState.design.primaryColor = e.target.value;
        updatePreview();
        saveToLocalStorage();
    });
    
    document.getElementById('secondaryColor').addEventListener('change', (e) => {
        appState.design.secondaryColor = e.target.value;
        updatePreview();
        saveToLocalStorage();
    });
    
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
    
    // Handle window resize for preview panel visibility
    window.addEventListener('resize', debounce(() => {
        const previewPanel = document.getElementById('previewPanel');
        if (previewPanel && window.innerWidth > 1024) {
            // On desktop, show preview by default if not explicitly hidden
            if (!previewPanel.hasAttribute('data-user-hidden')) {
                previewPanel.classList.add('active');
                const previewToggleBtn = document.getElementById('previewToggleBtn');
                if (previewToggleBtn) {
                    const toggleText = previewToggleBtn.querySelector('.toggle-text');
                    if (toggleText) toggleText.textContent = 'Hide Preview';
                }
            }
        } else if (window.innerWidth <= 1024) {
            // On mobile/tablet, hide by default
            previewPanel.classList.remove('active');
            previewPanel.removeAttribute('data-user-hidden');
        }
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
    const industry = appState.design.industry || 'saas';
    const style = appState.design.style || 'minimal';
    const primaryColor = appState.design.primaryColor;
    const secondaryColor = appState.design.secondaryColor;
    const accentColor = appState.design.accentColor || '#48bb78';
    const layoutOptions = appState.design.layoutOptions;
    
    console.log(`🎨 Generating preview with style: ${style}, industry: ${industry}`);
    
    // Get style configuration from DesignEngine if available
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
        
        console.log(`✅ Applied ${engineStyle.name} style config:`, {
            spacing: styleConfig.spacing,
            borderRadius: styleConfig.borderRadius,
            shadows: engineStyle.shadows.intensity
        });
        
        // Apply shadow based on style
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
    
    // Override with user's layout options if set
    if (layoutOptions) {
        console.log('📐 Applying layout options override:', layoutOptions);
        
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
        
        console.log('✅ Final styleConfig after overrides:', styleConfig);
    }
    
    const basePadding = 40 * styleConfig.spacing;
    const cardPadding = 24 * styleConfig.spacing;
    const gap = 32 * styleConfig.spacing;
    const heroFontSize = 48 * styleConfig.fontSize;
    const cardTitleSize = 20 * styleConfig.fontSize;
    
    // Get hero section styling (reference early for CSS generation)
    const heroSectionStyle = appState.sections.hero;
    const heroBgColor = heroSectionStyle.backgroundColor || primaryColor;
    const heroTextColor = heroSectionStyle.textColor || '#ffffff';
    const heroUseGradient = heroSectionStyle.useGradient !== false;
    const heroBackgroundImage = heroSectionStyle.backgroundImage;
    const heroImageOverlay = heroSectionStyle.imageOverlay || 50;
    
    // Generate hero background based on settings
    let heroBackground;
    let heroBackgroundStyle;
    
    if (heroBackgroundImage) {
        // If image is uploaded, use it with overlay
        const overlayOpacity = heroImageOverlay / 100;
        heroBackgroundStyle = `
            background-image: linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url('${heroBackgroundImage}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        `;
        heroBackground = ''; // Not used when we have custom style
    } else {
        // Use gradient or solid color
        heroBackground = heroUseGradient 
            ? `linear-gradient(135deg, ${heroBgColor} 0%, ${secondaryColor} 100%)`
            : heroBgColor;
        heroBackgroundStyle = `background: ${heroBackground};`;
    }
    
    let html = `<style>
        .preview-content {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            max-width: 100%;
            overflow-x: hidden;
        }
        .preview-hero-v2 {
            padding: ${basePadding * 2}px ${basePadding}px;
            text-align: center;
            ${heroBackgroundStyle}
            color: ${heroTextColor};
            position: relative;
        }
        .preview-hero-split {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            align-items: center;
            padding: ${basePadding * 2}px ${basePadding}px;
            ${heroBackgroundStyle}
            color: ${heroTextColor};
            text-align: left;
            position: relative;
        }
        .preview-hero-minimal {
            padding: ${basePadding}px ${basePadding}px;
            text-align: left;
            ${heroBackgroundImage ? heroBackgroundStyle : `background: ${heroBgColor};`}
            color: ${heroTextColor};
            border-bottom: 4px solid ${secondaryColor};
        }
        .preview-hero-minimal h1 {
            font-size: clamp(24px, 4vw, 32px) !important;
            margin-bottom: 8px !important;
        }
        .preview-hero-minimal p {
            font-size: clamp(14px, 2vw, 16px) !important;
            margin-bottom: 16px !important;
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
        @media (max-width: 768px) {
            .preview-hero-split {
                grid-template-columns: 1fr;
            }
        }
        .preview-hero-v2 h1 {
            font-size: clamp(28px, 5vw, ${heroFontSize}px);
            font-weight: ${styleConfig.fontWeight};
            margin-bottom: ${16 * styleConfig.spacing}px;
            line-height: 1.2;
        }
        .preview-hero-v2 p {
            font-size: clamp(16px, 3vw, 20px);
            opacity: 0.95;
            margin-bottom: ${32 * styleConfig.spacing}px;
        }
        .preview-cta-btn {
            display: inline-block;
            padding: ${16 * styleConfig.spacing}px ${40 * styleConfig.spacing}px;
            background: ${heroTextColor === '#ffffff' ? 'white' : heroBgColor};
            color: ${heroTextColor === '#ffffff' ? heroBgColor : '#ffffff'};
            border-radius: ${styleConfig.borderRadius}px;
            text-decoration: none;
            font-weight: 600;
            box-shadow: ${styleConfig.shadow};
            transition: ${styleConfig.transition};
        }
        .preview-cta-btn:hover {
            box-shadow: ${styleConfig.shadowHover};
            transform: ${styleConfig.transition === 'none' ? 'none' : 'translateY(-2px)'};
        }
        .preview-products-section {
            padding: ${basePadding * 2}px ${basePadding}px;
            background: #f7fafc;
        }
        .preview-products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: ${gap}px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
        }
        @media (max-width: 768px) {
            .preview-products-grid {
                grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
                gap: ${gap * 0.75}px;
            }
        }
        @media (max-width: 480px) {
            .preview-products-grid {
                grid-template-columns: 1fr;
                gap: ${gap * 0.5}px;
            }
        }
        .preview-product-card {
            background: white;
            border-radius: ${styleConfig.borderRadius}px;
            overflow: hidden;
            box-shadow: ${styleConfig.shadow};
            transition: ${styleConfig.transition};
        }
        .preview-product-card:hover {
            transform: ${styleConfig.transition === 'none' ? 'none' : 'translateY(-4px)'};
            box-shadow: ${styleConfig.shadowHover};
        }
        .preview-product-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%);
        }
        .preview-product-info {
            padding: ${cardPadding}px;
        }
        .preview-product-name {
            font-size: ${cardTitleSize}px;
            font-weight: ${styleConfig.fontWeight};
            color: #1a202c;
            margin-bottom: ${8 * styleConfig.spacing}px;
        }
        .preview-product-desc {
            font-size: 14px;
            color: #718096;
            margin-bottom: ${16 * styleConfig.spacing}px;
            line-height: 1.6;
        }
        .preview-product-price {
            font-size: ${28 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            color: ${primaryColor};
            margin-bottom: ${16 * styleConfig.spacing}px;
        }
        .preview-buy-btn {
            width: 100%;
            padding: ${12 * styleConfig.spacing}px;
            background: ${primaryColor};
            color: white;
            border: none;
            border-radius: ${styleConfig.borderRadius}px;
            font-weight: 600;
            cursor: pointer;
            transition: ${styleConfig.transition};
        }
        .preview-buy-btn:hover {
            background: ${secondaryColor};
        }
        
        /* About Section Styles */
        .preview-about-section {
            padding: ${basePadding * 2}px ${basePadding}px;
            background: white;
        }
        .preview-about-centered {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        .preview-about-two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            max-width: 1200px;
            margin: 0 auto;
            align-items: center;
        }
        .preview-about-side-image {
            display: grid;
            grid-template-columns: 400px 1fr;
            gap: 48px;
            max-width: 1200px;
            margin: 0 auto;
            align-items: center;
        }
        .preview-about-section h2 {
            font-size: ${32 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            margin-bottom: ${24 * styleConfig.spacing}px;
            color: #1a202c;
        }
        .preview-about-section p {
            font-size: 16px;
            line-height: 1.8;
            color: #4a5568;
        }
        .about-image-placeholder {
            width: 100%;
            height: 300px;
            background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%);
            border-radius: ${styleConfig.borderRadius}px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
        }
        @media (max-width: 768px) {
            .preview-about-two-column,
            .preview-about-side-image {
                grid-template-columns: 1fr;
            }
        }
        
        /* Contact Section Styles */
        .preview-contact-section {
            padding: ${basePadding * 2}px ${basePadding}px;
            background: #f7fafc;
        }
        .preview-contact-form {
            max-width: 600px;
            margin: 0 auto;
        }
        .preview-contact-details {
            max-width: 800px;
            margin: 0 auto;
        }
        .preview-contact-map {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            max-width: 1200px;
            margin: 0 auto;
        }
        .preview-contact-section h2 {
            font-size: ${32 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            margin-bottom: ${32 * styleConfig.spacing}px;
            color: #1a202c;
            text-align: center;
        }
        .contact-info-item {
            margin-bottom: ${24 * styleConfig.spacing}px;
            padding: ${20 * styleConfig.spacing}px;
            background: white;
            border-radius: ${styleConfig.borderRadius}px;
            box-shadow: ${styleConfig.shadow};
        }
        .contact-info-item strong {
            display: block;
            margin-bottom: 8px;
            color: ${primaryColor};
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .map-placeholder {
            width: 100%;
            height: 400px;
            background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%);
            border-radius: ${styleConfig.borderRadius}px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6b7280;
        }
        .contact-form-field {
            margin-bottom: ${16 * styleConfig.spacing}px;
        }
        .contact-form-field label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #2d3748;
        }
        .contact-form-field input,
        .contact-form-field textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #e2e8f0;
            border-radius: ${styleConfig.borderRadius}px;
            font-family: inherit;
            font-size: 14px;
        }
        .contact-submit-btn {
            width: 100%;
            padding: ${16 * styleConfig.spacing}px;
            background: ${primaryColor};
            color: white;
            border: none;
            border-radius: ${styleConfig.borderRadius}px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: ${styleConfig.transition};
        }
        .contact-submit-btn:hover {
            background: ${secondaryColor};
        }
        @media (max-width: 768px) {
            .preview-contact-map {
                grid-template-columns: 1fr;
            }
        }
        
        /* WhatsApp Button */
        .whatsapp-button {
            position: fixed;
            bottom: 24px;
            z-index: 1000;
            width: 60px;
            height: 60px;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        .whatsapp-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }
        .whatsapp-button.position-right {
            right: 24px;
        }
        .whatsapp-button.position-left {
            left: 24px;
        }
        .whatsapp-button svg {
            width: 32px;
            height: 32px;
            fill: white;
        }
    </style>`;
    
    // Hero Section - Use sections state
    const heroSection = appState.sections.hero;
    const headline = heroSection.headline || appState.content.heroHeadline || 'Welcome to Our Store';
    const subheadline = heroSection.subheadline || appState.content.heroSubheadline || 'Discover amazing products that transform your life';
    const ctaText = heroSection.ctaText || 'Shop Now';
    
    // Get style name for display
    const styleName = appState.designEngine && appState.designEngine.designStyles[style] 
        ? appState.designEngine.designStyles[style].name 
        : style.charAt(0).toUpperCase() + style.slice(1);
    
    const industryName = appState.designEngine && appState.designEngine.industries[industry]
        ? appState.designEngine.industries[industry].name
        : industry.charAt(0).toUpperCase() + industry.slice(1);
    
    // Only render hero if enabled
    if (heroSection.enabled) {
        const heroClass = heroSection.layout === 'split' ? 'preview-hero-split' : 
                         heroSection.layout === 'minimal' ? 'preview-hero-minimal' : 
                         'preview-hero-v2';
        
        html += `<section class="${heroClass}">`;
        
        if (heroSection.layout === 'split') {
            // Split layout - text on left, image on right
            html += `
                <div>
                    <div style="position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: ${styleConfig.borderRadius}px; font-size: 12px; backdrop-filter: blur(10px);">
                        ${industryName} • ${styleName}
                    </div>
                    <h1 style="font-size: clamp(28px, 5vw, ${heroFontSize}px); font-weight: ${styleConfig.fontWeight}; margin-bottom: ${16 * styleConfig.spacing}px; line-height: 1.2;">${escapeHtml(headline)}</h1>
                    <p style="font-size: clamp(16px, 3vw, 20px); opacity: 0.95; margin-bottom: ${32 * styleConfig.spacing}px;">${escapeHtml(subheadline)}</p>
                    ${heroSection.showCTA ? `<a href="#" class="preview-cta-btn">${escapeHtml(ctaText)}</a>` : ''}
                </div>
                <div class="hero-image-placeholder">Hero Image</div>
            `;
        } else if (heroSection.layout === 'minimal') {
            // Minimal layout - compact header style
            html += `
                <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                    <div>
                        <h1>${escapeHtml(headline)}</h1>
                        <p>${escapeHtml(subheadline)}</p>
                    </div>
                    ${heroSection.showCTA ? `<a href="#" class="preview-cta-btn" style="padding: 12px 24px; font-size: 14px;">${escapeHtml(ctaText)}</a>` : ''}
                </div>
            `;
        } else {
            // Centered layout (default)
            html += `
                <div style="position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: ${styleConfig.borderRadius}px; font-size: 12px; backdrop-filter: blur(10px);">
                    ${industryName} • ${styleName}
                </div>
                <h1>${escapeHtml(headline)}</h1>
                <p>${escapeHtml(subheadline)}</p>
                ${heroSection.showCTA ? `<a href="#" class="preview-cta-btn">${escapeHtml(ctaText)}</a>` : ''}
            `;
        }
        
        html += `</section>`;
    }
    
    // Products Section - Use sections state
    const productsSection = appState.sections.products;
    if (productsSection.enabled && appState.products.length > 0) {
        html += `<section class="preview-products-section">`;
        html += `<div class="preview-products-grid" style="grid-template-columns: repeat(auto-fill, minmax(${productsSection.columns === 2 ? '340px' : productsSection.columns === 4 ? '220px' : '280px'}, 1fr));">`;
        
        appState.products.forEach(product => {
            const currencySymbol = product.currency === 'USD' ? '$' : product.currency === 'EUR' ? '€' : product.currency === 'GBP' ? '£' : product.currency;
            const priceDisplay = ['USD', 'EUR', 'GBP'].includes(product.currency) 
                ? `${currencySymbol}${product.price}` 
                : `${product.price} ${product.currency}`;
            
            html += `
                <div class="preview-product-card">
                    ${product.image ? `<img src="${product.image}" alt="${escapeHtml(product.name)}" class="preview-product-image">` : '<div class="preview-product-image"></div>'}
                    <div class="preview-product-info">
                        <div class="preview-product-name">${escapeHtml(product.name)}</div>
                        ${productsSection.showDescription && product.description ? `<div class="preview-product-desc">${escapeHtml(product.description)}</div>` : ''}
                        ${productsSection.showPricing ? `<div class="preview-product-price">${priceDisplay}</div>` : ''}
                        <button class="preview-buy-btn">Add to Cart</button>
                    </div>
                </div>
            `;
        });
        
        html += `</div></section>`;
    }
    
    // About Section
    const aboutSection = appState.sections.about;
    if (aboutSection.enabled) {
        const aboutHeadline = aboutSection.headline || 'About Us';
        const aboutContent = aboutSection.content || 'We are passionate about delivering exceptional products and services. Our mission is to make a positive impact on our customers\' lives through innovation and quality.';
        
        html += `<section class="preview-about-section">`;
        
        if (aboutSection.layout === 'two-column') {
            html += `
                <div class="preview-about-two-column">
                    <div class="about-image-placeholder">About Image</div>
                    <div>
                        <h2>${escapeHtml(aboutHeadline)}</h2>
                        <p>${escapeHtml(aboutContent)}</p>
                    </div>
                </div>
            `;
        } else if (aboutSection.layout === 'side-image') {
            html += `
                <div class="preview-about-side-image">
                    <div class="about-image-placeholder">About Image</div>
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
                        `<div class="map-placeholder">📍 Add Google Maps embed link in settings</div>`
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
    if (whatsappSection.enabled) {
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
        alert('⚠️ Pop-up blocked! Click OK to download the HTML file instead.');
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
    
    // Get hero section styling
    const heroBgColor = heroSection.backgroundColor || primaryColor;
    const heroTextColor = heroSection.textColor || '#ffffff';
    const heroUseGradient = heroSection.useGradient !== false;
    const heroBackgroundImage = heroSection.backgroundImage;
    const heroImageOverlay = heroSection.imageOverlay || 50;
    
    // Generate hero background
    let heroBackgroundStyle;
    if (heroBackgroundImage) {
        const overlayOpacity = heroImageOverlay / 100;
        heroBackgroundStyle = `
            background-image: linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity})), url('${heroBackgroundImage}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        `;
    } else {
        const heroBackground = heroUseGradient 
            ? `linear-gradient(135deg, ${heroBgColor} 0%, ${secondaryColor} 100%)`
            : heroBgColor;
        heroBackgroundStyle = `background: ${heroBackground};`;
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
            padding: ${sectionPadding}px ${basePadding}px;
            text-align: center;
            ${heroBackgroundStyle}
            color: ${heroTextColor};
            position: relative;
        }
        
        .hero-split {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            align-items: center;
            padding: ${sectionPadding}px ${basePadding}px;
            ${heroBackgroundStyle}
            color: ${heroTextColor};
            text-align: left;
        }
        
        .hero-minimal {
            padding: ${basePadding}px;
            text-align: left;
            ${heroBackgroundImage ? heroBackgroundStyle : `background: ${heroBgColor};`}
            color: ${heroTextColor};
            border-bottom: 4px solid ${secondaryColor};
        }
        
        .hero-minimal .hero-content {
            max-width: 1200px;
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
            font-size: ${48 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            margin-bottom: ${16 * styleConfig.spacing}px;
            line-height: 1.2;
        }
        
        .hero-minimal h1 {
            font-size: ${32 * styleConfig.fontSize}px;
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
            background: ${heroTextColor === '#ffffff' ? 'white' : heroBgColor};
            color: ${heroTextColor === '#ffffff' ? heroBgColor : '#ffffff'};
            border-radius: ${styleConfig.borderRadius}px;
            text-decoration: none;
            font-weight: 600;
            font-size: 18px;
            box-shadow: ${styleConfig.shadow};
            transition: ${styleConfig.transition};
            cursor: pointer;
            border: none;
        }
        
        .cta-button:hover {
            box-shadow: ${styleConfig.shadowHover};
            transform: ${styleConfig.transition === 'none' ? 'none' : 'translateY(-2px)'};
        }
        
        /* Products Section */
        .products-section {
            padding: ${sectionPadding}px ${basePadding}px;
            background: #f7fafc;
        }
        
        .section-title {
            text-align: center;
            font-size: ${36 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            margin-bottom: ${48 * styleConfig.spacing}px;
            color: #1a202c;
        }
        
        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: ${gap}px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .product-card {
            background: white;
            border-radius: ${styleConfig.borderRadius}px;
            overflow: hidden;
            box-shadow: ${styleConfig.shadow};
            transition: ${styleConfig.transition};
            cursor: pointer;
        }
        
        .product-card:hover {
            transform: ${styleConfig.transition === 'none' ? 'none' : 'translateY(-8px)'};
            box-shadow: ${styleConfig.shadowHover};
        }
        
        .product-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%);
        }
        
        .product-info {
            padding: ${cardPadding}px;
        }
        
        .product-name {
            font-size: ${24 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            color: #1a202c;
            margin-bottom: ${8 * styleConfig.spacing}px;
        }
        
        .product-description {
            font-size: 14px;
            color: #718096;
            margin-bottom: ${16 * styleConfig.spacing}px;
            line-height: 1.6;
        }
        
        .product-price {
            font-size: ${32 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            color: ${primaryColor};
            margin-bottom: ${16 * styleConfig.spacing}px;
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
            margin-bottom: ${12 * styleConfig.spacing}px;
            padding: 8px 12px;
            background: #f7fafc;
            border-radius: ${styleConfig.borderRadius / 2}px;
            display: inline-block;
        }
        
        .buy-button {
            width: 100%;
            padding: ${14 * styleConfig.spacing}px;
            background: ${primaryColor};
            color: white;
            border: none;
            border-radius: ${styleConfig.borderRadius}px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: ${styleConfig.transition};
        }
        
        .buy-button:hover {
            background: ${secondaryColor};
            transform: ${styleConfig.transition === 'none' ? 'none' : 'scale(1.02)'};
        }
        
        /* About Section */
        .about-section {
            padding: ${sectionPadding}px ${basePadding}px;
            background: white;
        }
        
        .about-section h2 {
            font-size: ${36 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            margin-bottom: ${24 * styleConfig.spacing}px;
            color: #1a202c;
        }
        
        .about-section p {
            font-size: 16px;
            line-height: 1.8;
            color: #4a5568;
        }
        
        /* Contact Section */
        .contact-section {
            padding: ${sectionPadding}px ${basePadding}px;
            background: #f7fafc;
        }
        
        .contact-section h2 {
            font-size: ${36 * styleConfig.fontSize}px;
            font-weight: ${styleConfig.fontWeight};
            margin-bottom: ${32 * styleConfig.spacing}px;
            color: #1a202c;
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
            width: 60px;
            height: 60px;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            z-index: 1000;
        }
        .whatsapp-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
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
                font-size: ${32 * styleConfig.fontSize}px;
            }
            
            .hero-split {
                grid-template-columns: 1fr;
            }
            
            .products-grid {
                grid-template-columns: 1fr;
            }
            
            .section-title {
                font-size: ${28 * styleConfig.fontSize}px;
            }
            
            .about-section > div {
                grid-template-columns: 1fr !important;
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
            <div class="hero-image-placeholder">Hero Image</div>
        ` : heroSection.layout === 'minimal' ? `
            <div class="hero-content">
                <div>
                    <h1>${escapeHtml(headline)}</h1>
                    <p>${escapeHtml(subheadline)}</p>
                </div>
                ${heroSection.showCTA ? `<button class="cta-button" style="padding: 12px 24px; font-size: 14px;" onclick="document.querySelector('.products-section').scrollIntoView({behavior: 'smooth'})">${escapeHtml(ctaText)}</button>` : ''}
            </div>
        ` : `
            <h1>${escapeHtml(headline)}</h1>
            <p>${escapeHtml(subheadline)}</p>
            ${heroSection.showCTA ? `<button class="cta-button" onclick="document.querySelector('.products-section').scrollIntoView({behavior: 'smooth'})">${escapeHtml(ctaText)}</button>` : ''}
        `}
    </section>
    ` : ''}
    
    ${productsSection.enabled && appState.products.length > 0 ? `
    <!-- Products Section -->
    <section class="products-section">
        <h2 class="section-title">Our Products</h2>
        <div class="products-grid" style="grid-template-columns: repeat(auto-fill, minmax(${productsSection.columns === 2 ? '340px' : productsSection.columns === 4 ? '220px' : '280px'}, 1fr));">
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
                    <div class="feature-icon">✨</div>
                    <div class="feature-title">${escapeHtml(feature)}</div>
                </div>
            `).join('')}
        </div>
    </section>
    ` : ''}
    
    ${appState.sections.about.enabled ? `
    <!-- About Section -->
    <section class="about-section" style="padding: 80px 20px; background: white;">
        <div style="max-width: 1200px; margin: 0 auto; ${appState.sections.about.layout === 'two-column' || appState.sections.about.layout === 'side-image' ? 'display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center;' : 'text-align: center; max-width: 800px;'}">
            ${appState.sections.about.layout !== 'centered' ? '<div style="width: 100%; height: 300px; background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #6b7280;">About Image</div>' : ''}
            <div>
                <h2 style="font-size: 36px; font-weight: ${styleConfig.fontWeight}; margin-bottom: 24px; color: #1a202c;">${escapeHtml(appState.sections.about.headline || 'About Us')}</h2>
                <p style="font-size: 16px; line-height: 1.8; color: #4a5568;">${escapeHtml(appState.sections.about.content || 'We are passionate about delivering exceptional products and services.')}</p>
            </div>
        </div>
    </section>
    ` : ''}
    
    ${appState.sections.contact.enabled ? `
    <!-- Contact Section -->
    <section class="contact-section" style="padding: 80px 20px; background: #f7fafc;">
        <h2 style="text-align: center; font-size: 36px; font-weight: ${styleConfig.fontWeight}; margin-bottom: 48px; color: #1a202c;">Contact Us</h2>
        ${appState.sections.contact.layout === 'form' ? `
        <div style="max-width: 600px; margin: 0 auto;">
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2d3748;">Name</label>
                <input type="text" placeholder="Your name" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: ${styleConfig.borderRadius}px; font-family: inherit; font-size: 14px;">
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2d3748;">Email</label>
                <input type="email" placeholder="your@email.com" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: ${styleConfig.borderRadius}px; font-family: inherit; font-size: 14px;">
            </div>
            <div style="margin-bottom: 16px;">
                <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #2d3748;">Message</label>
                <textarea rows="5" placeholder="Your message" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: ${styleConfig.borderRadius}px; font-family: inherit; font-size: 14px;"></textarea>
            </div>
            <button style="width: 100%; padding: 16px; background: ${primaryColor}; color: white; border: none; border-radius: ${styleConfig.borderRadius}px; font-weight: 600; font-size: 16px; cursor: pointer;">Send Message</button>
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
                    : `<div style="width: 100%; height: 400px; background: linear-gradient(135deg, #e0e7ff 0%, #cfd9ff 100%); border-radius: ${styleConfig.borderRadius}px; display: flex; align-items: center; justify-content: center; color: #6b7280;">📍 Map Location</div>`;
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
        
        // Restore colors
        document.getElementById('primaryColor').value = appState.design.primaryColor;
        document.getElementById('secondaryColor').value = appState.design.secondaryColor;
        
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
            const heroUseGradient = document.getElementById('heroUseGradient');
            const ctaTextPreset = document.getElementById('ctaTextPreset');
            const ctaTextCustom = document.getElementById('ctaTextCustom');
            
            if (heroBackgroundColor && appState.sections.hero.backgroundColor) {
                heroBackgroundColor.value = appState.sections.hero.backgroundColor;
            }
            if (heroTextColor && appState.sections.hero.textColor) {
                heroTextColor.value = appState.sections.hero.textColor;
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
            
            // Products
            const productsEnabled = document.getElementById('productsEnabled');
            const productsShowDescription = document.getElementById('productsShowDescription');
            const productsShowPricing = document.getElementById('productsShowPricing');
            if (productsEnabled) productsEnabled.checked = appState.sections.products.enabled;
            if (productsShowDescription) productsShowDescription.checked = appState.sections.products.showDescription;
            if (productsShowPricing) productsShowPricing.checked = appState.sections.products.showPricing;
            
            const productsLayoutRadio = document.querySelector(`input[name="productsLayout"][value="${appState.sections.products.layout}"]`);
            if (productsLayoutRadio) productsLayoutRadio.checked = true;
            
            const productsColumnsRadio = document.querySelector(`input[name="productsColumns"][value="${appState.sections.products.columns}"]`);
            if (productsColumnsRadio) productsColumnsRadio.checked = true;
            
            // About
            const aboutEnabled = document.getElementById('aboutEnabled');
            if (aboutEnabled) aboutEnabled.checked = appState.sections.about.enabled;
            
            const aboutLayoutRadio = document.querySelector(`input[name="aboutLayout"][value="${appState.sections.about.layout}"]`);
            if (aboutLayoutRadio) aboutLayoutRadio.checked = true;
            
            // Contact
            const contactEnabled = document.getElementById('contactEnabled');
            if (contactEnabled) contactEnabled.checked = appState.sections.contact.enabled;
            
            const contactLayoutRadio = document.querySelector(`input[name="contactLayout"][value="${appState.sections.contact.layout}"]`);
            if (contactLayoutRadio) contactLayoutRadio.checked = true;
            
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
            if (aboutHeadline && appState.sections.about.headline) {
                aboutHeadline.value = appState.sections.about.headline;
            }
            if (aboutContent && appState.sections.about.content) {
                aboutContent.value = appState.sections.about.content;
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
        
        updatePreview();
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
