/**
 * Axtra Product Page Builder - Main Application
 * Version: 1.0.0
 */

// ============================================
// STATE MANAGEMENT
// ============================================

const builderState = {
    formData: {},
    uploadedImages: [],
    uploadedLogo: null,
    completionPercentage: 0,
    lastSaved: null
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadDraftFromStorage();
    attachEventListeners();
    initLivePreview();
    updateProgress();
});

function initializeApp() {
    console.log('Axtra Product Page Builder initialized');
}

// ============================================
// EVENT LISTENERS
// ============================================

function attachEventListeners() {
    // Form input change detection
    const form = document.getElementById('builderForm');
    if (form) {
        form.addEventListener('input', debounce((e) => {
            handleFormChange(e);
            updateLivePreview();
        }, 500));
        form.addEventListener('change', (e) => {
            handleFormChange(e);
            updateLivePreview();
        });
    }

    // Conditional field toggles
    setupConditionalFields();

    // Dynamic list buttons
    setupDynamicLists();

    // File uploads
    setupFileUploads();

    // Header actions
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    const helpBtn = document.getElementById('helpBtn');
    const generateBtn = document.getElementById('generateBtn');
    
    if (saveDraftBtn) saveDraftBtn.addEventListener('click', saveDraft);
    if (helpBtn) helpBtn.addEventListener('click', showHelp);
    if (generateBtn) generateBtn.addEventListener('click', generatePrompt);

    // Color scheme toggle
    document.querySelectorAll('input[name="colorScheme"]').forEach(radio => {
        radio.addEventListener('change', toggleBrandColorFields);
    });

    // Email provider toggle
    document.getElementById('emailProvider').addEventListener('change', toggleEmailProviderFields);
}

// ============================================
// CONDITIONAL FIELDS
// ============================================

function setupConditionalFields() {
    // Discount fields
    document.getElementById('hasDiscount').addEventListener('change', (e) => {
        document.getElementById('discountFields').style.display = 
            e.target.checked ? 'block' : 'none';
    });

    // Stock field
    document.getElementById('limitedStock').addEventListener('change', (e) => {
        document.getElementById('stockField').style.display = 
            e.target.checked ? 'block' : 'none';
    });

    // Time limited field
    document.getElementById('timeLimited').addEventListener('change', (e) => {
        document.getElementById('timeField').style.display = 
            e.target.checked ? 'block' : 'none';
    });

    // Review fields
    document.querySelectorAll('input[name="socialProof"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const reviewsChecked = document.querySelector('input[name="socialProof"][value="reviews"]').checked;
            document.getElementById('reviewFields').style.display = 
                reviewsChecked ? 'block' : 'none';
        });
    });

    // Color picker sync
    const primaryColor = document.getElementById('primaryColor');
    const primaryColorHex = document.getElementById('primaryColorHex');
    const accentColor = document.getElementById('accentColor');
    const accentColorHex = document.getElementById('accentColorHex');

    if (primaryColor && primaryColorHex) {
        primaryColor.addEventListener('input', (e) => {
            primaryColorHex.value = e.target.value;
        });
        primaryColorHex.addEventListener('input', (e) => {
            if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                primaryColor.value = e.target.value;
            }
        });
    }

    if (accentColor && accentColorHex) {
        accentColor.addEventListener('input', (e) => {
            accentColorHex.value = e.target.value;
        });
        accentColorHex.addEventListener('input', (e) => {
            if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                accentColor.value = e.target.value;
            }
        });
    }
}

function toggleBrandColorFields(e) {
    const brandColorFields = document.getElementById('brandColorFields');
    brandColorFields.style.display = 
        e.target.value === 'brand-colors' ? 'block' : 'none';
}

function toggleEmailProviderFields() {
    const provider = document.getElementById('emailProvider').value;
    const fields = document.getElementById('emailProviderFields');
    fields.style.display = provider && provider !== '' ? 'block' : 'none';
}

// ============================================
// DYNAMIC LISTS
// ============================================

function setupDynamicLists() {
    // Pain points
    document.getElementById('addPainPointBtn').addEventListener('click', () => {
        addDynamicListItem('painPointsList', 'painPoints[]', 'e.g., Struggling to attract customers online');
    });

    // Outcomes
    document.getElementById('addOutcomeBtn').addEventListener('click', () => {
        addDynamicListItem('outcomesList', 'outcomes[]', 'e.g., Double your website traffic in 60 days');
    });

    // Benefits
    document.getElementById('addBenefitBtn').addEventListener('click', () => {
        addDynamicListItem('benefitsList', 'benefits[]', 'e.g., Easy to implement, even for beginners');
    });

    // Features
    document.getElementById('addFeatureBtn').addEventListener('click', () => {
        addDynamicListItem('featuresList', 'features[]', 'e.g., 100+ templates included');
    });
}

