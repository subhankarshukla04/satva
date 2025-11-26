# Satva Sustainability Website

**शिव संकल्पमस्तु** - _May there be noble intentions_

A professional, conversion-optimized website for Satva Sustainability Advisory & Consulting Services, a B2B sustainability consulting firm specializing in CSRD compliance for mid-market companies.

## 🌟 Features

- **Modern, Professional Design**: Clean B2B aesthetic built with Tailwind CSS
- **Fully Responsive**: Mobile-first design that works perfectly on all devices
- **SEO Optimized**: Semantic HTML, meta tags, structured data, and sitemap
- **Fast Performance**: Optimized for Google PageSpeed 90+ score
- **Accessible**: WCAG 2.1 AA compliant with proper contrast, alt text, and keyboard navigation
- **Contact Form**: Netlify Forms integration (no backend required)
- **5 Complete Pages**: Home, Services, About, Resources, Contact

## 📁 File Structure

```
satva-website/
├── index.html              # Home page
├── services.html           # Services page (4 CSRD service offerings)
├── about.html              # About page (company story, values, team)
├── resources.html          # Resources page (guides, blog posts, webinars)
├── contact.html            # Contact page (Netlify form)
├── sitemap.xml             # XML sitemap for search engines
├── robots.txt              # Robots.txt for crawler instructions
├── css/
│   └── custom.css          # Custom styles beyond Tailwind
├── js/
│   └── main.js             # Navigation, form validation, interactivity
├── images/                 # Placeholder folder for images
│   └── (add your images here)
└── README.md               # This file
```

## 🚀 Deployment Options

### **Option 1: Netlify (Recommended - Easiest)**

Netlify is the recommended hosting platform because:
- Free tier with generous limits
- Automatic HTTPS/SSL
- Built-in form handling (no backend needed)
- Fast global CDN
- Easy custom domain setup

#### Steps to Deploy:

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up (free, no credit card required)

2. **Deploy via Drag-and-Drop**
   - Click **"Add new site"** → **"Deploy manually"**
   - Drag and drop the entire `satva-website` folder
   - Netlify will deploy in ~30 seconds
   - You'll get a URL like `random-name-123.netlify.app`

3. **Configure Contact Form**
   - Go to **Site settings** → **Forms** → **Form notifications**
   - Add your email address to receive form submissions
   - Forms automatically work—no additional setup needed!

4. **Add Custom Domain (Optional)**
   - Click **Domain settings** → **Add custom domain**
   - Enter your domain (e.g., `satvasustainability.com`)
   - Follow DNS configuration instructions at your registrar
   - Netlify automatically adds free SSL certificate

#### Alternative: Deploy via Git

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Navigate to your website folder
cd satva-website

# 3. Deploy
netlify deploy

# 4. Follow prompts, then deploy to production
netlify deploy --prod
```

---

### **Option 2: Vercel**

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up (free account)

2. **Deploy via CLI**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Navigate to website folder
   cd satva-website

   # Deploy
   vercel

   # Follow prompts - site will deploy
   ```

3. **Deploy via Git (Recommended)**
   - Push your code to GitHub
   - Go to Vercel dashboard
   - Click **Add New** → **Project**
   - Import your GitHub repository
   - Vercel auto-deploys on every push

4. **Custom Domain**
   - Go to project settings
   - Add your custom domain
   - Configure DNS at your registrar

