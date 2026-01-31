# Firebase Quick Start - 5 Minutes

## ✅ Yes! Firebase works perfectly for your wishes section!

Your website is now configured to use **Firebase Firestore** for storing wishes. Here's how to get it running:

---

## 🚀 Quick Setup (5 Steps)

### 1. Create Firebase Project (2 min)
- Go to [firebase.google.com](https://firebase.google.com)
- Sign in with Google
- Click **"Add project"**
- Name it: `wedding-website`
- **Disable Google Analytics** (optional)
- Click **"Create project"**

### 2. Enable Firestore (1 min)
- Click **"Firestore Database"** in left sidebar
- Click **"Create database"**
- Choose **"Start in test mode"**
- Choose location (closest to you)
- Click **"Enable"**

### 3. Get Your Config (1 min)
- Click **gear icon** ⚙️ → **"Project settings"**
- Scroll to **"Your apps"**
- Click **Web icon** `</>`
- Check **"Firebase Hosting"** ✅
- Click **"Register app"**
- **Copy the `firebaseConfig` object**

### 4. Update Config File (30 sec)
- Open `firebase-config.js`
- Replace `YOUR_API_KEY`, `YOUR_PROJECT_ID`, etc. with your actual values
- Save the file

### 5. Deploy! (1 min)
```bash
# Install Firebase CLI (one time)
npm install -g firebase-tools

# Login
firebase login

# Initialize (in your project folder)
firebase init
# Select: Hosting and Firestore
# Public directory: . (dot)
# Single-page app: Yes

# Deploy
firebase deploy
```

**Done!** Your website is live at `https://your-project-id.web.app` 🎉

---

## 📝 Set Firestore Rules

After deploying, set security rules:

1. Firebase Console → **Firestore Database** → **Rules**
2. Paste this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /wishes/{wishId} {
      allow read: if true;
      allow create: if request.resource.data.keys().hasAll(['name', 'message', 'date']);
    }
  }
}
```

3. Click **"Publish"**

---

## ✅ Test It!

1. Visit your deployed website
2. Click **"Wish the Couple"**
3. Submit a wish
4. Open website on another device
5. **See your wish!** ✨

---

## 🆘 Need More Help?

See **FIREBASE_SETUP_GUIDE.md** for detailed instructions with screenshots and troubleshooting.

---

## 🎯 What Changed?

- ✅ `firebase-config.js` - Your Firebase credentials
- ✅ `index.html` - Added Firebase SDK scripts
- ✅ `script.js` - Now uses Firestore instead of PHP API
- ✅ `api/wishes.php` - No longer needed (can delete)

**All wishes are now stored in Firebase and visible to everyone!** 🎉

