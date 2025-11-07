# Axtra Product Page Builder - Project Guide

**Project Status:** Planning Phase  
**Version:** 1.0.0  
**Last Updated:** November 7, 2025  
**Project Type:** Standalone Product (New Build)

---

## 🎯 Project Vision

### The Problem We're Solving
Lean X previously had an online store builder that failed because it focused on **store management** instead of **conversion optimization**. Businesses don't need another store manager - they need product pages that **convert visitors into customers**.

### Our Solution
**Axtra Product Page Builder** is a **single-page, scrollable form interface** that collects product information and generates conversion-optimized, multi-page e-commerce systems tailored to:
- ✅ Industry-specific best practices
- ✅ Digital marketing campaign optimization
- ✅ Search engine optimization (SEO)
- ✅ Clean, dependency-light implementation
- ✅ Seamless Lean X payment integration

### User Experience
Unlike multi-step wizards, this builder uses a **single scrollable page** where users:
1. Fill out form sections as they scroll down
2. Upload product images and materials inline
3. See live preview/summary as they progress
4. Generate comprehensive prompt at the bottom

**Key UX Decision:** Single page = better for power users, faster iteration, see all inputs at once.

### Strategic Positioning
- **NOT:** A store management system or WooCommerce competitor
- **YES:** A conversion-focused product page generator for digital marketers
- **Target Users:** Digital marketers, agencies, small businesses running ads
- **Use Case:** Launch product pages quickly for ad campaigns, product launches, limited offers

---

## 🔮 Product Evolution Strategy

### **V1.0: Static Pages (Current Plan)**
**What Users Get:**
- High-converting, code-based product pages
- Fast, lightweight, SEO-optimized
- Lean X payment integration
- Perfect for launches and campaigns

**Limitations:**
- ⚠️ Users need developer/code knowledge to update prices, stock, or content
- ⚠️ Best suited for fixed offerings or one-time launches
- ⚠️ Not ideal for frequently changing products

**Target Market:**
- ✅ Developers and agencies building for clients
- ✅ Marketers running ad campaigns (fixed offers)
- ✅ Product launches with set details
- ✅ Technical users comfortable with code

---

### **V1.5: Static + CMS Integration (Future Enhancement)**
**Trigger:** When 20+ users request "easy content management"  
**Timeline:** 2-4 weeks development after V1.0 launch  
**What Changes:**

Add **optional** headless CMS integration to generated prompts:

```javascript
// Optional: Connect to Airtable/Firebase for dynamic updates
// Users can manage via simple spreadsheet interface
async function loadProductData() {
  const data = await fetch('YOUR_CMS_API/product-123');
  // Update page content dynamically
  updatePricing(data.price);
  updateStock(data.inventory);
}
```

**Benefits:**
- ✅ Non-technical users can update prices, stock, descriptions
- ✅ Pages remain fast and lightweight
- ✅ Simple spreadsheet/dashboard interface
- ✅ Low cost (~$10-30/month per user via Airtable/Firebase)

**Implementation:**
- Prompt includes CMS integration code (optional section)
- User sets up Airtable/Firebase/Sanity account
- Simple tutorial for connecting their data
- No backend development required from Axtra

**New Target Market:**
- ✅ Small business owners (less technical)
- ✅ Solopreneurs managing own stores
- ✅ Businesses with changing inventory

---

### **V2.0: Full Store Management Platform (Conditional)**
**Trigger:** Only if we reach 100+ active users requesting advanced features  
**Timeline:** 6-12 months development, $15K-40K investment  
**Decision Criteria:**

Build a full SaaS platform ONLY IF:
1. ✅ Strong demand validated (100+ users)
2. ✅ Users willing to pay $20-50/month subscriptions
3. ✅ Market gap confirmed vs. Shopify/WooCommerce
4. ✅ Funding/revenue available for development

**What V2.0 Would Include:**
- Custom admin dashboard for product management
- Multi-product catalog support
- Order management system
- Customer database & accounts
- Inventory tracking & alerts
- Email automation
- Advanced analytics
- Team collaboration features

**Business Model Shift:**
```
V1.0: One-time prompt generation tool (pay per generation or free)
V2.0: Recurring SaaS platform ($29-99/month subscriptions)
```

**Risk Assessment:**
- ⚠️ High development cost (3-6 months full-time)
- ⚠️ Ongoing hosting/infrastructure costs ($100-500/month)
- ⚠️ Customer support requirements increase 10x
- ⚠️ Competition with established players (Shopify, WooCommerce)

**Recommendation:** 
**DO NOT BUILD V2.0 until V1.0 proves market demand.** Many startups fail by over-building before validating. Start simple, grow based on real user feedback.

---

## 🎯 V1.0 Launch Strategy (Current Focus)

### Phase 1: Build & Launch (Weeks 1-3)
**Deliverable:** Working product page builder with prompt generation

**Core Features:**
- 9-step builder form
- Industry-specific customization
- Lean X payment integration
- Modular prompt output
- Mobile-responsive UI

**Success Metrics:**
- 50 users generate prompts in first month
- 10+ actual product pages deployed
- Collect feedback on pain points

### Phase 2: Market Testing (Month 2)
**Goal:** Validate value proposition and identify must-have features

**Activities:**
- User interviews (20 users minimum)
- Track completion rates (how many finish 9 steps?)
- Monitor support requests (what do users struggle with?)
- A/B test pricing models

**Key Questions:**
1. Do users successfully implement the generated prompts?
2. What's the biggest friction point? (code editing, Lean X setup, hosting?)
3. Would they pay for easier content management?
4. What features are they requesting most?

### Phase 3: Iterate or Pivot (Month 3)
**Based on feedback, choose direction:**

**Path A - Success:** Users love it, implement successfully
→ Continue with V1.0, add polish and marketing

**Path B - Management Pain:** "I need to update prices easily"
→ Add V1.5 CMS integration option

**Path C - Technical Barrier:** "Too hard to implement code"
→ Consider offering implementation service (charge for setup)

**Path D - Wrong Market:** Not enough demand
→ Pivot or shut down before over-investing

---

## 🛠️ V1.0 Technical Specifications (Current Scope)

### What We're Building Now

#### ✅ In Scope for V1.0
- Builder form UI (9 steps)
- Conditional rendering (landing page vs. product page)
- Data collection and validation
- Modular prompt generation
- Lean X integration instructions
- Basic analytics (Google Analytics, Meta Pixel code)
- Export/download prompts
- Mobile-responsive builder interface

#### ❌ Out of Scope for V1.0
- User accounts/authentication (no login required)
- Saving/loading draft forms (localStorage only, optional)
- Template marketplace
- Store management dashboard
- Backend API or database
- Automated deployment
- Multi-product support
- Inventory management
- Order tracking system
- Email automation

### Technical Constraints (Keep It Simple)
- **No backend database** - Form data only exists client-side
- **No user authentication** - Public tool, no login needed
- **No payment processing for our tool** - It's free to use (or pay-per-generation)
- **No hosting service** - Users host their generated pages themselves

This keeps development focused, costs low, and time-to-market fast.

---

## 🔥 Firebase Integration Strategy

### Why Firebase is Perfect for This Project

Firebase provides **backend capabilities without backend complexity**, making it ideal for the V1.5 enhancement when users need content management.

**Key Advantages:**
- ✅ **No server code required** - All client-side JavaScript
- ✅ **Real-time updates** - Changes reflect instantly on product pages
- ✅ **Free tier sufficient** - 50K reads/day covers most small businesses
- ✅ **You already know it** - Familiar technology stack
- ✅ **Scales automatically** - No infrastructure management
- ✅ **Built-in auth** - Secure admin access included

---

### Firebase Services We'll Use

#### **1. Firestore Database** (Product & Order Data)
```javascript
// Store product information
products/
  └── product-abc123/
      ├── name: "SEO Masterclass 2025"
      ├── price: 297
      ├── currency: "MYR"
      ├── stock: 50
      ├── description: "Complete SEO training..."
      ├── images: ["url1", "url2"]
      ├── status: "active"
      └── updatedAt: timestamp

// Store orders when payment succeeds
orders/
  └── order-xyz789/
      ├── orderId: "ORD-2025-001"
      ├── productId: "product-abc123"
      ├── customer: { name, email, phone }
      ├── amount: 297
      ├── currency: "MYR"
      ├── status: "paid"
      ├── leanxPaymentId: "lx_abc123"
      └── createdAt: timestamp
```

**Free Tier Limits:**
- 50K document reads/day
- 20K document writes/day
- 1GB stored data
- **Sufficient for:** 100-500 orders/month, 1000+ page views/day

---

#### **2. Firebase Authentication** (Admin Access)
```javascript
// Simple email/password login for store owner
const auth = firebase.auth();
await auth.signInWithEmailAndPassword(email, password);

// Only authenticated users can access admin dashboard
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    showAdminDashboard();
  } else {
    showLoginForm();
  }
});
```

**What This Enables:**
- Secure admin dashboard
- Multiple team members (optional)
- Password reset flows
- Free for unlimited users

---

#### **3. Firebase Hosting** (Deploy Product Pages)
```bash
# One command to deploy
firebase deploy

# Live at: https://your-project.web.app
# Or custom domain: https://shop.yourbrand.com
```

**Free Tier:**
- 10GB storage
- 360MB/day bandwidth
- Free SSL certificate
- Custom domain support

---

#### **4. Cloud Functions** (Serverless Backend - Optional)
```javascript
// Webhook handler for Lean X payment confirmations
exports.leanxWebhook = functions.https.onRequest(async (req, res) => {
  const { orderId, status, amount, productId } = req.body;
  
  if (status === 'success') {
    // Save order to Firestore
    await admin.firestore().collection('orders').add({
      orderId,
      productId,
      amount,
      status: 'paid',
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Update inventory
    const productRef = admin.firestore().collection('products').doc(productId);
    await productRef.update({
      stock: admin.firestore.FieldValue.increment(-1)
    });
    
    // Send confirmation email (optional)
    await sendConfirmationEmail(orderId);
  }
  
  res.status(200).send('OK');
});
```

**Free Tier:**
- 2M invocations/month
- 400K GB-seconds compute time

---

#### **5. Firebase Storage** (Product Images)
```javascript
// Upload product images via admin dashboard
const storageRef = firebase.storage().ref();
const imageRef = storageRef.child(`products/${productId}/hero.jpg`);
await imageRef.put(file);

// Get public URL for product page
const imageUrl = await imageRef.getDownloadURL();
```

**Free Tier:**
- 5GB storage
- 1GB/day downloads

---

### Implementation Levels

#### **V1.0: No Firebase (Current Plan)**
Pure static HTML/CSS/JS - user edits code manually.
- **Complexity:** Low
- **User Management:** None (code editing only)
- **Cost:** $0/month
- **Best For:** Developers, agencies, one-time launches

---

#### **V1.5: Firebase Data Layer (Recommended Next Step)**
Product page reads from Firebase, simple admin to update content.

**What Gets Generated:**
```
product-page/
├── index.html              # Product page (Firebase-connected)
├── admin.html              # Simple admin dashboard
├── checkout.html           # Checkout flow
├── thankyou.html           # Confirmation page
├── firebase-config.js      # Firebase initialization
└── FIREBASE_SETUP.md       # Step-by-step setup guide
```

**User Setup Process:**
1. Create free Firebase project (5 minutes)
2. Copy Firebase config to `firebase-config.js`
3. Set up Firestore security rules (provided)
4. Create admin account (email/password)
5. Deploy with `firebase deploy`
6. Access admin at `yourdomain.com/admin.html`

**User Can Now:**
- ✅ Update product price, description, stock
- ✅ View recent orders (from Lean X)
- ✅ Upload/change product images
- ✅ Enable/disable product (status toggle)
- ✅ All via simple web form (no coding)

**Cost:** $0/month (free tier)  
**Complexity:** Medium (one-time setup)  
**Management:** Simple dashboard

---

#### **V2.0: Full Firebase Backend (Future)**
Complete e-commerce system with orders, customers, inventory automation.

**Additional Features:**
- Order management dashboard
- Customer database
- Automated email confirmations (via Cloud Functions)
- Inventory alerts (low stock warnings)
- Multi-product catalog
- Sales analytics dashboard
- Export orders to CSV
- Team member access management

**Cost:** $0-35/month (scales with usage)  
**Complexity:** High  
**Management:** Full admin platform

---

### Firebase Cost at Scale

#### **Scenario 1: Small Store (100 orders/month)**
```
Firestore:
- 3K page views/day × 30 = 90K reads/month ✅ FREE
- 100 orders = 500 writes/month ✅ FREE

Hosting:
- 10MB page size × 3K views × 30 = 900GB/month
- Free tier: 10.8GB/month → $133/month
- Use Cloudflare CDN: FREE ✅

Total: $0/month (stay on free tier with CDN)
```

