# 🛒 SHOPPING CART SIDEBAR COMPONENT

**Complete, production-ready shopping cart sidebar with slide-in animation**

---

## 📦 COMPONENTS

### **Main Component**

- **`ShoppingCartSidebar.tsx`** - Full-featured cart sidebar

### **Features**

```
✅ Slide-in from right animation (Framer Motion)
✅ Cart items list with product images
✅ Quantity adjuster per item (+/- buttons)
✅ Remove item button with confirmation
✅ Subtotal calculation
✅ Tax calculation (22% VAT)
✅ Shipping calculation
✅ Discount code input with validation
✅ Checkout button (Stripe integration ready)
✅ Free shipping progress bar
✅ Empty cart state
✅ Continue shopping CTA
✅ Close on escape key
✅ Prevent body scroll when open
✅ Backdrop with blur effect
```

---

## 🚀 USAGE

### **Basic Example**

```tsx
import { ShoppingCartSidebar } from "@/components/features";

// In your page or layout
const [isCartOpen, setIsCartOpen] = useState(false);
const [cartItems, setCartItems] = useState<CartItem[]>([]);

return (
  <>
    {/* Cart Toggle Button */}
    <button onClick={() => setIsCartOpen(true)}>
      <ShoppingBag />
      <span>{cartItems.length}</span>
    </button>

    {/* Cart Sidebar */}
    <ShoppingCartSidebar
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      items={cartItems}
      onQuantityChange={handleQuantityChange}
      onRemoveItem={handleRemoveItem}
      onCheckout={handleCheckout}
      onDiscountCodeApply={handleApplyDiscount}
    />
  </>
);
```

---

## 📊 DATA STRUCTURE

### **CartItem Interface**

```typescript
interface CartItem {
  id: string; // Unique cart item ID
  productId: string; // Product reference
  name: string; // Product name
  price: string; // Price (€29.99)
  image: string; // Product image URL
  size: string; // Selected size
  quantity: number; // Quantity in cart
  maxStock: number; // Maximum available stock
}
```

### **Example Cart Data**

```typescript
const cartItems: CartItem[] = [
  {
    id: "cart_001",
    productId: "prod_001",
    name: "The Drinkers Classic T-Shirt",
    price: "29.99",
    image: "/images/merch/tshirt.jpg",
    size: "L",
    quantity: 2,
    maxStock: 150,
  },
  {
    id: "cart_002",
    productId: "prod_002",
    name: "The Drinkers Hoodie",
    price: "59.99",
    image: "/images/merch/hoodie.jpg",
    size: "XL",
    quantity: 1,
    maxStock: 75,
  },
];
```

---

## 🔧 PROPS

```typescript
interface ShoppingCartSidebarProps {
  // Required
  isOpen: boolean; // Is sidebar open
  onClose: () => void; // Close callback
  items: CartItem[]; // Cart items

  // Optional callbacks
  onQuantityChange?: (itemId: string, quantity: number) => void;
  onRemoveItem?: (itemId: string) => void;
  onCheckout?: (items: CartItem[], discountCode?: string) => void;
  onDiscountCodeApply?: (code: string) => Promise<{
    success: boolean;
    discount?: number; // Percentage (e.g., 10 for 10%)
  }>;
}
```

---

## 💰 PRICING CALCULATIONS

### **Built-in Calculations**

```typescript
// Constants
const FREE_SHIPPING_THRESHOLD = 50;  // €50 for free shipping
const TAX_RATE = 0.22;                // 22% VAT
const SHIPPING_COST = 5.99;           // Standard shipping

// Calculated automatically
subtotal = sum of (price × quantity)
discount = applied discount percentage
tax = (subtotal - discount) × 0.22
shipping = (subtotal >= 50) ? 0 : 5.99
total = subtotal - discount + tax + shipping
```

### **Example Calculation**

```
Items:
- T-Shirt × 2 = €59.98
- Hoodie × 1 = €59.99
-----------------------
Subtotal: €119.97
Discount (10%): -€11.99
After Discount: €107.98
Tax (22%): €23.76
Shipping: FREE (over €50)
-----------------------
TOTAL: €131.74
```

---

## 🎨 CUSTOMIZATION

### **Free Shipping Threshold**

Edit in `ShoppingCartSidebar.tsx`:

```typescript
const FREE_SHIPPING_THRESHOLD = 50; // Change to your threshold
```

### **Tax Rate**

```typescript
const TAX_RATE = 0.22; // Change to your local tax rate
```

### **Shipping Cost**

```typescript
const SHIPPING_COST = 5.99; // Change to your shipping cost
```

---

## 🎭 ANIMATIONS

### **Framer Motion Features**

