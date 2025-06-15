# Deployment Guide - Armiyau Portfolio

This guide provides step-by-step instructions for deploying the Armiyau Yushau portfolio website to various hosting platforms.

## 🚀 Quick Deployment

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Git

### Build for Production
```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 🌐 Deployment Platforms

### 1. Netlify (Recommended)

**Option A: Drag & Drop**
1. Run `npm run build`
2. Go to [Netlify](https://netlify.com)
3. Drag the `build` folder to the deploy area
4. Your site is live!

**Option B: Git Integration**
1. Push code to GitHub
2. Connect Netlify to your repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Deploy automatically on git push

### 2. Vercel

**Using Vercel CLI:**
```bash
npm i -g vercel
vercel
```

**Using GitHub Integration:**
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Automatic deployment on git push

### 3. Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### 4. GitHub Pages

```bash
npm install --save-dev gh-pages
```

Add to package.json scripts:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

Deploy:
```bash
npm run deploy
```

### 5. AWS S3 + CloudFront

1. Create S3 bucket
2. Enable static website hosting
3. Upload build files
4. Configure CloudFront for CDN
5. Set up custom domain (optional)

## 🔧 Configuration

### Environment Variables
Create `.env` file for environment-specific settings:
```
REACT_APP_SITE_URL=https://yoursite.com
REACT_APP_CONTACT_EMAIL=contact@example.com
```

### Custom Domain
1. **Netlify**: Add custom domain in site settings
2. **Vercel**: Add domain in project settings
3. **GitHub Pages**: Add CNAME file to public folder

### SSL Certificate
Most platforms provide free SSL certificates automatically.

## 📊 Performance Optimization

### Before Deployment
- Optimize images (use WebP format when possible)
- Minify CSS and JS (handled by build process)
- Enable gzip compression
- Set up proper caching headers

### After Deployment
- Test with Google PageSpeed Insights
- Monitor with Google Analytics
- Set up error tracking (Sentry, etc.)

## 🔍 SEO Optimization

### Meta Tags
Update `public/index.html` with:
- Proper title and description
- Open Graph tags
- Twitter Card tags
- Structured data

### Sitemap
Generate and submit sitemap to search engines:
```bash
npm install --save-dev react-router-sitemap
```

## 📱 PWA (Progressive Web App)

### Enable PWA Features
1. Uncomment service worker in `src/index.tsx`
2. Update `public/manifest.json`
3. Add proper icons in `public` folder

## 🔒 Security

### HTTPS
Ensure HTTPS is enabled (most platforms do this automatically)

### Content Security Policy
Add CSP headers through hosting platform or meta tags

### Security Headers
Configure security headers:
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

## 📈 Analytics & Monitoring

### Google Analytics
Add tracking code to `public/index.html`

### Performance Monitoring
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

## 🐛 Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall

**Routing Issues (404 on refresh):**
- Configure redirects for SPA
- Netlify: Create `_redirects` file in public folder:
  ```
  /*    /index.html   200
  ```

**Asset Loading Issues:**
- Check `homepage` field in package.json
- Ensure correct asset paths

**Performance Issues:**
- Optimize images
- Enable compression
- Use CDN for assets

## 📋 Deployment Checklist

- [ ] Build passes without errors
- [ ] All images are optimized
- [ ] Meta tags are configured
- [ ] Custom domain is set up (if needed)
- [ ] SSL certificate is active
- [ ] Analytics are configured
- [ ] Error tracking is set up
- [ ] Performance is tested
- [ ] Mobile responsiveness is verified
- [ ] Cross-browser compatibility is checked

## 🆘 Support

If you encounter issues during deployment:
1. Check the platform's documentation
2. Search for similar issues on Stack Overflow
3. Contact support through the hosting platform
4. Create an issue in the project repository

---

**Happy Deploying! 🚀**

