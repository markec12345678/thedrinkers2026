# 📡 API ROUTES - COMPLETE GUIDE

**Next.js API routes with Drizzle ORM**

---

## 📁 API STRUCTURE

```
app/api/
├── products/
│   ├── route.ts           # GET all, POST new
│   └── [id]/
│       └── route.ts       # GET single
├── tour-dates/
│   ├── route.ts           # GET all, POST new
│   └── [id]/
│       └── route.ts       # GET single
├── albums/
│   └── route.ts           # GET all, POST new
└── vip-memberships/
    └── route.ts           # GET all, POST new
```

---

## 🛍️ PRODUCTS API

### **GET /api/products**

**Get all products with filters**

**Query Params:**

```
?category=t-shirt
?featured=true
?limit=10
?offset=0
```

**Example:**

```typescript
const response = await fetch('/api/products?featured=true&limit=8');
const { data, count } = await response.json();

// Returns:
{
  success: true,
  data: [/* Product[] */],
  count: 8
}
```

**Response Schema:**

```typescript
{
  success: boolean,
  data: Product[],
  count: number
}
```

---

### **GET /api/products/[id]**

**Get single product by ID**

**Example:**

```typescript
const response = await fetch('/api/products/prod_123');
const { data } = await response.json();

// Returns:
{
  success: true,
  data: { /* Product */ }
}
```

---

### **POST /api/products**

**Create new product**

**Body:**

```typescript
{
  name: string,
  description?: string,
  price: string,
  compare_at_price?: string,
  stock: number,
  sku?: string,
  category?: string,
  images?: string[],
  sizes?: string[],
  colors?: string[],
  featured?: boolean,
  active?: boolean
}
```

**Example:**

```typescript
const response = await fetch("/api/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "New T-Shirt",
    price: "29.99",
    stock: 100,
    category: "t-shirt",
  }),
});
```

**Status:** ⏳ Not implemented yet (returns 501)

---

## 🎫 TOUR DATES API

### **GET /api/tour-dates**

**Get all tour dates with filters**

**Query Params:**

```
?status=on_sale
?country=Slovenia
?featured=true
?limit=10
```

**Example:**

```typescript
const response = await fetch("/api/tour-dates?status=on_sale&country=Slovenia");
const { data, count } = await response.json();
```

**Response Schema:**

```typescript
{
  success: boolean,
  data: TourDate[],
  count: number
}
```

---

### **GET /api/tour-dates/[id]**

**Get single tour date**

**Example:**

```typescript
const response = await fetch("/api/tour-dates/tour_123");
const { data } = await response.json();
```

---

### **POST /api/tour-dates**

**Create new tour date**

**Body:**

```typescript
{
  venue: string,
  city: string,
  country: string,
  date: string, // ISO date
  time?: string,
  doors?: string,
  ticket_url?: string,
  ticket_price?: string,
  status?: string,
  capacity?: number,
  featured?: boolean
}
```

**Status:** ⏳ Not implemented yet

---

## 💿 ALBUMS API

### **GET /api/albums**

**Get all albums**

**Query Params:**

```
?featured=true
?limit=10
```

**Example:**

```typescript
const response = await fetch("/api/albums?featured=true");
const { data, count } = await response.json();
```

**Response Schema:**

```typescript
{
  success: boolean,
  data: Album[],
  count: number
}
```

---

### **POST /api/albums**

**Create new album**

**Body:**

```typescript
{
  title: string,
  artist?: string,
  release_date: string,
  cover_image?: string,
  description?: string,
  label?: string,
  genre?: string[],
  total_tracks?: number,
  featured?: boolean
}
```

**Status:** ⏳ Not implemented yet

---

## 👑 VIP MEMBERSHIPS API

### **GET /api/vip-memberships**

**Get all VIP tiers**

**Example:**

