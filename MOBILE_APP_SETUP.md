# 📱 The Drinkers - React Native App Setup Guide

## 🎯 Mobile App Implementation Plan

**Timeline:** 4-6 weeks  
**Budget:** €40-80K (agency) or €0 (DIY)  
**Platforms:** iOS + Android

---

## 📋 **KORAKI ZA SETUP:**

### **1. Install Expo CLI (5 min)**

```bash
# Install Expo CLI globally
npm install -g expo-cli

# Verify installation
expo --version
```

---

### **2. Create New Expo App (10 min)**

```bash
# Navigate to project root
cd f:\thedrinkers

# Create new Expo app
npx create-expo-app@latest the-drinkers-app --template blank-typescript

# Navigate to app directory
cd the-drinkers-app
```

---

### **3. Install Dependencies (10 min)**

```bash
# Core dependencies
npm install nativewind tailwindcss
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm install @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install expo-linear-gradient
npm install expo-image
npm install expo-av
npm install expo-store-review
npm install expo-notifications
npm install expo-sharing
npm install expo-file-system

# Dev dependencies
npm install -D @types/react
npm install -D typescript
```

---

### **4. Setup Tailwind (15 min)**

```bash
# Initialize Tailwind
cd the-drinkers-app
npx tailwindcss init
```

**Update `tailwind.config.js`:**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './screens/**/*.{ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'rock-black': '#0a0a0a',
        'rock-dark': '#1a1a1a',
        'rock-gray': '#2a2a2a',
        'crimson': '#dc143c',
        'crimson-light': '#ff3333',
        'crimson-dark': '#b91030',
        'silver': '#c0c0c0',
        'text-gray': '#cccccc',
      },
    },
  },
  plugins: [],
};
```

**Update `babel.config.js`:**

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```

---

### **5. Project Structure (15 min)**

```
the-drinkers-app/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx
│   │   ├── index.tsx          # Home
│   │   ├── tour.tsx           # Tour Dates
│   │   ├── music.tsx          # Music
│   │   ├── merch.tsx          # Merch Store
│   │   └── profile.tsx        # User Profile
│   ├── _layout.tsx            # Root Layout
│   ├── +not-found.tsx         # 404 Page
│   └── modal.tsx              # Modal Screen
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── GlassCard.tsx
│   │   └── Loading.tsx
│   ├── TourCard.tsx
│   ├── MusicPlayer.tsx
│   └── MerchItem.tsx
├── screens/
│   ├── HomeScreen.tsx
│   ├── TourScreen.tsx
│   ├── MusicScreen.tsx
│   ├── MerchScreen.tsx
│   └── ProfileScreen.tsx
├── lib/
│   ├── api.ts                 # API calls
│   ├── auth.ts                # Authentication
│   └── utils.ts               # Utilities
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   └── useTourDates.ts
├── constants/
│   ├── Colors.ts
│   └── Config.ts
├── types/
│   └── index.ts
├── assets/
│   ├── images/
│   └── fonts/
├── app.json                   # Expo config
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── babel.config.js
```

---

### **6. App Configuration (10 min)**

**Update `app.json`:**

```json
{
  "expo": {
    "name": "The Drinkers",
    "slug": "the-drinkers",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "thedrinkers",
    "userInterfaceStyle": "dark",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0a0a0a"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "si.thedrinkers.app",
      "buildNumber": "1",
      "config": {
        "usesNonExemptEncryption": false
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#0a0a0a"
      },
      "package": "si.thedrinkers.app",
      "versionCode": 1
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-notifications",
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#0a0a0a",
          "image": "./assets/images/splash.png",
          "imageWidth": 200
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "apiUrl": "https://thedrinkers.si/api",
      "stripePublicKey": "pk_test_..."
    }
  }
}
```

---

## 🎨 **CORE FEATURES IMPLEMENTATION:**

### **Feature 1: Tour Dates Screen**

```typescript
// screens/TourScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { TourCard } from '../components/TourCard';
import { api } from '../lib/api';

interface TourDate {
  id: string;
  date: string;
  city: string;
  venue: string;
  soldOut: boolean;
  ticketUrl?: string;
}

export function TourScreen() {
  const [tourDates, setTourDates] = useState<TourDate[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTourDates = async () => {
    try {
      const data = await api.get('/api/tour');
      setTourDates(data);
    } catch (error) {
      console.error('Failed to fetch tour dates:', error);
    }
  };

  useEffect(() => {
    fetchTourDates();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchTourDates().then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <View className="flex-1 bg-rock-black">
      <FlatList
        data={tourDates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TourCard tourDate={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}
```

---

### **Feature 2: Music Player**