function addDynamicListItem(listId, inputName, placeholder) {
    const list = document.getElementById(listId);
    const itemDiv = document.createElement('div');
    itemDiv.className = 'dynamic-list-item fade-in';
    
    itemDiv.innerHTML = `
        <input 
            type="text" 
            name="${inputName}" 
            class="input" 
            placeholder="${placeholder}">
        <button type="button" class="btn-icon btn-remove" onclick="removeDynamicListItem(this)">×</button>
    `;
    
    list.appendChild(itemDiv);
    
    // Enable remove buttons if more than minimum items
    updateRemoveButtons(listId);
}

function removeDynamicListItem(button) {
    const item = button.closest('.dynamic-list-item');
    const list = item.closest('.dynamic-list');
    item.remove();
    updateRemoveButtons(list.id);
    updateProgress();
}

function updateRemoveButtons(listId) {
    const list = document.getElementById(listId);
    const items = list.querySelectorAll('.dynamic-list-item');
    const minItems = listId === 'benefitsList' ? 3 : 1;
    
    items.forEach((item, index) => {
        const removeBtn = item.querySelector('.btn-remove');
        if (removeBtn) {
            removeBtn.disabled = items.length <= minItems;
        }
    });
}

// ============================================
// FILE UPLOADS
// ============================================

function setupFileUploads() {
    // Product images
    const imageUploadArea = document.getElementById('imageUploadArea');
    const imageInput = document.getElementById('productImages');
    
    imageUploadArea.addEventListener('click', () => imageInput.click());
    imageInput.addEventListener('change', (e) => handleImageUpload(e.target.files));
    
    // Drag and drop
    imageUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUploadArea.classList.add('dragover');
    });
    
    imageUploadArea.addEventListener('dragleave', () => {
        imageUploadArea.classList.remove('dragover');
    });
    
    imageUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUploadArea.classList.remove('dragover');
        handleImageUpload(e.dataTransfer.files);
    });

    // Logo upload
    const logoUploadArea = document.getElementById('logoUploadArea');
    const logoInput = document.getElementById('logoFile');
    
    logoUploadArea.addEventListener('click', () => logoInput.click());
    logoInput.addEventListener('change', (e) => handleLogoUpload(e.target.files));
    
    logoUploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        logoUploadArea.classList.add('dragover');
    });
    
    logoUploadArea.addEventListener('dragleave', () => {
        logoUploadArea.classList.remove('dragover');
    });
    
    logoUploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        logoUploadArea.classList.remove('dragover');
        handleLogoUpload(e.dataTransfer.files);
    });
}

function handleImageUpload(files) {
    const fileList = document.getElementById('imageFileList');
    
    Array.from(files).forEach(file => {
        // Validate file
        if (!file.type.startsWith('image/')) {
            alert(`${file.name} is not an image file`);
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            alert(`${file.name} is larger than 5MB`);
            return;
        }
        
        // Store file reference
        builderState.uploadedImages.push(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileItem = createFilePreview(file, e.target.result, 'image');
            fileList.appendChild(fileItem);
        };
        reader.readAsDataURL(file);
    });
    
    updateProgress();
}

function handleLogoUpload(files) {
    if (files.length === 0) return;
    
    const file = files[0];
    const fileList = document.getElementById('logoFileList');
    
    // Validate
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
    }
    
    // Clear previous logo
    fileList.innerHTML = '';
    builderState.uploadedLogo = file;
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        const fileItem = createFilePreview(file, e.target.result, 'logo');
        fileList.appendChild(fileItem);
    };
    reader.readAsDataURL(file);
    
    updateProgress();
}

function createFilePreview(file, dataUrl, type) {
    const div = document.createElement('div');
    div.className = 'file-item fade-in';
    
    const img = document.createElement('img');
    img.src = dataUrl;
    img.className = 'file-preview';
    img.alt = file.name;
    
    const info = document.createElement('div');
    info.className = 'file-info';
    
    const name = document.createElement('span');
    name.className = 'file-name';
    name.textContent = file.name;
    
    const size = document.createElement('span');
    size.className = 'file-size';
    size.textContent = formatFileSize(file.size);
    
    info.appendChild(name);
    info.appendChild(size);
    
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'btn-icon btn-remove';
    removeBtn.textContent = '×';
    removeBtn.onclick = () => removeFile(div, file, type);
    
    div.appendChild(img);
    div.appendChild(info);
    div.appendChild(removeBtn);
    
    return div;
}