#### **Scenario 2: Growing Store (500 orders/month)**
```
Firestore:
- 10K page views/day × 30 = 300K reads/month
- Free tier covers 1.5M/month ✅ FREE
- 500 orders = 2.5K writes/month ✅ FREE

Cloud Functions (for automation):
- 500 order confirmations = 500 invocations ✅ FREE

Total: $0/month (still on free tier!)
```

#### **Scenario 3: Established Store (2000 orders/month)**
```
Firestore:
- 50K page views/day × 30 = 1.5M reads/month ✅ FREE
- 2000 orders = 10K writes/month ✅ FREE

Cloud Functions:
- 2000 emails + 2000 inventory updates = 4K invocations ✅ FREE

Hosting (with Cloudflare): FREE

Total: $0/month (still free! 🎉)
```

**Key Insight:** Firebase free tier is generous enough for most small-to-medium product pages. You'd need 10K+ orders/month to hit paid tier.

---

### When to Add Firebase

**Add Firebase Integration When:**
- ✅ 20+ users request "easier content updates"
- ✅ Users ask "how do I change price without editing code?"
- ✅ Support requests about inventory management
- ✅ V1.0 validated with 50+ active users

**Don't Add Firebase If:**
- ❌ Still validating V1.0 concept
- ❌ Users are mostly developers (comfortable with code)
- ❌ Target market is one-time campaign launches
- ❌ < 20 users requesting management features

**Timeline:**
- V1.0 (no Firebase): Launch now (2-3 weeks)
- V1.5 (Firebase data): Add after validation (Month 2-3, +1-2 weeks)
- V2.0 (full backend): Only if 100+ users (Month 6+, +2-3 months)

---

### Firebase Implementation in Generated Prompts

When user selects "Enable Easy Content Management" in builder:

**Prompt Includes:**

#### **Section: Firebase Setup Guide**
```markdown
## Firebase Integration Setup

### Step 1: Create Firebase Project
1. Go to https://console.firebase.google.com
2. Click "Add Project"
3. Name it: [Product Name]-store
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Firestore
1. In Firebase Console, click "Firestore Database"
2. Click "Create Database"
3. Select "Start in production mode"
4. Choose location: [nearest region]
5. Click "Enable"

### Step 3: Set Security Rules
Copy this to Firestore Rules tab:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public can read product data
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Only authenticated users can read/write orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Step 4: Enable Authentication
1. Click "Authentication" in sidebar
2. Click "Get Started"
3. Click "Email/Password"
4. Enable and save
5. Click "Add User" to create admin account
6. Email: [your-email]
7. Password: [secure-password]

### Step 5: Get Configuration
1. Click gear icon → Project Settings
2. Scroll to "Your apps"
3. Click web icon (</>) to create web app
4. Copy the firebaseConfig object
5. Paste into `firebase-config.js` file (provided below)

### Step 6: Deploy
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

Your product page is now live with content management! 🎉
```

#### **Section: Generated Files**

**firebase-config.js**
```javascript
// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
```

**admin.html** (Simple dashboard - generated with styling)
```html
<!DOCTYPE html>
<html>
<!-- Complete admin dashboard code with:
     - Login form
     - Product editor
     - Image uploader
     - Stock manager
     - Recent orders viewer
-->
</html>
```

**index.html** (Modified to fetch from Firebase)
```javascript
// Load product data dynamically
db.collection('products').doc(productId).onSnapshot((doc) => {
  const product = doc.data();
  updatePageContent(product);
});
```

---

### Firebase + Lean X Integration

**Complete Flow:**
```
1. User visits product page
   → Firebase loads current price/stock
   
2. User clicks "Buy Now"
   → Redirects to checkout.html
   
3. User enters payment info
   → Lean X processes payment
   
4. Payment succeeds
   → Lean X webhook → Firebase Cloud Function
   → Saves order to Firestore
   → Decrements stock count
   → Sends confirmation email
   
5. User sees thank you page
   → Shows order details from Firebase
   
6. Store owner opens admin
   → Views order in dashboard
   → Can mark as "shipped" or "completed"
```

**All automated, no manual intervention needed.**

---

### Firebase Implementation Checklist

When adding Firebase integration to prompts:

**Prompt Must Include:**
- [ ] Complete Firebase setup guide (with screenshots in docs)
- [ ] Firebase config template
- [ ] Firestore security rules
- [ ] Product page with data binding code
- [ ] Admin dashboard HTML
- [ ] Login/logout functionality
- [ ] Image upload code (optional)
- [ ] Cloud Function for Lean X webhook (optional)
- [ ] Deployment instructions
- [ ] Troubleshooting guide

**Testing Checklist:**
- [ ] User can set up Firebase in < 15 minutes
- [ ] Admin login works
- [ ] Product updates reflect on page within 2 seconds
- [ ] Stock management prevents overselling
- [ ] Orders save correctly from Lean X
- [ ] Images upload and display properly

---

This keeps development focused, costs low, and time-to-market fast.

---

## 🏗️ Technical Architecture

### System Type
**Single-Page Form with Modular Prompt Generation**

The builder is a **single scrollable page** where users fill out sections, upload materials, and generate prompts - all without page navigation or multi-step wizards.

### Interface Design
```
┌─────────────────────────────────────┐
│         Builder Header              │
│  [Axtra Logo]    [Save Draft] [?]  │
├─────────────────────────────────────┤
│                                     │
│  Section 1: Product Information    │
│  [Form fields...]                   │
│  [Image upload area]                │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Section 2: Industry & Category     │
│  [Form fields...]                   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Section 3: Design & Style          │
│  [Visual style cards...]            │
│  [Color pickers...]                 │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  [Continue for 9 sections...]       │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  Section 9: Review & Generate       │
│  [Summary preview]                  │
│  [Generate Prompt Button]          │
│                                     │
└─────────────────────────────────────┘
```

**Key Features:**
- ✅ Single continuous scroll (no page breaks)
- ✅ Sticky progress indicator in header
- ✅ Section anchors for quick navigation
- ✅ Auto-save to localStorage as user types
- ✅ Inline image upload with preview
- ✅ Collapsible sections (accordion style optional)
- ✅ Mobile-responsive (scrolls naturally on mobile)

### Technology Stack (Built From Scratch)
```javascript
// Frontend Only - No Dependencies
✅ Vanilla JavaScript (ES6+)
✅ HTML5 (semantic, accessible)
✅ CSS3 (Axtra Design System)
✅ File API (for image uploads)
✅ LocalStorage (auto-save drafts)
✅ Fetch API (future: save to backend)

// Design System (Only Shared Asset)
✅ Axtra Design System (designsystem.md)
✅ Axtra Design Tokens (CSS variables)

// Explicitly NO:
❌ No frameworks (React, Vue, etc.)
❌ No build tools (Webpack, Vite)
❌ No npm dependencies
❌ No jQuery or legacy libraries
❌ No multi-page navigation
```

### Output Structure
```
Generated Prompt Package/
├── 📄 PRODUCT_PAGE_PROMPT.md      # Main modular prompt
├── 📄 LEAN_X_SETUP.md             # Payment integration guide
├── 📄 FIREBASE_SETUP.md           # Optional CMS setup
├── 📁 assets/                      # User-uploaded materials
│   ├── product-images/             # Uploaded product photos
│   │   ├── hero-image.jpg
│   │   ├── gallery-1.jpg
│   │   └── gallery-2.jpg
│   └── brand-assets/               # Logos, icons
│       └── logo.png
└── 📄 IMPLEMENTATION_CHECKLIST.md # Step-by-step build guide
```

---

## 📋 Builder Flow Design

### Single-Page Scrollable Interface (9 Sections)

Unlike traditional multi-step wizards, this builder uses a **single continuous scrollable page** with 9 distinct sections.

**Section Structure:**
```html
<div class="builder-page">
  <!-- Sticky Header -->
  <header class="builder-header sticky">
    <div class="logo">Axtra Product Page Builder</div>
    <div class="progress-indicator">
      <!-- Shows completion % based on filled fields -->
      <span>65% Complete</span>
    </div>
    <div class="actions">
      <button class="btn-save-draft">Save Draft</button>
      <button class="btn-help">Help</button>
    </div>
  </header>

  <!-- Main Scrollable Content -->
  <main class="builder-content">
    
    <!-- Section 1: Product Information -->
    <section id="section-1" class="builder-section">
      <div class="section-header">
        <span class="section-number">1</span>
        <h2>Product Information</h2>
        <p class="section-description">Tell us about your product</p>
      </div>
      <div class="section-content">
        <!-- Form fields here -->
      </div>
    </section>

    <!-- Divider -->
    <div class="section-divider"></div>

    <!-- Section 2: Industry & Category -->
    <section id="section-2" class="builder-section">
      <!-- ... -->
    </section>

    <!-- Continue for sections 3-9 -->

    <!-- Section 9: Review & Generate -->
    <section id="section-9" class="builder-section section-final">
      <div class="section-header">
        <span class="section-number">9</span>
        <h2>Review & Generate</h2>
      </div>
      <div class="review-summary">
        <!-- Dynamic summary of all inputs -->
      </div>
      <button class="btn-generate-prompt">
        Generate Product Page Prompt
      </button>
    </section>

  </main>

  <!-- Optional: Floating Section Nav -->
  <nav class="section-nav floating">
    <a href="#section-1" class="nav-dot active"></a>
    <a href="#section-2" class="nav-dot"></a>
    <!-- ... -->
  </nav>
</div>
```

---

### Section 1: Product Information

**Purpose:** Core product details that define everything

**Form Fields:**
```html
<div class="form-group">
  <label class="required">Product Name</label>
  <input type="text" 
         id="productName" 
         placeholder="e.g., SEO Masterclass 2025"
         maxlength="100"
         required>
  <span class="char-count">0/100</span>
</div>

<div class="form-group">
  <label class="required">Product Tagline</label>
  <input type="text" 
         id="tagline" 
         placeholder="One-line hook that captures attention"
         maxlength="150">
  <span class="help-text">This appears as your hero subheading</span>
</div>

<div class="form-group">
  <label class="required">Product Description</label>
  <textarea id="description" 
            rows="6"
            placeholder="Describe what your product does and who it's for..."
            minlength="50"
            maxlength="500"
            required></textarea>
  <span class="char-count">0/500</span>
</div>

<div class="form-row">
  <div class="form-group">
    <label class="required">Price</label>
    <input type="number" 
           id="price" 
           placeholder="297"
           min="0"
           step="0.01"
           required>
  </div>
  <div class="form-group">
    <label class="required">Currency</label>
    <select id="currency" required>
      <option value="MYR">MYR (Malaysian Ringgit)</option>
      <option value="USD">USD (US Dollar)</option>
      <option value="SGD">SGD (Singapore Dollar)</option>
      <option value="EUR">EUR (Euro)</option>
      <option value="GBP">GBP (British Pound)</option>
    </select>
  </div>
</div>

<!-- Image Upload Area -->
<div class="form-group">
  <label class="required">Product Images</label>
  <div class="image-upload-zone" id="imageUpload">
    <div class="upload-prompt">
      <svg class="upload-icon"><!-- icon --></svg>
      <p>Drag & drop images here or click to browse</p>
      <span class="help-text">Recommended: 1200x800px, max 5MB per image</span>
    </div>
    <input type="file" 
           id="productImages" 
           multiple 
           accept="image/png,image/jpeg,image/webp"
           style="display:none;">
    
    <!-- Preview Grid (populated after upload) -->
    <div class="image-preview-grid" style="display:none;">
      <!-- Dynamic image thumbnails with remove button -->
    </div>
  </div>
</div>

<div class="form-group">
  <label>Urgency/Scarcity (Optional)</label>
  <div class="checkbox-group">
    <label>
      <input type="checkbox" id="limitedStock">
      <span>Limited stock/availability</span>
    </label>
  </div>
  <div class="conditional-field" id="stockField" style="display:none;">
    <label>Stock Quantity</label>
    <input type="number" id="stockQuantity" min="1" placeholder="50">
  </div>
  
  <div class="checkbox-group">
    <label>
      <input type="checkbox" id="timeLimited">
      <span>Time-limited offer</span>
    </label>
  </div>
  <div class="conditional-field" id="timeField" style="display:none;">
    <label>Offer Ends</label>
    <input type="datetime-local" id="offerEndDate">
  </div>
</div>
```

