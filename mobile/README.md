# 📱 The Drinkers - React Native App

## 🎯 Complete Mobile App Implementation

**Status:** Setup Complete ✅  
**Platform:** iOS + Android  
**Framework:** Expo + React Native + TypeScript  
**Styling:** NativeWind (Tailwind)

---

## 📁 **Project Structure:**

```
mobile/
├── App.tsx                      # Main app component
├── app.json                     # Expo configuration
├── tailwind.config.js           # Tailwind config
├── babel.config.js              # Babel config
├── screens/
│   ├── HomeScreen.tsx           ✅ Home page
│   ├── TourScreen.tsx           📅 Tour dates
│   ├── MusicScreen.tsx          🎵 Music player
│   ├── MerchScreen.tsx          👕 Merch store
│   └── ProfileScreen.tsx        👤 User profile
├── components/
│   ├── TourCard.tsx             Tour date card
│   ├── MusicPlayer.tsx          Audio player
│   ├── MerchItem.tsx            Product card
│   └── GlassCard.tsx            Glassmorphism card
├── lib/
│   ├── api.ts                   API calls
│   ├── auth.ts                  Authentication
│   └── utils.ts                 Utilities
├── hooks/
│   ├── useAuth.ts               Auth hook
│   ├── useCart.ts               Cart hook
│   └── useTourDates.ts          Tour dates hook
└── assets/
    ├── images/                  App icons, splash
    └── fonts/                   Custom fonts
```

---

## 🚀 **INSTALLATION:**

### **1. Navigate to App Directory**

```bash
cd %USERPROFILE%\the-drinkers-app
# OR
cd ~/the-drinkers-app
```

### **2. Copy Files from mobile/ folder**

```bash
# Copy all files from f:\thedrinkers\the\mobile\ to your app directory
# Keep existing node_modules and package.json
```

### **3. Install Dependencies**

```bash
npm install nativewind tailwindcss
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install expo-linear-gradient expo-image expo-av expo-store-review expo-notifications
```

### **4. Setup Tailwind**

```bash
npx tailwindcss init
```

### **5. Run App**

```bash
# Start Expo
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

---

## 📱 **SCREENS:**

### **1. HomeScreen** ✅
- Hero section with gradient
- Latest news card
- Quick links grid (4 items)
- Social media buttons
- Footer

### **2. TourScreen** (Planned)
- List of tour dates
- Filter by city/country
- Ticket purchase integration
- Map view

### **3. MusicScreen** (Planned)
- Album list
- Audio player
- Spotify integration
- YouTube videos

### **4. MerchScreen** (Planned)
- Product grid
- Shopping cart
- Stripe checkout
- Order history

### **5. ProfileScreen** (Planned)
- User login/register
- Membership tier display
- Order history
- Settings

---

## 🎨 **DESIGN SYSTEM:**

### **Colors:**
```javascript
'rock-black': '#0a0a0a'
'rock-dark': '#1a1a1a'
'rock-gray': '#2a2a2a'
'crimson': '#dc143c'
'crimson-light': '#ff3333'
'crimson-dark': '#b91030'
```

### **Typography:**
- Headings: Bold, Uppercase
- Body: System font
- Colors: White (#ffffff), Text Gray (#cccccc)

### **Components:**
- GlassCard: Glassmorphism cards
- Buttons: Primary (crimson), Secondary (outline)
- Cards: Tour, Music, Merch variants

---

## 🔧 **CONFIGURATION:**

### **App.json Updates:**

1. **Change Bundle ID:**
```json
"ios": {
  "bundleIdentifier": "si.thedrinkers.app"
}
```

2. **Add API Keys:**
```json
"extra": {
  "stripePublicKey": "pk_test_your_key_here",
  "apiUrl": "https://thedrinkers.si/api"
}
```

3. **Update Permissions:**
```json
"ios": {
  "infoPlist": {
    "NSCameraUsageDescription": "Your message",
    "NSPhotoLibraryUsageDescription": "Your message"
  }
}
```

---

## 📊 **FEATURES:**

### **Implemented:**
✅ Expo setup  
✅ TypeScript configuration  
✅ Tailwind styling  
✅ Navigation (Bottom Tabs)  
✅ Home Screen  
✅ Dark theme  

### **Planned:**
📅 Tour dates with API  
🎵 Music player  
👕 Merch store  
👤 User authentication  
🔔 Push notifications  
📱 Offline mode  

---

## 🚀 **BUILD & DEPLOY:**

### **iOS:**
```bash
# Build for iOS
eas build --platform ios

# Submit to App Store
eas submit --platform ios
```

### **Android:**
```bash
# Build for Android
eas build --platform android

# Submit to Google Play
eas submit --platform android
```

---

## 💰 **COSTS:**

| Item | Cost |
|------|------|
| **Development** | €0 (DIY) |
| **Apple Developer** | €99/year |
| **Google Play** | $25 one-time |
| **Expo Pro** | €299/month (optional) |

---

## 📈 **NEXT STEPS:**

### **Week 1:**
- [ ] Copy files to app directory
- [ ] Install dependencies
- [ ] Setup Tailwind
- [ ] Test Home Screen

### **Week 2:**
- [ ] Create TourScreen
- [ ] Create MusicScreen
- [ ] API integration

### **Week 3:**
- [ ] Create MerchScreen
- [ ] Shopping cart
- [ ] Stripe integration

### **Week 4:**
- [ ] Create ProfileScreen
- [ ] Authentication
- [ ] Testing

### **Week 5-6:**
- [ ] Bug fixes
- [ ] Polish UI
- [ ] App Store submission

---

## 🎸 **TIPS:**

1. **Use Expo Go** for testing on real device
2. **Hot reload** for instant updates
3. **TypeScript** for type safety
4. **Tailwind** for consistent styling
5. **Test on both iOS and Android**

---

**Ready to rock! 🤘**

Questions? Check `MOBILE_APP_SETUP.md` in main directory.
