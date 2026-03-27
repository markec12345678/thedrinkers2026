# 📧 EMAIL TEMPLATES - PRODUCTION READY

**Complete email templates for The Drinkers**

---

## 🎯 EMAIL TYPES

### **1. Purchase Confirmation**

**Trigger:** Customer completes purchase  
**To:** Customer  
**From:** The Drinkers <noreply@thedrinkers.si>

---

### **2. Waitlist Signup**

**Trigger:** User joins waitlist  
**To:** User  
**From:** The Drinkers <noreply@thedrinkers.si>

---

### **3. Drop Launch Announcement**

**Trigger:** New drop launches  
**To:** All subscribers  
**From:** The Drinkers <noreply@thedrinkers.si>

---

### **4. VIP Early Access**

**Trigger:** VIP early access starts  
**To:** VIP members only  
**From:** The Drinkers <vip@thedrinkers.si>

---

## 📧 TEMPLATES

### **Template 1: Purchase Confirmation**

**Subject:** 🎉 Order Confirmed! You're on the list!

**Preview:** Thanks for your order! Here are the details...

**HTML:**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Order Confirmed - The Drinkers</title>
  </head>
  <body
    style="font-family: Arial, sans-serif; background: #1a1a2e; color: #fff; margin: 0; padding: 0;"
  >
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <!-- Header -->
      <div style="text-align: center; padding: 40px 0;">
        <h1 style="color: #a855f7; font-size: 36px; margin: 0;">
          🎉 Order Confirmed!
        </h1>
      </div>

      <!-- Content -->
      <div
        style="background: #16213e; padding: 30px; border-radius: 10px; margin: 20px 0;"
      >
        <p style="font-size: 16px; line-height: 1.6;">Hey {{customer_name}},</p>

        <p style="font-size: 16px; line-height: 1.6;">
          Thanks for your order! You've secured your limited edition item.
        </p>

        <h2 style="color: #a855f7; margin-top: 30px;">Order Details:</h2>
        <div
          style="background: #0f3460; padding: 20px; border-radius: 8px; margin: 15px 0;"
        >
          <p style="margin: 10px 0;">
            <strong>Order #:</strong> {{order_number}}
          </p>
          <p style="margin: 10px 0;"><strong>Item:</strong> {{product_name}}</p>
          <p style="margin: 10px 0;"><strong>Quantity:</strong> {{quantity}}</p>
          <p style="margin: 10px 0;"><strong>Total:</strong> €{{total}}</p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">
          We'll send you another email when your order ships!
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a
            href="{{order_url}}"
            style="background: #a855f7; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;"
            >View Order</a
          >
        </div>
      </div>

      <!-- Footer -->
      <div
        style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #888;"
      >
        <p>
          Questions? Reply to this email or contact us at support@thedrinkers.si
        </p>
        <p style="margin-top: 15px;">Rock on,<br />The Drinkers Team</p>
        <p style="margin-top: 15px;">
          <a href="{{unsubscribe_url}}" style="color: #888;">Unsubscribe</a>
        </p>
      </div>
    </div>
  </body>
</html>
```

---

### **Template 2: Waitlist Signup**

**Subject:** ⏰ You're on the list! We'll notify you...

**Preview:** Don't worry, we'll email you when it's back in stock!

**HTML:**

```html
<!DOCTYPE html>
<html>
  <body
    style="font-family: Arial, sans-serif; background: #1a1a2e; color: #fff;"
  >
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #a855f7;">⏰ You're on the list!</h1>

      <p>Hey {{customer_name}},</p>

      <p>Great news! You've been added to the waitlist for:</p>

      <div
        style="background: #16213e; padding: 20px; border-radius: 10px; margin: 20px 0;"
      >
        <h2>{{product_name}}</h2>
        <p>We'll email you as soon as it's back in stock!</p>
      </div>

      <p style="color: #fbbf24;">
        💡 Pro tip: Follow us on social media for exclusive updates!
      </p>

      <p style="margin-top: 30px;">Stay tuned,<br />The Drinkers Team</p>

      <div
        style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #888;"
      >
        <p>
          You're receiving this because you signed up for waitlist
          notifications.
        </p>
      </div>
    </div>
  </body>
