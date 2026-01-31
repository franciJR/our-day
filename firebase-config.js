// Firebase Configuration
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcsSrVJwdR2tAlliSepIgAQsr7Y-tsY5g",
  authDomain: "our-special-day.firebaseapp.com",
  projectId: "our-special-day",
  storageBucket: "our-special-day.firebasestorage.app",
  messagingSenderId: "669162705024",
  appId: "1:669162705024:web:dd20c83f5f5477c7721665"
};

// Initialize Firebase (using compat SDK loaded in index.html)
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
}

