# 🛒 Complete E-Commerce Setup Guide

## 🎯 Full Stripe + Printful Integration

**Setup time:** 1-2 hours  
**Cost:** $0 upfront (pay per sale)  
**Features:** Full e-commerce with automated fulfillment

---

## 📋 **KORAKI ZA SETUP:**

### **1. Stripe Account (10 min)**

1. **Registriraj se:** https://dashboard.stripe.com/register
2. **Verify email**
3. **Complete business info:**
   - Business type: Sole proprietorship
   - Country: Slovenia
   - Email: your email
4. **Get API keys:**
   - Go to Developers → API keys
   - Copy Publishable key (`pk_test_...`)
   - Copy Secret key (`sk_test_...`)
   - Create Webhook secret (see below)

5. **Setup Webhook:**
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.payment_failed`
   - Copy Webhook signing secret (`whsec_...`)

6. **Dodaj v `.env.local`:**
```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

### **2. Printful Account (15 min)**

1. **Registriraj se:** https://www.printful.com/signup
2. **Connect to online store:**
   - Choose "Custom/Other"
   - Get API key from Settings → API
3. **Choose products:**
   - T-Shirts: Gildan 64000 (Softstyle)
   - Hoodies: Gildan 18500
   - Tote Bags: Canvas TN100
4. **Create mockups:**
   - Upload The Drinkers logo
   - Choose colors (black, crimson)
   - Set retail prices

5. **Dodaj v `.env.local`:**
```bash
# Printful
PRINTFUL_API_KEY=your_printful_api_key
PRINTFUL_STORE_ID=your_store_id
```

---

### **3. Environment Variables (5 min)**

Complete `.env.local`:

```bash
# Database (Neon Postgres)
DATABASE_URL=postgresql://user:pass@ep-xxx.eu-central-2.aws.neon.tech/dbname

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Printful
PRINTFUL_API_KEY=xxx
PRINTFUL_STORE_ID=xxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://thedrinkers.si
```

---

### **4. Install Dependencies (2 min)**

Already installed:
```bash
npm install stripe @stripe/stripe-js
```

---

### **5. Test Checkout Flow (15 min)**

```bash
# 1. Startaj dev server
npm run dev

# 2. Odpri http://localhost:3000/merch

# 3. Add product to cart

# 4. Click "DODAJ V KOŠARICO"

# 5. Fill checkout form

# 6. Use Stripe test card: 4242 4242 4242 4242

# 7. Check webhook logs in Stripe Dashboard

# 8. Check Printful dashboard for order
```

---

## 🎨 **IMPLEMENTED FEATURES:**

### ✅ **Shopping Cart:**
- Add to cart functionality
- Update quantities
- Remove items
- Persistent cart (localStorage)
- Cart count badge

### ✅ **Stripe Checkout:**
- Secure payment processing
- Card payments (Visa, Mastercard, Amex)
- PayPal integration
- EU shipping calculation
- Free shipping over €50

### ✅ **Order Fulfillment:**
- Automatic Printful integration
- Webhook-based order processing
- Shipping address collection
- Order tracking

### ✅ **Order Dashboard:**
- View all orders
- Filter by status
- Revenue tracking
- Customer management

---

## 💰 **PRICING & MARGINS:**

### **T-Shirts (Gildan 64000):**

| Size | Printful Cost | Retail Price | Profit | Margin |
|------|---------------|--------------|--------|--------|
| S | €8.50 | €25.00 | €16.50 | 66% |
| M | €8.50 | €25.00 | €16.50 | 66% |
| L | €8.50 | €25.00 | €16.50 | 66% |
| XL | €9.50 | €27.00 | €17.50 | 65% |
| XXL | €10.50 | €29.00 | €18.50 | 64% |

### **Hoodies (Gildan 18500):**

| Size | Printful Cost | Retail Price | Profit | Margin |
|------|---------------|--------------|--------|--------|
| S | €18.00 | €55.00 | €37.00 | 67% |
| M | €18.00 | €55.00 | €37.00 | 67% |
| L | €18.00 | €55.00 | €37.00 | 67% |
| XL | €19.00 | €57.00 | €38.00 | 67% |

### **Fees:**

| Service | Fee | Example (€25 shirt) |
|---------|-----|---------------------|
| **Stripe** | 2.9% + €0.30 | €1.03 |
| **Printful** | Included in cost | €8.50 |
| **Shipping** | €5 (free over €50) | €5.00 |
| **Total Costs** | - | €14.53 |
| **Profit** | - | **€10.47** (42%) |

