# GitHub Pages Deployment Troubleshooting Guide

## 1. Initial Setup and Dependencies

### 1.1. Prerequisites Check Script
Create a file called `setup-checks.js` in your project root:

```javascript
const { execSync } = require('child_process');
const fs = require('fs');

function checkCommand(command, name) {
    try {
        execSync(command + ' --version', { stdio: 'pipe' });
        console.log(`✅ ${name} is installed`);
        return true;
    } catch (e) {
        console.error(`❌ ${name} is not installed`);
        return false;
    }
}

function checkFile(path, name) {
    if (fs.existsSync(path)) {
        console.log(`✅ ${name} exists`);
        return true;
    }
    console.error(`❌ ${name} is missing`);
    return false;
}

function checkPackageJson() {
    if (!checkFile('package.json', 'package.json')) return false;
    
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = ['build', 'deploy', 'predeploy'];
    const missingScripts = requiredScripts.filter(script => !pkg.scripts[script]);
    
    if (missingScripts.length > 0) {
        console.error(`❌ Missing scripts in package.json: ${missingScripts.join(', ')}`);
        return false;
    }
    console.log('✅ All required scripts exist in package.json');
    return true;
}

function checkGitSetup() {
    try {
        const remoteUrl = execSync('git remote get-url origin', { stdio: 'pipe' }).toString().trim();
        console.log(`✅ Git remote URL: ${remoteUrl}`);
        return true;
    } catch (e) {
        console.error('❌ Git remote is not configured');
        return false;
    }
}

function main() {
    console.log('🔍 Running pre-deployment checks...\n');
    
    const checks = [
        () => checkCommand('node', 'Node.js'),
        () => checkCommand('npm', 'npm'),
        () => checkCommand('git', 'Git'),
        () => checkFile('vite.config.ts', 'Vite config'),
        checkPackageJson,
        checkGitSetup
    ];
    
    const results = checks.map(check => check());
    
    console.log('\n📋 Summary:');
    if (results.every(Boolean)) {
        console.log('✅ All checks passed! You can proceed with deployment.');
    } else {
        console.log('❌ Some checks failed. Please fix the issues above before deploying.');
    }
}

main();
```

Add this script to your `package.json`:

```json
{
  "scripts": {
    "check-setup": "node setup-checks.js",
    "safe-deploy": "npm run check-setup && npm run go"
  }
}
```

### 1.2. Install Dependencies
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

export default defineConfig(({ mode }) => {
  // Get repository name from git remote URL
  const getRepoName = () => {
    try {
      const remoteUrl = require('child_process')
        .execSync('git remote get-url origin')
        .toString()
        .trim();
      const match = remoteUrl.match(/([^/]+)\.git$/);
      return match ? '/' + match[1] + '/' : '/';
    } catch (e) {
      console.warn('Failed to get repo name from git, using default base');
      return '/';
    }
  };

  return {
    base: getRepoName(),
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
```

## 4. React Router Configuration (`src/App.tsx`)
```typescript
import { BrowserRouter } from 'react-router-dom';

// Automatically get base name from vite config
const basename = import.meta.env.BASE_URL;

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## 5. Asset Paths Check
- All asset imports should be relative
```typescript
// Correct
import logo from './assets/logo.png'

// Incorrect
import logo from '/assets/logo.png'
```

## 6. Enhanced Deployment Configuration (`package.json`)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "check-setup": "node setup-checks.js",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
    "safe-deploy": "npm run check-setup && npm run go",
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

## 15. New Automated Deployment Process

1. First-time setup:
```bash
# Install dependencies and setup checks
npm install
npm install --save-dev gh-pages
node setup-checks.js
```

2. Regular deployment:
```bash
# Safe deployment with checks
npm run safe-deploy

# Or individual steps if needed
npm run check-setup
npm run go
```

3. If any check fails:
   - Review the error messages
   - Fix any missing dependencies or configurations
   - Run `npm run check-setup` again until all checks pass

## 16. Common Setup Issues and Solutions

### Issue 1: Node.js/npm Not Found
**Solution**:
1. Download and install Node.js from https://nodejs.org
2. Verify installation: `node --version && npm --version`

### Issue 2: Git Not Configured
**Solution**:
1. Install Git from https://git-scm.com
2. Configure Git:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```
3. Setup repository:
   ```bash
   git init
   git remote add origin your-repo-url
   ```

### Issue 3: Package.json Scripts Missing
**Solution**:
Run the setup check script and it will identify missing scripts:
```bash
npm run check-setup
```

The key improvements in this version include:
1. Added automated setup verification script
2. Enhanced Vite configuration with automatic repository name detection
3. Added safe deployment command with pre-deployment checks
4. Improved error handling and user feedback
5. Automated base URL configuration
6. Added comprehensive setup verification
7. Enhanced troubleshooting steps
8. Added safety checks before deployment

To use this enhanced version:
1. Create the `setup-checks.js` file
2. Update your `package.json` with the new scripts
3. Always use `npm run safe-deploy` for deployments
4. Monitor the check results and fix any issues before deploying 