**JavaScript Behavior:**
```javascript
// Auto-save as user types
document.getElementById('productName').addEventListener('input', debounce(() => {
  saveToLocalStorage();
  updateProgressIndicator();
}, 500));

// Image upload handler
document.getElementById('productImages').addEventListener('change', (e) => {
  handleImageUpload(e.target.files);
});

// Show/hide conditional fields
document.getElementById('limitedStock').addEventListener('change', (e) => {
  document.getElementById('stockField').style.display = 
    e.target.checked ? 'block' : 'none';
});
```

---

### Section 2: Industry & Product Category

**Purpose:** Understand market context and product type

**Form Fields:**
```html
<div class="form-group">
  <label class="required">Industry</label>
  <select id="industry" required>
    <option value="">Choose industry...</option>
    <option value="ecommerce">E-commerce & Retail</option>
    <option value="education">Education & E-Learning</option>
    <option value="saas">SaaS & Software</option>
    <option value="digital-products">Digital Products</option>
    <option value="services">Professional Services</option>
    <option value="health-wellness">Health & Wellness</option>
    <!-- Populated from industries.json -->
  </select>
</div>

<div class="form-group">
  <label class="required">Product Category</label>
  <div class="card-selector">
    <label class="card-option">
      <input type="radio" name="productCategory" value="physical" required>
      <div class="card-content">
        <span class="card-icon">📦</span>
        <h4>Physical Product</h4>
        <p>Tangible goods shipped to customer</p>
      </div>
    </label>
    
    <label class="card-option">
      <input type="radio" name="productCategory" value="digital">
      <div class="card-content">
        <span class="card-icon">💾</span>
        <h4>Digital Product</h4>
        <p>Downloadable or online access</p>
      </div>
    </label>
    
    <label class="card-option">
      <input type="radio" name="productCategory" value="service">
      <div class="card-content">
        <span class="card-icon">🤝</span>
        <h4>Service</h4>
        <p>Professional service or consultation</p>
      </div>
    </label>
    
    <label class="card-option">
      <input type="radio" name="productCategory" value="subscription">
      <div class="card-content">
        <span class="card-icon">🔄</span>
        <h4>Subscription</h4>
        <p>Recurring payment product</p>
      </div>
    </label>
  </div>
</div>

<!-- Conditional: Shipping Options (if physical product) -->
<div id="shippingOptions" class="conditional-section" style="display:none;">
  <h3>Shipping Information</h3>
  
  <div class="form-group">
    <label>Shipping Methods</label>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" name="shipping" value="standard">
        <span>Standard Shipping</span>
      </label>
      <label>
        <input type="checkbox" name="shipping" value="express">
        <span>Express Shipping</span>
      </label>
      <label>
        <input type="checkbox" name="shipping" value="international">
        <span>International Shipping</span>
      </label>
    </div>
  </div>
</div>

<!-- Conditional: Digital Delivery (if digital product) -->
<div id="digitalDelivery" class="conditional-section" style="display:none;">
  <h3>Digital Delivery</h3>
  
  <div class="form-group">
    <label>Delivery Method</label>
    <select id="deliveryMethod">
      <option value="email">Email download link</option>
      <option value="instant">Instant access (member area)</option>
      <option value="manual">Manual delivery</option>
    </select>
  </div>
  
  <div class="form-group">
    <label>File Type(s)</label>
    <input type="text" 
           id="fileTypes" 
           placeholder="e.g., PDF, MP4, ZIP"
           list="fileTypesSuggestions">
    <datalist id="fileTypesSuggestions">
      <option value="PDF">
      <option value="MP4 Video">
      <option value="ZIP Archive">
      <option value="Access Link">
    </datalist>
  </div>
</div>

<div class="form-group">
  <label>Competitor References (Optional)</label>
  <p class="help-text">Product pages you admire for inspiration</p>
  <div id="competitorList">
    <div class="input-with-btn">
      <input type="url" placeholder="https://example.com/product">
      <button type="button" class="btn-icon" onclick="addCompetitor()">+</button>
    </div>
  </div>
</div>
```

**JavaScript Logic:**
```javascript
// Show/hide sections based on product category
document.querySelectorAll('input[name="productCategory"]').forEach(radio => {
  radio.addEventListener('change', (e) => {
    const category = e.target.value;
    
    // Hide all conditional sections
    document.querySelectorAll('.conditional-section').forEach(section => {
      section.style.display = 'none';
    });
    
    // Show relevant section
    if (category === 'physical') {
      document.getElementById('shippingOptions').style.display = 'block';
    } else if (category === 'digital') {
      document.getElementById('digitalDelivery').style.display = 'block';
    }
  });
});
```

---

### Section 3: Design & Style

**Purpose:** Visual design preferences for the product page

**Form Fields:**
```html
<div class="form-group">
  <label class="required">Design Style</label>
  <p class="help-text">Choose the visual style that best fits your product</p>
  
  <div class="style-grid">
    <label class="style-card">
      <input type="radio" name="designStyle" value="conversion-focused" required>
      <div class="style-preview">
        <!-- Visual thumbnail/mockup -->
        <div class="preview-image" style="background: linear-gradient(135deg, #000, #333);">
          <div class="preview-cta">BUY NOW</div>
        </div>
        <h4>Conversion Focused</h4>
        <p>Bold CTAs, urgency, trust badges</p>
        <ul class="style-features">
          <li>High contrast</li>
          <li>Prominent pricing</li>
          <li>Clear hierarchy</li>
        </ul>
      </div>
    </label>
    
    <label class="style-card">
      <input type="radio" name="designStyle" value="premium-luxury">
      <div class="style-preview">
        <div class="preview-image" style="background: linear-gradient(135deg, #f5f5f5, #fff);">
          <div class="preview-product"></div>
        </div>
        <h4>Premium & Luxury</h4>
        <p>Elegant, high-end presentation</p>
        <ul class="style-features">
          <li>Ample whitespace</li>
          <li>Large imagery</li>
          <li>Sophisticated</li>
        </ul>
      </div>
    </label>
    
    <label class="style-card">
      <input type="radio" name="designStyle" value="minimal-clean">
      <div class="style-preview">
        <div class="preview-image" style="background: #fafafa;">
          <div class="preview-text"></div>
        </div>
        <h4>Minimal & Clean</h4>
        <p>Simple, focused on product</p>
        <ul class="style-features">
          <li>Lots of whitespace</li>
          <li>Clean typography</li>
          <li>Subtle colors</li>
        </ul>
      </div>
    </label>
    
    <label class="style-card">
      <input type="radio" name="designStyle" value="bold-vibrant">
      <div class="style-preview">
        <div class="preview-image" style="background: linear-gradient(135deg, #ff6b6b, #4ecdc4);">
          <div class="preview-shapes"></div>
        </div>
        <h4>Bold & Vibrant</h4>
        <p>Eye-catching, energetic</p>
        <ul class="style-features">
          <li>Bright colors</li>
          <li>Dynamic layout</li>
          <li>Strong visuals</li>
        </ul>
      </div>
    </label>
  </div>
</div>

<div class="form-group">
  <label>Color Scheme</label>
  <div class="radio-group">
    <label>
      <input type="radio" name="colorPreference" value="axtra" checked>
      <span>Use Axtra Design System (grayscale + accent)</span>
    </label>
    <label>
      <input type="radio" name="colorPreference" value="brand">
      <span>Provide my brand colors</span>
    </label>
    <label>
      <input type="radio" name="colorPreference" value="ai-suggest">
      <span>Let AI suggest colors based on industry</span>
    </label>
  </div>
</div>

<!-- Conditional: Brand Colors -->
<div id="brandColorsSection" class="conditional-section" style="display:none;">
  <h3>Brand Colors</h3>
  <div class="color-picker-group">
    <div class="color-input">
      <label>Primary Color</label>
      <div class="color-input-wrapper">
        <input type="color" id="primaryColor" value="#000000">
        <input type="text" id="primaryColorHex" value="#000000" pattern="^#[0-9A-Fa-f]{6}$">
      </div>
    </div>
    <div class="color-input">
      <label>Secondary Color</label>
      <div class="color-input-wrapper">
        <input type="color" id="secondaryColor" value="#4a4a4a">
        <input type="text" id="secondaryColorHex" value="#4a4a4a">
      </div>
    </div>
    <div class="color-input">
      <label>Accent/CTA Color</label>
      <div class="color-input-wrapper">
        <input type="color" id="accentColor" value="#2563eb">
        <input type="text" id="accentColorHex" value="#2563eb">
      </div>
    </div>
  </div>
</div>

<div class="form-group">
  <label>Page Layout</label>
  <div class="layout-selector">
    <label class="layout-option">
      <input type="radio" name="layout" value="split" checked>
      <div class="layout-preview">
        <div class="layout-diagram split-diagram"></div>
        <span>Split (Image + Details)</span>
      </div>
    </label>
    <label class="layout-option">
      <input type="radio" name="layout" value="centered">
      <div class="layout-preview">
        <div class="layout-diagram centered-diagram"></div>
        <span>Centered (Single Column)</span>
      </div>
    </label>
    <label class="layout-option">
      <input type="radio" name="layout" value="fullwidth">
      <div class="layout-preview">
        <div class="layout-diagram fullwidth-diagram"></div>
        <span>Full Width Hero</span>
      </div>
    </label>
  </div>
</div>
```

---

### Section 4: Value Proposition & Benefits

**Purpose:** Convince visitors WHY to buy

**Form Fields:**
```html
<div class="form-group">
  <label class="required">Value Propositions</label>
  <p class="help-text">List 3-6 key benefits or reasons to buy</p>
  
  <div id="valuePropositionsList">
    <!-- Dynamic list of value props -->
    <div class="value-prop-item">
      <input type="text" 
             placeholder="e.g., Master SEO in 30 days"
             maxlength="100"
             required>
      <button type="button" class="btn-icon btn-remove" disabled>×</button>
    </div>
    <div class="value-prop-item">
      <input type="text" 
             placeholder="e.g., Lifetime access + updates"
             maxlength="100"
             required>
      <button type="button" class="btn-icon btn-remove" disabled>×</button>
    </div>
    <div class="value-prop-item">
      <input type="text" 
             placeholder="e.g., Proven strategies that work"
             maxlength="100"
             required>
      <button type="button" class="btn-icon btn-remove" disabled>×</button>
    </div>
  </div>
  
  <button type="button" 
          class="btn-secondary btn-sm" 
          onclick="addValueProp()">
    + Add Another Benefit
  </button>
  <span class="help-text">Minimum 3, maximum 6</span>
</div>

<div class="form-group">
  <label>Product Features</label>
  <p class="help-text">Specific features included in the product</p>
  
  <div id="featuresList">
    <div class="feature-item">
      <input type="text" placeholder="e.g., 50+ video lessons">
      <button type="button" class="btn-icon btn-remove">×</button>
    </div>
  </div>
  
  <button type="button" 
          class="btn-secondary btn-sm" 
          onclick="addFeature()">
    + Add Feature
  </button>
</div>

<div class="form-group">
  <label>Social Proof Elements</label>
  <p class="help-text">Build trust with testimonials, reviews, badges</p>
  
  <div class="checkbox-group">
    <label>
      <input type="checkbox" name="socialProof" value="testimonials">
      <span>Customer Testimonials</span>
    </label>
    <label>
      <input type="checkbox" name="socialProof" value="reviews">
      <span>Product Reviews/Rating</span>
    </label>
    <label>
      <input type="checkbox" name="socialProof" value="trust-badges">
      <span>Trust Badges (Money-back, secure checkout)</span>
    </label>
    <label>
      <input type="checkbox" name="socialProof" value="customer-logos">
      <span>Customer Logos/Names</span>
    </label>
    <label>
      <input type="checkbox" name="socialProof" value="media">
      <span>Media Mentions/Press</span>
    </label>
  </div>
</div>

<!-- Conditional: Review Rating -->
<div id="reviewRatingSection" class="conditional-section" style="display:none;">
  <div class="form-group">
    <label>Average Rating</label>
    <div class="rating-input">
      <input type="number" 
             id="rating" 
             min="0" 
             max="5" 
             step="0.1" 
             placeholder="4.8">
      <span>out of 5</span>
    </div>
  </div>
  <div class="form-group">
    <label>Number of Reviews</label>
    <input type="number" id="reviewCount" placeholder="324">
  </div>
</div>

<div class="form-group">
  <label>Guarantee/Refund Policy</label>
  <textarea id="guarantee" 
            rows="3"
            placeholder="e.g., 30-day money-back guarantee, no questions asked"></textarea>
  <span class="help-text">Reduces purchase anxiety</span>
</div>
```

---

### Section 5: Checkout Configuration

**Purpose:** Design the purchase flow