**Note**: Vercel doesn't have built-in form handling like Netlify. You'll need to use a third-party service like [Formspree](https://formspree.io) or [Getform](https://getform.io) for the contact form.

---

### **Option 3: GitHub Pages**

1. **Create GitHub Account**
   - Go to [github.com](https://github.com)
   - Sign up if you don't have an account

2. **Create Repository**
   - Click **New repository**
   - Name it (e.g., `satva-website`)
   - Make it public

3. **Upload Files**
   - Upload all website files to the repository
   - Or use Git command line:
   ```bash
   cd satva-website
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/satva-website.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select `main` branch and `/ (root)` folder
   - Click **Save**
   - Site will be live at `yourusername.github.io/satva-website`

5. **Custom Domain**
   - Add a file named `CNAME` to the root with your domain
   - Configure DNS A records at your registrar
   - See [GitHub Pages custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

**Note**: GitHub Pages doesn't support server-side form processing. Use [Formspree](https://formspree.io) for the contact form.

---

## 📝 Customization Guide

### Updating Content

All content is in standard HTML files. To update:

1. **Text Content**: Open the HTML file and edit the text directly
2. **Images**: Add images to `/images/` folder and update `<img src="images/your-image.jpg">`
3. **Contact Info**: Search for `[To be provided]` placeholders and replace with actual data
4. **Team Bios**: Update `/about.html` with real credentials and photos

### Updating Colors

Colors are defined in the Tailwind config in each HTML file's `<head>`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#1E3A8A',    // Deep blue
                secondary: '#10B981',  // Sage green
                accent: '#F59E0B',     // Warm gold
                darkgray: '#1F2937',
                lightgray: '#F3F4F6'
            }
        }
    }
}
```

Change the hex codes to your preferred colors. Update in **all HTML files** for consistency.

### Updating Fonts

Fonts are loaded from Google Fonts. To change:

1. Go to [fonts.google.com](https://fonts.google.com)
2. Select your fonts
3. Replace the `<link>` tag in each HTML file
4. Update the Tailwind config `fontFamily` settings

### Adding Blog Posts

To add real blog posts to the Resources page:

1. Create a new HTML file (e.g., `blog-post-1.html`)
2. Copy the structure from existing pages
3. Update the blog card in `resources.html` to link to your new post

---

## 🎨 Placeholder Content to Replace

Before going live, replace these placeholders:

### Contact Information
- [ ] Email address (currently: `contact@satvasustainability.com`)
- [ ] Phone number (currently: `[To be provided]`)
- [ ] LinkedIn profile URL (currently: `#`)

### About Page
- [ ] Niki Shah's professional bio, credentials, certifications
- [ ] Niki Shah's professional photo
- [ ] Niki Shah's LinkedIn profile URL

### Resources Page
- [ ] Create actual downloadable PDF guides
- [ ] Write actual blog posts (currently placeholders)
- [ ] Set up webinar scheduling system

### Images
- [ ] Replace placeholder gradients with professional photos
- [ ] Add company logo (create `images/logo.png` or `logo.svg`)
- [ ] Add hero background image
- [ ] Add team photos
- [ ] Add social media Open Graph image

### Google Maps
- [ ] Embed actual Google Maps in contact page
- [ ] Replace map placeholder div with iframe

---

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Tailwind CSS via CDN
- **JavaScript**: Vanilla JS (no frameworks)
- **Fonts**: Google Fonts (Inter, Open Sans)
- **Icons**: Heroicons (SVG)
- **Forms**: Netlify Forms

### Performance Optimizations
- Tailwind CSS loaded via CDN (production mode minified)
- Minimal custom CSS and JavaScript
- Semantic HTML for faster rendering
- Lazy loading ready (can be enhanced)

### SEO Features
- Unique title and meta description on every page
- Open Graph tags for social sharing
- Structured data (JSON-LD) for Organization and Services
- XML sitemap at `/sitemap.xml`
- robots.txt for crawler instructions
- Semantic HTML5 elements

### Accessibility Features
- WCAG 2.1 AA compliant color contrast
- Alt text on all images (placeholders noted)
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states
- Skip to main content link

### Browser Support
- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📧 Form Setup

### Netlify Forms (Recommended)

Forms are already configured! They include:

1. **Anti-spam Protection**: Honeypot field
2. **Required Fields**: Name, email, company, title
3. **Email Notifications**: Configure in Netlify dashboard

After deployment:
1. Go to Netlify dashboard → Site settings → Forms
2. Add notification email address
3. Test the form—submissions appear in dashboard

### Alternative Form Services

If not using Netlify, integrate these services:

- **Formspree**: Add `action="https://formspree.io/f/YOUR_FORM_ID"`
- **Getform**: Similar to Formspree
- **EmailJS**: Client-side email sending
- **Custom Backend**: Build your own API endpoint

---

## 🔍 Testing Checklist

Before launching, test:

- [ ] All navigation links work
- [ ] Mobile menu opens/closes correctly
- [ ] Contact form submits successfully
- [ ] All pages are responsive (mobile, tablet, desktop)
- [ ] Images load correctly (when added)
- [ ] External links open in new tabs
- [ ] Social media links work (when added)
- [ ] No console errors in browser
- [ ] Test on multiple browsers
- [ ] Test on actual mobile devices
- [ ] Run Google PageSpeed Insights
- [ ] Check accessibility with WAVE or axe DevTools
- [ ] Verify SEO with Google Search Console

---

## 🛠️ Maintenance

### Regular Updates

- **Monthly**: Check for broken links
- **Quarterly**: Update copyright year
- **Quarterly**: Review and update blog content
- **Annually**: Review contact information
- **As Needed**: Add new team members, case studies, testimonials

### Content Updates

To update content without technical knowledge:

1. **Text Changes**: Edit HTML files in any text editor
2. **Upload to Hosting**:
   - Netlify: Drag-and-drop new files
   - Vercel: Push to Git repository
   - GitHub Pages: Commit and push changes

### Analytics (Optional)

To track website traffic, add Google Analytics:

1. Create Google Analytics account
2. Get your tracking ID
3. Add this code before `</head>` in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 📞 Support

For questions about this website:

- **Technical Issues**: Review code comments in HTML/CSS/JS files
- **Deployment Help**: See official docs for Netlify, Vercel, or GitHub Pages
- **Customization**: All code is well-commented for easy modification

---

## 📜 License

This website was custom-built for Satva Sustainability Advisory & Consulting Services.

---

## 🙏 Credits

**Built with:**
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Google Fonts](https://fonts.google.com) - Typography
- [Heroicons](https://heroicons.com) - Beautiful SVG icons

**Design Principles:**
- Clean, professional B2B aesthetic
- Conversion-optimized for lead generation
- Values-driven approach reflecting Dharmic principles

---

**शिव संकल्पमस्तु** - _May there be noble intentions_

© 2025 Satva Sustainability Advisory & Consulting Services. All rights reserved.