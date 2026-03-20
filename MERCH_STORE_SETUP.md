# 🛒 MVP Merch Store Setup Guide

## 🎯 Minimal Viable Store - $0 Upfront

**Setup time:** 30-60 minut  
**Cost:** $0 upfront (plačaš šele ko se proda)

---

## 📋 **KORAKI ZA SETUP:**

### **1. Printful Account (5 min)**

1. **Registriraj se:** https://www.printful.com/signup
2. **Izberi:** "Connect to online store"
3. **Izberi:** "Custom/Other" (ker imamo Next.js)
4. **Shrani API key**

**Printful Products za The Drinkers:**
```
1. T-Shirt - Gildan 64000 (Softstyle)
   - Cost: €8.50
   - Retail: €25.00
   - Profit: €16.50 (66%)

2. Hoodie - Gildan 18500
   - Cost: €18.00
   - Retail: €55.00
   - Profit: €37.00 (67%)

3. Tote Bag - Canvas TN100
   - Cost: €6.50
   - Retail: €18.00
   - Profit: €11.50 (64%)
```

---

### **2. Stripe Account (10 min)**

1. **Registriraj se:** https://dashboard.stripe.com/register
2. **Verify email**
3. **Get API keys:**
   - Publishable key: `pk_test_...`
   - Secret key: `sk_test_...`

4. **Dodaj v `.env.local`:**
```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Printful
PRINTFUL_API_KEY=your_printful_api_key
PRINTFUL_STORE_ID=your_store_id
```

---

### **3. Namesti Stripe Package (2 min)**

```bash
npm install @stripe/stripe-js stripe
```

---

### **4. Posodobi Checkout API (10 min)**

Posodobi `app/api/checkout/route.ts` z pravo Stripe integracijo:

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  const { items, email, name, address } = await request.json();

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: `${item.name} - ${item.size || 'One Size'}`,
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/merch?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/merch?canceled=true`,
    customer_email: email,
    shipping_address_collection: {
      allowed_countries: ['SI', 'HR', 'AT', 'IT', 'DE'],
    },
    metadata: {
      printful_order: 'true',
      customer_name: name,
    },
  });

  return NextResponse.json({ 
    success: true, 
    stripeUrl: session.url 
  });
}
```

---

### **5. Dodaj Stripe Webhook (10 min)**

Ustvari `app/api/webhooks/stripe/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    );
  }

  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Send order to Printful
    await sendToPrintful(session);
  }

  return NextResponse.json({ received: true });
}

async function sendToPrintful(session: Stripe.Checkout.Session) {
  // Get customer info
  const { shipping, metadata, line_items } = session;
  
  // Create Printful order
  const printfulOrder = {
    recipient: {
      name: metadata.customer_name,
      email: session.customer_email,
      address1: shipping.address.line1,
      city: shipping.address.city,
      zip: shipping.address.postal_code,
      country_code: shipping.address.country,
    },
    items: line_items?.map(item => ({
      variant_id: getPrintfulVariantId(item.price_data.product_data.name),
      quantity: item.quantity,
    })),
  };

  // Send to Printful API
  await fetch('https://api.printful.com/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(printfulOrder),
  });
}

function getPrintfulVariantId(productName: string): number {
  // Map product names to Printful variant IDs
  const variantMap: Record<string, number> = {
    'T-Shirt - S': 4011,
    'T-Shirt - M': 4012,
    'T-Shirt - L': 4013,
    'T-Shirt - XL': 4014,
    'Hoodie - S': 5011,
    'Hoodie - M': 5012,
    // ... add more
  };
  return variantMap[productName] || 4011; // Default to T-Shirt S
}
```

---

### **6. Testiraj (5 min)**

```bash
# 1. Startaj dev server
npm run dev

# 2. Odpri http://localhost:3000/merch

# 3. Dodaj izdelek v košarico

# 4. Klikni "DODAJ V KOŠARICO"

# 5. Izpolni checkout formo

# 6. Uporabi Stripe test card: 4242 4242 4242 4242

# 7. Preveri console za Printful API call
```

---

## 💰 **CENIK IN MARŽE:**

### **T-Shirts (Gildan 64000)**

