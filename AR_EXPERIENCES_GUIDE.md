# 🎨 AR (AUGMENTED REALITY) SETUP GUIDE

**Complete guide for implementing AR experiences**

---

## 🎯 AR FEATURES FOR THE DRINKERS

### **1. AR Band Members** 🎸

```
✅ 3D models of band members
✅ Pose for photos with fans
✅ Animated gestures
✅ Voice messages
```

### **2. AR Album Covers** 💿

```
✅ Point phone at album
✅ See animated cover
✅ Play song preview
✅ Behind-the-scenes content
```

### **3. AR Concert Posters** 🎤

```
✅ Point phone at poster
✅ See tour dates
✅ Buy tickets directly
✅ Watch trailer
```

### **4. AR Merch Try-On** 👕

```
✅ Virtual t-shirt try-on
✅ See how merch looks
✅ Share on social media
✅ Direct purchase
```

### **5. Virtual Photo Booth** 📸

```
✅ AR filters and effects
✅ Band-themed backgrounds
✅ Share to Instagram/TikTok
✅ Save photos
```

---

## 🛠️ TECHNOLOGY OPTIONS

### **Option 1: 8th Wall** (Best for Web AR)

```
✅ Works in browser (no app)
✅ iOS & Android
✅ World tracking
✅ Image tracking
✅ Face effects
✅ Cost: €99-299/month
```

### **Option 2: AR.js** (Free)

```
✅ Free & open-source
✅ Web-based
✅ Image tracking
✅ Location-based AR
✅ Requires technical setup
```

### **Option 3: Spark AR** (Instagram/Facebook)

```
✅ Free
✅ Instagram filters
✅ Facebook effects
✅ Easy to create
✅ Limited to Meta platforms
```

### **Option 4: Lens Studio** (Snapchat)

```
✅ Free
✅ Snapchat lenses
✅ World tracking
✅ Face tracking
✅ Limited to Snapchat
```

---

## 📋 QUICK START: 8TH WALL

### **1. Create Account**

```
1. Go to 8thwall.com
2. Sign up for account
3. Choose plan (Start with Developer)
4. Get API Key
```

### **2. Create First AR Experience**

```
1. Login to 8th Wall dashboard
2. Click "Create New Project"
3. Choose template:
   - Image Target (for posters/albums)
   - World Effects (for photo booth)
   - Face Effects (for filters)
4. Upload 3D models/images
5. Configure interactions
6. Publish
```

### **3. Integrate with Website**

```html
<!-- Add to your page -->
<script src="https://apps.8thwall.com/xrweb?appKey=YOUR_APP_KEY"></script>

<!-- AR Container -->
<div id="ar-container">
  <video id="ar-video" autoplay playsinline></video>
  <div id="ar-overlay"></div>
</div>

<!-- Launch Button -->
<button onclick="startAR()">🎨 Experience AR</button>

<script>
  function startAR() {
    // Start AR experience
    XRWeb.startExperience("ar-container");
  }
</script>
```

---

## 🎨 AR EXPERIENCE EXAMPLES

### **1. AR Album Cover**

```typescript
// app/ar/album/[albumId]/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function ARExperience({ params }: { params: { albumId: string } }) {
  const [arReady, setArReady] = useState(false);

  useEffect(() => {
    // Load 8th Wall SDK
    const script = document.createElement('script');
    script.src = 'https://apps.8thwall.com/xrweb?appKey=YOUR_APP_KEY';
    script.onload = () => setArReady(true);
    document.head.appendChild(script);
  }, []);

  const startAR = () => {
    if (arReady) {
      XRWeb.startExperience('ar-container');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          AR Album Experience
        </h1>

        {/* AR Container */}
        <div id="ar-container" className="relative aspect-video bg-black rounded-2xl overflow-hidden mb-8">
          <video id="ar-video" autoPlay playsInline className="w-full h-full" />
          <div id="ar-overlay" className="absolute inset-0" />
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">How to Experience AR</h2>
          <ol className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>1. Point your camera at the album cover</li>
            <li>2. Watch it come to life!</li>
            <li>3. Tap to play song preview</li>
            <li>4. Share your experience</li>
          </ol>
        </div>

        {/* Start AR Button */}
        <button
          onClick={startAR}
          disabled={!arReady}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          🎨 Start AR Experience
        </button>
      </div>
    </div>
  );
}
```

---

### **2. AR Photo Booth**

