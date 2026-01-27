# Wishes System Setup Guide

The wishes system now supports **shared wishes** that can be seen by everyone who visits your website!

## How It Works

- Wishes are stored in a shared JSON file on your server
- All visitors can see all wishes submitted by anyone
- Wishes automatically refresh every 30 seconds to show new submissions
- Falls back to localStorage if the API is not available

## Setup Instructions

### Option 1: PHP Backend (Recommended - Already Included)

1. **Upload the API file**: Make sure `api/wishes.php` is uploaded to your server
2. **Set permissions**: Ensure the `api` folder is writable (chmod 755 or 777)
3. **Test the API**: Visit `https://yourdomain.com/api/wishes.php?action=get` - it should return JSON
4. **That's it!** The system will automatically use the API

### Option 2: Using a Different Backend

If you prefer to use a different backend (Node.js, Python, etc.), you need to create an endpoint that:

**GET Request** (`/api/wishes.php?action=get`):
```json
{
  "success": true,
  "wishes": [
    {
      "name": "John Doe",
      "message": "Congratulations!",
      "date": "2024-01-01T12:00:00.000Z"
    }
  ]
}
```

**POST Request** (`/api/wishes.php`):
```json
{
  "action": "add",
  "wish": {
    "name": "John Doe",
    "message": "Congratulations!",
    "date": "2024-01-01T12:00:00.000Z"
  }
}
```

Response:
```json
{
  "success": true,
  "message": "Wish added successfully"
}
```

### Option 3: Using a Third-Party Service

You can also use services like:
- **Firebase Firestore** (free tier available)
- **Supabase** (free tier available)
- **JSONBin.io** (free tier available)

Just update the `WISHES_API_URL` in `script.js` to point to your service endpoint.

## Configuration

The API URL is set in `script.js`:
```javascript
const WISHES_API_URL = 'api/wishes.php'; // Change this to your API endpoint
```

## File Structure

```
April-18th/
├── api/
│   ├── wishes.php      (PHP backend - handles GET/POST requests)
│   └── wishes.json     (Auto-created - stores all wishes)
├── index.html
├── script.js           (Contains wishes functionality)
└── styles.css
```

## Troubleshooting

1. **Wishes not showing**: Check browser console for errors
2. **Can't save wishes**: Ensure `api` folder has write permissions
3. **CORS errors**: Make sure your server allows cross-origin requests (already handled in PHP file)
4. **API not working**: The system will fall back to localStorage (device-specific)

## Security Notes

- The PHP file includes basic XSS protection (htmlspecialchars)
- Consider adding rate limiting for production use
- You may want to add moderation/approval before wishes are displayed
- Consider adding CAPTCHA to prevent spam

## Testing

1. Open your website
2. Click "Wish the Couple"
3. Submit a wish
4. Open the website on another device/browser
5. You should see the wish you just submitted!