---

## 📊 **REVENUE PROJECTION:**

### **Month 1 (Launch):**
```
20 t-shirts @ €25 = €500 revenue
Printful: €170
Stripe fees: €20.60
Shipping: €100 (waived for some)
Profit: €209.40 (42% margin)
```

### **Month 2-3 (Growth):**
```
50 t-shirts @ €25 = €1,250
10 hoodies @ €55 = €550
Printful: €605
Stripe fees: €52.75
Shipping: €250
Profit: €892.25 (53% margin)
```

### **Month 4-6 (Established):**
```
100 t-shirts @ €25 = €2,500
30 hoodies @ €55 = €1,650
Printful: €1,345
Stripe fees: €121.75
Shipping: €500
Profit: €2,183.25 (52% margin)
```

**Letno:** €25,000-35,000 profit 💰

---

## 🚀 **LAUNCH CHECKLIST:**

### **Pre-Launch:**
- [ ] Stripe account verified
- [ ] Printful account setup
- [ ] API keys in `.env.local`
- [ ] Test order placed successfully
- [ ] Webhook working
- [ ] Shipping rates configured
- [ ] Tax settings configured

### **Launch Day:**
- [ ] Email announcement sent
- [ ] Social media posts scheduled
- [ ] Limited edition design ready
- [ ] Customer support ready

### **Post-Launch:**
- [ ] Monitor orders daily
- [ ] Respond to customer inquiries
- [ ] Track fulfillment times
- [ ] Collect customer feedback

---

## 🎯 **ORDER FLOW:**

```
1. Customer adds item to cart
        ↓
2. Customer completes checkout
        ↓
3. Stripe processes payment
        ↓
4. Stripe webhook triggers
        ↓
5. Order sent to Printful automatically
        ↓
6. Printful fulfills order (2-5 days)
        ↓
7. Printful ships to customer (3-7 days)
        ↓
8. Customer receives order (5-12 days total)
```

---

## ⚠️ **IMPORTANT NOTES:**

### **Legal Requirements:**
- ✅ Register as s.p. or d.o.o. when making sales
- ✅ Add terms & conditions page
- ✅ Add privacy policy (GDPR compliant)
- ✅ Add return policy (14 days EU requirement)
- ✅ Display prices with VAT (DDV)

### **Tax (DDV):**
- ✅ Prices include 22% DDV (Slovenia)
- ✅ EU customers: Charge local VAT rate
- ✅ Non-EU customers: No VAT
- ✅ Printful handles VAT MOSS for digital products

### **Customer Service:**
- ✅ Respond within 24 hours
- ✅ Handle returns/exchanges promptly
- ✅ Provide tracking numbers
- ✅ Quality guarantee

---

## 🔧 **TROUBLESHOOTING:**

### **Error: "No Stripe API key"**
```bash
# Check .env.local exists
# Verify STRIPE_SECRET_KEY is set
# Restart dev server
```

### **Error: "Webhook signature failed"**
```bash
# Verify STRIPE_WEBHOOK_SECRET is correct
# Make sure webhook endpoint is /api/webhooks/stripe
# Check webhook is configured in Stripe Dashboard
```

### **Error: "Printful API failed"**
```bash
# Verify PRINTFUL_API_KEY is correct
# Check Printful dashboard for product IDs
# Ensure products are published in Printful
```

### **Cart not persisting**
```bash
# Check localStorage is enabled in browser
# Verify CartProvider wraps the app
# Check console for errors
```

---

## 📚 **RESOURCES:**

- [Stripe Documentation](https://stripe.com/docs)
- [Printful API Docs](https://www.printful.com/docs)
- [Stripe Test Cards](https://stripe.com/docs/testing#cards)
- [Printful Product Templates](https://www.printful.com/custom)

---

## 🎸 **NEXT STEPS:**

### **Phase 1: MVP Launch (Week 1)**
```
✅ 3 t-shirt designs
✅ Basic checkout
✅ EU shipping
✅ Email notifications
```

### **Phase 2: Expansion (Month 2)**
```
⚠️ Add hoodies
⚠️ Add accessories (hats, tote bags)
⚠️ Digital downloads (albums)
⚠️ VIP packages
```

### **Phase 3: Advanced (Month 3+)**
```
⚠️ Subscription box ("Drinkers Monthly")
⚠️ NFT collectibles
⚠️ Meet & Greet packages
⚠️ Wholesale (sell to local stores)
```

---

**Vso srečo z launchom! 🤘**

Questions? Odpri issue na GitHubu!
