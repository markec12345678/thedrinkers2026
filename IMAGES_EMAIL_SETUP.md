# 🖼️ PRODUCT IMAGES SETUP GUIDE

**How to add product images**

---

## 📁 IMAGE LOCATIONS

### **Drops Images:**

```
/public/images/drops/
  ├── {product_id}.jpg
  ├── {product_id}.png
  └── ...
```

### **Bundle Images:**

```
/public/images/bundles/
  ├── {bundle_id}.jpg
  ├── {bundle_id}.png
  └── ...
```

---

## 🎨 IMAGE REQUIREMENTS

### **Size:**

```
Recommended: 1000x1000px (square)
Minimum: 500x500px
Format: JPG or PNG
Max file size: 500KB
```

### **Quality:**

```
✅ High resolution
✅ White or transparent background
✅ Multiple angles (if possible)
✅ Lifestyle shots (optional)
```

---

## 📸 HOW TO ADD IMAGES

### **Option 1: Use Existing Images**

1. **Find your product ID:**

```sql
SELECT id, name FROM product WHERE active = true;
```

2. **Rename images:**

```
{product_id}.jpg
```

3. **Copy to folder:**

```
/public/images/drops/{product_id}.jpg
```

---

### **Option 2: Generate Placeholder Images**

1. **Use online tools:**

```
- Canva.com
- Placeit.net
- Smartmockups.com
```

2. **Create mockups:**

```
- T-Shirt mockup
- Hoodie mockup
- Poster mockup
- Bundle mockup
```

3. **Download and save:**

```
/public/images/drops/{product_id}.jpg
```

---

### **Option 3: AI Generated Images**

1. **Use AI tools:**

```
- Midjourney
- DALL-E 3
- Stable Diffusion
```

2. **Prompt examples:**

```
"T-shirt with rock band logo, black background, professional product photo"
"Hoodie with tour artwork, mockup, white background"
"Concert poster design, rock band, vintage style"
```

3. **Save images:**

```
/public/images/drops/{product_id}.jpg
```

---

## 🖼️ CURRENT PRODUCTS

**Add images for these products:**

### **1. Tour 2026 Limited T-Shirt**

```
Product ID: [Get from database]
Image: /public/images/drops/{product_id}.jpg
Description: Black t-shirt with tour artwork
```

### **2. The Drinkers Classic T-Shirt**

```
Product ID: [Get from database]
Image: /public/images/drops/{product_id}.jpg
Description: Black t-shirt with band logo
```

### **3. The Drinkers Hoodie Black**

```
Product ID: [Get from database]
Image: /public/images/drops/{product_id}.jpg
Description: Black hoodie with hood
```

---

## 🔧 IMAGE OPTIMIZATION

### **Before Upload:**

**Compress images:**

```
- TinyPNG.com
- CompressJPEG.com
- Squoosh.app
```

**Resize if needed:**

```
- Keep aspect ratio
- Max width: 2000px
- Quality: 80-90%
```

---

## 📋 NEXT STEPS

### **1. Add Drop Images:**

```
✅ Get product IDs from database
✅ Create/rename images
✅ Copy to /public/images/drops/
✅ Test on /drops page
```

### **2. Add Bundle Images:**

```
✅ Get bundle IDs
✅ Create bundle mockups
✅ Copy to /public/images/bundles/
✅ Test on /bundles page
```

### **3. Add Email Setup:**

```
✅ Configure Resend API
✅ Add email templates
✅ Test email notifications
```

### **4. Add Analytics:**

```
✅ Setup Google Analytics
✅ Add conversion tracking
✅ Test events
```

---

## 🎨 FREE MOCKUP RESOURCES

**T-Shirt Mockups:**

```
- Freepik.com
- MockupWorld.co
- Unblast.com
```

**Hoodie Mockups:**

```
- MockupWorld.co
- GraphicBurger.com
- Unblast.com
```

**Poster Mockups:**

```
- MockupWorld.co
- Freepik.com
- Unblast.com
```

---

## ✅ CHECKLIST

**Product Images:**

```
□ Get product IDs
□ Create/rename images
□ Optimize images
□ Upload to /public/images/drops/
□ Test on /drops page
□ Verify images load
```

**Bundle Images:**

```
□ Get bundle IDs
□ Create bundle mockups
□ Optimize images
□ Upload to /public/images/bundles/
□ Test on /bundles page
□ Verify images load
```

**Email Setup:**

```
□ Get Resend API key
□ Add to .env
□ Create email templates
□ Test purchase emails
□ Test waitlist emails
```

**Analytics:**

```
□ Setup Google Analytics
□ Add tracking code
□ Configure events
□ Test tracking
□ Verify in GA dashboard
```

---

**Start with product images first!** 🖼️

**Then move to email setup!** 📧

**Finally add analytics!** 📊
