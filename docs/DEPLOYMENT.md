# 🚀 Deployment Guide - Axtra Product Page Builder

## Overview

The Axtra Product Page Builder is a **static web application** that requires no backend, database, or server-side processing. This makes deployment extremely simple and flexible.

---

## Deployment Options

### Option 1: Simple File Hosting (Easiest)

#### Requirements
- Any web hosting with HTML/CSS/JS support
- No PHP, Node.js, or database needed

#### Steps

1. **Upload Files**
   ```
   Upload the entire 'src' folder to your web host
   ```

2. **File Structure on Server**
   ```
   public_html/
   └── product-builder/
       ├── index.html
       ├── css/
       │   └── styles.css
       └── js/
           └── app.js
   ```

3. **Access**
   ```
   https://yourdomain.com/product-builder/
   ```

#### Recommended Hosts
- **Netlify** (Free, automated)
- **Vercel** (Free, Git integration)
- **GitHub Pages** (Free, version controlled)
- **Cloudflare Pages** (Free, fast CDN)
- Traditional shared hosting (cPanel, etc.)

---

### Option 2: Netlify (Recommended for Beginners)

#### Why Netlify?
✅ Free tier available  
✅ Automatic HTTPS  
✅ Global CDN  
✅ Drag & drop deployment  
✅ Custom domains  

#### Steps

1. **Create Account**
   - Go to https://netlify.com
   - Sign up (free)

2. **Deploy**
   - Click "Add new site"
   - Choose "Deploy manually"
   - Drag the `src` folder to upload area
   - Wait for deployment (30 seconds)

3. **Get URL**
   ```
   Your site is live at:
   https://random-name-12345.netlify.app
   ```

4. **Custom Domain (Optional)**
   - Site settings → Domain management
   - Add your domain
   - Update DNS records

---

### Option 3: GitHub Pages (Free + Version Control)

#### Setup

1. **Create Repository**
   ```bash
   cd "c:\Users\sales\axtra product page builder"
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/axtra-builder.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**
   - Repository → Settings → Pages
   - Source: Deploy from branch
   - Branch: main → /src folder
   - Save

4. **Access**
   ```
   https://yourusername.github.io/axtra-builder/
   ```

---

### Option 4: Vercel (Fast + Modern)

#### Deploy with CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   cd "c:\Users\sales\axtra product page builder\src"
   vercel
   ```

3. **Follow Prompts**
   - Login to Vercel
   - Confirm project name
   - Deploy

4. **Result**
   ```
   Deployed to: https://axtra-builder.vercel.app
   ```

---

### Option 5: Traditional Web Hosting (cPanel)

#### Using cPanel File Manager

1. **Login to cPanel**

2. **File Manager**
   - Navigate to `public_html`
   - Create folder: `product-builder`

3. **Upload Files**
   - Click Upload
   - Select all files from `src` folder
   - Upload

4. **Set Permissions**
   - All files: 644
   - Directories: 755

5. **Access**
   ```
   https://yourdomain.com/product-builder/
   ```

#### Using FTP

```
Host: ftp.yourdomain.com
Username: your-ftp-user
Password: your-ftp-password
Port: 21

Upload 'src' folder to:
/public_html/product-builder/
```

---

## Post-Deployment Checklist

### Test Functionality

- [ ] Page loads without errors
- [ ] All sections display correctly
- [ ] Form inputs work (type and save)
- [ ] Progress bar updates
- [ ] File uploads work (drag & drop)
- [ ] "Save Draft" stores to localStorage
- [ ] "Generate Prompt" creates output
- [ ] Modal displays correctly
- [ ] Copy and download work
- [ ] Mobile responsive (test on phone)

### Browser Testing

Test on:
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (if on Mac/iOS)
- [ ] Mobile browsers (iOS Safari, Chrome)

### Performance

Check with Google PageSpeed Insights:
- Target: 90+ score
- First Contentful Paint: < 1s
- Time to Interactive: < 2s

---

## Custom Domain Setup

### Adding a Custom Domain

#### On Netlify

1. **Add Domain**
   - Site settings → Domain management
   - Add custom domain

2. **DNS Configuration**
   ```
   Type: CNAME
   Name: builder (or www)
   Value: your-site.netlify.app
   ```

