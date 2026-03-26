# 🧪 DROP TESTING GUIDE

**Complete testing guide for limited edition drops**

---

## 📋 PRE-TESTING CHECKLIST

### **Database:**

```
✅ Tables created (limited_drop, drop_entry, drop_waitlist)
✅ First drop created
✅ Product exists and is active
✅ Product has images
```

### **API:**

```
✅ Server running (npm run dev)
✅ API endpoints accessible
✅ Stripe keys configured
✅ Authentication working
```

### **UI:**

```
✅ /drops page loads
✅ Drop cards display correctly
✅ Countdown timers working
✅ Progress bars showing
```

---

## 🧪 TEST SCENARIOS

### **Test 1: View Active Drops**

**Steps:**

```
1. Start server: npm run dev
2. Visit: http://localhost:3000/drops
3. Check if drop appears
```

**Expected:**

```
✅ Drop card visible
✅ Product image shown
✅ Price displayed (€25.00)
✅ Original price shown (€35.00)
✅ Savings badge visible (Save €10.00)
✅ Progress bar at 0% (0% sold)
✅ Countdown timer running
✅ "Get Yours Now" button visible
```

---

### **Test 2: Filter Drops**

**Steps:**

```
1. On /drops page
2. Click "VIP Only" filter
3. Click "Ending Soon" filter
4. Click "Available" filter
```

**Expected:**

```
✅ VIP filter shows/hides VIP drops
✅ Ending Soon shows drops < 6 hours
✅ Available shows non-sold-out drops
✅ All filter shows all drops
```

---

### **Test 3: Purchase Flow**

**Steps:**

```
1. Click "Get Yours Now" button
2. Should redirect to Stripe checkout
3. Enter test card: 4242 4242 4242 4242
4. Complete payment
5. Should redirect to /success
```

**Expected:**

```
✅ Redirects to Stripe
✅ Product name shown
✅ Price correct (€25.00)
✅ Payment successful
✅ Redirects to success page
✅ Drop quantity decreases by 1
✅ Drop entry created in database
```

**Verify in Database:**

```sql
-- Check quantity decreased
SELECT quantity_remaining FROM limited_drop WHERE id = 'DROP_UUID';

-- Check drop entry created
SELECT * FROM drop_entry WHERE drop_id = 'DROP_UUID';
```

---

### **Test 4: Waitlist Flow**

**Steps:**

```
1. Find sold-out drop (or manually set is_sold_out = true)
2. Button should show "Join Waitlist"
3. Click "Join Waitlist"
4. Enter email
5. Submit
```

**Expected:**

```
✅ Button shows "Join Waitlist"
✅ Prompt appears for email
✅ Email validation works
✅ Success message shown
✅ Entry in drop_waitlist table
```

**Verify in Database:**

```sql
SELECT * FROM drop_waitlist WHERE drop_id = 'DROP_UUID';
```

---

### **Test 5: VIP Early Access**

**Steps:**

```
1. Create drop with vip_early_access = true
2. Set start_date to tomorrow
3. Visit /drops before public start
4. Should see VIP badge
```

**Expected:**

```
✅ "VIP Early Access" badge visible
✅ Button shows "VIP Access Only"
✅ Non-VIP users can't purchase
✅ VIP users can purchase
```

---

### **Test 6: Countdown Timer**

**Steps:**

```
1. Visit /drops
2. Watch countdown timer
3. Wait 1 minute
```

**Expected:**

```
✅ Timer updates every second
✅ Hours/minutes/seconds correct
✅ Timer decreases correctly
✅ When reaches 0, drop becomes unavailable
```

---

### **Test 7: Progress Bar**

**Steps:**

```
1. Purchase multiple items from drop
2. Refresh page
3. Check progress bar
```

**Expected:**

```
✅ Progress bar shows % sold
✅ Color changes at 50% (orange)
✅ Color changes at 80% (red)
✅ "Selling Fast!" badge appears at 50%
✅ Quantity remaining updates
```

---

### **Test 8: Sold Out State**

**Steps:**

```
1. Purchase all items from drop (or set quantity_remaining = 0)
2. Refresh page
```

**Expected:**

```
✅ Card shows "Sold Out" overlay
✅ Button changes to "Join Waitlist"
✅ Progress bar at 100%
✅ "Sold Out" badge visible
✅ Cannot purchase
```

---

## 🐛 COMMON ISSUES & FIXES

### **Issue 1: Drop Not Showing**

**Problem:** Drop doesn't appear on /drops

**Fix:**

```sql
-- Check if drop is active
SELECT is_active, is_sold_out FROM limited_drop WHERE id = 'DROP_UUID';

-- Check dates
SELECT start_date, end_date FROM limited_drop WHERE id = 'DROP_UUID';

-- Ensure start_date < NOW() AND end_date > NOW()
```

---

### **Issue 2: Images Not Loading**

**Problem:** Product images broken

**Fix:**

```
1. Add images to /public/images/drops/
2. Name file: {product_id}.jpg
3. Check file permissions
4. Restart server
```

---

### **Issue 3: Purchase Fails**

**Problem:** Can't complete purchase

**Fix:**

```
1. Check Stripe keys in .env
2. Verify Stripe webhook configured
3. Check API logs for errors
4. Test with Stripe test cards
```

---

### **Issue 4: Countdown Not Working**

**Problem:** Timer not updating

**Fix:**

```javascript
// Check browser console for errors
// Ensure timeRemaining > 0
// Check if drop.isSoldOut = false
```

---

## 📊 PERFORMANCE TESTING

### **Load Test:**

**Tools:**

```
- Apache Bench (ab)
- k6
- Artillery
```

**Test:**

```bash
# Test with 100 concurrent users
ab -n 1000 -c 100 http://localhost:3000/api/drops/active
```

**Expected:**

```
✅ Response time < 200ms
✅ No errors
✅ Server handles load
```

---

## ✅ LAUNCH CHECKLIST

### **Before Launch:**

```
✅ Drop created and tested
✅ Images uploaded
✅ Purchase flow tested
✅ Waitlist tested
✅ VIP access tested
✅ Mobile responsive
✅ Analytics tracking
✅ Email notifications setup
✅ Social media scheduled
```

### **Day of Launch:**

```
✅ Monitor traffic
✅ Monitor purchases
✅ Monitor server performance
✅ Respond to customer questions
✅ Update social media
✅ Send email blast
```

### **After Launch:**

```
✅ Analyze sales data
✅ Review customer feedback
✅ Check waitlist signups
✅ Plan next drop
✅ Send thank you email
```

---

## 🎉 SUCCESS METRICS

### **Good Launch:**

```
✅ 80%+ sell-through rate
✅ < 2 hour sell-out time
✅ 500+ waitlist signups
✅ 20%+ conversion rate
✅ < 1% error rate
```

### **Average Launch:**

```
✅ 50-80% sell-through
✅ 2-24 hour sell-out
✅ 100-500 waitlist
✅ 10-20% conversion
✅ 1-5% error rate
```

### **Needs Improvement:**

```
❌ < 50% sell-through
❌ > 24 hour sell-out
❌ < 100 waitlist
❌ < 10% conversion
❌ > 5% error rate
```

---

**Ready to test! Run: node create-first-drop.js** 🚀