```typescript
const response = await fetch('/api/vip-memberships');
const { data, count } = await response.json();

// Returns:
{
  success: true,
  data: [
    { name: 'bronze', display_name: 'Bronze Member', price: '9.99', ... },
    { name: 'silver', display_name: 'Silver Member', price: '19.99', ... },
    { name: 'gold', display_name: 'Gold Member', price: '29.99', ... }
  ],
  count: 3
}
```

---

### **POST /api/vip-memberships**

**Create VIP membership**

**Body:**

```typescript
{
  user_id: string,
  tier: string, // 'bronze' | 'silver' | 'gold'
  billing_cycle: 'monthly' | 'yearly'
}
```

**Status:** ⏳ Not implemented yet

---

## 🔧 ERROR HANDLING

### **Success Response**

```typescript
{
  success: true,
  data: T,
  count?: number
}
```

### **Error Response**

```typescript
{
  success: false,
  error: string
}
```

### **HTTP Status Codes**

```
200 OK - Success
400 Bad Request - Invalid input
404 Not Found - Resource not found
500 Internal Server Error - Server error
501 Not Implemented - POST endpoints
```

---

## 📊 USAGE IN COMPONENTS

### **Fetch Products**

```typescript
// In Server Component
import { getProducts } from '@/lib/db/queries/products';

export default async function MerchPage() {
  const products = await getProducts();

  return (
    <div>
      {products.map(product => (
        <MerchProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### **Fetch from API (Client Component)**

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function MerchPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data.data));
  }, []);

  return (
    <div>
      {products.map(product => (
        <MerchProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

---

## 🎯 IMPLEMENTATION STATUS

| Endpoint             | GET | POST | PUT | DELETE |
| -------------------- | --- | ---- | --- | ------ |
| **/products**        | ✅  | ⏳   | ⏳  | ⏳     |
| **/products/[id]**   | ✅  | ⏳   | ⏳  | ⏳     |
| **/tour-dates**      | ✅  | ⏳   | ⏳  | ⏳     |
| **/tour-dates/[id]** | ✅  | ⏳   | ⏳  | ⏳     |
| **/albums**          | ✅  | ⏳   | ⏳  | ⏳     |
| **/vip-memberships** | ✅  | ⏳   | ⏳  | ⏳     |

**Legend:**

```
✅ = Implemented
⏳ = TODO
```

---

## 🧪 TESTING

### **Test Products API**

```bash
# Get all products
curl http://localhost:3000/api/products

# Get featured products
curl http://localhost:3000/api/products?featured=true

# Get single product
curl http://localhost:3000/api/products/prod_123
```

### **Test Tour Dates API**

```bash
# Get all tour dates
curl http://localhost:3000/api/tour-dates

# Get upcoming shows
curl http://localhost:3000/api/tour-dates?status=on_sale
```

### **Test VIP API**

```bash
# Get all tiers
curl http://localhost:3000/api/vip-memberships
```

---

## 🔐 SECURITY (TODO)

### **Add Authentication**

```typescript
import { auth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Continue with authenticated request
}
```

### **Add Rate Limiting**

```typescript
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});

export async function GET(request: NextRequest) {
  const { success } = await ratelimit.limit("api");

  if (!success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  // Continue...
}
```

---

## 📝 NEXT STEPS

### **Implement POST Endpoints**

```
1. Add validation with Zod
2. Add database insert queries
3. Add error handling
4. Add success responses
```

### **Add PUT/PATCH Endpoints**

```
1. Update product by ID
2. Update tour date by ID
3. Update album by ID
```

### **Add DELETE Endpoints**

```
1. Delete product by ID
2. Delete tour date by ID
3. Delete album by ID
```

### **Add Advanced Features**

```
1. Search functionality
2. Pagination
3. Sorting
4. Filtering
5. Full-text search
```

---

**Created:** 2026-03-25  
**Status:** ✅ GET endpoints ready, ⏳ POST/PUT/DELETE TODO  
**Total Endpoints:** 10 (6 implemented, 4 TODO)
