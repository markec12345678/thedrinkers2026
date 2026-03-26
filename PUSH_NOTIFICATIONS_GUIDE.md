# 🔔 PUSH NOTIFICATIONS SETUP GUIDE

**Complete guide for implementing push notifications**

---

## 🎯 RECOMMENDED: OneSignal

**Why OneSignal:**

```
✅ Free tier (10,000 users)
✅ Easy integration
✅ Web push notifications
✅ Mobile push (iOS/Android)
✅ Email integration
✅ Analytics
✅ Automation
```

---

## 📋 INSTALLATION

### **1. Create OneSignal Account**

```
1. Go to https://onesignal.com
2. Sign up for free account
3. Create new app
4. Select platform: Web Push
5. Get App ID and API Key
```

### **2. Install Package**

```bash
npm install react-onesignal
```

### **3. Add Environment Variables**

```env
NEXT_PUBLIC_ONESIGNAL_APP_ID=your-app-id-here
ONESIGNAL_API_KEY=your-api-key-here
```

---

## 🔧 IMPLEMENTATION

### **1. Initialize OneSignal**

```typescript
// app/OneSignalProvider.tsx
'use client';

import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

export default function OneSignalProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID) {
      OneSignal.init({
        appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        notifyButton: {
          enable: true,
        },
        prompts: {
          slidedown: {
            enabled: true,
            types: [
              {
                type: 'category',
                categories: [
                  {
                    tag: 'tour_dates',
                    label: 'Tour Dates',
                  },
                  {
                    tag: 'new_merch',
                    label: 'New Merchandise',
                  },
                  {
                    tag: 'new_music',
                    label: 'New Music',
                  },
                  {
                    tag: 'vip_exclusive',
                    label: 'VIP Exclusive',
                  },
                ],
              },
            ],
          },
        },
      });
    }
  }, []);

  return <>{children}</>;
}

// app/layout.tsx
import OneSignalProvider from './OneSignalProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <OneSignalProvider>{children}</OneSignalProvider>
      </body>
    </html>
  );
}
```

---

## 📤 SENDING NOTIFICATIONS

### **1. Tour Date Notification**

```typescript
// app/api/notifications/tour/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tourDate, venue, city } = await request.json();

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        included_segments: ["All"],
        filters: [
          { field: "tag", key: "interested_tour", relation: "=", value: city },
        ],
        headings: { en: `🎤 The Drinkers Live in ${city}!` },
        contents: { en: `Tickets on sale now at ${venue}. Don't miss out!` },
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/tour`,
        android_channel_id: "tour_notifications",
        ios_category: "tour_notifications",
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      notificationId: data.id,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 },
    );
  }
}
```

### **2. Merch Drop Notification**

```typescript
// app/api/notifications/merch/route.ts
export async function POST(request: NextRequest) {
  try {
    const { productName, price, imageUrl } = await request.json();

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        included_segments: ["All"],
        filters: [{ field: "tag", key: "interested_merch", relation: "=" }],
        headings: { en: `👕 New Merch Drop!` },
        contents: { en: `${productName} - Only €${price}. Get yours now!` },
        large_image: imageUrl,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/merch`,
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      notificationId: data.id,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 },
    );
  }
}
```

### **3. VIP Exclusive Notification**

```typescript
// app/api/notifications/vip/route.ts
export async function POST(request: NextRequest) {
  try {
    const { title, message, url } = await request.json();

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID,
        included_segments: ["VIP Members"],
        headings: { en: `👑 ${title}` },
        contents: { en: message },
        url: `${process.env.NEXT_PUBLIC_SITE_URL}${url}`,
        android_channel_id: "vip_notifications",
        ios_category: "vip_notifications",
      }),
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      notificationId: data.id,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 },
    );
  }
}
```

---

## 🎯 TRIGGER NOTIFICATIONS

### **On Tour Date Creation:**

```typescript
// After creating tour date in database
await fetch("/api/notifications/tour", {
  method: "POST",
  body: JSON.stringify({
    tourDate: newTourDate.date,
    venue: newTourDate.venue,
    city: newTourDate.city,
  }),
});
```

### **On New Merch:**

```typescript
// After adding new product
await fetch("/api/notifications/merch", {
  method: "POST",
  body: JSON.stringify({
    productName: product.name,
    price: product.price,
    imageUrl: product.images[0],
  }),
});
```

### **On VIP Content:**

```typescript
// After adding VIP exclusive content
await fetch("/api/notifications/vip", {
  method: "POST",
  body: JSON.stringify({
    title: "New Exclusive Content",
    message: "Check out the latest VIP exclusive content!",
    url: "/vip-lounge",
  }),
});
```

---

## 📊 NOTIFICATION TYPES

### **1. Tour Notifications** 🔔

```
Trigger: New tour date announced
Audience: Fans in that city
Content: Venue, date, ticket link
CTA: "Get Tickets"
```

### **2. Merch Notifications** 👕

```
Trigger: New product drop
Audience: All users interested in merch
Content: Product image, price
CTA: "Shop Now"
```

### **3. Music Notifications** 🎵

```
Trigger: New song/album release
Audience: All users
Content: Album art, release info
CTA: "Listen Now"
```

### **4. VIP Notifications** 👑

```
Trigger: Exclusive content
Audience: VIP members only
Content: Exclusive preview
CTA: "View Exclusive"
```

---

## ✅ BEST PRACTICES

### **Timing:**

```
✅ Tour announcements: 10 AM - 2 PM local time
✅ Merch drops: Friday 12 PM
✅ Music releases: Midnight on release day
✅ VIP content: Weekday mornings
```

### **Frequency:**

```
✅ Max 2-3 notifications per week
✅ Don't spam users
✅ Respect quiet hours (10 PM - 8 AM)
```

### **Personalization:**

```
✅ Use user's name
✅ Target by location
✅ Target by interests
✅ Segment by VIP status
```

---

## 📈 ANALYTICS

### **Track Notification Performance:**

```typescript
// OneSignal dashboard shows:
- Open rate
- Click-through rate
- Conversion rate
- Unsubscribes
- Delivery rate
```

### **A/B Testing:**

```
Test different:
- Headlines
- Content length
- Images
- Send times
- CTAs
```

---

## 🚀 QUICK START

### **1. Setup (30 min):**

```bash
# Create OneSignal account
# Get App ID and API Key
# Install package
npm install react-onesignal
```

### **2. Integration (30 min):**

```typescript
# Add OneSignalProvider to layout
# Configure notification categories
# Add subscription widget
```

### **3. Test (15 min):**

```bash
# Subscribe to notifications
# Send test notification
# Verify delivery
```

### **4. Launch:**

```
# Enable for all users
# Monitor analytics
# Optimize based on data
```

---

## ✅ CONCLUSION

**Push notifications setup:**

```
Time: 1-2 uri
Impact: HIGH (user engagement)
Difficulty: EASY
```

**Ready to implement!** 🔔✅