```tsx
// Sidebar slide-in
initial={{ x: '100%' }}
animate={{ x: 0 }}
exit={{ x: '100%' }}
transition={{ type: 'spring', damping: 25, stiffness: 200 }}

// Backdrop fade
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}

// Item cards
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Button interactions
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

---

## 🔌 INTEGRATION

### **With Stripe Checkout**

```typescript
// app/api/checkout/route.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { items, discountCode } = await req.json();

  const session = await stripe.checkout.sessions.create({
    line_items: items.map((item) => ({
      price_data: {
        product_data: {
          name: `${item.name} (Size: ${item.size})`,
          images: [item.image],
        },
        unit_amount: Math.round(parseFloat(item.price) * 100),
        currency: "eur",
      },
      quantity: item.quantity,
    })),
    discounts: discountCode ? [{ coupon_code: discountCode }] : [],
    mode: "payment",
    success_url: `${req.headers.get("origin")}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.get("origin")}/cart`,
  });

  return Response.json({ url: session.url });
}
```

### **With Better Auth**

```typescript
// lib/cart-actions.ts
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { cartItem } from "@/lib/db/schema";

export async function addToCart(
  productId: string,
  size: string,
  quantity: number,
) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (!session?.user) {
    // Store in localStorage for guest users
    return addToGuestCart(productId, size, quantity);
  }

  // Store in database for authenticated users
  await db.insert(cartItem).values({
    userId: session.user.id,
    productId,
    size,
    quantity,
  });
}
```

### **With Drizzle ORM**

```typescript
// lib/db/schema/index.ts
export const cartItem = pgTable("cart_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => user.id),
  productId: uuid("product_id").references(() => product.id),
  size: varchar("size", { length: 20 }),
  quantity: integer("quantity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

---

## 📱 RESPONSIVE DESIGN

```tsx
// Mobile (default)
- Full-width sidebar
- Stacked layout
- Touch-friendly buttons

// md: (768px+)
- Fixed width (max-w-md)
- Optimized for tablets

// lg: (1024px+)
- Desktop optimized
- Hover effects enabled
```

---

## ♿ ACCESSIBILITY

- ✅ Keyboard navigation (Escape to close)
- ✅ Focus management
- ✅ ARIA labels
- ✅ Screen reader friendly
- ✅ Prevent body scroll when open
- ✅ Backdrop click to close

---

## 🧪 TESTING

### **Unit Test Example**

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { ShoppingCartSidebar } from "@/components/features";

describe("ShoppingCartSidebar", () => {
  const mockItems = [
    {
      id: "1",
      productId: "prod_1",
      name: "Test Product",
      price: "29.99",
      image: "/test.jpg",
      size: "M",
      quantity: 2,
      maxStock: 10,
    },
  ];

  it("renders cart items", () => {
    render(<ShoppingCartSidebar isOpen onClose={() => {}} items={mockItems} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("€59.98")).toBeInTheDocument(); // 2 × €29.99
  });

  it("calls onQuantityChange when + clicked", () => {
    const mockQuantityChange = jest.fn();
    render(
      <ShoppingCartSidebar
        isOpen
        onClose={() => {}}
        items={mockItems}
        onQuantityChange={mockQuantityChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("Increase quantity"));
    expect(mockQuantityChange).toHaveBeenCalledWith("1", 3);
  });

  it("calls onRemoveItem when remove clicked", () => {
    const mockRemove = jest.fn();
    render(
      <ShoppingCartSidebar
        isOpen
        onClose={() => {}}
        items={mockItems}
        onRemoveItem={mockRemove}
      />,
    );
    fireEvent.click(screen.getByText("Remove"));
    expect(mockRemove).toHaveBeenCalledWith("1");
  });
});
```

---

## 📦 FILE STRUCTURE

```
components/
├── features/
│   ├── ShoppingCartSidebar.tsx    # Main component
│   └── index.ts                   # Exports
├── ui/
│   ├── button.tsx                 # Button component
│   ├── input.tsx                  # Input component
│   └── progress.tsx               # Progress bar
└── cart/
    └── CartProvider.tsx           # Optional cart context
```

---

## 🎯 BEST PRACTICES

1. **Use optimistic updates** for quantity changes
2. **Validate stock** before adding to cart
3. **Show clear error messages** for invalid discount codes
4. **Persist cart** to localStorage/database
5. **Sync cart** across devices for logged-in users
6. **Show free shipping progress** to encourage larger orders
7. **Auto-close cart** on successful checkout
8. **Clear cart** after successful purchase

---

## 🎉 READY TO USE!

All components are production-ready and fully integrated with:

- ✅ Next.js 15 App Router
- ✅ React 18.3.1
- ✅ TypeScript 5.3.3
- ✅ Tailwind CSS 3.4.0
- ✅ Framer Motion 11.15.0
- ✅ Radix UI primitives
- ✅ Stripe checkout ready
- ✅ Better Auth integration
- ✅ Drizzle ORM compatible

**Created:** 2026-03-25  
**Status:** ✅ Production Ready  
**Version:** 1.0.0
