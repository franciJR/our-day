# Complete Guide: Hosting Your Wishes API

## ⚠️ Important Note

Your wishes API uses **PHP**, which requires a server that can execute PHP code. **GitHub Pages does NOT support PHP** - it only serves static HTML/CSS/JavaScript files.

To make your wishes visible to everyone, you need to host your website on a server that supports PHP.

---

## 🎯 Quick Summary: Best Options

1. **Free PHP Hosting** (Easiest) - 000webhost, InfinityFree, or similar
2. **Vercel/Netlify with Serverless Functions** (Modern) - Requires converting to Node.js
3. **Traditional Web Hosting** (Most Reliable) - cPanel hosting, shared hosting
4. **Cloud Services** (Scalable) - AWS, Google Cloud, Azure

---

## Option 1: Free PHP Hosting (Recommended for Beginners)

### Using 000webhost (Free, No Credit Card Required)

#### Step 1: Sign Up
1. Go to [000webhost.com](https://www.000webhost.com)
2. Click **"Get Started Free"**
3. Sign up with email or Google account
4. Verify your email

#### Step 2: Create a Website
1. After login, click **"Create Website"**
2. Choose a subdomain (e.g., `yourname.000webhostapp.com`)
3. Wait for the website to be created (takes 1-2 minutes)

#### Step 3: Upload Your Files
1. Go to **"File Manager"** in your dashboard
2. Navigate to the `public_html` folder
3. **Delete** the default `index.html` file
4. Upload ALL your files:
   - `index.html`
   - `script.js`
   - `styles.css`
   - `api/` folder (with `wishes.php` inside)
   - `photos/` folder
   - `font/` folder
   - `song/` folder
   - `images/` folder

#### Step 4: Set Permissions
1. In File Manager, right-click on the `api` folder
2. Select **"Change Permissions"** or **"CHMOD"**
3. Set permissions to **755** (or **777** if 755 doesn't work)
4. Click **"Change"**

#### Step 5: Test Your API
1. Visit: `https://yourname.000webhostapp.com/api/wishes.php?action=get`
2. You should see: `{"success":true,"wishes":[]}`
3. If you see this, your API is working! ✅

#### Step 6: Update Your Website URL
1. Open `script.js` in File Manager
2. Find line 854: `const WISHES_API_URL = 'api/wishes.php';`
3. Make sure it says exactly: `'api/wishes.php'` (no changes needed if files are in the same domain)
4. Save the file

#### Step 7: Test the Full Website
1. Visit: `https://yourname.000webhostapp.com`
2. Click "Wish the Couple"
3. Submit a test wish
4. Refresh the page - you should see your wish!

---

### Alternative Free PHP Hosts

**InfinityFree** (infinityfree.net)
- Similar process to 000webhost
- Free subdomain: `yourname.rf.gd`
- No ads on free plan

**Freehostia** (freehostia.com)
- Free hosting with PHP support
- Limited storage (250MB)

---

## Option 2: Traditional Web Hosting (Most Reliable)

If you have a domain name (e.g., `yourwedding.com`), use traditional hosting:

### Popular Hosts:
- **Bluehost** - $2.95/month (often recommended)
- **Hostinger** - $1.99/month
- **SiteGround** - $2.99/month
- **A2 Hosting** - $2.99/month

### Steps:
1. **Purchase hosting** and domain (or use existing domain)
2. **Access cPanel** (provided by your host)
3. **Upload files** via File Manager or FTP:
   - Upload everything to `public_html/` or `www/` folder
4. **Set permissions** on `api` folder to 755
5. **Test API**: `https://yourdomain.com/api/wishes.php?action=get`

---

## Option 3: Vercel/Netlify with Serverless Functions

If you prefer modern hosting but need to convert PHP to serverless:

### Converting to Vercel (Node.js)

1. **Create `api/wishes.js`** (replacing `wishes.php`):

```javascript
// api/wishes.js
const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const wishesFile = path.join(process.cwd(), 'api', 'wishes.json');

  if (req.method === 'GET' && req.query.action === 'get') {
    let wishes = [];
    if (fs.existsSync(wishesFile)) {
      const content = fs.readFileSync(wishesFile, 'utf8');
      wishes = JSON.parse(content) || [];
    }
    return res.json({ success: true, wishes });
  }

  if (req.method === 'POST' && req.body.action === 'add') {
    const { wish } = req.body;
    if (!wish || !wish.name || !wish.message) {
      return res.status(400).json({ success: false, error: 'Name and message are required' });
    }

    let wishes = [];
    if (fs.existsSync(wishesFile)) {
      const content = fs.readFileSync(wishesFile, 'utf8');
      wishes = JSON.parse(content) || [];
    }

    wishes.push({
      name: wish.name.trim(),
      message: wish.message.trim(),
      date: wish.date || new Date().toISOString()
    });

    fs.writeFileSync(wishesFile, JSON.stringify(wishes, null, 2));
    return res.json({ success: true, message: 'Wish added successfully' });
  }

  return res.status(400).json({ success: false, error: 'Invalid request' });
}
```

2. **Update `script.js`** line 854:
```javascript
const WISHES_API_URL = '/api/wishes';
```

3. **Deploy to Vercel**:
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Follow prompts

**Note**: Vercel's free tier has limitations on file system writes. Consider using a database instead.

---

## Option 4: Using a Database Service (Advanced)

For better scalability, use a database service:

### Firebase Firestore (Free Tier Available)

1. **Create Firebase project** at [firebase.google.com](https://firebase.google.com)
2. **Enable Firestore Database**
3. **Get API keys**
4. **Replace PHP with Firebase SDK** in your frontend
5. **No backend needed** - Firebase handles everything

### Supabase (Free Tier Available)

1. **Create project** at [supabase.com](https://supabase.com)
2. **Create `wishes` table**
3. **Use Supabase JavaScript client** in your frontend

---

## 🔧 Troubleshooting

### API Returns 500 Error
- **Check file permissions**: `api` folder should be 755 or 777
- **Check PHP version**: Most hosts use PHP 7.4+ (your code is compatible)
- **Check error logs**: Look in cPanel → Error Logs

### API Returns 404 Error
- **Check file path**: Make sure `api/wishes.php` exists
- **Check URL**: Should be `https://yourdomain.com/api/wishes.php?action=get`

### Wishes Not Saving
- **Check write permissions**: `api` folder must be writable
- **Check disk space**: Free hosts have limited storage
- **Check PHP error logs**: May show permission errors

### CORS Errors
- Your PHP file already includes CORS headers
- If still getting errors, check server configuration

### Wishes Not Showing on Website
- **Open browser console** (F12) and check for errors
- **Verify API URL** in `script.js` matches your domain
- **Test API directly**: Visit `https://yourdomain.com/api/wishes.php?action=get`

---

## ✅ Testing Checklist

After hosting, verify:

- [ ] Website loads: `https://yourdomain.com`
- [ ] API responds: `https://yourdomain.com/api/wishes.php?action=get`
- [ ] Can submit wish via website form
- [ ] Wish appears in API response
- [ ] Wish appears on website (may need refresh)
- [ ] Wish visible on different device/browser

---

## 🚀 Quick Start Recommendation

**For beginners**: Use **000webhost** (Option 1)
- Free, no credit card
- Easy file upload
- PHP support included
- Takes ~15 minutes to set up

**For production**: Use **traditional hosting** (Option 2)
- More reliable
- Better performance
- Custom domain support
- Professional appearance

---

## 📝 File Structure After Upload

Your server should have this structure:

```
public_html/ (or www/)
├── index.html
├── script.js
├── styles.css
├── api/
│   ├── wishes.php
│   └── wishes.json (auto-created)
├── photos/
├── font/
├── song/
└── images/
```

---

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console (F12) for JavaScript errors
2. Check server error logs in your hosting dashboard
3. Test the API directly in your browser
4. Verify file permissions are correct

---

## Summary

**The key point**: Your wishes API needs PHP support. GitHub Pages won't work. Choose a hosting provider that supports PHP (like 000webhost, InfinityFree, or traditional web hosting), upload your files, set the correct permissions, and your wishes will be visible to everyone! 🎉

