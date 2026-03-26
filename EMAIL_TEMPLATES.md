# 📧 EMAIL TEMPLATES

**Email templates for notifications**

---

## 🎯 EMAIL TYPES

### **1. Purchase Confirmation**

```
Triggered when: Customer completes purchase
Sent to: Customer
From: The Drinkers <noreply@thedrinkers.si>
```

### **2. Waitlist Signup**

```
Triggered when: User joins waitlist
Sent to: User
From: The Drinkers <noreply@thedrinkers.si>
```

### **3. Drop Launch Notification**

```
Triggered when: New drop launches
Sent to: Newsletter subscribers
From: The Drinkers <noreply@thedrinkers.si>
```

### **4. VIP Early Access**

```
Triggered when: VIP early access starts
Sent to: VIP members only
From: The Drinkers <noreply@thedrinkers.si>
```

---

## 📧 TEMPLATES

### **Template 1: Purchase Confirmation**

**Subject:** `🎉 Order Confirmed! You're on the list!`

**Preview:** `Thanks for your order! Here are the details...`

**Body:**

```html
<!DOCTYPE html>
<html>
  <body
    style="font-family: Arial, sans-serif; background: #1a1a2e; color: #fff;"
  >
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #a855f7;">🎉 Order Confirmed!</h1>

      <p>Hey {{customer_name}},</p>

      <p>Thanks for your order! You've secured your limited edition item.</p>

      <div
        style="background: #16213e; padding: 20px; border-radius: 10px; margin: 20px 0;"
      >
        <h2>Order Details:</h2>
        <p><strong>Order #:</strong> {{order_number}}</p>
        <p><strong>Item:</strong> {{product_name}}</p>
        <p><strong>Quantity:</strong> {{quantity}}</p>
        <p><strong>Total:</strong> €{{total}}</p>
      </div>

      <p>We'll send you another email when your order ships!</p>

      <p style="margin-top: 30px;">Rock on,<br />The Drinkers Team</p>

      <div
        style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #333; font-size: 12px; color: #888;"
      >
        <p>
          Questions? Reply to this email or contact us at support@thedrinkers.si
        </p>
      </div>
    </div>
  </body>
</html>
```

---

### **Template 2: Waitlist Signup**

**Subject:** `⏰ You're on the list! We'll notify you...`

**Preview:** `Don't worry, we'll email you when it's back in stock!`

**Body:**

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

### **Template 3: Drop Launch Notification**

**Subject:** `🚀 DROP IS LIVE! Get yours before it's gone!`

**Preview:** `Limited edition drop just launched. Only {{quantity}} available!`

**Body:**

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

      <a
        href="{{drop_url}}"
        style="display: inline-block; background: #a855f7; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 20px 0;"
      >
        👉 Get Yours Now
      </a>

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

**Subject:** `👑 VIP EARLY ACCESS! 24 hours before everyone else!`

**Preview:** `Your VIP membership gets you first access to our new drop!`

**Body:**

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

      <a
        href="{{vip_url}}"
        style="display: inline-block; background: #fbbf24; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 10px; font-weight: bold; margin: 20px 0;"
      >
        👉 Access VIP Drop
      </a>

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
4. Add to .env:

```env
RESEND_API_KEY=re_your_api_key_here
```

### **2. Install Resend:**

```bash
npm install resend
```

### **3. Update API Routes:**

Add email sending to your API routes:

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Send email
await resend.emails.send({
  from: "The Drinkers <noreply@thedrinkers.si>",
  to: email,
  subject: "Subject",
  html: emailTemplate,
});
```

---

## ✅ EMAIL SETUP CHECKLIST

```
□ Get Resend API key
□ Add to .env
□ Install resend package
□ Create email templates
□ Update purchase API
□ Update waitlist API
□ Update newsletter API
□ Test all emails
□ Verify delivery
□ Check spam score
```

---

**Start with Resend setup!** 📧

**Then test all templates!** ✉️