**Form Fields:**
```html
<div class="form-group">
  <label class="required">Checkout Flow</label>
  <div class="radio-group">
    <label>
      <input type="radio" name="checkoutStyle" value="separate-page" checked>
      <span>Separate Checkout Page (Recommended)</span>
      <p class="help-text-inline">Dedicated page, less distractions</p>
    </label>
    <label>
      <input type="radio" name="checkoutStyle" value="on-page">
      <span>On-Page Checkout (Modal/Slide-in)</span>
      <p class="help-text-inline">Stays on product page</p>
    </label>
  </div>
</div>

<div class="form-group">
  <label class="required">Required Customer Information</label>
  <div class="checkbox-group">
    <label>
      <input type="checkbox" name="requiredFields" value="name" checked disabled>
      <span>Name (always required)</span>
    </label>
    <label>
      <input type="checkbox" name="requiredFields" value="email" checked disabled>
      <span>Email (always required)</span>
    </label>
    <label>
      <input type="checkbox" name="requiredFields" value="phone">
      <span>Phone Number</span>
    </label>
    <label>
      <input type="checkbox" name="requiredFields" value="address">
      <span>Address (for physical products)</span>
    </label>
    <label>
      <input type="checkbox" name="requiredFields" value="company">
      <span>Company Name (B2B)</span>
    </label>
  </div>
</div>

<div class="form-group">
  <label>Guest Checkout</label>
  <div class="radio-group-inline">
    <label>
      <input type="radio" name="guestCheckout" value="allowed" checked>
      <span>Allow guest checkout</span>
    </label>
    <label>
      <input type="radio" name="guestCheckout" value="required">
      <span>Require account creation</span>
    </label>
  </div>
  <span class="help-text">Guest checkout reduces friction</span>
</div>

<div class="form-group">
  <label>Additional Options</label>
  <div class="checkbox-group">
    <label>
      <input type="checkbox" id="orderNotes">
      <span>Allow order notes/special instructions</span>
    </label>
    <label>
      <input type="checkbox" id="newsletterOptIn">
      <span>Newsletter opt-in checkbox</span>
    </label>
    <label>
      <input type="checkbox" id="taxCollection">
      <span>Collect tax/VAT/GST</span>
    </label>
  </div>
</div>

<!-- Conditional: Tax Settings -->
<div id="taxSettings" class="conditional-section" style="display:none;">
  <div class="form-group">
    <label>Tax Rate (%)</label>
    <input type="number" 
           id="taxRate" 
           min="0" 
           max="100" 
           step="0.01" 
           placeholder="6.00">
  </div>
</div>
```

---

### Section 6: Lean X Payment Integration

**Purpose:** Configure payment gateway

**Form Fields:**
```html
<div class="form-group">
  <label class="required">Lean X API Key</label>
  <div class="input-with-addon">
    <input type="text" 
           id="leanxApiKey" 
           placeholder="leanx_live_xxxxxxxxxxxxxxx"
           required>
    <button type="button" class="btn-icon" onclick="validateApiKey()">
      Validate
    </button>
  </div>
  <span class="help-text">
    Get your API key from 
    <a href="https://leanx.com/dashboard" target="_blank">Lean X Dashboard</a>
  </span>
</div>

<div class="form-group">
  <label class="required">Environment</label>
  <div class="radio-group-inline">
    <label>
      <input type="radio" name="leanxEnv" value="test" checked>
      <span>Test Mode</span>
    </label>
    <label>
      <input type="radio" name="leanxEnv" value="live">
      <span>Live Mode</span>
    </label>
  </div>
  <span class="help-text">Always test in Test Mode first!</span>
</div>

<div class="form-group">
  <label class="required">Payment Methods</label>
  <p class="help-text">Select payment methods to enable</p>
  <div class="checkbox-group">
    <label>
      <input type="checkbox" name="paymentMethods" value="card" checked>
      <span>💳 Credit/Debit Card</span>
    </label>
    <label>
      <input type="checkbox" name="paymentMethods" value="fpx">
      <span>🏦 FPX (Malaysian Banks)</span>
    </label>
    <label>
      <input type="checkbox" name="paymentMethods" value="ewallet">
      <span>📱 E-Wallets (Touch 'n Go, GrabPay, etc.)</span>
    </label>
    <label>
      <input type="checkbox" name="paymentMethods" value="online-banking">
      <span>🏧 Online Banking</span>
    </label>
  </div>
</div>

<div class="form-group">
  <label>Coupon/Discount Codes</label>
  <div class="radio-group-inline">
    <label>
      <input type="radio" name="couponsEnabled" value="yes">
      <span>Enable</span>
    </label>
    <label>
      <input type="radio" name="couponsEnabled" value="no" checked>
      <span>Disable</span>
    </label>
  </div>
</div>

<div class="form-group">
  <label class="required">Legal Pages</label>
  <p class="help-text">Required for payment processing</p>
  <div class="form-row">
    <div class="form-group">
      <label>Privacy Policy URL</label>
      <input type="url" 
             id="privacyPolicyUrl" 
             placeholder="https://yourdomain.com/privacy"
             required>
    </div>
    <div class="form-group">
      <label>Terms & Conditions URL</label>
      <input type="url" 
             id="termsUrl" 
             placeholder="https://yourdomain.com/terms"
             required>
    </div>
  </div>
</div>
```

---

### Section 7: Post-Purchase Experience

**Purpose:** Thank you page and delivery details

**Form Fields:**
```html
<div class="form-group">
  <label class="required">Thank You Page Headline</label>
  <input type="text" 
         id="thankYouHeadline" 
         placeholder="Thank You for Your Purchase! 🎉"
         maxlength="100"
         required>
</div>

<div class="form-group">
  <label class="required">Thank You Message</label>
  <textarea id="thankYouMessage" 
            rows="4"
            placeholder="Your order has been confirmed. Check your email for access details..."
            required></textarea>
</div>

<div class="form-group">
  <label>What Happens Next?</label>
  <p class="help-text">Step-by-step instructions for customer</p>
  
  <div id="nextStepsList">
    <div class="next-step-item">
      <span class="step-number">1.</span>
      <input type="text" placeholder="e.g., Check your email for login details">
      <button type="button" class="btn-icon btn-remove">×</button>
    </div>
    <div class="next-step-item">
      <span class="step-number">2.</span>
      <input type="text" placeholder="e.g., Join the private community">
      <button type="button" class="btn-icon btn-remove">×</button>
    </div>
  </div>
  
  <button type="button" 
          class="btn-secondary btn-sm" 
          onclick="addNextStep()">
    + Add Step
  </button>
</div>

<!-- Conditional: Digital Product Download/Access -->
<div id="digitalAccessSection" class="conditional-section">
  <div class="form-group">
    <label>Download/Access Button</label>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="showDownloadButton">
        <span>Show download/access button on thank you page</span>
      </label>
    </div>
  </div>
  
  <div id="downloadButtonConfig" class="conditional-section" style="display:none;">
    <div class="form-group">
      <label>Button Text</label>
      <input type="text" 
             id="downloadButtonText" 
             placeholder="Access Course Now"
             value="Download Now">
    </div>
    <span class="help-text">
      Note: Actual download URL will be generated by Lean X
    </span>
  </div>
</div>

<!-- Conditional: Order Tracking (Physical Products) -->
<div id="orderTrackingSection" class="conditional-section" style="display:none;">
  <div class="form-group">
    <label>Order Tracking</label>
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="enableTracking">
        <span>Enable order tracking page</span>
      </label>
    </div>
    <span class="help-text">Customers can check shipment status</span>
  </div>
</div>

<div class="form-group">
  <label>Upsell/Cross-sell (Optional)</label>
  <div class="checkbox-group">
    <label>
      <input type="checkbox" id="showUpsell">
      <span>Show related product offer on thank you page</span>
    </label>
  </div>
</div>

<div id="upsellConfig" class="conditional-section" style="display:none;">
  <div class="form-group">
    <label>Upsell Product Name</label>
    <input type="text" id="upsellProductName" placeholder="Advanced SEO Toolkit">
  </div>
  <div class="form-group">
    <label>Special Offer Price</label>
    <input type="number" id="upsellPrice" placeholder="49">
    <span class="help-text">One-time discounted offer</span>
  </div>
</div>
```

---

### Section 8: Marketing & Analytics

**Purpose:** Track conversions and optimize

**Form Fields:**
```html
<div class="form-group">
  <label>Analytics & Tracking</label>
  <p class="help-text">Connect your marketing and analytics tools</p>
  
  <div class="analytics-inputs">
    <div class="form-group">
      <label>Google Analytics 4</label>
      <input type="text" 
             id="googleAnalyticsId" 
             placeholder="G-XXXXXXXXXX">
      <span class="help-text">Format: G-XXXXXXXXXX</span>
    </div>
    
    <div class="form-group">
      <label>Meta Pixel (Facebook/Instagram)</label>
      <input type="text" 
             id="metaPixelId" 
             placeholder="1234567890">
      <span class="help-text">Facebook Pixel ID</span>
    </div>
    
    <div class="form-group">
      <label>Google Ads Conversion ID</label>
      <input type="text" 
             id="googleAdsId" 
             placeholder="AW-XXXXXXXXX/XXXXXXXXX">
    </div>
    
    <div class="form-group">
      <label>TikTok Pixel</label>
      <input type="text" 
             id="tiktokPixelId" 
             placeholder="XXXXXXXXXXXX">
    </div>
    
    <div class="form-group">
      <label>Custom Tracking Code (Optional)</label>
      <textarea id="customTrackingCode" 
                rows="4"
                placeholder="<!-- Paste any custom tracking scripts here -->"
                spellcheck="false"></textarea>
    </div>
  </div>
</div>

<div class="form-group">
  <label class="required">SEO Optimization</label>
  
  <div class="form-group">
    <label>Meta Title</label>
    <input type="text" 
           id="metaTitle" 
           placeholder="SEO Masterclass 2025 - Rank #1 on Google"
           maxlength="60"
           required>
    <span class="char-count">0/60</span>
  </div>
  
  <div class="form-group">
    <label>Meta Description</label>
    <textarea id="metaDescription" 
              rows="3"
              placeholder="Learn proven SEO strategies that actually work in 2025..."
              maxlength="160"
              required></textarea>
    <span class="char-count">0/160</span>
  </div>
  
  <div class="form-group">
    <label>Focus Keyword</label>
    <input type="text" 
           id="focusKeyword" 
           placeholder="seo course malaysia">
    <span class="help-text">Primary keyword to target</span>
  </div>
  
  <div class="form-group">
    <label>Open Graph Image</label>
    <p class="help-text">Image shown when shared on social media (1200x630px recommended)</p>
    <div class="file-upload-single">
      <input type="file" 
             id="ogImage" 
             accept="image/png,image/jpeg"
             style="display:none;">
      <button type="button" 
              class="btn-secondary" 
              onclick="document.getElementById('ogImage').click()">
        Choose Image
      </button>
      <span id="ogImageName" class="file-name"></span>
    </div>
  </div>
</div>

<div class="form-group">
  <label>Email Marketing (Optional)</label>
  <p class="help-text">Add customers to your email list automatically</p>
  
  <div class="radio-group">
    <label>
      <input type="radio" name="emailMarketing" value="none" checked>
      <span>No email integration</span>
    </label>
    <label>
      <input type="radio" name="emailMarketing" value="mailchimp">
      <span>Mailchimp</span>
    </label>
    <label>
      <input type="radio" name="emailMarketing" value="convertkit">
      <span>ConvertKit</span>
    </label>
    <label>
      <input type="radio" name="emailMarketing" value="activecampaign">
      <span>ActiveCampaign</span>
    </label>
  </div>
</div>

<div id="emailIntegrationConfig" class="conditional-section" style="display:none;">
  <div class="form-group">
    <label>API Key</label>
    <input type="text" id="emailApiKey" placeholder="Your email service API key">
  </div>
  <div class="form-group">
    <label>List/Audience ID</label>
    <input type="text" id="emailListId" placeholder="List ID to add subscribers">
  </div>
</div>
```

---

### Section 9: Review & Generate

**Purpose:** Final review and prompt generation