function removeFile(element, file, type) {
    element.remove();
    
    if (type === 'image') {
        builderState.uploadedImages = builderState.uploadedImages.filter(f => f !== file);
    } else if (type === 'logo') {
        builderState.uploadedLogo = null;
    }
    
    updateProgress();
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ============================================
// FORM HANDLING
// ============================================

function handleFormChange() {
    collectFormData();
    updateProgress();
    updateSummary();
}

function collectFormData() {
    const form = document.getElementById('builderForm');
    const formData = new FormData(form);
    
    builderState.formData = {};
    
    // Text inputs
    for (let [key, value] of formData.entries()) {
        if (key.endsWith('[]')) {
            const arrayKey = key.slice(0, -2);
            if (!builderState.formData[arrayKey]) {
                builderState.formData[arrayKey] = [];
            }
            if (value.trim()) {
                builderState.formData[arrayKey].push(value);
            }
        } else {
            builderState.formData[key] = value;
        }
    }
    
    // Checkboxes (multiple values)
    const checkboxGroups = ['socialProof', 'requiredFields', 'checkoutOptions', 'paymentMethods'];
    checkboxGroups.forEach(group => {
        const checked = Array.from(form.querySelectorAll(`input[name="${group}"]:checked`))
            .map(cb => cb.value);
        if (checked.length > 0) {
            builderState.formData[group] = checked;
        }
    });
    
    // Single checkboxes
    const singleCheckboxes = ['hasDiscount', 'limitedStock', 'timeLimited'];
    singleCheckboxes.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            builderState.formData[id] = checkbox.checked;
        }
    });
}

// ============================================
// PROGRESS TRACKING
// ============================================

function updateProgress() {
    collectFormData();
    
    const requiredFields = [
        'productName',
        'productDescription',
        'productType',
        'price',
        'currency',
        'industry',
        'targetAudience',
        'designStyle',
        'tagline',
        'leanxApiKey'
    ];
    
    const optionalFields = [
        'benefits',
        'features',
        'guarantee',
        'pageLayout',
        'colorScheme'
    ];
    
    let completed = 0;
    let total = requiredFields.length + optionalFields.length;
    
    // Count required fields
    requiredFields.forEach(field => {
        if (builderState.formData[field] && builderState.formData[field] !== '') {
            completed++;
        }
    });
    
    // Count optional fields
    optionalFields.forEach(field => {
        const value = builderState.formData[field];
        if (value && (Array.isArray(value) ? value.length > 0 : value !== '')) {
            completed++;
        }
    });
    
    // Add bonus for uploaded images
    if (builderState.uploadedImages.length > 0) {
        completed += 0.5;
        total += 0.5;
    }
    
    const percentage = Math.round((completed / total) * 100);
    builderState.completionPercentage = percentage;
    
    // Update UI
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    progressFill.style.width = percentage + '%';
    progressText.textContent = percentage + '% Complete';
}

// ============================================
// SUMMARY PREVIEW
// ============================================

function updateSummary() {
    const data = builderState.formData;
    
    // Product details
    document.getElementById('summaryProductName').textContent = 
        data.productName || '-';
    
    document.getElementById('summaryProductType').textContent = 
        data.productType ? capitalize(data.productType.replace('-', ' ')) : '-';
    
    const price = data.price ? `${data.currency || 'MYR'} ${data.price}` : '-';
    document.getElementById('summaryPrice').textContent = price;
    
    document.getElementById('summaryIndustry').textContent = 
        data.industry ? formatIndustryName(data.industry) : '-';
    
    // Design
    document.getElementById('summaryDesignStyle').textContent = 
        data.designStyle ? formatStyleName(data.designStyle) : '-';
    
    document.getElementById('summaryLayout').textContent = 
        data.pageLayout ? formatLayoutName(data.pageLayout) : '-';
    
    // Analytics
    const analytics = [];
    if (data.googleAnalytics) analytics.push('Google Analytics');
    if (data.metaPixel) analytics.push('Meta Pixel');
    if (data.googleAdsId) analytics.push('Google Ads');
    
    document.getElementById('summaryAnalytics').textContent = 
        analytics.length > 0 ? analytics.join(', ') : 'None';
}

// ============================================
// LOCAL STORAGE (AUTO-SAVE)
// ============================================

function saveDraft() {
    collectFormData();
    
    const draft = {
        formData: builderState.formData,
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    };
    
    try {
        localStorage.setItem('axtra_builder_draft', JSON.stringify(draft));
        builderState.lastSaved = new Date();
        
        // Show success message
        showNotification('Draft saved successfully! ✅', 'success');
    } catch (error) {
        console.error('Failed to save draft:', error);
        showNotification('Failed to save draft', 'error');
    }
}

function loadDraftFromStorage() {
    try {
        const draft = localStorage.getItem('axtra_builder_draft');
        if (!draft) return;
        
        const { formData, timestamp } = JSON.parse(draft);
        
        // Ask user if they want to restore
        if (confirm(`Found a draft from ${new Date(timestamp).toLocaleString()}. Restore it?`)) {
            restoreDraft(formData);
            showNotification('Draft restored! 📋', 'info');
        }
    } catch (error) {
        console.error('Failed to load draft:', error);
    }
}

