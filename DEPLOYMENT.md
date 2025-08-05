# MediChecker Deployment Guide

## 🚀 Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project

2. **Build Settings:**
   - **Build Command:** `yarn build`
   - **Output Directory:** `dist`
   - **Install Command:** `yarn install`

3. **Environment Variables:**
   - No environment variables needed for this project

4. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically handle SPA routing with `vercel.json`

### Netlify

1. **Connect Repository:**
   - Go to [netlify.com](https://netlify.com)
   - Import your GitHub repository

2. **Build Settings:**
   - **Build Command:** `yarn build`
   - **Publish Directory:** `dist`

3. **Deploy:**
   - Netlify will use `public/_redirects` for SPA routing

### GitHub Pages

1. **Add GitHub Actions:**
   ```yaml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v2
         - uses: actions/setup-node@v2
           with:
             node-version: '18'
         - run: yarn install
         - run: yarn build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

## 📁 Configuration Files

### `vercel.json` (Vercel)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### `public/_redirects` (Netlify)
```
/*    /index.html   200
```

### `public/404.html` (Fallback)
- Custom 404 page for better UX
- Auto-redirects to home page

## 🔧 Build Optimization

### Vite Configuration
- **Code Splitting:** Manual chunks for vendor, router, and UI
- **Source Maps:** Disabled for production
- **Output Directory:** `dist`

### Package Scripts
```json
{
  "build": "tsc -b && vite build",
  "build:prod": "tsc -b && vite build --mode production",
  "preview": "vite preview",
  "preview:prod": "vite preview --port 4173"
}
```

## 🐛 Troubleshooting

### 404 Errors on Direct Navigation
- **Cause:** Server doesn't know about client-side routes
- **Solution:** Use `vercel.json` or `_redirects` file

### Build Failures
- **Check:** TypeScript errors with `yarn type-check`
- **Check:** Linting errors with `yarn lint`
- **Check:** Dependencies with `yarn install`

### Performance Issues
- **Enable:** Code splitting in `vite.config.ts`
- **Optimize:** Bundle size with manual chunks
- **Monitor:** Lighthouse scores

## 🌐 Environment Variables

### Development
```bash
# No environment variables needed
```

### Production
```bash
# No environment variables needed
```

## 📊 Performance Tips

1. **Code Splitting:** Already configured in `vite.config.ts`
2. **Lazy Loading:** Consider for large components
3. **Image Optimization:** Use WebP format
4. **Caching:** Configure cache headers in `vercel.json`

## 🔍 Testing Deployment

### Local Testing
```bash
yarn build
yarn preview
```

### Production Testing
```bash
yarn build:prod
yarn preview:prod
```

### Manual Testing
1. Navigate to `/patients`
2. Click on a patient to go to `/patients/:id`
3. Click "Add Treatment" to go to `/patients/:id/add-treatment`
4. Test browser back/forward buttons
5. Test direct URL navigation

## 📝 Notes

- All routes are client-side rendered
- No server-side rendering (SSR) needed
- Static file hosting is sufficient
- SEO is handled by React Helmet (if needed) 