**UI Layout:**
```html
<div class="review-section">
  <div class="section-header">
    <span class="section-number">9</span>
    <h2>Review & Generate</h2>
    <p class="section-description">Review your inputs and generate the product page prompt</p>
  </div>
  
  <!-- Summary Preview (Dynamic) -->
  <div class="review-summary">
    <h3>Project Summary</h3>
    
    <div class="summary-grid">
      <div class="summary-card">
        <h4>📦 Product</h4>
        <p class="summary-value" id="summaryProductName">-</p>
        <p class="summary-meta" id="summaryPrice">-</p>
      </div>
      
      <div class="summary-card">
        <h4>🏭 Industry</h4>
        <p class="summary-value" id="summaryIndustry">-</p>
        <p class="summary-meta" id="summaryCategory">-</p>
      </div>
      
      <div class="summary-card">
        <h4>🎨 Design</h4>
        <p class="summary-value" id="summaryStyle">-</p>
        <p class="summary-meta" id="summaryLayout">-</p>
      </div>
      
      <div class="summary-card">
        <h4>💳 Payment</h4>
        <p class="summary-value">Lean X</p>
        <p class="summary-meta" id="summaryPaymentMethods">-</p>
      </div>
      
      <div class="summary-card">
        <h4>📊 Analytics</h4>
        <p class="summary-value" id="summaryAnalytics">-</p>
      </div>
      
      <div class="summary-card">
        <h4>🖼️ Assets</h4>
        <p class="summary-value" id="summaryImages">-</p>
      </div>
    </div>
    
    <!-- Detailed Accordion -->
    <div class="review-accordion">
      <details>
        <summary>View All Details</summary>
        <div class="review-details">
          <!-- Full JSON-style review of all inputs -->
          <pre id="fullReviewData"></pre>
        </div>
      </details>
    </div>
  </div>
  
  <!-- Validation Messages -->
  <div id="validationMessages" class="validation-messages" style="display:none;">
    <h4>⚠️ Please complete these fields:</h4>
    <ul id="validationList"></ul>
  </div>
  
  <!-- Generation Options -->
  <div class="generation-options">
    <h3>Generation Options</h3>
    
    <div class="checkbox-group">
      <label>
        <input type="checkbox" id="includeFirebase" value="firebase">
        <span>Include Firebase integration (optional content management)</span>
      </label>
      <label>
        <input type="checkbox" id="includeComments" value="comments" checked>
        <span>Add code comments and explanations</span>
      </label>
      <label>
        <input type="checkbox" id="includeSEO" value="seo" checked>
        <span>Include SEO optimization guide</span>
      </label>
    </div>
  </div>
  
  <!-- Generate Button -->
  <div class="generate-action">
    <button type="button" 
            class="btn-generate" 
            id="generateButton"
            onclick="generatePrompt()">
      <span class="btn-icon">✨</span>
      Generate Product Page Prompt
    </button>
    <p class="help-text">This will create a comprehensive prompt package</p>
  </div>
  
  <!-- Save Draft Option -->
  <div class="save-draft-section">
    <button type="button" 
            class="btn-secondary" 
            onclick="saveDraft()">
      💾 Save Draft to LocalStorage
    </button>
    <button type="button" 
            class="btn-secondary" 
            onclick="loadDraft()">
      📂 Load Saved Draft
    </button>
    <button type="button" 
            class="btn-secondary btn-danger" 
            onclick="clearDraft()">
      🗑️ Clear Draft
    </button>
  </div>
</div>
```

**JavaScript Logic:**
```javascript
// Update summary as user scrolls and fills form
function updateSummary() {
  // Get all form values
  const formData = collectFormData();
  
  // Update summary cards
  document.getElementById('summaryProductName').textContent = 
    formData.productName || 'Not provided';
  
  document.getElementById('summaryPrice').textContent = 
    formData.price ? `${formData.currency} ${formData.price}` : 'Not set';
  
  // ... update other summary fields
  
  // Update detailed review
  document.getElementById('fullReviewData').textContent = 
    JSON.stringify(formData, null, 2);
}

// Validate all required fields
function validateForm() {
  const errors = [];
  
  // Check required fields
  if (!formData.productName) errors.push('Product name is required');
  if (!formData.price) errors.push('Price is required');
  // ... check all required fields
  
  if (errors.length > 0) {
    displayValidationErrors(errors);
    return false;
  }
  
  return true;
}

// Generate prompt
async function generatePrompt() {
  // Validate first
  if (!validateForm()) {
    scrollToFirstError();
    return;
  }
  
  // Show loading
  showLoadingOverlay('Generating your product page prompt...');
  
  // Collect all data
  const formData = collectFormData();
  
  // Generate modular prompt
  const prompt = await generateModularPrompt(formData);
  
  // Package files (prompt + uploaded images)
  const promptPackage = {
    prompt: prompt,
    images: uploadedImages,
    metadata: formData
  };
  
  // Hide loading
  hideLoadingOverlay();
  
  // Show result page or download
  displayPromptResult(promptPackage);
}
```
**Purpose:** Understand market context and optimize for industry best practices

**User Input:**
- Industry selection (E-commerce & Retail, Digital Products, Services, SaaS, etc.)
- Product category (Physical goods, Digital downloads, Services, Subscriptions)
- Competitor references (optional - for design inspiration)

**Data Collected:**
```json
{
  "industry": "digital-products",
  "productCategory": "digital-download",
  "competitors": ["gumroad.com", "sellfy.com"]
}
```

**Why This Matters:**
- Physical products need shipping forms
- Digital products need instant delivery
- Services need booking/scheduling consideration
- Subscription products need recurring payment setup

---

#### **Step 2: Product Information**
**Purpose:** Core product details that drive the entire funnel

**User Input:**
- Product name
- Product tagline/headline
- Product description (50-500 chars)
- Product price (single price vs. pricing tiers)
- Currency (MYR, USD, SGD, etc.)
- Limited quantity/urgency? (yes/no)

**Data Collected:**
```json
{
  "productName": "SEO Masterclass 2025",
  "tagline": "Rank #1 on Google in 90 Days",
  "description": "Comprehensive video course...",
  "pricing": {
    "type": "single",
    "amount": 297,
    "currency": "MYR"
  },
  "urgency": {
    "enabled": true,
    "message": "Only 50 spots available"
  }
}
```

**Validation:**
- Product name: required, 3-100 chars
- Price: required, positive number
- Description: required, 50-500 chars

---

#### **Step 3: Product Page Design**
**Purpose:** Visual presentation and conversion optimization

**User Input:**
- Design style (from existing styles.json + e-commerce specific styles)
- Layout preference:
  - Single column (mobile-first)
  - Split view (image left, details right)
  - Full-width hero with details below
- Image requirements (how many product images needed?)
- Video embed? (product demo, explainer)
- Color scheme (Axtra default, brand colors, AI suggest)

**E-commerce Specific Styles:**
```json
{
  "styles": [
    {
      "id": "conversion-focused",
      "name": "Conversion Focused",
      "description": "Bold CTAs, urgency elements, trust badges",
      "characteristics": "High contrast, prominent buttons, minimal distractions"
    },
    {
      "id": "premium-luxury",
      "name": "Premium & Luxury",
      "description": "Elegant, high-end product presentation",
      "characteristics": "Ample whitespace, sophisticated typography, subtle animations"
    },
    {
      "id": "fast-checkout",
      "name": "Fast Checkout",
      "description": "Minimal friction, one-page flow",
      "characteristics": "Single-page checkout, autofill, express payment options"
    }
  ]
}
```

---

#### **Step 4: Value Proposition & Benefits**
**Purpose:** Convince visitors WHY they should buy

**User Input:**
- Main value propositions (3-6 key benefits)
- Product features (what they get)
- Social proof elements:
  - [ ] Customer testimonials
  - [ ] Review count/rating
  - [ ] Trust badges (money-back guarantee, secure checkout)
  - [ ] Customer logos/names
  - [ ] Media mentions
- Guarantee/refund policy (text)

**Data Collected:**
```json
{
  "valuePropositions": [
    "Master on-page SEO in 30 days",
    "Link building strategies that actually work",
    "Lifetime access + updates"
  ],
  "features": [
    "50+ video lessons",
    "Downloadable templates",
    "Private community access"
  ],
  "socialProof": {
    "testimonials": true,
    "reviewRating": 4.8,
    "trustBadges": ["30-day money-back", "Secure checkout"]
  },
  "guarantee": "30-day money-back guarantee, no questions asked"
}
```

---

#### **Step 5: Checkout Configuration**
**Purpose:** Design the purchase flow for minimum friction

**User Input:**
- Checkout style:
  - [ ] Separate checkout page (recommended)
  - [ ] On-page checkout (modal/slide-in)
- Required customer fields:
  - [ ] Name (required)
  - [ ] Email (required)
  - [ ] Phone (optional)
  - [ ] Address (for physical products)
  - [ ] Custom fields
- Guest checkout allowed? (yes/no)
- Order notes/special instructions? (yes/no)
- Shipping options (if physical product):
  - Standard shipping
  - Express shipping
  - International shipping
  - Free shipping threshold?

**For Digital Products:**
- Delivery method: Email download link, instant access, etc.
- License key generation needed?

**Data Collected:**
```json
{
  "checkoutStyle": "separate-page",
  "requiredFields": ["name", "email"],
  "optionalFields": ["phone"],
  "guestCheckout": true,
  "shipping": null,
  "digitalDelivery": {
    "method": "email",
    "message": "Download link sent to your email instantly"
  }
}
```

---

#### **Step 6: Lean X Payment Integration** ⭐
**Purpose:** Configure payment gateway for seamless transactions