function restoreDraft(formData) {
    builderState.formData = formData;
    
    // Populate form fields
    Object.keys(formData).forEach(key => {
        const value = formData[key];
        
        if (Array.isArray(value)) {
            // Handle arrays (dynamic lists)
            if (key === 'benefits' || key === 'features' || key === 'painPoints' || key === 'outcomes') {
                const listMap = {
                    'benefits': 'benefitsList',
                    'features': 'featuresList',
                    'painPoints': 'painPointsList',
                    'outcomes': 'outcomesList'
                };
                const listId = listMap[key];
                if (listId) {
                    const list = document.getElementById(listId);
                    list.innerHTML = '';
                    value.forEach((item, index) => {
                        const inputName = key + '[]';
                        const div = document.createElement('div');
                        div.className = 'dynamic-list-item';
                        div.innerHTML = `
                            <input type="text" name="${inputName}" class="input" value="${escapeHtml(item)}">
                            <button type="button" class="btn-icon btn-remove" onclick="removeDynamicListItem(this)" ${index < 3 && key === 'benefits' ? 'disabled' : ''}>×</button>
                        `;
                        list.appendChild(div);
                    });
                }
            }
        } else {
            const element = document.querySelector(`[name="${key}"]`);
            if (element) {
                if (element.type === 'checkbox' || element.type === 'radio') {
                    element.checked = true;
                } else {
                    element.value = value;
                }
            }
        }
    });
    
    updateProgress();
    updateSummary();
}

// ============================================
// PROMPT GENERATION
// ============================================

function generatePrompt() {
    collectFormData();
    
    // Validate required fields
    const missingFields = validateForm();
    if (missingFields.length > 0) {
        alert(`Please fill out the following required fields:\n\n${missingFields.join('\n')}`);
        return;
    }
    
    const data = builderState.formData;
    const prompt = buildPromptMarkdown(data);
    
    // Show modal with prompt
    showPromptModal(prompt);
}

function validateForm() {
    const missing = [];
    const required = {
        'productName': 'Product Name',
        'productDescription': 'Product Description',
        'productType': 'Product Type',
        'price': 'Price',
        'industry': 'Industry',
        'targetAudience': 'Target Audience',
        'designStyle': 'Design Style',
        'tagline': 'Product Tagline',
        'leanxApiKey': 'Lean X API Key'
    };
    
    Object.keys(required).forEach(field => {
        if (!builderState.formData[field] || builderState.formData[field] === '') {
            missing.push(required[field]);
        }
    });
    
    // Check benefits (minimum 3)
    if (!builderState.formData.benefits || builderState.formData.benefits.length < 3) {
        missing.push('Key Benefits (minimum 3)');
    }
    
    return missing;
}

