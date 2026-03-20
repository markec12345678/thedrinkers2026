# 🎨 Component Development Prompt Template

## Navodila za AI Development

Ko želiš ustvariti novo komponento, uporabi ta template:

---

```
You are an expert Next.js 15 developer. 
Implement this component following these rules:
- Use TypeScript strict mode
- Use Tailwind CSS for styling
- Use Framer Motion for animations
- Make it mobile-first responsive
- Add proper accessibility (ARIA labels)
- Include error boundaries
- Optimize for Core Web Vitals
- Comment code in English, content in Slovenian

[PRILEPI OPIS KOMPONENTE TUKAJ]
```

---

## 📋 Checklist pred uporabo:

### **Obvezno:**
- [ ] TypeScript strict mode
- [ ] Tailwind CSS utility classes
- [ ] Framer Motion za animacije
- [ ] Mobile-first responsive dizajn
- [ ] ARIA labels za accessibility
- [ ] Error boundaries
- [ ] Core Web Vitals optimizacija
- [ ] Komentarji v angleščini
- [ ] Vsebina (text) v slovenščini

### **Priporočeno:**
- [ ] Loading states
- [ ] Skeleton screens
- [ ] Lazy loading za heavy komponente
- [ ] Image optimization
- [ ] SEO metadata

---

## 🎯 Primeri uporabe:

### **Primer 1: Nova Section Komponenta**

```
You are an expert Next.js 15 developer. 
Implement this component following these rules:
- Use TypeScript strict mode
- Use Tailwind CSS for styling
- Use Framer Motion for animations
- Make it mobile-first responsive
- Add proper accessibility (ARIA labels)
- Include error boundaries
- Optimize for Core Web Vitals
- Comment code in English, content in Slovenian

Create a "Testimonials" section component that displays fan reviews.
Features:
- Carousel/slider for testimonials
- Star ratings
- Fan photos
- Quote icons
- Auto-play with manual navigation
- Responsive grid for mobile/desktop
```

### **Primer 2: UI Komponenta**

```
You are an expert Next.js 15 developer. 
Implement this component following these rules:
- Use TypeScript strict mode
- Use Tailwind CSS for styling
- Use Framer Motion for animations
- Make it mobile-first responsive
- Add proper accessibility (ARIA labels)
- Include error boundaries
- Optimize for Core Web Vitals
- Comment code in English, content in Slovenian

Create a reusable "ProductCard" component for merch page.
Features:
- Product image with hover zoom
- Title, price, currency
- Size selector (S, M, L, XL, XXL)
- Add to cart button
- Stock indicator
- Wishlist heart icon
- Quick view modal
```

### **Primer 3: Feature Komponenta**

```
You are an expert Next.js 15 developer. 
Implement this component following these rules:
- Use TypeScript strict mode
- Use Tailwind CSS for styling
- Use Framer Motion for animations
- Make it mobile-first responsive
- Add proper accessibility (ARIA labels)
- Include error boundaries
- Optimize for Core Web Vitals
- Comment code in English, content in Slovenian

Create a "TicketSelector" component for tour page.
Features:
- Date picker
- Quantity selector (1-10 tickets)
- Price calculator
- Seat map integration
- Checkout button
- Sold-out indicators
- Real-time availability
```

---

## 📦 Struktura odgovora:

Ko AI generira komponento, mora vključevati:

1. **Imports** - Vsi potrebni importi
2. **Types** - TypeScript interface-i
3. **Component** - Glavna komponenta
4. **Styles** - Tailwind classes
5. **Animations** - Framer Motion variants
6. **Accessibility** - ARIA attributes
7. **Error Handling** - Error boundaries
8. **Comments** - Angleški komentarji
9. **Content** - Slovenski text

---

## 🎨 Code Style:

```typescript
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// Interface for component props
interface MyComponentProps {
  title: string;
  description?: string;
}

/**
 * MyComponent - Opis komponente
 * 
 * @param title - Naslov komponente
 * @param description - Opcijski opis
 */
export function MyComponent({ title, description }: MyComponentProps) {
  // State management
  const [isLoading, setIsLoading] = useState(false);

  // Event handlers
  const handleClick = () => {
    // Logic here
  };

  return (
    <section className="...">
      {/* Content in Slovenian */}
      <h2>{title}</h2>
    </section>
  );
}
```

---

## 🔍 Review Checklist:

Preden commitaš generirano komponento:

- [ ] Build uspešen (`npm run build`)
- [ ] Ni TypeScript errors
- [ ] Ni ESLint warnings
- [ ] Responsive na mobile/tablet/desktop
- [ ] Loading states delujejo
- [ ] Animacije so gladke
- [ ] Accessibility test (tab navigation)
- [ ] Core Web Vitals OK

---

**Shrani ta dokument za prihodnjo uporabo!** 🎯