**User Input:**
- Lean X API key (text input with validation)
- Environment: [ ] Test Mode [ ] Live Mode
- Payment methods to enable:
  - [ ] Credit/Debit Card
  - [ ] FPX (Malaysian banks)
  - [ ] E-wallets (Touch 'n Go, GrabPay, etc.)
  - [ ] Online banking
- Currency (MYR default, others available)
- Tax/GST percentage (if applicable)
- Coupon/discount codes enabled? (yes/no)

**Security & Compliance:**
- PCI compliance note (handled by Lean X)
- Privacy policy link (required)
- Terms & conditions link (required)

**Data Collected:**
```json
{
  "leanx": {
    "apiKey": "[USER_PROVIDED]",
    "environment": "test",
    "paymentMethods": ["card", "fpx", "ewallet"],
    "currency": "MYR",
    "tax": {
      "enabled": false,
      "rate": 0
    },
    "coupons": false
  },
  "legal": {
    "privacyPolicy": "https://example.com/privacy",
    "termsConditions": "https://example.com/terms"
  }
}
```

**Technical Notes:**
- Provide Lean X SDK integration code
- Include error handling for failed payments
- Setup webhook URLs for payment confirmation

---

#### **Step 7: Post-Purchase Experience**
**Purpose:** Confirmation, delivery, and customer satisfaction

**User Input:**
- Thank you page message (custom or template)
- What happens next? (explain delivery/access)
- Email confirmation (via Lean X webhook or manual)
- Order tracking needed? (yes/no - for physical products)
- Upsell/cross-sell on thank you page? (optional)
- Download CTA (for digital products)

**Data Collected:**
```json
{
  "thankYou": {
    "headline": "Welcome to SEO Masterclass! 🎉",
    "message": "Check your email for instant access link",
    "nextSteps": [
      "1. Check your email for login details",
      "2. Join the private community",
      "3. Start with Module 1"
    ],
    "downloadButton": {
      "enabled": true,
      "text": "Access Course Now",
      "url": "[Generated via Lean X]"
    }
  },
  "upsell": null
}
```

---

#### **Step 8: Marketing & Analytics**
**Purpose:** Track conversions and optimize performance

**User Input:**
- Conversion tracking platforms:
  - [ ] Google Analytics 4
  - [ ] Meta Pixel (Facebook/Instagram ads)
  - [ ] Google Ads conversion tracking
  - [ ] TikTok Pixel
  - [ ] Custom tracking code
- SEO optimization:
  - Meta title
  - Meta description
  - Focus keyword
  - Open Graph tags (for social sharing)
- Email marketing integration:
  - [ ] Mailchimp
  - [ ] ConvertKit
  - [ ] None (just Lean X receipts)

**Data Collected:**
```json
{
  "analytics": {
    "googleAnalytics": "G-XXXXXXXXXX",
    "metaPixel": "1234567890",
    "customCode": null
  },
  "seo": {
    "metaTitle": "SEO Masterclass 2025 - Rank #1 on Google",
    "metaDescription": "Learn proven SEO strategies...",
    "focusKeyword": "seo course malaysia",
    "ogImage": "[provided by user]"
  },
  "emailMarketing": null
}
```

---

#### **Step 9: Review & Generate**
**Purpose:** Final review and prompt generation

**User Interface:**
- Display summary of all inputs
- Edit buttons for each section (navigate back to step)
- Preview mockup (optional - low-fidelity wireframe)
- Generate button (large, prominent)

**Actions:**
- Validate all required fields
- Generate comprehensive modular prompt
- Display prompt in preview page
- Provide download/copy options

---

## 🎨 Prompt Template Structure

### Generated Prompt Format (Modular - Option B)

```markdown
# Product Page System - [Product Name]

**Generated by:** Axtra Product Page Builder  
**Date:** [Date]  
**Builder Version:** 1.0.0

---

## 📦 Project Overview

You are building a conversion-optimized product page system for:
- **Product:** [Product Name]
- **Industry:** [Industry]
- **Price:** [Price] [Currency]
- **Type:** [Physical/Digital/Service/Subscription]

**Key Focus:** High conversion rate, mobile-first, fast checkout, Lean X payment integration.

---

## 🗂️ File Structure

Create the following structure:

```
[product-slug]/
├── index.html
├── checkout.html
├── thankyou.html
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   └── leanx.js
│   └── images/
└── README.md
```

---

## 📄 MODULE 1: Product Page (index.html)

### Purpose
Convert visitors into buyers with persuasive product presentation.

### Design Specifications
- **Style:** [Design Style Name]
- **Layout:** [Layout Type]
- **Color Scheme:** [Axtra/Brand/AI-suggested colors]

### Page Sections (in order)

#### 1. Hero Section
**Layout:** [Split/Full-width/Centered]
```html
<!-- Structure -->
<section class="hero">
  <div class="hero-content">
    <h1>[Product Name]</h1>
    <p class="tagline">[Tagline]</p>
    <div class="price">
      <span class="amount">[Currency] [Price]</span>
      [Urgency message if enabled]
    </div>
    <button class="cta-primary">Buy Now</button>
    <div class="trust-indicators">
      [Trust badges: secure checkout, money-back guarantee]
    </div>
  </div>
  <div class="hero-media">
    [Product image/video placeholder]
  </div>
</section>
```

**Styling Notes:**
- Use high contrast for CTA button
- Mobile: Stack vertically, image on top
- Desktop: 50/50 split or 60/40 weighted to image

#### 2. Value Propositions Section
Display key benefits that resonate with target audience.

```html
<section class="value-props">
  <h2>Why [Product Name]?</h2>
  <div class="props-grid">
    [Loop through value propositions]
    <div class="prop-card">
      <h3>[Value Prop Title]</h3>
      <p>[Description]</p>
    </div>
  </div>
</section>
```

**Data:**
[Insert value propositions from form data]

#### 3. Features Section
What's included in the purchase.

```html
<section class="features">
  <h2>What You Get</h2>
  <ul class="features-list">
    [Loop through features]
    <li>✓ [Feature]</li>
  </ul>
</section>
```

**Data:**
[Insert features from form data]

#### 4. Social Proof Section
[If enabled] Display testimonials, reviews, trust elements.

```html
<section class="social-proof">
  <h2>What Customers Say</h2>
  <div class="testimonials">
    [Testimonial cards - placeholder for user to add real testimonials]
  </div>
  <div class="trust-badges">
    [Trust badge icons and text]
  </div>
</section>
```

#### 5. Final CTA Section
Strong call-to-action to convert.

```html
<section class="final-cta">
  <h2>Ready to Get Started?</h2>
  <p>[Guarantee message]</p>
  <button class="cta-primary large">Buy [Product Name] Now</button>
</section>
```

### JavaScript Behavior (cart.js)
```javascript
// When user clicks "Buy Now"
document.querySelector('.cta-primary').addEventListener('click', () => {
  // Save product to localStorage
  const product = {
    id: '[product-id]',
    name: '[Product Name]',
    price: [Price],
    currency: '[Currency]',
    quantity: 1
  };
  
  localStorage.setItem('cart', JSON.stringify(product));
  
  // Redirect to checkout
  window.location.href = 'checkout.html';
});
```

---

## 📄 MODULE 2: Checkout Page (checkout.html)

### Purpose
Collect customer information and process payment with minimum friction.

### Page Structure
```html
<div class="checkout-container">
  <div class="order-summary">
    <!-- Read from localStorage and display -->
    <h2>Order Summary</h2>
    <div class="product-item">
      <span>[Product Name]</span>
      <span>[Price]</span>
    </div>
    [If tax enabled]
    <div class="tax-line">
      <span>Tax ([Tax Rate]%)</span>
      <span>[Calculated Tax]</span>
    </div>
    <div class="total">
      <strong>Total:</strong>
      <strong>[Total Amount]</strong>
    </div>
  </div>
  
  <div class="checkout-form">
    <h2>Checkout</h2>
    <form id="checkout-form">
      <!-- Customer Fields -->
      <input type="text" name="name" placeholder="Full Name" required>
      <input type="email" name="email" placeholder="Email" required>
      [Additional fields based on configuration]
      
      [If shipping enabled]
      <fieldset>
        <legend>Shipping Address</legend>
        [Address fields]
      </fieldset>
      
      <button type="submit" class="btn-pay">
        Pay [Total Amount]
      </button>
    </form>
  </div>
</div>
```

### JavaScript Behavior (checkout.js)
```javascript
// On page load
document.addEventListener('DOMContentLoaded', () => {
  // Read cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart'));
  
  if (!cart) {
    // Redirect back if no cart
    window.location.href = 'index.html';
    return;
  }
  
  // Display order summary
  displayOrderSummary(cart);
});

// On form submit
document.getElementById('checkout-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const customer = Object.fromEntries(formData);
  
  // Get cart
  const cart = JSON.parse(localStorage.getItem('cart'));
  
  // Prepare order for Lean X
  const orderData = {
    customer: customer,
    items: [cart],
    amount: cart.price,
    currency: cart.currency
  };
  
  // Initialize Lean X payment
  await processPayment(orderData);
});
```

---

## 📄 MODULE 3: Lean X Payment Integration (leanx.js)

### API Configuration
```javascript
const LEANX_CONFIG = {
  apiKey: '[USER_PROVIDED_API_KEY]',
  environment: '[test/production]',
  successUrl: window.location.origin + '/thankyou.html',
  cancelUrl: window.location.origin + '/checkout.html?status=cancelled'
};
```

### Payment Processing Function
```javascript
async function processPayment(orderData) {
  try {
    // Show loading state
    showLoading('Processing payment...');
    
    // Initialize Lean X SDK
    // NOTE: Replace with actual Lean X SDK implementation
    const leanx = new LeanX(LEANX_CONFIG.apiKey);
    
    // Create payment session
    const paymentSession = await leanx.createPayment({
      amount: orderData.amount,
      currency: orderData.currency,
      customer: {
        name: orderData.customer.name,
        email: orderData.customer.email,
        phone: orderData.customer.phone
      },
      metadata: {
        productId: orderData.items[0].id,
        productName: orderData.items[0].name
      },
      successUrl: LEANX_CONFIG.successUrl + '?session_id={SESSION_ID}',
      cancelUrl: LEANX_CONFIG.cancelUrl
    });
    
    // Redirect to Lean X payment page
    window.location.href = paymentSession.paymentUrl;
    
  } catch (error) {
    console.error('Payment error:', error);
    showError('Payment failed. Please try again.');
  }
}
```

### Error Handling
```javascript
function showError(message) {
  // Display user-friendly error
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  document.querySelector('.checkout-form').prepend(errorDiv);
}
```

---

## 📄 MODULE 4: Thank You Page (thankyou.html)

### Purpose
Confirm purchase, provide access/delivery info, track conversion.

### Page Structure
```html
<div class="thankyou-container">
  <div class="success-icon">✓</div>
  <h1>[Thank You Headline]</h1>
  <p class="confirmation-message">[Thank You Message]</p>
  
  <div class="order-details">
    <h2>Order Confirmation</h2>
    <p>Order ID: <strong id="order-id"></strong></p>
    <p>Email: <strong id="customer-email"></strong></p>
  </div>
  
  <div class="next-steps">
    <h2>What's Next?</h2>
    <ol>
      [Loop through next steps]
      <li>[Step]</li>
    </ol>
  </div>
  
  [If digital product]
  <div class="access-section">
    <a href="#" class="btn-download">
      [Download/Access CTA Text]
    </a>
  </div>
  
  [If order tracking enabled]
  <div class="tracking">
    <a href="tracking.html?order_id={ORDER_ID}">
      Track Your Order
    </a>
  </div>
</div>
```

### JavaScript Behavior
```javascript
// Extract order ID from URL
const urlParams = new URLSearchParams(window.location.search);
const sessionId = urlParams.get('session_id');

// Verify payment with Lean X (optional)
async function verifyPayment(sessionId) {
  // Call Lean X API to get payment status
  // Display order confirmation details
}

// Conversion Tracking
[If analytics enabled]
// Google Analytics
gtag('event', 'purchase', {
  transaction_id: sessionId,
  value: [Product Price],
  currency: '[Currency]',
  items: [{
    item_id: '[Product ID]',
    item_name: '[Product Name]',
    price: [Price],
    quantity: 1
  }]
});

// Meta Pixel
fbq('track', 'Purchase', {
  value: [Product Price],
  currency: '[Currency]',
  content_ids: ['[Product ID]'],
  content_type: 'product'
});
```

---

## 🎨 MODULE 5: Styling (styles.css)

### Design System Integration
Use **Axtra Design System** as foundation:

```css
/* Import Axtra Design Tokens */
@import url('design-tokens.css');

/* Color Scheme */
:root {
  /* [If brand colors provided] */
  --color-primary: [Primary Color];
  --color-secondary: [Secondary Color];
  --color-accent: [Accent Color];
  
  /* [If Axtra default] */
  /* Use existing Axtra color palette */
}

/* Typography */
/* Use Axtra typography scale */

/* Components */
/* Use Axtra button, form, card components */
```

### E-commerce Specific Styles
```css
/* CTA Buttons - High Conversion */
.cta-primary {
  /* Large, high contrast, impossible to miss */
  font-size: 1.25rem;
  padding: 1rem 2.5rem;
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

.cta-primary:hover {
  transform: scale(1.05);
}

/* Price Display */
.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-primary);
}

/* Trust Badges */
.trust-indicators {
  display: flex;
  gap: 1rem;
  align-items: center;
  opacity: 0.8;
}

/* Urgency Elements */
.urgency {
  background: var(--color-warning);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
}
```

### Mobile Optimization
```css
/* Mobile-first approach */
@media (max-width: 768px) {
  /* Stack layouts vertically */
  /* Larger tap targets (min 44px) */
  /* Simplified navigation */
  /* Single-column checkout */
}
```

---

## ✅ MODULE 6: Implementation Checklist

### Phase 1: Setup (30 minutes)
- [ ] Create project folder structure
- [ ] Copy Axtra Design System CSS files
- [ ] Set up HTML skeleton for all pages
- [ ] Test page navigation (index → checkout → thankyou)

### Phase 2: Product Page (2-3 hours)
- [ ] Build hero section with product info
- [ ] Add value propositions section
- [ ] Add features list
- [ ] Add social proof elements (if enabled)
- [ ] Add final CTA section
- [ ] Implement "Buy Now" cart logic
- [ ] Test mobile responsiveness
- [ ] Add product images/video

### Phase 3: Checkout Flow (2-3 hours)
- [ ] Build order summary component
- [ ] Build checkout form with required fields
- [ ] Implement form validation
- [ ] Style checkout page (trust, security indicators)
- [ ] Test cart data flow from product page
- [ ] Add shipping fields (if physical product)
- [ ] Add tax calculation (if enabled)

### Phase 4: Lean X Integration (2-4 hours)
- [ ] Obtain Lean X API credentials (test mode)
- [ ] Read Lean X SDK documentation
- [ ] Implement payment initialization
- [ ] Set up success/cancel redirect URLs
- [ ] Test payment flow in sandbox
- [ ] Handle payment errors gracefully
- [ ] Implement webhook listener (optional)

### Phase 5: Thank You Page (1-2 hours)
- [ ] Build thank you page layout
- [ ] Extract order ID from URL
- [ ] Display order confirmation
- [ ] Add next steps instructions
- [ ] Add download/access button (if digital)
- [ ] Add order tracking link (if physical)
- [ ] Implement conversion tracking code

### Phase 6: Testing & Optimization (2-3 hours)
- [ ] Test complete user journey (product → checkout → payment → thank you)
- [ ] Test on mobile devices
- [ ] Test in different browsers
- [ ] Test payment failure scenarios
- [ ] Test with different form inputs
- [ ] Verify analytics tracking fires
- [ ] Check page load speed
- [ ] Validate HTML/CSS
- [ ] Check accessibility (WCAG)

### Phase 7: Deployment (1 hour)
- [ ] Choose hosting (Netlify, Vercel, GitHub Pages)
- [ ] Configure custom domain (if applicable)
- [ ] Switch Lean X to production mode
- [ ] Update API keys
- [ ] Test live payment (small amount)
- [ ] Set up SSL certificate
- [ ] Submit sitemap to Google

### Phase 8: Launch & Monitor
- [ ] Launch product page
- [ ] Monitor first transactions
- [ ] Check email confirmations working
- [ ] Monitor analytics for issues
- [ ] Collect user feedback
- [ ] Iterate and optimize

---

## 🔧 MODULE 7: Lean X Setup Guide

### Prerequisites
1. Lean X merchant account
2. API credentials (test + production)
3. Understanding of webhook URLs

### Configuration Steps

#### 1. Get API Keys
```
Test Mode: leanx_test_xxxxxxxxxxxxx
Live Mode: leanx_live_xxxxxxxxxxxxx
```

#### 2. Configure Webhook (Optional but Recommended)
For email confirmations and order updates:
- Webhook URL: `https://yourdomain.com/webhook-handler.php`
- Events to listen: `payment.success`, `payment.failed`

