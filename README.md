# Axtra Product Page Builder

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Type:** Static Web Application (No backend required)

---

## 📖 Overview

The **Axtra Product Page Builder** is a single-page form application that helps digital marketers, entrepreneurs, and agencies generate conversion-optimized product page systems with Lean X payment integration.

### Key Features

✅ **Single-Page Scrollable Interface** - No multi-step wizards, all sections on one page  
✅ **9 Comprehensive Sections** - From product info to analytics setup  
✅ **Auto-Save to LocalStorage** - Never lose your progress  
✅ **Real-Time Progress Tracking** - See completion percentage as you fill  
✅ **Modular Prompt Generation** - Creates detailed implementation prompts  
✅ **File Uploads** - Product images and brand assets  
✅ **Lean X Payment Integration** - Built-in payment gateway setup  
✅ **Analytics Ready** - Google Analytics, Meta Pixel, Google Ads  
✅ **Responsive Design** - Mobile-first, works on all devices  
✅ **No Dependencies** - Pure vanilla JavaScript, HTML, CSS

---

## 🚀 Quick Start

### 1. Open the Application

Simply open `src/index.html` in any modern web browser:

```bash
# Windows
start src/index.html

# Mac
open src/index.html

# Linux
xdg-open src/index.html
```

Or use a local server (recommended):