```typescript
// components/MusicPlayer.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';

interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  audioUrl: string;
}

export function MusicPlayer({ track }: { track: Track }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function playSound() {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.audioUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('Failed to play sound:', error);
    }
  }

  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  return (
    <View className="bg-rock-dark p-4 rounded-lg">
      <Text className="text-white text-xl font-bold">{track.title}</Text>
      <Text className="text-text-gray">{track.album}</Text>
      
      <TouchableOpacity
        onPress={isPlaying ? pauseSound : playSound}
        className="bg-crimson px-6 py-3 rounded-full mt-4 self-center"
      >
        <Text className="text-white font-bold">
          {isPlaying ? '⏸ PAUZA' : '▶ PREDVAJAJ'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

### **Feature 3: Merch Store**

```typescript
// screens/MerchScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { MerchItem } from '../components/MerchItem';
import { useCart } from '../hooks/useCart';
import { api } from '../lib/api';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  variants: Array<{ size: string; color: string }>;
}

export function MerchScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const data = await api.get('/api/merch');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }

  return (
    <View className="flex-1 bg-rock-black">
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <MerchItem
            product={item}
            onAddToCart={() => addToCart(item)}
          />
        )}
      />
      
      {/* Cart Button */}
      <TouchableOpacity className="bg-crimson p-4 m-4 rounded-lg">
        <Text className="text-white font-bold text-center">
          🛒 OGLEJ KOŠARICO
        </Text>
      </TouchableOpacity>
    </View>
  );
}
```

---

## 🚀 **CI/CD PIPELINE:**

### **Setup EAS Build (30 min)**

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Create build profile
eas build:profile:create
```

**Create `eas.json`:**

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      },
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "distribution": "store",
      "ios": {
        "resourceClass": "m-medium"
      },
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-app-id"
      },
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

---

### **Build for Production**

```bash
# Build for iOS
eas build --platform ios --profile production

# Build for Android
eas build --platform android --profile production

# Submit to App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

---

## 💰 **COST BREAKDOWN:**

### **Development Costs:**

| Item | Cost | Frequency |
|------|------|-----------|
| **Developer (DIY)** | €0 | One-time |
| **Developer (Agency)** | €40-80K | One-time |
| **Apple Developer** | €99 | Yearly |
| **Google Play** | $25 | One-time |
| **Expo Pro** | $299/month | Optional |
| **Backend API** | €20-50/month | Monthly |

### **Total Year 1:**
- **DIY:** €124 + €240-600 = **€364-724**
- **Agency:** €40-80K + €124 + €240-600 = **€40,364-80,724**

---

## 📊 **TIMELINE:**

| Week | Task | Status |
|------|------|--------|
| **1-2** | Setup & Configuration | ⏳ Pending |
| **3-4** | Core Features (Tour, Music, Merch) | ⏳ Pending |
| **5-6** | Authentication & Profile | ⏳ Pending |
| **7-8** | Testing & Bug Fixes | ⏳ Pending |
| **9-10** | App Store Submission | ⏳ Pending |
| **11-12** | Launch & Marketing | ⏳ Pending |

---

## 🎯 **NEXT STEPS:**

### **Takoj (Danes):**
```bash
# 1. Install Expo CLI
npm install -g expo-cli

# 2. Create app
npx create-expo-app@latest the-drinkers-app --template blank-typescript

# 3. Install dependencies
cd the-drinkers-app
npm install nativewind tailwindcss
```

### **Teden 1:**
```
✅ Project setup
✅ Tailwind configuration
✅ Navigation setup
✅ Basic UI components
```

### **Teden 2-3:**
```
✅ Tour Dates screen
✅ Music Player
✅ Merch Store
✅ API integration
```

### **Teden 4-6:**
```
✅ Authentication
✅ User Profile
✅ Push Notifications
✅ Testing
```

---

## 📱 **APP STORE REQUIREMENTS:**

### **iOS App Store:**
- ✅ Apple Developer Account (€99/year)
- ✅ App Icon (1024x1024)
- ✅ Screenshots (6.5" and 5.5")
- ✅ App Description
- ✅ Privacy Policy
- ✅ Review Process (1-2 weeks)

### **Google Play Store:**
- ✅ Google Play Account ($25 one-time)
- ✅ App Icon (512x512)
- ✅ Screenshots (at least 2)
- ✅ App Description
- ✅ Privacy Policy
- ✅ Review Process (2-7 days)

---

## 🎸 **PRIMERJAVA: PWA vs Native**

| Feature | PWA | Native App |
|---------|-----|------------|
| **Development Time** | 2-4 hours | 4-6 weeks |
| **Development Cost** | €0 | €40-80K |
| **Maintenance** | Low | High |
| **App Store** | Not needed | Required |
| **Offline Mode** | ✅ Yes | ✅ Yes |
| **Push Notifications** | ✅ Most browsers | ✅ Yes |
| **Performance** | 95% | 100% |
| **Device Features** | Limited | Full access |
| **Updates** | Automatic | Manual |
| **Discovery** | SEO | App Store |

---

**Ready to start? 🚀**

**Next command:**
```bash
npm install -g expo-cli
```