#### 3. Set Redirect URLs
```javascript
{
  successUrl: 'https://yourdomain.com/thankyou.html?session_id={SESSION_ID}',
  cancelUrl: 'https://yourdomain.com/checkout.html?cancelled=true'
}
```

#### 4. Test Payment Flow
Use Lean X test cards:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002

#### 5. Go Live
- Switch API key to production
- Test with real small payment
- Monitor first transactions closely

---

## 📊 MODULE 8: Analytics & Tracking Setup

### Google Analytics 4
```html
<!-- Add to <head> of all pages -->
<script async src="https://www.googletagmanager.com/gtag/js?id=[GA4_ID]"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '[GA4_ID]');
</script>
```

### Meta Pixel (Facebook/Instagram)
```html
<!-- Add to <head> of all pages -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '[PIXEL_ID]');
  fbq('track', 'PageView');
</script>
```

### Conversion Tracking (Thank You Page)
```javascript
// Fire on thank you page load
gtag('event', 'purchase', { /* data */ });
fbq('track', 'Purchase', { /* data */ });
```

---

## 🚀 MODULE 9: SEO Optimization

### Meta Tags (index.html)
```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- Primary Meta Tags -->
  <title>[Meta Title]</title>
  <meta name="title" content="[Meta Title]">
  <meta name="description" content="[Meta Description]">
  <meta name="keywords" content="[Focus Keyword], [related keywords]">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="product">
  <meta property="og:url" content="[Page URL]">
  <meta property="og:title" content="[Meta Title]">
  <meta property="og:description" content="[Meta Description]">
  <meta property="og:image" content="[OG Image URL]">
  <meta property="product:price:amount" content="[Price]">
  <meta property="product:price:currency" content="[Currency]">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="[Page URL]">
  <meta property="twitter:title" content="[Meta Title]">
  <meta property="twitter:description" content="[Meta Description]">
  <meta property="twitter:image" content="[OG Image URL]">
  
  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "[Product Name]",
    "image": "[Product Image URL]",
    "description": "[Product Description]",
    "brand": {
      "@type": "Brand",
      "name": "[Business Name]"
    },
    "offers": {
      "@type": "Offer",
      "url": "[Page URL]",
      "priceCurrency": "[Currency]",
      "price": "[Price]",
      "availability": "https://schema.org/InStock"
    }
  }
  </script>
</head>
```

---

## 🎯 Success Metrics

Track these KPIs to measure product page performance:

### Primary Metrics
- **Conversion Rate:** (Purchases / Visitors) × 100
- **Average Order Value (AOV):** Total Revenue / Number of Orders
- **Cart Abandonment Rate:** (Carts Created - Purchases) / Carts Created

### Secondary Metrics
- Page load time (< 3 seconds)
- Mobile traffic percentage
- Bounce rate (< 40% is good)
- Time on page (higher = more engaged)
- Button click rate (CTA engagement)

### Optimization Targets
- Conversion rate: 2-5% (good), 5-10% (excellent)
- Page load: < 3 seconds
- Mobile conversion: Within 20% of desktop

---

## 🔄 Iteration & Optimization

### A/B Testing Ideas
1. **Headline variations** - Test different value propositions
2. **CTA button text** - "Buy Now" vs "Get Instant Access" vs "Start Learning"
3. **Price presentation** - Show original price crossed out, payment plans
4. **Social proof placement** - Top vs middle vs bottom
5. **Image vs video** - Static product image vs demo video
6. **Urgency elements** - Countdown timer vs "X spots left" vs none

### Heatmap Analysis
Use tools like Hotjar or Microsoft Clarity to:
- See where users click
- Identify friction points
- Understand scroll depth
- Watch session recordings

---

## 📚 Additional Resources

### Lean X Documentation
- API Reference: [Lean X API Docs URL]
- Integration Guide: [Lean X Integration Guide]
- Test Cards: [Lean X Test Cards]
- Webhook Events: [Lean X Webhooks]

### Design Inspiration
- Industry competitors: [From Step 1 user input]
- Conversion optimization: Unbounce, Instapage case studies
- E-commerce patterns: Baymard Institute research

### Tools & Libraries
- Form validation: Native HTML5 (no libraries needed)
- Date/time: Native JavaScript Date object
- HTTP requests: Fetch API (built-in)
- Storage: localStorage (built-in)

---

## ⚠️ Important Notes

### Security Considerations
- ✅ Never store credit card details (handled by Lean X)
- ✅ Use HTTPS for all pages (required for payment processing)
- ✅ Validate all form inputs server-side (if using backend)
- ✅ Implement CSRF protection for webhooks
- ✅ Don't expose API keys in client-side code (use environment variables)

### Privacy & Compliance
- ✅ Add privacy policy link (required)
- ✅ Add terms & conditions (required)
- ✅ Cookie consent (if using analytics)
- ✅ GDPR compliance (if EU customers)
- ✅ Data retention policy

### Performance Optimization
- ✅ Optimize images (WebP format, lazy loading)
- ✅ Minify CSS/JS for production
- ✅ Use CDN for static assets
- ✅ Implement browser caching
- ✅ Reduce third-party scripts

---

## 🆘 Troubleshooting

### Common Issues

**Issue:** Cart data not persisting
- **Solution:** Check localStorage is enabled, test in incognito mode

**Issue:** Payment redirect fails
- **Solution:** Verify redirect URLs are absolute (not relative), check CORS settings

**Issue:** Conversion tracking not firing
- **Solution:** Check pixel IDs are correct, use browser dev tools Network tab

**Issue:** Mobile layout broken
- **Solution:** Test with real devices, check viewport meta tag, validate CSS

**Issue:** Payment fails silently
- **Solution:** Check browser console for errors, verify API key is correct, test network requests

---

## 📞 Support & Next Steps

### Get Help
- **Lean X Support:** [Support email/portal]
- **Axtra Team:** [Your support contact]
- **Community:** [Forum/Discord if available]

### After Launch
1. Monitor first 24 hours closely
2. Collect customer feedback
3. Review analytics weekly
4. Plan optimization experiments
5. Scale marketing campaigns

---

**End of Implementation Guide**

This prompt provides everything needed to build a high-converting product page system with Lean X payment integration. Follow each module sequentially, test thoroughly, and iterate based on real user data.

