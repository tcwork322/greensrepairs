# Deployment Guide

## Fixing the MIME Type Error

If you're seeing this error:
```
Loading module from "..." was blocked because of a disallowed MIME type ("text/html").
```

**The issue:** The base path in `vite.config.js` doesn't match your repository name.

## Quick Fix

1. **Find your repository name:**
   - Go to your GitHub repository
   - Look at the URL: `https://github.com/tcwork322/REPO_NAME`
   - The repo name is the last part

2. **Update `vite.config.js`:**
   - Open `vite.config.js`
   - Find the line: `return '/greensrepairs/';`
   - Change `greensrepairs` to your actual repository name
   - Example: If your repo is `bike-shop`, change it to `'/bike-shop/'`

3. **Rebuild and redeploy:**
   ```bash
   npm run build
   git add .
   git commit -m "Fix base path for GitHub Pages"
   git push
   ```

## For User/Organization Pages

If your site is at `tcwork322.github.io` (no repo name in URL):
- Change the base path to: `return '/';`

## Automatic Detection

The config now tries to auto-detect the repo name from GitHub Actions, but you may need to set it manually for the first deployment.
