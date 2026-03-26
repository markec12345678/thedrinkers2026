# 🌓 DARK MODE TESTING - 5 MINUTE CHECKLIST

**Quick test procedure**

---

## ⏱️ TIME: 5 MINUTES

---

## 📋 STEP 1: FIND THEME TOGGLE (30 sec)

```
Look for theme toggle button:
- Usually in header/navigation
- Icon: 🌙 (moon) or ☀️ (sun)
- Or check settings menu
```

**✅ Found it?**

- [ ] Yes, proceed
- [ ] No, check if app has dark mode

---

## 📋 STEP 2: TOGGLE TO DARK MODE (30 sec)

```
1. Click theme toggle
2. Page should switch to dark theme
```

**✅ Did it switch?**

- [ ] Yes
- [ ] No - BUG: Toggle not working

---

## 📋 STEP 3: TEST ALL PAGES (2 min)

### **Test /merch page**

```
Navigate to: http://localhost:3000/merch

Check:
[ ] Background is dark (not white)
[ ] Text is light (white/light gray)
[ ] Product cards visible
[ ] Images load properly
[ ] Buttons visible
```

**✅ All good?**

- [ ] Yes
- [ ] No - List issues: ******\_\_\_******

---

### **Test Cart Sidebar**

```
1. Add any product to cart
2. Cart sidebar should open

Check:
[ ] Sidebar background dark
[ ] Text readable
[ ] Buttons visible
[ ] Close button visible
```

**✅ All good?**

- [ ] Yes
- [ ] No - List issues: ******\_\_\_******

---

### **Test Quick View Modal**

```
1. Click on any product
2. Quick view modal opens

Check:
[ ] Modal background dark
[ ] Text readable
[ ] Form inputs visible
[ ] Close button visible
```

**✅ All good?**

- [ ] Yes
- [ ] No - List issues: ******\_\_\_******

---

## 📋 STEP 4: CHECK CONTRAST (1 min)

### **Readability Test**

```
Look at each element:

[ ] Headings (H1, H2, H3) - Easy to read
[ ] Body text - No eye strain
[ ] Buttons - Text clear on background
[ ] Links - Visible and distinguishable
[ ] Input fields - Borders visible
```

**✅ Contrast OK?**

- [ ] Yes
- [ ] No - List issues: ******\_\_\_******

---

## 📋 STEP 5: TOGGLE BACK TO LIGHT (30 sec)

```
1. Click theme toggle again
2. Should switch back to light mode
```

**✅ Switched back?**

- [ ] Yes
- [ ] No - BUG: Can't toggle back

---

## 📋 STEP 6: CHECK PERSISTENCE (30 sec)

```
1. Set to dark mode
2. Refresh page (F5)
3. Check if still dark mode
```

**✅ Persisted?**

- [ ] Yes - Stored in localStorage
- [ ] No - BUG: Theme resets on refresh

---

## 🐛 COMMON ISSUES

### **Issue 1: Text not readable**

```
Problem: Text blends with background
Fix: Increase contrast in dark mode CSS
```

### **Issue 2: Images washed out**

```
Problem: Images too bright in dark mode
Fix: Add filter: brightness(0.9) in dark mode
```

### **Issue 3: Borders invisible**

```
Problem: Can't see element borders
Fix: Use lighter border colors in dark mode
```

### **Issue 4: Theme doesn't persist**

```
Problem: Resets on refresh
Fix: Save to localStorage and load on mount
```

---

## 📊 TEST RESULTS

**Date:** ******\_\_\_******
**Tester:** ******\_\_\_******
**Browser:** ******\_\_\_******

### **Summary**

| Check            | Pass | Fail |
| ---------------- | ---- | ---- |
| Toggle works     | [ ]  | [ ]  |
| /merch page      | [ ]  | [ ]  |
| Cart sidebar     | [ ]  | [ ]  |
| Quick view modal | [ ]  | [ ]  |
| Text contrast    | [ ]  | [ ]  |
| Theme persists   | [ ]  | [ ]  |

### **Issues Found:**

```
1. _______________________________
2. _______________________________
3. _______________________________
```

### **Overall:**

- [ ] ✅ PASS - Ready
- [ ] ⚠️ PASS with minor issues
- [ ] ❌ FAIL - Needs work

---

## 🔧 QUICK FIXES

### **If text hard to read:**

```css
/* In globals.css or theme provider */
.dark {
  --foreground: #ffffff;
  --muted-foreground: #a1a1aa;
}
```

### **If background too harsh:**

```css
.dark {
  --background: #09090b;
  --card: #18181b;
}
```

### **If borders invisible:**

```css
.dark {
  --border: #27272a;
}
```

---

## ✅ NEXT STEPS

**If PASS:**

```
✅ Mark Task 8 as complete
✅ Move to next task
```

**If FAIL:**

```
1. List all issues
2. Fix CSS variables
3. Re-test
4. Mark complete when fixed
```

---

**Time elapsed:** \_\_\_ minutes

**Ready for next task!** 🌓