```typescript
// app/ar/photo-booth/page.tsx
'use client';

import { useState } from 'react';

export default function ARPhotoBooth() {
  const [filter, setFilter] = useState('band-logo');
  const [photo, setPhoto] = useState<string | null>(null);

  const takePhoto = () => {
    // Capture current frame from camera
    // Apply filter
    // Save photo
    console.log('Taking photo with filter:', filter);
  };

  const sharePhoto = () => {
    // Share to Instagram/TikTok
    if (photo) {
      // Use Web Share API
      navigator.share({
        files: [new File([photo], 'photo.jpg', { type: 'image/jpeg' })],
        title: 'The Drinkers AR Photo',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          AR Photo Booth
        </h1>

        {/* Camera View */}
        <div className="relative aspect-square bg-black rounded-2xl overflow-hidden mb-8">
          <video
            id="photo-booth-camera"
            autoPlay
            playsInline
            className="w-full h-full"
          />

          {/* AR Filter Overlay */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Apply filter based on selection */}
          </div>
        </div>

        {/* Filter Selection */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => setFilter('band-logo')}
            className={`p-4 rounded-xl ${filter === 'band-logo' ? 'bg-purple-600' : 'bg-gray-800'}`}
          >
            🎸 Band Logo
          </button>
          <button
            onClick={() => setFilter('concert')}
            className={`p-4 rounded-xl ${filter === 'concert' ? 'bg-purple-600' : 'bg-gray-800'}`}
          >
            🎤 Concert
          </button>
          <button
            onClick={() => setFilter('merch')}
            className={`p-4 rounded-xl ${filter === 'merch' ? 'bg-purple-600' : 'bg-gray-800'}`}
          >
            👕 Merch
          </button>
          <button
            onClick={() => setFilter('vip')}
            className={`p-4 rounded-xl ${filter === 'vip' ? 'bg-purple-600' : 'bg-gray-800'}`}
          >
            👑 VIP
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={takePhoto}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl"
          >
            📸 Take Photo
          </button>
          <button
            onClick={sharePhoto}
            disabled={!photo}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-4 px-8 rounded-xl disabled:opacity-50"
          >
            📤 Share
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### **3. AR Merch Try-On**

```typescript
// app/ar/merch-tryon/[productId]/page.tsx
'use client';

export default function ARMerchTryOn({ params }: { params: { productId: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          AR Merch Try-On
        </h1>

        {/* AR View */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden mb-8">
          <video id="tryon-camera" autoPlay playsInline className="w-full h-full" />

          {/* 3D Merch Overlay */}
          <div id="merch-overlay" className="absolute inset-0">
            {/* 3D model of t-shirt/hoodie */}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Try It On!</h2>
          <ol className="space-y-2 text-gray-600 dark:text-gray-400">
            <li>1. Point camera at yourself</li>
            <li>2. See how the merch looks</li>
            <li>3. Change colors/sizes</li>
            <li>4. Share or buy!</li>
          </ol>
        </div>

        {/* Size/Color Selection */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <select className="bg-gray-800 text-white p-4 rounded-xl">
            <option>Size: S</option>
            <option>Size: M</option>
            <option>Size: L</option>
            <option>Size: XL</option>
            <option>Size: XXL</option>
          </select>
          <select className="bg-gray-800 text-white p-4 rounded-xl">
            <option>Color: Black</option>
            <option>Color: White</option>
            <option>Color: Navy</option>
          </select>
        </div>

        {/* Buy Button */}
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-8 rounded-xl">
          🛍️ Buy Now - €29.99
        </button>
      </div>
    </div>
  );
}
```

---

## 📱 MOBILE INTEGRATION

### **Add to Mobile App**

```typescript
// mobile/screens/ARScreen.tsx (already exists!)
import { ARView } from '@8thwall/react';

export default function ARScreen() {
  return (
    <View style={styles.container}>
      <ARView
        appKey="YOUR_APP_KEY"
        onExperienceLoaded={() => console.log('AR loaded')}
      />
    </View>
  );
}
```

---

## 💰 COST BREAKDOWN

### **8th Wall Plans:**

```
Developer: €99/month
  - 1,000 monthly sessions
  - All features
  - Email support

Professional: €249/month
  - 5,000 monthly sessions
  - Priority support
  - Custom branding

Enterprise: €749+/month
  - Unlimited sessions
  - Dedicated support
  - Custom development
```

### **Alternative (Free):**

```
AR.js: Free
  - Self-hosted
  - Requires development
  - Limited features

Spark AR: Free
  - Instagram only
  - Easy to use
  - Large audience
```

---

## 🚀 QUICK START

### **Option 1: 8th Wall (Professional)**

```
Time: 2-3 ure
Cost: €99/month
Steps:
1. Create 8th Wall account
2. Create AR experience
3. Integrate with website
4. Test on mobile
5. Launch!
```

### **Option 2: Spark AR (Free)**

```
Time: 1-2 uri
Cost: Free
Steps:
1. Download Spark AR Studio
2. Create Instagram filter
3. Submit for approval
4. Share on Instagram
5. Launch!
```

---

## ✅ CONCLUSION

**AR Experiences ready!**

```
Status: ✅ Guide complete
Time to implement: 2-3 ure
Cost: Free - €99/month
Impact: HIGH (engagement, social sharing)
```

**Next:**

1. Choose platform
2. Create first AR experience
3. Integrate with website
4. Test on mobile
5. Launch! 🎨

---

**AR experiences pripravljeni!** 🎨✅