| Size | Printful Cost | Retail Price | Profit | Margin |
|------|---------------|--------------|--------|--------|
| S | €8.50 | €25.00 | €16.50 | 66% |
| M | €8.50 | €25.00 | €16.50 | 66% |
| L | €8.50 | €25.00 | €16.50 | 66% |
| XL | €9.50 | €27.00 | €17.50 | 65% |
| XXL | €10.50 | €29.00 | €18.50 | 64% |

### **Hoodies (Gildan 18500)**

| Size | Printful Cost | Retail Price | Profit | Margin |
|------|---------------|--------------|--------|--------|
| S | €18.00 | €55.00 | €37.00 | 67% |
| M | €18.00 | €55.00 | €37.00 | 67% |
| L | €18.00 | €55.00 | €37.00 | 67% |
| XL | €19.00 | €57.00 | €38.00 | 67% |

### **Shipping:**

| Destination | Cost | Free Over |
|-------------|------|-----------|
| Slovenia | €5.00 | €50.00 |
| EU | €7.00 | €75.00 |
| Rest of World | €12.00 | €100.00 |

---

## 📊 **REVENUE PROJECTION:**

### **Month 1 (MVP Launch):**
```
10 t-shirts @ €25 = €250 revenue
Printful cost: €85
Stripe fees: €10.25
Shipping: €50
Profit: €104.75 (42% margin)
```

### **Month 2-3 (Growth):**
```
30 t-shirts @ €25 = €750 revenue
5 hoodies @ €55 = €275 revenue
Printful cost: €345
Stripe fees: €30.75
Shipping: €150
Profit: €499.25 (49% margin)
```

### **Month 4-6 (Established):**
```
50 t-shirts @ €25 = €1,250 revenue
15 hoodies @ €55 = €825 revenue
Printful cost: €695
Stripe fees: €60.75
Shipping: €250
Profit: €1,069.25 (51% margin)
```

---

## 🎯 **MARKETING STRATEGIJA:**

### **Launch (Week 1):**
1. Email lista announcement
2. Social media posts (Instagram, TikTok)
3. Limited edition "Launch Edition" design
4. Free shipping for first 50 orders

### **Growth (Month 2-3):**
1. User-generated content (fans v majcah)
2. Bundle deals (T-shirt + hoodie = 10% off)
3. Concert merch table (QR code na strani)
4. Influencer seeding (daj brezplačno fanom z velikim followanjem)

### **Scale (Month 4+):**
1. Limited drops (nov design vsak mesec)
2. Subscription box ("Drinkers Monthly")
3. VIP packages (meet & greet + merch)
4. Wholesale (prodaja v lokalnih trgovinah)

---

## ⚠️ **POMembNO:**

### **Legal:**
- ✅ Register as s.p. or d.o.o. (when you start making sales)
- ✅ Add terms & conditions page
- ✅ Add privacy policy (GDPR compliant)
- ✅ Add return policy (14 days EU requirement)

### **Tax:**
- ✅ DDV (VAT) registration if over €50k/year
- ✅ Keep track of all transactions
- ✅ Printful handles EU VAT MOSS for digital products

### **Customer Service:**
- ✅ Respond within 24 hours
- ✅ Handle returns/exchanges promptly
- ✅ Track all orders (Printful provides tracking)

---

## 🚀 **LAUNCH CHECKLIST:**

- [ ] Printful account created
- [ ] Stripe account created
- [ ] API keys in `.env.local`
- [ ] Checkout API updated with Stripe
- [ ] Webhook endpoint configured
- [ ] Test order placed successfully
- [ ] Email notifications setup
- [ ] Terms & conditions page added
- [ ] Privacy policy added
- [ ] Return policy added
- [ ] Social media announcement ready
- [ ] Email list announcement ready

---

## 🎸 **NEXT STEPS:**

1. **Danes:** Setup Printful + Stripe
2. **Jutri:** Testiraj checkout flow
3. **Week 1:** Launchaj z email listo
4. **Month 1:** Analyze sales, optimize
5. **Month 2:** Add more products (hoodies, accessories)

---

**Vso srečo z launchom! 🤘**

Questions? Odpri issue na GitHubu!
