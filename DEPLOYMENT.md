# Deployment Guide - GitHub Pages

## Step-by-Step Instructions

### 1. Create a New Repository on GitHub
1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository name: `akhil-sharlet-wedding` (or any name you prefer)
4. Description: "Wedding website for Akhil & Sharlet - April 18, 2026"
5. Choose **Public** (required for free GitHub Pages)
6. **DO NOT** check "Initialize with README" (we already have files)
7. Click **"Create repository"**

### 2. Connect and Push Your Files

After creating the repository, GitHub will show you commands. Use these commands in your terminal:

```bash
cd April-18th
git remote add origin https://github.com/YOUR_USERNAME/akhil-sharlet-wedding.git
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**

### 4. Your Website is Live! 🎉

Your website will be available at:
```
https://YOUR_USERNAME.github.io/akhil-sharlet-wedding
```

**Note:** It may take a few minutes (up to 10 minutes) for the site to be live after enabling Pages.

### 5. Future Updates

Whenever you make changes to your website:

```bash
cd April-18th
git add .
git commit -m "Description of changes"
git push
```

The website will automatically update within a few minutes!

---

## Alternative: Quick Deploy with Netlify

If you prefer an even easier option:

1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your `April-18th` folder onto the Netlify dashboard
3. Your site is live instantly with a free URL!