```bash
# Python 3
cd src
python -m http.server 8000

# Node.js (http-server)
cd src
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

### 2. Fill Out the Form

Work through all 9 sections:

1. **Product Information** - Name, description, pricing
2. **Target Audience & Industry** - Who is this for?
3. **Design & Style** - Visual preferences
4. **Content & Messaging** - Value props, benefits
5. **Checkout Configuration** - Purchase flow
6. **Lean X Payment Integration** - Payment setup
7. **Marketing & Analytics** - Tracking codes
8. **Assets Upload** - Images and logos
9. **Review & Generate** - Final summary and generation

### 3. Generate Your Prompt

- Review the summary in Section 9
- Click **"Generate Product Page Prompt"**
- Copy to clipboard or download as `.md` file
- Use the prompt with Claude, ChatGPT, or give to developers

---

## 📁 Project Structure

```
axtra-product-page-builder/
├── src/
│   ├── index.html          # Main application
│   ├── css/
│   │   └── styles.css      # Complete design system
│   └── js/
│       └── app.js          # All application logic
├── assets/
│   ├── images/             # Project images
│   └── icons/              # Icons and graphics
├── docs/                   # Documentation
├── designsystem.md         # Design system reference
├── designtoken.md          # Design tokens
├── product page builder.md # Product specification
└── README.md              # This file
```

---

## 🎨 Design System

Built on the **Axtra Design System** with:

- **Grayscale Foundation** - Professional, timeless look
- **Strategic Accent Colors** - Blue for CTAs and links
- **System Fonts** - No external font dependencies
- **8px Spacing Grid** - Consistent rhythm
- **Mobile-First** - Responsive breakpoints at 480px, 768px, 1024px

### Color Palette

```css
Primary: #1a1a1a (Black)
Accent: #2563eb (Blue)
Success: #059669 (Green)
Error: #dc2626 (Red)
```

---

## 💾 Features in Detail

### Auto-Save

- Saves to `localStorage` every 30 seconds
- Manual save with "Save Draft" button
- Automatic restoration on page reload
- No server required

### Progress Tracking

- Real-time completion percentage
- Visual progress bar in header
- Tracks all required and optional fields
- Updates as you type

### Conditional Logic

- Shows/hides fields based on selections
- Product type determines additional fields
- Design choices affect color pickers
- Smart validation

### File Upload

- Drag & drop support
- Multiple images (product photos)
- Single logo upload
- Preview thumbnails
- File size validation (5MB max)
- Format validation (PNG, JPG, WebP)

### Prompt Generation

Generates comprehensive prompts with:

1. **Project Overview** - Product details and goals
2. **File Structure** - Complete folder layout
3. **Module 1** - Product page (index.html)
4. **Module 2** - Checkout page
5. **Module 3** - Lean X integration
6. **Module 4** - Analytics tracking
7. **Module 5** - Styling (CSS)
8. **Implementation Notes** - Testing checklist

---

## 🔧 Technical Details

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dependencies

**NONE!** Pure vanilla JavaScript.

### File Size

- HTML: ~25KB
- CSS: ~30KB
- JavaScript: ~40KB
- **Total: ~95KB** (uncompressed)

### Performance

- First paint: < 100ms
- Interactive: < 500ms
- No build step required
- No npm packages
- Works offline (after first load)

---

## 📝 Usage Guide

### Filling Out the Form

#### Section 1: Product Information

- Product name should be clear and benefit-focused
- Keep description to 2-3 sentences
- Choose product type carefully (affects other fields)
- Set pricing (with optional discount)
- Add urgency elements if needed

#### Section 2: Target Audience

- Be specific about your ideal customer
- List 3-5 pain points
- Define desired outcomes
- This helps tailor the messaging

#### Section 3: Design & Style

Choose a style that matches your product:
- **Conversion Focused** - Direct response, bold CTAs
- **Premium & Luxury** - High-end, sophisticated
- **Minimal & Clean** - Simple, focused
- **Bold & Vibrant** - Eye-catching, creative

#### Section 4: Content & Messaging

- Craft a compelling tagline
- List 3-6 key benefits (minimum 3 required)
- Add specific features/inclusions
- Select social proof elements
- Add guarantee if applicable

#### Section 5: Checkout

- Choose checkout style (separate page recommended)
- Select required customer fields
- Enable guest checkout (recommended)

#### Section 6: Lean X Payment

- Enter your Lean X API key
- Select payment methods
- Optional: Custom thank you page URL

#### Section 7: Marketing & Analytics

- Add tracking codes (optional but recommended)
- Google Analytics for traffic insights
- Meta Pixel for Facebook ads
- Google Ads for conversion tracking
- Email marketing integration

#### Section 8: Assets Upload

- Upload product images (1200x800px recommended)
- Add logo/brand assets
- Files stored in browser temporarily

#### Section 9: Review & Generate

- Review summary of all inputs
- Check for completeness
- Generate and download prompt

---

## 🎯 Use Cases

### Digital Marketers

- Launch product pages for ad campaigns
- A/B test different product positioning
- Quick deployment for limited-time offers

### Agencies

- Rapid prototyping for clients
- Consistent, professional output
- Detailed specs for developers

### Entrepreneurs

- Launch products without technical knowledge
- Professional product pages
- Conversion-optimized designs

### Developers

- Generate detailed implementation specs
- Save time on boilerplate
- Best practices built-in

---

## 🔐 Security & Privacy

### Data Storage

- All data stored locally in browser (`localStorage`)
- No data sent to external servers
- No tracking or analytics in the builder itself
- Uploaded files remain in browser memory
- Clear browser data to remove all information

### Best Practices

- Don't share API keys publicly
- Use test mode for Lean X during development
- Keep generated prompts secure (contain API keys)

---

## 🐛 Troubleshooting

### Form not saving?

- Check browser localStorage is enabled
- Try incognito/private mode
- Clear browser cache and retry

### Images not uploading?

- Ensure files are under 5MB
- Use PNG, JPG, or WebP formats
- Check browser console for errors

### Progress not updating?

- Fill required fields (marked with *)
- Check all sections have some input
- Refresh page and try again

### Generated prompt incomplete?

- Ensure all required fields are filled
- Check for validation errors
- Try downloading instead of copying

---

## 🚦 Roadmap

### V1.0 (Current)

✅ Single-page builder with 9 sections  
✅ Modular prompt generation  
✅ File uploads  
✅ Auto-save  
✅ Mobile responsive  

### V1.1 (Planned)

- [ ] Prompt templates library
- [ ] Export to PDF
- [ ] Pre-filled industry templates
- [ ] Dark mode

### V1.5 (Future)

- [ ] Optional Firebase CMS integration
- [ ] Backend API for team collaboration
- [ ] Version history
- [ ] Multi-product support

### V2.0 (Conditional)

- [ ] Full SaaS platform with dashboard
- [ ] Automated deployment
- [ ] Store management features
- (Only if 100+ users request it)

---

## 📄 License

© 2025 Axtra. All rights reserved.

This software is proprietary and confidential.

---

## 🆘 Support

For help or questions:

- **Email:** support@axtra.com
- **Docs:** https://axtra.com/docs
- **FAQ:** See `product page builder.md`

---

## 🎉 Credits

**Built by:** Axtra Team  
**Design System:** Axtra Design System v1.0  
**Inspired by:** Best practices in conversion optimization and digital marketing

---

**Ready to build conversion-optimized product pages? Open `src/index.html` and get started! 🚀**