function buildPromptMarkdown(data) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    let prompt = `# Product Page System - ${data.productName}\n\n`;
    prompt += `**Generated by:** Axtra Product Page Builder\n`;
    prompt += `**Date:** ${dateStr}\n`;
    prompt += `**Builder Version:** 1.0.0\n\n`;
    prompt += `---\n\n`;
    
    // Project Overview
    prompt += `## 📦 Project Overview\n\n`;
    prompt += `You are building a conversion-optimized product page system for:\n\n`;
    prompt += `- **Product:** ${data.productName}\n`;
    prompt += `- **Industry:** ${formatIndustryName(data.industry)}\n`;
    prompt += `- **Price:** ${data.currency} ${data.price}\n`;
    prompt += `- **Type:** ${capitalize(data.productType.replace('-', ' '))}\n`;
    prompt += `- **Target Audience:** ${data.targetAudience}\n\n`;
    prompt += `**Key Focus:** High conversion rate, mobile-first design, fast checkout, Lean X payment integration.\n\n`;
    prompt += `---\n\n`;
    
    // File Structure
    prompt += `## 🗂️ File Structure\n\n`;
    prompt += `Create the following structure:\n\n`;
    prompt += `\`\`\`\n`;
    prompt += `${slugify(data.productName)}/\n`;
    prompt += `├── index.html\n`;
    prompt += `├── checkout.html\n`;
    prompt += `├── thankyou.html\n`;
    prompt += `├── assets/\n`;
    prompt += `│   ├── css/\n`;
    prompt += `│   │   └── styles.css\n`;
    prompt += `│   ├── js/\n`;
    prompt += `│   │   ├── cart.js\n`;
    prompt += `│   │   ├── checkout.js\n`;
    prompt += `│   │   └── leanx.js\n`;
    prompt += `│   └── images/\n`;
    prompt += `└── README.md\n`;
    prompt += `\`\`\`\n\n`;
    prompt += `---\n\n`;
    
    // MODULE 1: Product Page (index.html)
    prompt += `## 📄 MODULE 1: Product Page (index.html)\n\n`;
    prompt += `### Purpose\n`;
    prompt += `Convert visitors into buyers with persuasive product presentation.\n\n`;
    prompt += `### Design Specifications\n`;
    prompt += `- **Style:** ${formatStyleName(data.designStyle)}\n`;
    prompt += `- **Layout:** ${formatLayoutName(data.pageLayout || 'single-page')}\n`;
    prompt += `- **Color Scheme:** ${data.colorScheme === 'brand-colors' ? 'Brand colors' : 'Axtra Default'}\n`;
    if (data.colorScheme === 'brand-colors') {
        prompt += `  - Primary: ${data.primaryColor || '#1a1a1a'}\n`;
        prompt += `  - Accent: ${data.accentColor || '#2563eb'}\n`;
    }
    prompt += `\n### Hero Section\n\n`;
    prompt += `**Headline:** ${data.tagline}\n\n`;
    prompt += `**Product Description:**\n${data.productDescription}\n\n`;
    prompt += `**Pricing:**\n`;
    if (data.hasDiscount && data.discountPrice) {
        prompt += `- Regular Price: ~~${data.currency} ${data.price}~~\n`;
        prompt += `- Sale Price: **${data.currency} ${data.discountPrice}**\n`;
    } else {
        prompt += `- **${data.currency} ${data.price}**\n`;
    }
    prompt += `\n**Primary CTA:** "Buy Now" button (prominent, high contrast)\n\n`;
    
    if (data.limitedStock || data.timeLimited) {
        prompt += `**Urgency Elements:**\n`;
        if (data.limitedStock) {
            prompt += `- Limited stock: Only ${data.stockQuantity || 'X'} remaining\n`;
        }
        if (data.timeLimited) {
            prompt += `- Time-limited offer ending soon\n`;
        }
        prompt += `\n`;
    }
    
    // Key Benefits
    prompt += `### Value Propositions Section\n\n`;
    prompt += `Display key benefits that resonate with target audience:\n\n`;
    if (data.benefits && data.benefits.length > 0) {
        data.benefits.forEach((benefit, i) => {
            prompt += `${i + 1}. ${benefit}\n`;
        });
    }
    prompt += `\n`;
    
    // Features
    if (data.features && data.features.length > 0) {
        prompt += `### What's Included Section\n\n`;
        data.features.forEach(feature => {
            prompt += `- ${feature}\n`;
        });
        prompt += `\n`;
    }
    
    // Social Proof
    if (data.socialProof && data.socialProof.length > 0) {
        prompt += `### Social Proof\n\n`;
        prompt += `Include:\n`;
        data.socialProof.forEach(proof => {
            if (proof === 'testimonials') {
                prompt += `- Customer testimonials (3-5 with names and photos)\n`;
            } else if (proof === 'reviews') {
                prompt += `- Product rating: ${data.rating || '4.8'}/5 stars (${data.reviewCount || 'X'} reviews)\n`;
            } else if (proof === 'trust-badges') {
                prompt += `- Trust badges: 🔒 Secure checkout, ✅ Money-back guarantee\n`;
            } else if (proof === 'stats') {
                prompt += `- Statistics: Number of customers served, success rate\n`;
            }
        });
        prompt += `\n`;
    }
    
    // Guarantee
    if (data.guarantee) {
        prompt += `### Guarantee Section\n\n`;
        prompt += `${data.guarantee}\n\n`;
    }
    
    prompt += `---\n\n`;
    
    // MODULE 2: Checkout Page
    prompt += `## 💳 MODULE 2: Checkout Page (checkout.html)\n\n`;
    prompt += `### Checkout Style\n`;
    prompt += `${data.checkoutStyle === 'separate-page' ? 'Separate dedicated page' : 'On-page modal/slide-in'}\n\n`;
    prompt += `### Required Customer Information\n`;
    prompt += `- Name (required)\n`;
    prompt += `- Email (required)\n`;
    if (data.requiredFields) {
        if (data.requiredFields.includes('phone')) prompt += `- Phone Number\n`;
        if (data.requiredFields.includes('address')) prompt += `- Shipping Address\n`;
        if (data.requiredFields.includes('company')) prompt += `- Company Name\n`;
    }
    prompt += `\n`;
    
    if (data.checkoutOptions) {
        prompt += `### Additional Options\n`;
        if (data.checkoutOptions.includes('guest-checkout')) {
            prompt += `- Allow guest checkout (no account required)\n`;
        }
        if (data.checkoutOptions.includes('order-notes')) {
            prompt += `- Order notes field\n`;
        }
        if (data.checkoutOptions.includes('newsletter')) {
            prompt += `- Newsletter opt-in checkbox\n`;
        }
        prompt += `\n`;
    }
    
    prompt += `---\n\n`;
    
    // MODULE 3: Lean X Integration
    prompt += `## 🔌 MODULE 3: Lean X Payment Integration\n\n`;
    prompt += `### Configuration\n`;
    prompt += `\`\`\`javascript\n`;
    prompt += `// Lean X API Configuration\n`;
    prompt += `const LEANX_API_KEY = '${data.leanxApiKey}';\n`;
    prompt += `const PRODUCT_PRICE = ${data.discountPrice || data.price};\n`;
    prompt += `const CURRENCY = '${data.currency}';\n`;
    prompt += `\`\`\`\n\n`;
    
    prompt += `### Payment Methods Enabled\n`;
    prompt += `- Credit/Debit Card (always enabled)\n`;
    if (data.paymentMethods) {
        if (data.paymentMethods.includes('fpx')) prompt += `- FPX (Online Banking)\n`;
        if (data.paymentMethods.includes('ewallet')) prompt += `- E-Wallets (Touch 'n Go, GrabPay)\n`;
    }
    prompt += `\n`;
    
    if (data.thankYouUrl) {
        prompt += `### Success Redirect\n`;
        prompt += `After successful payment, redirect to: ${data.thankYouUrl}\n\n`;
    }
    
    prompt += `---\n\n`;
    
    // MODULE 4: Analytics
    if (data.googleAnalytics || data.metaPixel || data.googleAdsId) {
        prompt += `## 📊 MODULE 4: Analytics & Tracking\n\n`;
        
        if (data.googleAnalytics) {
            prompt += `### Google Analytics\n`;
            prompt += `Measurement ID: \`${data.googleAnalytics}\`\n\n`;
        }
        
        if (data.metaPixel) {
            prompt += `### Meta Pixel (Facebook)\n`;
            prompt += `Pixel ID: \`${data.metaPixel}\`\n\n`;
            prompt += `Track events:\n`;
            prompt += `- ViewContent (page load)\n`;
            prompt += `- AddToCart\n`;
            prompt += `- InitiateCheckout\n`;
            prompt += `- Purchase (conversion)\n\n`;
        }
        
        if (data.googleAdsId) {
            prompt += `### Google Ads Conversion\n`;
            prompt += `Conversion ID: \`${data.googleAdsId}\`\n\n`;
        }
        
        prompt += `---\n\n`;
    }
    
    // MODULE 5: Styling
    prompt += `## 🎨 MODULE 5: Styling (styles.css)\n\n`;
    prompt += `### Design System\n`;
    prompt += `- **Font:** System fonts (San Francisco, Segoe UI, Roboto)\n`;
    prompt += `- **Colors:** ${data.colorScheme === 'brand-colors' ? 'Brand colors provided' : 'Axtra grayscale + blue accent'}\n`;
    prompt += `- **Style:** ${formatStyleName(data.designStyle)}\n`;
    prompt += `- **Responsive:** Mobile-first approach\n\n`;
    
    prompt += `### Key Characteristics\n`;
    const styleCharacteristics = {
        'conversion-focused': '- Bold, high-contrast CTAs\n- Prominent pricing\n- Urgency elements\n- Clear hierarchy',
        'premium-luxury': '- Ample whitespace\n- Large, high-quality imagery\n- Elegant typography\n- Sophisticated color palette',
        'minimal-clean': '- Lots of whitespace\n- Clean typography\n- Subtle colors\n- Simple layouts',
        'bold-vibrant': '- Bright, eye-catching colors\n- Dynamic layouts\n- Strong visual elements\n- Creative typography'
    };
    prompt += styleCharacteristics[data.designStyle] || '';
    prompt += `\n\n`;
    
    prompt += `---\n\n`;
    
    // Implementation Notes
    prompt += `## 🚀 Implementation Notes\n\n`;
    prompt += `### Priority\n`;
    prompt += `1. Build index.html with all content sections\n`;
    prompt += `2. Implement Lean X payment integration\n`;
    prompt += `3. Add styles.css with responsive design\n`;
    prompt += `4. Set up analytics tracking\n`;
    prompt += `5. Test checkout flow thoroughly\n\n`;
    
    prompt += `### Testing Checklist\n`;
    prompt += `- [ ] Page loads correctly on mobile and desktop\n`;
    prompt += `- [ ] All CTAs are clickable and prominent\n`;
    prompt += `- [ ] Lean X payment form works in test mode\n`;
    prompt += `- [ ] Analytics fires on page load and purchase\n`;
    prompt += `- [ ] Thank you page displays after successful payment\n`;
    prompt += `- [ ] All images are optimized and load quickly\n\n`;
    
    // Pain Points & Outcomes
    if ((data.painPoints && data.painPoints.length > 0) || (data.outcomes && data.outcomes.length > 0)) {
        prompt += `---\n\n`;
        prompt += `## 🎯 Target Audience Insights\n\n`;
        
        if (data.painPoints && data.painPoints.length > 0) {
            prompt += `### Customer Pain Points\n`;
            data.painPoints.forEach(pain => {
                prompt += `- ${pain}\n`;
            });
            prompt += `\n`;
        }
        
        if (data.outcomes && data.outcomes.length > 0) {
            prompt += `### Desired Outcomes\n`;
            data.outcomes.forEach(outcome => {
                prompt += `- ${outcome}\n`;
            });
            prompt += `\n`;
        }
    }
    
    // Email Integration
    if (data.emailProvider && data.emailProvider !== '') {
        prompt += `---\n\n`;
        prompt += `## 📧 Email Marketing Integration\n\n`;
        prompt += `Provider: ${capitalize(data.emailProvider)}\n`;
        if (data.emailApiKey) {
            prompt += `API Key: \`${data.emailApiKey}\`\n`;
        }
        if (data.emailListId) {
            prompt += `List/Audience ID: \`${data.emailListId}\`\n`;
        }
        prompt += `\nAdd customer email to list after successful purchase.\n\n`;
    }
    
    prompt += `---\n\n`;
    prompt += `**End of Prompt**\n\n`;
    prompt += `Generate clean, production-ready code with inline comments and best practices. Focus on conversion optimization and user experience.`;
    
    return prompt;
}

