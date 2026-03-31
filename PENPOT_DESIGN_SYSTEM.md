# The Drinkers Design System

## Za Penpot

---

## 1. Brand Barve

### Primary Colors

| Barva           | Hex       | RGB             | Uporaba                    |
| --------------- | --------- | --------------- | -------------------------- |
| **Rock Black**  | `#1A1A1A` | rgb(26,26,26)   | Ozadje, header, footer     |
| **Crimson Red** | `#DC2626` | rgb(220,38,38)  | Akcijski gumbi, CTA, hover |
| **Gold Accent** | `#F59E0B` | rgb(245,158,11) | Nagrade, VIP, premium      |

### Secondary Colors

| Barva           | Hex       | RGB              | Uporaba             |
| --------------- | --------- | ---------------- | ------------------- |
| **Dark Gray**   | `#2D2D2D` | rgb(45,45,45)    | Kartice, sekcije    |
| **Medium Gray** | `#4B4B4B` | rgb(75,75,75)    | Robovi, dividerji   |
| **Light Gray**  | `#9CA3AF` | rgb(156,163,175) | Sekundarno besedilo |
| **Off White**   | `#F3F4F6` | rgb(243,244,246) | Svetlo besedilo     |

### Semantic Colors

- **Success:** `#22C55E` (green-500)
- **Warning:** `#F59E0B` (amber-500)
- **Error:** `#DC2626` (red-500)
- **Info:** `#3B82F6` (blue-500)

---

## 2. Tipografija

### Font Families

- **Headlines:** `Inter`, `system-ui`, sans-serif
- **Body:** `Inter`, `system-ui`, sans-serif
- **Accent/Rock:** `Bebas Neue`, `Impact`, sans-serif

### Font Sizes (Desktop)

| Element        | Size            | Weight | Line Height |
| -------------- | --------------- | ------ | ----------- |
| **Hero Title** | 72px / 4.5rem   | 800    | 1.1         |
| **H1**         | 48px / 3rem     | 700    | 1.2         |
| **H2**         | 36px / 2.25rem  | 700    | 1.2         |
| **H3**         | 30px / 1.875rem | 600    | 1.3         |
| **H4**         | 24px / 1.5rem   | 600    | 1.4         |
| **Body Large** | 20px / 1.25rem  | 400    | 1.6         |
| **Body**       | 16px / 1rem     | 400    | 1.6         |
| **Small**      | 14px / 0.875rem | 400    | 1.5         |
| **Caption**    | 12px / 0.75rem  | 500    | 1.4         |

---

## 3. Komponente

### Primary Button

```
Background: #DC2626 (Crimson)
Text: #FFFFFF
Padding: 16px 32px
Border Radius: 8px
Font: 16px, weight 600
Hover: #B91C1C (darker red)
Shadow: 0 4px 6px rgba(220, 38, 38, 0.3)
```

### Secondary Button

```
Background: transparent
Border: 2px solid #DC2626
Text: #DC2626
Padding: 16px 32px
Border Radius: 8px
Hover: Background #DC2626, Text white
```

### Album Card

```
Background: #2D2D2D
Border Radius: 12px
Shadow: 0 4px 6px rgba(0,0,0,0.3)
Hover: Transform translateY(-4px)
```

### Header

```
Background: #1A1A1A / rgba(26,26,26,0.95) with blur
Height: 72px
Position: sticky top
Border Bottom: 1px solid #2D2D2D
```

---

## 4. Layout Grid

- **Max Width:** 1280px
- **Padding:** 24px (mobile) / 48px (tablet) / 64px (desktop)
- **Columns:** 12
- **Gutter:** 24px

---

## Navodila za Penpot

### 1. Prijava

- Pojdi na https://penpot.app
- Ustvari račun (brezplačno)

### 2. Nov projekt

- Klikni "New Project"
- Poimenuj: "The Drinkers Design System"

### 3. Ustvari Library

- Definiraj barve v "Colors"
- Ustvari tipografijo v "Typography"
- Naredi komponente (gumbi, kartice, header)

### 4. Export

- CSS za Tailwind
- SVG za ikone
- PNG za slike

---

_The Drinkers - Design System v1.0_