Good luck with your product launch! 🚀
```

---

## 🗄️ Data Structure Requirements

### New JSON Files Needed

#### `product-categories.json`
```json
{
  "categories": [
    {
      "id": "physical-product",
      "name": "Physical Product",
      "description": "Tangible goods shipped to customer",
      "requiresShipping": true,
      "deliveryType": "shipping",
      "examples": ["Clothing", "Books", "Electronics", "Food"]
    },
    {
      "id": "digital-product",
      "name": "Digital Product",
      "description": "Downloadable or online-access products",
      "requiresShipping": false,
      "deliveryType": "instant",
      "examples": ["E-books", "Courses", "Software", "Templates"]
    },
    {
      "id": "service",
      "name": "Service",
      "description": "Professional services or consultations",
      "requiresShipping": false,
      "deliveryType": "scheduled",
      "examples": ["Consulting", "Coaching", "Design work", "Workshops"]
    },
    {
      "id": "subscription",
      "name": "Subscription",
      "description": "Recurring payment products",
      "requiresShipping": false,
      "deliveryType": "ongoing",
      "examples": ["Memberships", "SaaS access", "Content subscriptions"]
    }
  ]
}
```

#### `ecommerce-objectives.json`
```json
{
  "objectives": [
    {
      "id": "direct-sale",
      "name": "Direct Sale",
      "description": "Sell product immediately, single purchase",
      "icon": "💳",
      "checkoutType": "instant",
      "upsellRecommended": false
    },
    {
      "id": "pre-order",
      "name": "Pre-Order/Coming Soon",
      "description": "Accept orders before product launch",
      "icon": "📅",
      "checkoutType": "reservation",
      "upsellRecommended": false
    },
    {
      "id": "limited-offer",
      "name": "Limited Time Offer",
      "description": "Time-sensitive sale with urgency",
      "icon": "⏰",
      "checkoutType": "instant",
      "urgencyEnabled": true,
      "upsellRecommended": true
    },
    {
      "id": "subscription",
      "name": "Subscription/Membership",
      "description": "Recurring payment signup",
      "icon": "🔄",
      "checkoutType": "subscription",
      "upsellRecommended": false
    },
    {
      "id": "bundle-deal",
      "name": "Bundle/Package Deal",
      "description": "Multiple products sold together",
      "icon": "📦",
      "checkoutType": "instant",
      "upsellRecommended": true
    }
  ]
}
```

#### `ecommerce-styles.json` (extends existing styles.json)
```json
{
  "ecommerceStyles": [
    {
      "id": "conversion-focused",
      "name": "Conversion Focused",
      "description": "Bold CTAs, urgency, trust badges",
      "characteristics": [
        "High contrast CTA buttons",
        "Prominent pricing display",
        "Multiple trust indicators",
        "Minimal distractions",
        "Clear value hierarchy"
      ],
      "bestFor": ["Direct sales", "Limited offers", "High-ticket items"],
      "colorApproach": "Bold accent colors for CTAs, clean backgrounds"
    },
    {
      "id": "premium-luxury",
      "name": "Premium & Luxury",
      "description": "Elegant, high-end product presentation",
      "characteristics": [
        "Ample whitespace",
        "Large product imagery",
        "Sophisticated typography",
        "Subtle animations",
        "Minimal but powerful CTAs"
      ],
      "bestFor": ["High-end products", "Luxury goods", "Premium services"],
      "colorApproach": "Muted tones, gold/silver accents, black & white base"
    },
    {
      "id": "fast-checkout",
      "name": "Fast Checkout Optimized",
      "description": "Minimum friction, express purchase",
      "characteristics": [
        "One-page checkout",
        "Guest checkout enabled",
        "Autofill friendly",
        "Express payment buttons",
        "Progress indicators"
      ],
      "bestFor": ["Low-ticket items", "Impulse purchases", "Digital products"],
      "colorApproach": "Clean, simple, familiar patterns"
    },
    {
      "id": "storytelling",
      "name": "Story-Driven",
      "description": "Narrative-based product presentation",
      "characteristics": [
        "Long-form content",
        "Emotional appeal",
        "Founder/origin story",
        "Customer journey focus",
        "Scroll-based reveals"
      ],
      "bestFor": ["Brand-driven products", "Unique stories", "Premium offers"],
      "colorApproach": "Brand colors, emotional palette, visual storytelling"
    }
  ]
}
```

#### `checkout-fields.json`
```json
{
  "fieldGroups": {
    "customer": {
      "name": "Customer Information",
      "fields": [
        { "id": "fullName", "label": "Full Name", "type": "text", "required": true },
        { "id": "email", "label": "Email", "type": "email", "required": true },
        { "id": "phone", "label": "Phone Number", "type": "tel", "required": false }
      ]
    },
    "shipping": {
      "name": "Shipping Address",
      "fields": [
        { "id": "address1", "label": "Address Line 1", "type": "text", "required": true },
        { "id": "address2", "label": "Address Line 2", "type": "text", "required": false },
        { "id": "city", "label": "City", "type": "text", "required": true },
        { "id": "state", "label": "State/Province", "type": "text", "required": true },
        { "id": "postalCode", "label": "Postal Code", "type": "text", "required": true },
        { "id": "country", "label": "Country", "type": "select", "required": true }
      ]
    },
    "billing": {
      "name": "Billing Address",
      "sameAsShipping": true
    }
  }
}
```

---

## 📅 Development Phases

### Phase 1: Planning & Research (Current - Week 0)
- ✅ Define architecture
- ✅ Create project guide document
- ⏳ Research Lean X API capabilities
- ⏳ Design mockups/wireframes
- ⏳ Set up project structure

### Phase 2: Design System Setup (Week 1)
- Import Axtra Design System (only shared asset)
- Create CSS architecture (design-tokens, components, builder styles)
- Build base HTML template (single-page scrollable)
- Set up color system and typography
- Create reusable UI components (buttons, inputs, cards)

### Phase 3: Data Files & Configuration (Week 1)
- Create `industries.json` (e-commerce focused)
- Create `product-categories.json` (physical, digital, service, subscription)
- Create `ecommerce-objectives.json` (sale types)
- Create `ecommerce-styles.json` (conversion-focused, luxury, etc.)
- Create `checkout-fields.json` (form configurations)
- Create `payment-methods.json` (Lean X supported methods)

### Phase 4: Form Builder UI (Week 2)
- Build sticky header with progress indicator
- Build Section 1: Product Information (with image upload)
- Build Section 2: Industry & Category
- Build Section 3: Design & Style (visual cards)
- Build Section 4: Value Props & Benefits
- Build Section 5: Checkout Configuration
- Build Section 6: Lean X Payment Integration
- Build Section 7: Post-Purchase Experience
- Build Section 8: Marketing & Analytics
- Build Section 9: Review & Generate

### Phase 5: JavaScript Logic (Week 2-3)
- Form state management (single formData object)
- Auto-save to localStorage
- Form validation (real-time + on submit)
- Image upload handler with preview
- Conditional field logic (show/hide based on selections)
- Progress indicator calculator
- Summary preview updater
- Section scroll spy (highlight active section)

### Phase 6: Prompt Generation Engine (Week 3)
- Write `product-template.md` (modular structure)
- Build prompt generator module
- Implement data transformation logic
- Add Lean X setup instructions
- Add Firebase integration guide (optional)
- Package uploaded images with prompt
- Generate downloadable ZIP file

### Phase 7: Testing & Refinement (Week 4)
- End-to-end flow testing
- Generate sample prompts for different product types
- Validate with actual Lean X sandbox
- Mobile responsiveness testing
- Cross-browser testing (Chrome, Safari, Firefox, Edge)
- Performance optimization (image compression, lazy loading)
- Accessibility testing (keyboard navigation, screen readers)
- User acceptance testing

### Phase 8: Documentation & Launch (Week 4)
- Write README.md
- Write QUICKSTART.md
- Create video tutorial (optional)
- Set up deployment (GitHub Pages/Netlify)
- Monitor first users
- Collect feedback
- Iterate based on usage
- Build case studies

---

## 🎯 Success Criteria

### For the Builder
- ✅ Users can complete product page form in < 10 minutes
- ✅ Generated prompts are comprehensive and implementable
- ✅ Lean X integration instructions are clear
- ✅ Mobile experience is smooth
- ✅ No technical errors during generation

### For Generated Product Pages
- ✅ Conversion rate: 2-10% (depends on traffic quality)
- ✅ Page load time: < 3 seconds
- ✅ Mobile responsive: 100%
- ✅ Payment success rate: > 95%
- ✅ User satisfaction: High (collect feedback)

---

## 🚧 Known Limitations & Future Enhancements

### V1 Limitations
- Single product per page (no multi-product catalogs)
- Basic shipping options (no real-time rates)
- Manual email confirmation setup
- No inventory management
- No customer account system

### Future Enhancements (V2+)
- Multi-product support
- Inventory tracking
- Customer accounts/login
- Order management dashboard
- Advanced shipping integrations
- Multi-currency support
- Automated email sequences
- Affiliate tracking
- Abandoned cart recovery

---

## 📖 Appendix

### Glossary
- **Conversion Rate:** Percentage of visitors who complete purchase
- **AOV (Average Order Value):** Average amount spent per order
- **Cart Abandonment:** Users who add to cart but don't complete purchase
- **Checkout Friction:** Obstacles in the purchase process
- **CTA (Call To Action):** Button/link prompting user action
- **Social Proof:** Trust indicators (reviews, testimonials, badges)

### References
- Baymard Institute E-commerce Usability Research
- Nielsen Norman Group Checkout Best Practices
- Axtra Design System Documentation
- Lean X API Documentation

---

## 🆚 Store Management: Build vs. Buy Decision Matrix

### Comparison: DIY Static vs. CMS Integration vs. Full SaaS

| Feature | V1.0 Static | V1.5 + CMS | V2.0 Full SaaS |
|---------|-------------|------------|----------------|
| **Time to Market** | 2-3 weeks | 3-4 weeks | 6-12 months |
| **Development Cost** | $0-2K | $2-5K | $15-40K |
| **Monthly Operating Cost** | $0-10 | $10-60 | $100-500 |
| **User Technical Skill** | Medium-High | Low-Medium | Very Low |
| **Content Management** | Code editing | Spreadsheet/Dashboard | Full admin panel |
| **Multi-Product Support** | No | Limited | Yes |
| **Inventory Tracking** | No | Manual/Basic | Automated |
| **Order Management** | Email only | Via Lean X | Full system |
| **Customer Accounts** | No | No | Yes |
| **Scalability** | Low | Medium | High |
| **Maintenance Burden** | Very Low | Low | High |
| **Best For** | Launches, campaigns | Small stores | Growing businesses |

---

## 💡 Smart Path Forward: Progressive Enhancement

### Recommended Approach

#### **NOW (Week 1-3): Build V1.0**
Focus exclusively on prompt generation with static pages.

**Rationale:**
- Fastest time to market
- Lowest risk investment
- Validates core value proposition
- Keeps architecture simple

**Deliverable:**
- Working builder that generates comprehensive prompts
- Users get beautiful product pages (via code)
- Lean X payment integration works
- All testing completed

---

#### **MONTH 2: Market Validation**
Launch V1.0 and actively gather intelligence.

**Critical Questions to Answer:**
1. Who actually uses it? (Developers? Marketers? Business owners?)
2. Do they successfully implement the code?
3. What's the biggest complaint? (Hardcoded values? Setup complexity?)
4. Would they pay for easier management?
5. What's the conversion rate of generated pages?

**Collect Data:**
- User surveys (post-generation)
- Support tickets (what do they ask?)
- Analytics (where do they drop off in 9 steps?)
- Interviews (5-10 users minimum)

---

#### **MONTH 3: Decision Point**

**Scenario A: "Users struggle with code editing"**
**Solution:** Add V1.5 CMS integration option

**Implementation:**
```javascript
// Add optional module to generated prompts:
"### Optional: Easy Content Management

Want to update prices without coding? Connect to Airtable:

1. Create free Airtable account
2. Copy this template: [link]
3. Add this code to your page: [code snippet]
4. Now edit Airtable like a spreadsheet!

Video tutorial: [link]"
```

**Cost:** 1-2 weeks development, minimal ongoing cost  
**Benefit:** Opens market to non-technical users  
**Risk:** Very low, it's optional

---

**Scenario B: "Users want order/inventory management"**
**Solution:** Partner with existing tools instead of building

**Options:**
1. **Integrate with Lean X dashboard** (if they offer order management)
2. **Recommend Airtable + Zapier** (DIY order tracking)
3. **Partner with simple tools** like Gumroad (for digital) or Ecwid (for physical)

**Implementation:**
```markdown
"### Order & Inventory Management (Optional)

For order tracking and inventory, we recommend:
- **Digital Products:** Integrate with Gumroad [tutorial]
- **Physical Products:** Use Lean X merchant dashboard + Airtable [setup guide]
- **Advanced Needs:** Consider Shopify integration [migration path]

Your product page stays fast, management handled by specialized tools."
```

**Cost:** Documentation only, no development  
**Benefit:** Solves user problem without building everything  
**Risk:** None

---

**Scenario C: "Users love it, need more design options"**
**Solution:** Expand template library, not management features

**Focus on:**
- More design styles (10 → 20 options)
- More industry templates
- Video tutorials for implementation
- Showcase gallery (successful examples)

**Cost:** 2-4 weeks content creation  
**Benefit:** Strengthens core value prop

---

**Scenario D: "Overwhelming demand, clear SaaS opportunity"**
**Solution:** Plan V2.0 Full SaaS (only if validated)

**Validation Checklist Before Building:**
- [ ] 100+ active users
- [ ] 50+ users explicitly asking for management dashboard
- [ ] Users willing to pay $29-49/month (survey)
- [ ] Clear competitive advantage vs. Shopify/WooCommerce
- [ ] Funding/revenue secured ($20K minimum)
- [ ] Team capacity (6+ months development)

**If all checked:** Proceed with V2.0 planning  
**If not:** Stay focused on V1.5 optimization

---

## 🎯 V1.0 Success Metrics (What "Good" Looks Like)

### Month 1 Goals
- **50 users** generate prompts
- **10 product pages** successfully deployed (verified)
- **5 successful payments** processed via Lean X
- **30+ survey responses** collected
- **< 3 major bugs** reported

### Month 3 Goals
- **200 users** total
- **50 active product pages** live
- **$10K+ GMV** (Gross Merchandise Value) processed
- **70%+ satisfaction** rating
- **Clear feature roadmap** based on feedback

### Decision Triggers
- **Build V1.5 CMS if:** 30%+ users request easier updates
- **Partner with tools if:** 40%+ users ask about inventory/orders
- **Consider V2.0 if:** 100+ users + 50+ requesting full platform
- **Pivot/stop if:** < 50 users after 3 months + low engagement

---

## 🚧 V1.0 Development Constraints (Keep Focused)

### What We're NOT Building Right Now

To stay on track and launch fast, explicitly exclude:

#### ❌ Backend Features
- User authentication/login
- Database storage
- Server-side rendering
- API endpoints
- Webhook handlers (beyond Lean X)

#### ❌ Management Features
- Admin dashboard
- Product CRUD interface
- Inventory tracking
- Order management panel
- Customer database
- Multi-user access

#### ❌ Advanced Features
- Multiple products per page
- Upsells/cross-sells
- Abandoned cart recovery
- Email marketing automation
- A/B testing tools
- Custom domain setup

#### ❌ Platform Features
- Template marketplace
- User-generated templates
- Community features
- White-label options
- Reseller program

**Why Exclude These?**
- Each adds weeks/months of development
- Increases complexity and bug risk
- Delays market validation
- Most can be added later if needed

**Philosophy:** Ship a focused, working product that solves ONE problem well (generating conversion-optimized product page code), not a mediocre product that tries to do everything.

---

## 📊 Cost Reality Check

### V1.0 Total Investment
```
Development Time: 2-3 weeks
Developer Cost: $0 (if you) or $2-5K (if hiring)
Hosting: $0-10/month (GitHub Pages/Netlify)
Domain: $10-15/year
Analytics: $0 (Google Analytics free tier)

TOTAL: $10-5,010 to launch
ONGOING: $10-25/month
```

### V1.5 with CMS (If Needed)
```
Additional Development: 1-2 weeks
Additional Cost: $500-2K development
User CMS Cost: $10-30/month (they pay, not you)

TOTAL: $510-2,010 additional
ONGOING: No change (users pay for their CMS)
```

### V2.0 Full SaaS (If Validated)
```
Development Time: 6-12 months full-time
Developer Cost: $30-60K (salary) or $15-30K (outsourced MVP)
Infrastructure: $100-500/month (servers, database, storage)
Team: Support, marketing (2-3 people minimum)

TOTAL: $30-60K to build
ONGOING: $5-15K/month (salaries + infrastructure)
```

**Key Insight:** V2.0 costs **10-20x more** than V1.0. Only pursue if you have strong validation and resources.

---

## 🎬 Final Recommendation

### Start Simple, Scale Smart

1. **Build V1.0 (static prompt generator)** - 2-3 weeks
2. **Launch and learn** - Month 1-2
3. **Add optional CMS integration** - If users request it (Week 5-6)
4. **Partner for management features** - Instead of building (Month 3-6)
5. **Consider V2.0 SaaS** - Only after 100+ validated users (Month 6+)

### Why This Works
- ✅ **Fast market entry** (weeks, not months)
- ✅ **Low financial risk** ($10-5K, not $50K)
- ✅ **Real user feedback** before over-building
- ✅ **Flexibility to pivot** without sunk costs
- ✅ **Focus on core value** (conversion-optimized pages)

### The Trap to Avoid
Many founders build elaborate platforms (V2.0) before validating demand. They spend 6-12 months and $30-50K, then discover:
- Wrong target market
- Feature set doesn't match needs
- Competitors already established
- Can't get initial users

**Better:** Build minimum viable V1.0 for $5K and 3 weeks. If it works, you'll know what to build next. If it doesn't, you saved $45K and 9 months.

---

**Document Version:** 1.1.0  
**Last Updated:** November 7, 2025  
**Maintained By:** Axtra Team  
**Status:** Active Development - V1.0 Focus

