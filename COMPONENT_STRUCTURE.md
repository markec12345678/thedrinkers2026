# 📁 THE DRINKERS - COMPONENT STRUCTURE

**Organized folder structure for all components**

---

## 🗂️ FOLDER STRUCTURE

```
F:\thedrinkers\the\
├── components/
│   ├── merch/                    # Merchandise components
│   │   ├── MerchProductCard.tsx
│   │   ├── MerchProductCardSkeleton.tsx
│   │   ├── QuickViewModal.tsx
│   │   ├── ShoppingCartSidebar.tsx
│   │   ├── README.md             # Documentation
│   │   └── CART_README.md        # Cart documentation
│   │
│   ├── tour/                     # Tour date components
│   │   ├── TourDateCard.tsx
│   │   └── README.md             # Documentation
│   │
│   ├── music-player/             # Music player components
│   │   ├── MusicPlayer.tsx
│   │   └── README.md             # Documentation
│   │
│   ├── vip/                      # VIP membership components
│   │   ├── VIPTiersDisplay.tsx
│   │   └── README.md             # Documentation
│   │
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── progress.tsx
│   │   └── slider.tsx
│   │
│   └── features/                 # Legacy (empty now)
│       └── index.ts              # Re-exports from all folders
│
├── app/
│   └── merch/                    # Merch page
│       ├── page.tsx              # Main merch page
│       └── [slug]/               # Product detail page
│           └── page.tsx
│
└── lib/
    └── db/
        └── queries/              # Database queries
            ├── products.ts
            ├── tour-dates.ts
            └── memberships.ts
```

---

## 📦 COMPONENTS BY CATEGORY

### **Merchandise (components/merch/)**

```
✅ MerchProductCard.tsx - Product card with all features
✅ MerchProductCardSkeleton.tsx - Loading state
✅ QuickViewModal.tsx - Quick view modal
✅ ShoppingCartSidebar.tsx - Shopping cart sidebar
```

**Usage:**

```tsx
import { MerchProductCard, ShoppingCartSidebar } from "@/components/merch";
```

---

### **Tour Dates (components/tour/)**

```
✅ TourDateCard.tsx - Tour date card with venue info
```

**Usage:**

```tsx
import { TourDateCard } from "@/components/tour";
```

---

### **Music Player (components/music-player/)**

```
✅ MusicPlayer.tsx - Full-featured music player
```

**Usage:**

```tsx
import { MusicPlayer } from "@/components/music-player";
```

---

### **VIP Membership (components/vip/)**

```
✅ VIPTiersDisplay.tsx - VIP membership tiers display
```

**Usage:**

```tsx
import { VIPTiersDisplay } from "@/components/vip";
```

---

### **UI Components (components/ui/)**

```
✅ button.tsx - Button component
✅ input.tsx - Input component
✅ progress.tsx - Progress bar
✅ slider.tsx - Slider component
```

**Usage:**

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

---

## 🗄️ DATABASE QUERIES

### **Products (lib/db/queries/products.ts)**

```typescript
import {
  getProducts,
  getProductById,
  getFeaturedProducts,
} from "@/lib/db/queries/products";

// Get all products
const products = await getProducts({ limit: 10 });

// Get featured products
const featured = await getFeaturedProducts(4);

// Get by category
const tshirts = await getProductsByCategory("t-shirt");

// Search
const results = await searchProducts("hoodie");
```

### **Tour Dates (lib/db/queries/tour-dates.ts)**

```typescript
import {
  getTourDates,
  getUpcomingTourDates,
} from "@/lib/db/queries/tour-dates";

// Get upcoming shows
const upcoming = await getUpcomingTourDates(10);

// Get featured shows
const featured = await getFeaturedTourDates(5);

// By country
const slovenia = await getTourDatesByCountry("Slovenia");
```

### **Memberships (lib/db/queries/memberships.ts)**

```typescript
import {
  getAllVipTiers,
  getUserMembership,
} from "@/lib/db/queries/memberships";

// Get all tiers
const tiers = await getAllVipTiers();

// Get user membership
const membership = await getUserMembership(userId);
```

---

## 📄 PAGES

### **Merch Page (app/merch/page.tsx)**

```tsx
import MerchPage from './app/merch/page';

// Features:
- Product grid
- Category filter
- Shopping cart
- Quick view modal
- Loading states
```

---

## 🎯 IMPORT PATHS

### **Correct Imports:**

```tsx
// ✅ Merch components
import { MerchProductCard } from "@/components/merch";
import { ShoppingCartSidebar } from "@/components/merch";

// ✅ Tour components
import { TourDateCard } from "@/components/tour";

// ✅ Music player
import { MusicPlayer } from "@/components/music-player";

// ✅ VIP components
import { VIPTiersDisplay } from "@/components/vip";

// ✅ UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ✅ Database queries
import { getProducts } from "@/lib/db/queries/products";
import { getTourDates } from "@/lib/db/queries/tour-dates";
```

### **Old Imports (Don't Use):**

```tsx
// ❌ Old path (components/features/)
import { MerchProductCard } from "@/components/features";

// ✅ New path
import { MerchProductCard } from "@/components/merch";
```

---

## 📊 COMPONENT COUNT

| Category         | Components | Documentation |
| ---------------- | ---------- | ------------- |
| **Merch**        | 4          | 2 files       |
| **Tour**         | 1          | 1 file        |
| **Music Player** | 1          | 1 file        |
| **VIP**          | 1          | 1 file        |
| **UI**           | 4          | -             |
| **Queries**      | 3 files    | -             |
| **Pages**        | 1          | -             |
| **TOTAL**        | **15**     | **5 docs**    |

---

## 🔄 MIGRATION GUIDE

### **If you have old imports:**

**Before:**

```tsx
import { MerchProductCard } from "@/components/features";
```

**After:**

```tsx
import { MerchProductCard } from "@/components/merch";
```

### **Update all imports:**

```bash
# Find and replace in your editor:
@/components/features → @/components/merch
@/components/features → @/components/tour
@/components/features → @/components/music-player
@/components/features → @/components/vip
```

---

## 📝 BEST PRACTICES

1. **Use category folders** - Keep related components together
2. **Co-locate documentation** - README.md next to components
3. **Use index.ts for exports** - Cleaner imports
4. **Database queries in lib/db/queries/** - Organized by entity
5. **Pages in app/** - Follow Next.js App Router structure
6. **UI components separate** - Reusable across categories

---

## 🎯 NEXT STEPS

### **To Add New Components:**

1. Create folder: `components/[category]/`
2. Add component: `Component.tsx`
3. Add documentation: `README.md`
4. Export from `components/features/index.ts`
5. Create database query if needed: `lib/db/queries/[entity].ts`

### **To Add New Page:**

1. Create folder: `app/[route]/`
2. Add page: `page.tsx`
3. Add layout: `layout.tsx` (optional)
4. Create API route: `app/api/[entity]/route.ts`

---

**Created:** 2026-03-25  
**Status:** ✅ Organized  
**Last Updated:** After Magic MCP component generation
