# Complete Firebase Hosting Guide for Your Wedding Website

## ✅ Yes! Firebase is Perfect for Your Wishes Section

**Firebase Hosting** can host your static website, and **Firebase Firestore** (database) will store all wishes so everyone can see them. This is actually a great solution!

---

## 🎯 What You'll Get

- ✅ **Free hosting** for your website
- ✅ **Free database** for wishes (Firestore free tier: 50K reads/day, 20K writes/day)
- ✅ **Real-time updates** - wishes appear instantly for all visitors
- ✅ **Custom domain** support (optional)
- ✅ **HTTPS** automatically enabled
- ✅ **Fast CDN** - your site loads quickly worldwide

---

## 📋 Step-by-Step Setup

### Step 1: Create a Firebase Account

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click **"Get Started"** or **"Go to Console"**
3. Sign in with your Google account (or create one)

### Step 2: Create a New Project

1. Click **"Add project"** or **"Create a project"**
2. **Project name**: `wedding-website` (or any name you like)
3. Click **"Continue"**
4. **Google Analytics**: You can disable this (toggle it off) or leave it enabled
5. Click **"Create project"**
6. Wait for project creation (30-60 seconds)
7. Click **"Continue"**

### Step 3: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** in the left sidebar
2. Click **"Create database"**
3. **Security rules**: Choose **"Start in test mode"** (we'll secure it later)
4. Click **"Next"**
5. **Cloud Firestore location**: Choose the closest location to you
   - Example: `us-central` (United States), `europe-west` (Europe), etc.
6. Click **"Enable"**
7. Wait for database creation (30-60 seconds)

### Step 4: Get Your Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>` (or "Add app" if you haven't added one)
5. **App nickname**: `Wedding Website` (optional)
6. **Firebase Hosting**: Check this box ✅
7. Click **"Register app"**
8. **Copy the `firebaseConfig` object** - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

9. **Keep this window open** - you'll need these values!

### Step 5: Update Your Website Files

#### 5a. Update `firebase-config.js`

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase config from Step 4
3. Save the file

#### 5b. Update `index.html`

Add Firebase SDK scripts before your `script.js`:

1. Open `index.html`
2. Find the `</head>` tag (before `</head>`)
3. Add these lines:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
```

The updated `index.html` should look like this:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Our Wedding</title>
    <link rel="stylesheet" href="styles.css">
    <!-- ... other links ... -->
    
    <!-- Firebase SDK -->
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"></script>
    <script src="https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore-compat.js"></script>
    <script src="firebase-config.js"></script>
</head>
```

#### 5c. The `script.js` file is already updated!

The code has been modified to use Firebase Firestore. No changes needed here.

### Step 6: Set Up Firestore Security Rules

1. In Firebase Console, go to **"Firestore Database"**
2. Click **"Rules"** tab
3. Replace the rules with this (allows anyone to read/write wishes):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wishes/{wishId} {
      // Allow anyone to read wishes
      allow read: if true;
      // Allow anyone to create wishes
      allow create: if request.resource.data.keys().hasAll(['name', 'message', 'date']);
    }
  }
}
```

4. Click **"Publish"**

**⚠️ Security Note**: These rules allow anyone to read/write. For production, consider adding:
- Rate limiting
- Content moderation
- Authentication (optional)

### Step 7: Install Firebase CLI

You need Firebase CLI to deploy your website:

1. **Install Node.js** (if not installed):
   - Go to [nodejs.org](https://nodejs.org)
   - Download and install the LTS version

2. **Install Firebase CLI**:
   - Open Terminal (Mac/Linux) or Command Prompt/PowerShell (Windows)
   - Run: `npm install -g firebase-tools`

3. **Login to Firebase**:
   - Run: `firebase login`
   - This opens your browser - sign in with your Google account
   - Return to terminal when done

### Step 8: Initialize Firebase in Your Project

1. **Navigate to your project folder**:
   ```bash
   cd "C:\Users\franc\MyProject\April-18th"
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init
   ```

3. **Follow the prompts**:
   - **"Which Firebase features do you want to set up?"**
     - Use arrow keys and spacebar to select: **Hosting** and **Firestore**
     - Press Enter
   
   - **"Select a default Firebase project"**
     - Choose your project (the one you created in Step 2)
     - Press Enter
   
   - **"What do you want to use as your public directory?"**
     - Type: `.` (just a dot - means current directory)
     - Press Enter
   
   - **"Configure as a single-page app?"**
     - Type: `Yes` (or `y`)
     - Press Enter
   
   - **"Set up automatic builds and deploys with GitHub?"**
     - Type: `No` (or `n`)
     - Press Enter
   
   - **"File public/index.html already exists. Overwrite?"**
     - Type: `No` (or `n`)
     - Press Enter
   
   - **"What file should be used for Firestore Rules?"**
     - Press Enter (uses default: `firestore.rules`)
   
   - **"What file should be used for Firestore indexes?"**
     - Press Enter (uses default: `firestore.indexes.json`)

4. **Done!** Firebase has created:
   - `firebase.json` - hosting configuration
   - `.firebaserc` - project configuration
   - `firestore.rules` - database security rules
   - `firestore.indexes.json` - database indexes

### Step 9: Deploy Your Website

1. **Deploy everything**:
   ```bash
   firebase deploy
   ```

2. **Wait for deployment** (1-2 minutes)

3. **You'll see your website URL**:
   ```
   Hosting URL: https://your-project-id.web.app
   ```

4. **Visit your website!** 🎉

### Step 10: Test the Wishes Feature

1. Open your deployed website
2. Click **"Wish the Couple"**
3. Fill in the form and submit a wish
4. **Open the website in another browser/device**
5. You should see the wish you just submitted! ✅

---

## 🔄 Updating Your Website

Whenever you make changes:

1. **Deploy again**:
   ```bash
   firebase deploy
   ```

2. Changes go live in 1-2 minutes!

---

## 🌐 Custom Domain (Optional)

Want to use your own domain (e.g., `yourwedding.com`)?

1. In Firebase Console, go to **"Hosting"**
2. Click **"Add custom domain"**
3. Follow the instructions to verify your domain
4. Update your domain's DNS records as shown
5. Wait for SSL certificate (can take a few hours)

---

## 🔒 Securing Your Database (Recommended)

The current rules allow anyone to read/write. For better security:

### Option 1: Rate Limiting (Basic)

Update `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wishes/{wishId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['name', 'message', 'date'])
                    && request.resource.data.name.size() <= 100
                    && request.resource.data.message.size() <= 500;
    }
  }
}
```

Then deploy:
```bash
firebase deploy --only firestore:rules
```

### Option 2: Content Moderation (Advanced)

Consider using Firebase Functions to moderate content before saving.

---

## 📊 Monitoring Usage

Check your Firestore usage:

1. Firebase Console → **"Usage and billing"**
2. Free tier includes:
   - **50,000 reads/day**
   - **20,000 writes/day**
   - **20 GB storage**

For a wedding website, this is usually more than enough!

---

## 🐛 Troubleshooting

### "Firebase is not defined"
- Make sure Firebase SDK scripts are loaded before `script.js` in `index.html`
- Check browser console for errors

### Wishes not saving
- Check Firestore rules are published
- Check browser console for errors
- Verify `firebase-config.js` has correct values

### Deployment fails
- Make sure you're logged in: `firebase login`
- Check you're in the correct directory
- Verify `firebase.json` exists

### Can't see wishes on different device
- Check Firestore rules allow reads
- Wait a few seconds (Firestore updates are near-instant but can take 1-2 seconds)
- Check browser console for errors

---

## 📁 Final File Structure

Your project should look like:

```
April-18th/
├── index.html
├── script.js
├── styles.css
├── firebase-config.js          (NEW - your Firebase config)
├── firebase.json               (AUTO-GENERATED)
├── .firebaserc                 (AUTO-GENERATED)
├── firestore.rules             (AUTO-GENERATED)
├── firestore.indexes.json      (AUTO-GENERATED)
├── api/
│   └── wishes.php              (NOT NEEDED - can delete)
├── photos/
├── font/
├── song/
└── images/
```

**Note**: You can delete `api/wishes.php` and `api/wishes.json` - they're no longer needed!

---

## ✅ Summary

1. ✅ Create Firebase project
2. ✅ Enable Firestore
3. ✅ Get Firebase config
4. ✅ Update `firebase-config.js`
5. ✅ Add Firebase SDK to `index.html`
6. ✅ Set Firestore rules
7. ✅ Install Firebase CLI
8. ✅ Run `firebase init`
9. ✅ Run `firebase deploy`
10. ✅ Test your website!

**Your wishes will now be visible to everyone who visits your website!** 🎉

---

## 🆘 Need Help?

- **Firebase Documentation**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Firebase Support**: [firebase.google.com/support](https://firebase.google.com/support)
- **Check browser console** (F12) for errors
- **Check Firebase Console** → "Usage and billing" for quota issues

