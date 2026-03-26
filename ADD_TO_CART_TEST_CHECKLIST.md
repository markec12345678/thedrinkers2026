# 🛒 ADD TO CART TESTING - 5 MINUTE CHECKLIST

**Quick test procedure for core cart functionality**

---

## ⏱️ TIME: 5 MINUTES

---

## 📋 PRE-REQUISITES (30 sec)

```bash
# 1. Start server
cd f:\thedrinkers\the
npm run dev

# 2. Open browser
http://localhost:3000/merch

# 3. Verify page loads
[ ] Products visible
[ ] Images loading
[ ] No console errors (F12)
```

**✅ Ready to test?**

- [ ] Yes
- [ ] No - Fix loading issues first

---

## 📋 TEST 1: BASIC ADD TO CART (1 min)

### **Steps:**

```
1. Find "The Drinkers Classic T-Shirt" (first product)
2. Click on it to open Quick View
3. Select size "L"
4. Keep quantity at 1
5. Click "Add to Cart" button
```

### **Expected Results:**

```
✅ Cart sidebar slides in from right
✅ Product appears in cart
✅ Shows: "The Drinkers Classic T-Shirt"
✅ Shows: Size: L
✅ Shows: Quantity: 1
✅ Shows: Price: €29.99
✅ Cart badge shows "1"
```

### **Actual Results:**

```
[ ] Cart opens
[ ] Product visible
[ ] Size correct
[ ] Quantity correct
[ ] Price correct
[ ] Badge updates
```

**✅ PASS / ❌ FAIL:** **\_\_\_**

---

## 📋 TEST 2: MULTIPLE ITEMS (1 min)

### **Steps:**

```
1. Keep T-Shirt in cart
2. Find "The Drinkers Hoodie"
3. Click to open Quick View
4. Select size "XL"
5. Click "Add to Cart"
```

### **Expected Results:**

```
✅ Both items in cart
✅ T-Shirt (L) - €29.99
✅ Hoodie (XL) - €59.99
✅ Subtotal: €89.98
✅ Cart badge shows "2"
```

### **Actual Results:**

```
[ ] Both items visible
[ ] T-Shirt correct
[ ] Hoodie correct
[ ] Subtotal correct
[ ] Badge shows 2
```

**✅ PASS / ❌ FAIL:** **\_\_\_**

---

## 📋 TEST 3: QUANTITY UPDATE (1 min)

### **Increase Quantity:**

```
1. In cart, find T-Shirt
2. Click "+" button once
3. Quantity should change to 2
4. Price should update to €59.98
```

**✅ Quantity increased?**

- [ ] Yes
- [ ] No - BUG

### **Decrease Quantity:**

```
1. Click "-" button once
2. Quantity should change to 1
3. Price should update to €29.99
```

**✅ Quantity decreased?**

- [ ] Yes
- [ ] No - BUG

### **Minimum Quantity:**

```
1. Click "-" button when quantity is 1
2. Should NOT go below 1
3. Button might be disabled
```

**✅ Minimum enforced?**

- [ ] Yes
- [ ] No - BUG

---

## 📋 TEST 4: REMOVE ITEM (30 sec)

### **Steps:**

```
1. In cart, find Hoodie
2. Click "Remove" button or trash icon
3. Hoodie should disappear
```

### **Expected Results:**

```
✅ Hoodie removed from cart
✅ Only T-Shirt remains
✅ Subtotal updates to €29.99
✅ Cart badge shows "1"
```

### **Actual Results:**

```
[ ] Item removed
[ ] One item remains
[ ] Subtotal correct
[ ] Badge updates
```

**✅ PASS / ❌ FAIL:** **\_\_\_**

---

## 📋 TEST 5: SIZE VALIDATION (1 min)

### **Steps:**

```
1. Find any product with sizes
2. Open Quick View
3. DON'T select any size
4. Try to click "Add to Cart"
```

### **Expected Results:**

```
✅ Error message appears
✅ "Please select a size" or similar
✅ Item NOT added to cart
✅ Cart doesn't open
```

### **Actual Results:**

```
[ ] Error shown
[ ] Item not added
[ ] Clear message
```

**✅ PASS / ❌ FAIL:** **\_\_\_**

---

## 🐛 COMMON BUGS

### **Bug 1: Cart doesn't open**

```
Problem: Add to cart works but sidebar stays closed
Fix: Check if setIsCartOpen(true) is called
```

### **Bug 2: Size not saved**

```
Problem: Size shows as undefined in cart
Fix: Make sure size is passed to cart function
```

### **Bug 3: Price wrong**

```
Problem: Total doesn't match quantity × price
Fix: Check calculation in cart component
```

### **Bug 4: Can't remove items**

```
Problem: Remove button doesn't work
Fix: Check onRemoveItem handler
```

---

## 📊 TEST RESULTS

**Date:** ******\_\_\_******
**Tester:** ******\_\_\_******
**Browser:** ******\_\_\_******

### **Summary**

| Test            | Pass | Fail | Notes |
| --------------- | ---- | ---- | ----- |
| Basic Add       | [ ]  | [ ]  |       |
| Multiple Items  | [ ]  | [ ]  |       |
| Quantity +      | [ ]  | [ ]  |       |
| Quantity -      | [ ]  | [ ]  |       |
| Remove Item     | [ ]  | [ ]  |       |
| Size Validation | [ ]  | [ ]  |       |

### **Bugs Found:**

```
1. _______________________________
   Severity: [ ] Critical [ ] Major [ ] Minor

2. _______________________________
   Severity: [ ] Critical [ ] Major [ ] Minor

3. _______________________________
   Severity: [ ] Critical [ ] Major [ ] Minor
```

### **Overall:**

- [ ] ✅ PASS - All tests passed
- [ ] ⚠️ PASS with minor bugs
- [ ] ❌ FAIL - Critical bugs found

---

## 🔧 CRITICAL BUGS TO FIX FIRST

### **Priority 1: Cart doesn't add items**

```
Impact: Users can't buy anything
Fix: Check state management
```

### **Priority 2: Wrong prices**

```
Impact: Financial loss
Fix: Check calculation logic
```

### **Priority 3: Can't remove items**

```
Impact: Bad UX, cart stuck
Fix: Check remove handler
```

---

## ✅ NEXT STEPS

**If PASS:**

```
✅ Mark Task 5 as complete
✅ Proceed to Stripe integration
```

**If FAIL:**

```
1. Document all bugs
2. Fix critical bugs first
3. Re-test
4. Mark complete when all pass
```

---

## 🎯 QUICK CONSOLE CHECK

```javascript
// Open browser console (F12)
// Add to cart
// Look for errors

Common errors:
- "Cannot read property 'map' of undefined" - Cart state issue
- "setState is not a function" - Hook issue
- "props is undefined" - Component prop issue
```

**Console errors?**

- [ ] None
- [ ] Some (list them): ******\_\_\_******

---

**Time elapsed:** \_\_\_ minutes

**Task 5 Status:** ✅ PASS / ❌ FAIL

**Ready for next task!** 🛒