3. **SSL Certificate**
   - Auto-generated (wait 24-48 hours)
   - HTTPS enforced automatically

#### On GitHub Pages

1. **Add CNAME File**
   ```bash
   echo "builder.yourdomain.com" > src/CNAME
   git add src/CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **DNS Configuration**
   ```
   Type: CNAME
   Name: builder
   Value: yourusername.github.io
   ```

---

## Environment Configuration

### For Production

No environment variables needed! The builder is entirely client-side.

### Security Notes

**Important:**
- The generated prompts contain Lean X API keys
- Warn users not to share prompts publicly
- Consider adding a disclaimer in the builder

Add to HTML (optional):
```html
<div class="alert alert-warning">
  <strong>⚠️ Security Note:</strong> 
  Generated prompts contain your Lean X API key. 
  Keep them private and secure.
</div>
```

---

## Monitoring & Analytics

### Add Analytics to Builder (Optional)

If you want to track builder usage:

```html
<!-- Add to <head> in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Track events:
```javascript
// In app.js, add tracking
function generatePrompt() {
    // Existing code...
    
    // Track generation
    if (typeof gtag !== 'undefined') {
        gtag('event', 'generate_prompt', {
            'event_category': 'builder',
            'event_label': builderState.formData.industry
        });
    }
}
```

---

## Troubleshooting Deployment

### Issue: Page shows blank

**Solution:**
- Check browser console (F12)
- Verify all files uploaded
- Check file paths in HTML (should be relative)

### Issue: Styles not loading

**Solution:**
- Verify CSS file uploaded
- Check `<link>` tag path in HTML
- Clear browser cache

### Issue: JavaScript not working

**Solution:**
- Check browser console for errors
- Verify JS file uploaded correctly
- Ensure correct file path in `<script>` tag

### Issue: LocalStorage not working

**Solution:**
- Ensure HTTPS (required for localStorage)
- Check browser privacy settings
- Test in different browser

---

## Backup & Updates

### Creating Backups

**Before Updates:**
```bash
# Full backup
cd "c:\Users\sales\axtra product page builder"
xcopy src backup-$(date +%Y%m%d) /E /I

# Or use Git
git add .
git commit -m "Backup before update"
git tag v1.0-backup
```

### Updating the Builder

1. Make changes locally
2. Test thoroughly
3. Update version number in HTML/JS
4. Deploy using same method as initial deployment

---

## Performance Optimization

### Already Optimized

✅ No external dependencies  
✅ Minimal file size (~95KB total)  
✅ No build step required  
✅ Pure vanilla JavaScript  

### Optional Enhancements

**Minification** (optional):
```bash
# Minify CSS
npx csso-cli src/css/styles.css -o src/css/styles.min.css

# Minify JS
npx terser src/js/app.js -o src/js/app.min.js -c -m

# Update HTML references
```

**Compression:**
Enable gzip on server (most hosts do this automatically)

---

## Cost Estimate

### Free Tier Options

| Platform | Storage | Bandwidth | Custom Domain | SSL |
|----------|---------|-----------|---------------|-----|
| **Netlify** | 100GB | 100GB/mo | ✅ | ✅ Free |
| **Vercel** | Unlimited | 100GB/mo | ✅ | ✅ Free |
| **GitHub Pages** | 1GB | 100GB/mo | ✅ | ✅ Free |
| **Cloudflare Pages** | Unlimited | Unlimited | ✅ | ✅ Free |

**Recommended:** Start with free tier, upgrade only if needed.

---

## Support After Deployment

### User Support

Provide users with:
1. Link to `QUICK_START.md`
2. FAQ document
3. Support email
4. Demo video (optional)

### Maintenance

**Monthly:**
- Check for browser console errors
- Test form functionality
- Verify all integrations work

**Quarterly:**
- Update documentation
- Review user feedback
- Consider feature additions

---

## You're Live! 🎉

Your Axtra Product Page Builder is now deployed and ready for users!

**What's Next?**
1. Test everything one more time
2. Share the link with your team
3. Gather user feedback
4. Iterate and improve

**Current Local Testing:**
http://localhost:8000/index.html

**Ready to deploy?** Choose your platform and follow the steps above! 🚀