function showPromptModal(prompt) {
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        border-radius: 12px;
        max-width: 900px;
        width: 100%;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    `;
    
    const header = document.createElement('div');
    header.style.cssText = `
        padding: 24px;
        border-bottom: 1px solid var(--color-border);
    `;
    header.innerHTML = `
        <h2 style="margin: 0;">✨ Your Product Page Prompt is Ready!</h2>
        <p style="margin: 8px 0 0 0; color: var(--color-text-tertiary);">
            Copy this prompt or download it as a file
        </p>
    `;
    
    const body = document.createElement('div');
    body.style.cssText = `
        padding: 24px;
        overflow-y: auto;
        flex: 1;
    `;
    
    const textarea = document.createElement('textarea');
    textarea.value = prompt;
    textarea.style.cssText = `
        width: 100%;
        min-height: 400px;
        font-family: var(--font-mono);
        font-size: 13px;
        line-height: 1.6;
        padding: 16px;
        border: 1px solid var(--color-border);
        border-radius: 8px;
        resize: vertical;
    `;
    textarea.readOnly = true;
    
    body.appendChild(textarea);
    
    const footer = document.createElement('div');
    footer.style.cssText = `
        padding: 24px;
        border-top: 1px solid var(--color-border);
        display: flex;
        gap: 12px;
        justify-content: flex-end;
    `;
    
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-secondary';
    copyBtn.textContent = '📋 Copy to Clipboard';
    copyBtn.onclick = () => {
        textarea.select();
        document.execCommand('copy');
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyBtn.textContent = '📋 Copy to Clipboard';
        }, 2000);
    };
    
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'btn btn-accent';
    downloadBtn.textContent = '💾 Download as File';
    downloadBtn.onclick = () => downloadPrompt(prompt);
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn btn-ghost';
    closeBtn.textContent = 'Close';
    closeBtn.onclick = () => modal.remove();
    
    footer.appendChild(closeBtn);
    footer.appendChild(copyBtn);
    footer.appendChild(downloadBtn);
    
    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(footer);
    modal.appendChild(content);
    
    document.body.appendChild(modal);
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function downloadPrompt(prompt) {
    const productName = builderState.formData.productName || 'product-page';
    const filename = `${slugify(productName)}-prompt.md`;
    
    const blob = new Blob([prompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    
    URL.revokeObjectURL(url);
    
    showNotification('Prompt downloaded! 🎉', 'success');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

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

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatIndustryName(industry) {
    const names = {
        'digital-marketing': 'Digital Marketing',
        'ecommerce': 'E-commerce & Retail',
        'education': 'Education & E-Learning',
        'saas': 'SaaS & Software',
        'health-wellness': 'Health & Wellness',
        'finance': 'Finance & Investing',
        'real-estate': 'Real Estate',
        'consulting': 'Consulting & Coaching',
        'creative': 'Creative & Design',
        'other': 'Other'
    };
    return names[industry] || capitalize(industry);
}

function formatStyleName(style) {
    const names = {
        'conversion-focused': 'Conversion Focused',
        'premium-luxury': 'Premium & Luxury',
        'minimal-clean': 'Minimal & Clean',
        'bold-vibrant': 'Bold & Vibrant'
    };
    return names[style] || capitalize(style);
}

function formatLayoutName(layout) {
    const names = {
        'single-page': 'Single-Page (All content on one page)',
        'multi-page': 'Multi-Page (Separate pages)'
    };
    return names[layout] || capitalize(layout);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1001;
        min-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showHelp() {
    alert(`Axtra Product Page Builder - Help

This tool generates conversion-optimized product page prompts that you can use with AI assistants or developers.

📋 How to use:
1. Fill out all 9 sections of the form
2. Upload product images (optional but recommended)
3. Review your summary in Section 9
4. Click "Generate Product Page Prompt"
5. Copy or download the generated prompt

💾 Auto-save:
Your progress is automatically saved as you type. Click "Save Draft" to manually save.

🎯 Tips:
- Be specific and detailed in your descriptions
- Upload high-quality product images
- Focus on benefits, not just features
- Use the urgency elements sparingly

Need more help? Visit: https://axtra.com/help`);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes slideOut {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Auto-save every 30 seconds
setInterval(() => {
    if (builderState.completionPercentage > 0) {
        saveDraft();
    }
}, 30000);

// ============================================
// LIVE PREVIEW
// ============================================

// Initialize preview
function initLivePreview() {
    const toggleBtn = document.getElementById('togglePreviewBtn');
    const previewPanel = document.getElementById('previewPanel');
    
    // Toggle preview on mobile
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            previewPanel.classList.toggle('active');
        });
    }
    
    // Device switching
    document.querySelectorAll('.device-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const device = btn.dataset.device;
            document.querySelector('.preview-viewport').dataset.device = device;
        });
    });
    
    // Initial render
    updateLivePreview();
}

