# GitHub Pages Deployment Troubleshooting Guide

## 1. Initial Setup and Dependencies
```bash
# Install required dependencies
npm install --save-dev gh-pages
```

## 2. Repository Check
```bash
# Check repository type
git remote -v
```
- If repository is `username.github.io` → User Site
- If repository is anything else → Project Site

## 3. Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  // For User Site (username.github.io)
  base: '/',
  // For Project Site (username.github.io/repo-name)
  base: '/repo-name/',
  
  // Other configurations...
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

## 4. React Router Configuration (`src/App.tsx`)
```typescript
// For User Site
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>

// For Project Site
<BrowserRouter basename="/repo-name">
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

## 5. Asset Paths Check
- All asset imports should be relative
```typescript
// Correct
import logo from './assets/logo.png'

// Incorrect
import logo from '/assets/logo.png'
```

## 6. Deployment Configuration (`package.json`)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "go": "git add . && git commit -m \"Update\" && git push && npm run build && npm run deploy"
  }
}
```

## 7. 404 Handling
### 7.1. Create `public/404.html`:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Your Site Name</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = 1;

      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

### 7.2. Create `src/pages/NotFound.tsx`:
```typescript
import { useLocation, Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Path: {location.pathname}</p>
      <Link to="/">Home</Link>
    </div>
  );
};
```

## 8. GitHub Pages Settings
1. Go to Repository → Settings → Pages
2. For Project Sites:
   - Source: "Deploy from a branch"
   - Branch: "gh-pages" and "/ (root)"
3. For User Sites:
   - Source: "Deploy from a branch"
   - Branch: "main" and "/ (root)"

## 9. First-Time Deployment Steps
```bash
# 1. Install dependencies
npm install

# 2. Install gh-pages
npm install --save-dev gh-pages

# 3. Deploy
npm run deploy
```

## 10. Debugging Steps
1. Check browser console for:
   - 404 errors
   - Asset loading errors
   - Routing errors

2. Verify URLs:
   - Project Site: `https://username.github.io/repo-name/`
   - User Site: `https://username.github.io/`

3. Common PowerShell Issues:
   - If `&&` doesn't work, run commands separately:
     ```bash
     npm run build
     npm run deploy
     ```

## 11. Common Issues and Solutions

### Issue 1: Dependencies Not Found
**Solution**:
1. Run `npm install` to install all dependencies
2. Run `npm install --save-dev gh-pages` specifically for deployment

### Issue 2: Assets Not Loading
**Solution**:
1. Check `vite.config.ts` base URL
2. Verify all asset paths are relative
3. Check asset imports in components

### Issue 3: 404 on Refresh
**Solution**:
1. Verify `BrowserRouter` basename
2. Check GitHub Pages branch settings
3. Ensure 404.html exists in public folder

### Issue 4: Wrong Base URL
**Solution**:
1. Match `vite.config.ts` base with repository type
2. Update `BrowserRouter` basename accordingly
3. Verify GitHub Pages settings

## 12. Deployment Checklist
- [ ] All dependencies installed (`npm install`)
- [ ] gh-pages package installed (`npm install --save-dev gh-pages`)
- [ ] Vite base URL configured correctly
- [ ] React Router basename set
- [ ] All asset paths are relative
- [ ] GitHub Pages branch set correctly
- [ ] 404 page and 404.html configured
- [ ] Deployment scripts in package.json
- [ ] Build process completes successfully

## 13. Testing After Deployment
1. Wait 1-2 minutes after deployment
2. Clear browser cache
3. Test:
   - Home page loading
   - Internal navigation
   - Direct URL access
   - Asset loading
   - 404 handling

## 14. Maintenance Tips
1. Use `npm run go` for quick updates
2. Document any custom configurations
3. Test after major updates
4. Monitor GitHub Actions logs
5. Keep dependencies updated
6. Run `npx update-browserslist-db@latest` periodically 