</html>
```

---

### **Template 3: Drop Launch Announcement**

**Subject:** 🚀 DROP IS LIVE! Get yours before it's gone!

**Preview:** Limited edition drop just launched. Only {{quantity}} available!

**HTML:**

```html
<!DOCTYPE html>
<html>
  <body
    style="font-family: Arial, sans-serif; background: #1a1a2e; color: #fff;"
  >
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #a855f7;">🚀 DROP IS LIVE!</h1>

      <p>Hey {{customer_name}},</p>

      <p>The moment you've been waiting for is here!</p>

      <div
        style="background: #16213e; padding: 20px; border-radius: 10px; margin: 20px 0;"
      >
        <h2>{{drop_name}}</h2>
        <p><strong>Price:</strong> €{{price}} (was €{{original_price}})</p>
        <p><strong>Quantity:</strong> Only {{quantity}} available!</p>
        <p><strong>Ends:</strong> {{end_date}}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="{{drop_url}}"
          style="background: #a855f7; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;"
          >👉 Get Yours Now</a
        >
      </div>

      <p style="color: #fbbf24;">⚡ Hurry! These sell out fast!</p>

      <p style="margin-top: 30px;">Rock on,<br />The Drinkers Team</p>

      <div
        style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #888;"
      >
        <p>
          You're receiving this because you subscribed to The Drinkers
          newsletter.
        </p>
        <p>
          <a href="{{unsubscribe_url}}" style="color: #888;">Unsubscribe</a>
        </p>
      </div>
    </div>
  </body>
</html>
```

---

### **Template 4: VIP Early Access**

**Subject:** 👑 VIP EARLY ACCESS! 24 hours before everyone else!

**Preview:** Your VIP membership gets you first access to our new drop!

**HTML:**

```html
<!DOCTYPE html>
<html>
  <body
    style="font-family: Arial, sans-serif; background: #1a1a2e; color: #fff;"
  >
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #fbbf24;">👑 VIP EARLY ACCESS!</h1>

      <p>Hey {{customer_name}},</p>

      <p>As a VIP member, you get first access to our latest drop!</p>

      <div
        style="background: #16213e; padding: 20px; border-radius: 10px; margin: 20px 0; border: 2px solid #fbbf24;"
      >
        <h2 style="color: #fbbf24;">{{drop_name}}</h2>
        <p><strong>VIP Price:</strong> €{{vip_price}}</p>
        <p><strong>Public Price:</strong> €{{public_price}}</p>
        <p><strong>You Save:</strong> €{{savings}}</p>
        <p><strong>Early Access Ends:</strong> {{early_access_end}}</p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a
          href="{{vip_url}}"
          style="background: #fbbf24; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;"
          >👉 Access VIP Drop</a
        >
      </div>

      <p style="color: #a855f7;">💎 Public access starts in 24 hours!</p>

      <p style="margin-top: 30px;">
        Thanks for being a VIP,<br />The Drinkers Team
      </p>

      <div
        style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #888;"
      >
        <p>You're receiving this as a VIP member of The Drinkers.</p>
      </div>
    </div>
  </body>
</html>
```

---

## 🔧 SETUP INSTRUCTIONS

### **1. Get Resend API Key:**

1. Go to https://resend.com
2. Sign up for free account
3. Get API key from dashboard
4. Add to `.env.production`:

```env
RESEND_API_KEY=re_your_api_key_here
```

### **2. Install Resend:**

```bash
npm install resend
```

### **3. Add to API Routes:**

See `/app/api/newsletter/route.ts` for implementation example.

---

## ✅ EMAIL SETUP CHECKLIST

```
□ Get Resend API key
□ Add to .env.production
□ Install resend package
□ Create email templates
□ Update purchase API
□ Update waitlist API
□ Test all emails
□ Verify delivery
□ Check spam score
□ Add unsubscribe links
□ Add physical address (required by law)
```

---

**Ready to send professional emails!** 📧✨