// Update preview whenever form changes
function updateLivePreview() {
    // collectFormData() updates builderState.formData but doesn't return it
    collectFormData();
    const data = builderState.formData;
    
    const previewContainer = document.getElementById('livePreview');
    
    if (!previewContainer) return;
    
    // Handle case where data is undefined or null
    if (!data || typeof data !== 'object') {
        previewContainer.innerHTML = `
            <div class="preview-placeholder">
                <p>Start filling the form to see your product page come to life</p>
            </div>
        `;
        return;
    }
    
    // Generate preview HTML
    const previewHTML = generatePreviewHTML(data);
    previewContainer.innerHTML = previewHTML;
}

// Generate preview HTML from form data
function generatePreviewHTML(data) {
    // Safely access data properties with defaults
    const productName = (data && data.productName) || 'Your Amazing Product';
    const tagline = (data && data.tagline) || 'Transform your life with our revolutionary solution';
    const price = (data && data.price) || '99';
    const currency = (data && data.currency) || 'USD';
    const description = (data && data.longDescription) || 'Discover the power of innovation. Our product is designed to help you achieve more with less effort.';
    
    // Check if we have any meaningful data
    const hasData = data && (data.productName || data.tagline || data.price);
    
    if (!hasData) {
        return `
            <div class="preview-placeholder">
                <p>Start filling the form to see your product page come to life</p>
            </div>
        `;
    }
    
    // Build colorful product page
    let html = '';
    
    // Hero Section
    html += `
        <section class="preview-hero">
            <div class="preview-hero-content">
                <h1>${escapeHtml(productName)}</h1>
                <p>${escapeHtml(tagline)}</p>
                <a href="#" class="preview-cta">Get Started Now</a>
            </div>
        </section>
    `;
    
    // Description Section
    if (description) {
        html += `
            <section class="preview-image-section">
                <div class="preview-image-container">
                    <p style="font-size: 18px; line-height: 1.8; color: #4a5568; max-width: 700px; margin: 0 auto;">
                        ${escapeHtml(description)}
                    </p>
                </div>
            </section>
        `;
    }
    
    // Features Section
    const benefits = [];
    if (data) {
        for (let i = 1; i <= 5; i++) {
            const benefit = data[`benefit${i}`];
            if (benefit) benefits.push(benefit);
        }
    }
    
    if (benefits.length > 0) {
        html += `
            <section class="preview-features">
                <div class="preview-features-grid">
        `;
        
        benefits.forEach((benefit, index) => {
            html += `
                <div class="preview-feature">
                    <h3>Feature ${index + 1}</h3>
                    <p>${escapeHtml(benefit)}</p>
                </div>
            `;
        });
        
        html += `
                </div>
            </section>
        `;
    }
    
    // Pricing Section
    if (price) {
        const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency;
        const priceDisplay = currency === 'USD' || currency === 'EUR' || currency === 'GBP' 
            ? `${currencySymbol}${price}` 
            : `${price} ${currency}`;
        
        html += `
            <section class="preview-pricing">
                <h2>Simple, Transparent Pricing</h2>
                <div class="preview-price">${priceDisplay}</div>
                <p class="preview-price-label">One-time payment • No hidden fees</p>
                <a href="#" class="preview-cta">Buy Now</a>
            </section>
        `;
    }
    
    // Testimonial Section
    const testimonials = [];
    if (data) {
        for (let i = 1; i <= 3; i++) {
            const text = data[`testimonial${i}Text`];
            const author = data[`testimonial${i}Author`];
            if (text && author) {
                testimonials.push({ text, author });
            }
        }
    }
    
    if (testimonials.length > 0) {
        html += `<section class="preview-testimonials">`;
        
        testimonials.forEach(t => {
            html += `
                <div class="preview-testimonial">
                    <p>"${escapeHtml(t.text)}"</p>
                    <div class="preview-testimonial-author">${escapeHtml(t.author)}</div>
                </div>
            `;
        });
        
        html += `</section>`;
    }
    
    // Final CTA
    html += `
        <section class="preview-cta-section">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers today</p>
            <a href="#" class="preview-cta">Get ${escapeHtml(productName)} Now</a>
        </section>
    `;
    
    return html;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

console.log('🚀 Axtra Product Page Builder loaded successfully!');

