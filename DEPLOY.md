# Deployment Guide - Axtra Product Page Builder

## Quick Deploy to Vercel (Free)

### 1. Prepare for Deployment
Your app is **100% frontend** - no backend needed! It uses localStorage for data storage.

### 2. Deploy to Vercel

**Option A: Using Vercel CLI (Recommended)**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from your project folder
cd "C:\Users\sales\axtra product page builder"
vercel
```

**Option B: Using Vercel Dashboard**
1. Go to https://vercel.com
2. Sign up/Login (free)
3. Click "Add New Project"
4. Import your GitHub repo OR drag & drop the `src` folder
5. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: `src` (or leave empty if deploying src folder directly)
   - **Build Command**: (leave empty)
   - **Output Directory**: (leave empty)
6. Click "Deploy"

### 3. Project Structure for Vercel
```
src/
├── index-v2.html  (rename to index.html for deployment)
├── css/
│   └── styles-v2.css
└── js/
    ├── app-v2.js
    └── design-engine.js
```

**IMPORTANT**: Rename `index-v2.html` to `index.html` before deploying (or after deployment via Vercel dashboard).

### 4. Testing Instructions for Friends

**How to Test:**
1. Visit the Vercel URL (e.g., `https://your-project.vercel.app`)
2. Build a product page
3. Test all features:
   - Add products
   - Change design styles & colors
   - Try advanced options (spacing, corners, shadows, animations)
   - Generate full preview
   - Download HTML

**How to Reset for Fresh Testing:**
- Click the **"Reset"** button in the top header
- OR open browser console and type: `localStorage.clear()` then refresh

**Data Privacy:**
- ✅ Each person's data is stored ONLY in their browser
- ✅ No data is shared between users
- ✅ No data is sent to any server
- ✅ Clearing browser data erases everything

### 5. What Works Without Backend

✅ **All features work perfectly:**
- Product page building
- Design customization
- Live preview
- Full preview generation
- HTML download
- Auto-save (localStorage)
- Industry templates
- Design styles

❌ **What you CAN'T do without backend:**
- Share pages between users
- Save multiple projects per user
- User accounts/login
- Export/import between devices
- Team collaboration

### 6. Free Alternatives to Vercel

**Other free hosting options:**
- **Netlify** - Similar to Vercel, drag & drop deployment
- **GitHub Pages** - Free, use `gh-pages` branch
- **Cloudflare Pages** - Fast, free tier
- **Firebase Hosting** - Google's free tier

### 7. Custom Domain (Optional)

**Vercel includes:**
- Free `.vercel.app` subdomain
- Can add custom domain for free (e.g., `axtra.yourdomain.com`)

### 8. Future: Adding Backend (When Ready)

**When you need backend for:**
- User accounts
- Save multiple projects
- Share pages via link
- Team collaboration

**Recommended stack:**
- **Supabase** (free tier, PostgreSQL + Auth)
- **Firebase** (Google, free tier)
- **PocketBase** (self-hosted, open source)

### 9. Monitoring & Analytics (Optional)

Add to your HTML for free analytics:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>

<!-- Or Vercel Analytics (built-in) -->
```

---

## Quick Commands

**Deploy:**
```bash
vercel
```

**Update deployment:**
```bash
vercel --prod
```

**Custom domain:**
```bash
vercel domains add yourdomain.com
```

---

## Testing Checklist for Friends

- [ ] Add at least 3 products
- [ ] Try all 11 industries
- [ ] Test all 8 design styles
- [ ] Change colors
- [ ] Test advanced options (spacing, corners, shadows, animations)
- [ ] Generate full preview
- [ ] Download HTML file
- [ ] Click "Reset" and start over
- [ ] Try on mobile browser
- [ ] Try on different browsers (Chrome, Firefox, Safari)

---

**Need help?** The app is completely self-contained. Just deploy the `src` folder and it works!
