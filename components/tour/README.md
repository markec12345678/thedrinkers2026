# 🎫 TOUR DATE CARD COMPONENT

**Complete, production-ready tour date card for concert listings**

---

## 📦 COMPONENT

- **`TourDateCard.tsx`** - Full-featured tour date card

---

## ✨ FEATURES

```
✅ Date display (day, month, year) with styled badge
✅ Venue name and city/country with map pin icon
✅ Ticket availability indicator with progress bar
✅ "Get Tickets" CTA button
✅ Support acts list with images
✅ Age restriction badge (18+, all ages, etc.)
✅ Add to calendar (Google, Apple, Outlook)
✅ VIP available badge
✅ Sold out state
✅ Map link to venue
✅ Tour name display
✅ Price range display
✅ Time details (doors & show time)
✅ Featured show badge
✅ Status badges (On Sale, Sold Out, Announced, etc.)
✅ Notes section
✅ Responsive design
✅ Dark mode support
✅ Framer Motion animations
```

---

## 🚀 USAGE

```tsx
import { TourDateCard } from "@/components/features";

// In your page
<TourDateCard
  tourDate={tourDate}
  onGetTickets={(tourDate) => {
    // Handle get tickets
    window.open(tourDate.ticketUrl, "_blank");
  }}
  onAddToCalendar={(tourDate, calendarType) => {
    // Handle add to calendar
    console.log("Add to calendar:", calendarType);
  }}
  onViewOnMap={(tourDate) => {
    // Handle view on map
    console.log("View on map:", tourDate.venue);
  }}
/>;
```

---

## 📊 DATA STRUCTURE

### **TourDate Interface**

```typescript
interface TourDate {
  id: string; // Unique tour date ID
  tourName: string | null; // Tour name (e.g., "Spring Tour 2026")
  venue: string; // Venue name
  city: string; // City
  state: string | null; // State/Province (optional)
  country: string; // Country
  date: Date; // Event date
  time: string | null; // Show time
  doors: string | null; // Doors open time
  ticketUrl: string | null; // Primary ticket URL
  ticketUrlLocal: string | null; // Local ticket vendor URL
  ticketPrice: string | null; // Fixed price
  ticketPriceMin: string | null; // Min price (for ranges)
  ticketPriceMax: string | null; // Max price (for ranges)
  status:
    | "announced"
    | "on_sale"
    | "sold_out"
    | "completed"
    | "cancelled"
    | "postponed";
  capacity: number | null; // Venue capacity
  soldTickets: number | null; // Tickets sold
  supportActs: SupportAct[] | null; // Support acts
  ageRestriction: string | null; // Age restriction (18+, all_ages, etc.)
  vipAvailable: boolean; // VIP tickets available
  vipDescription: string | null; // VIP description
  featured: boolean; // Is featured show
  active: boolean; // Is active
  notes: string | null; // Additional notes
}

interface SupportAct {
  name: string; // Artist name
  image?: string; // Artist image URL
}
```

### **Example Data**

```typescript
const tourDate: TourDate = {
  id: "tour_001",
  tourName: "Spring Tour 2026",
  venue: "Orto Bar",
  city: "Ljubljana",
  state: null,
  country: "Slovenia",
  date: new Date("2026-04-15"),
  time: "21:00",
  doors: "20:00",
  ticketUrl: "https://eventim.si/the-drinkers",
  ticketUrlLocal: null,
  ticketPrice: "25.00",
  ticketPriceMin: null,
  ticketPriceMax: null,
  status: "on_sale",
  capacity: 300,
  soldTickets: 187,
  supportActs: [
    { name: "Local Band A", image: "/images/bands/local-a.jpg" },
    { name: "DJ B", image: "/images/djs/dj-b.jpg" },
  ],
  ageRestriction: "18+",
  vipAvailable: true,
  vipDescription: "VIP includes backstage access and signed poster",
  featured: true,
  active: true,
  notes: "Opening night of Spring Tour",
};
```

---

## 🎨 STATUS BADGES

### **Available Statuses**

```typescript
type TourStatus =
  | "announced" // Blue gradient - "Just Announced"
  | "on_sale" // Green gradient - "On Sale Now"
  | "sold_out" // Red gradient - "Sold Out"
  | "completed" // Gray - "Completed"
  | "cancelled" // Dark gray - "Cancelled"
  | "postponed"; // Orange gradient - "Postponed"
```

---

## 🎫 TICKET AVAILABILITY

### **Progress Bar States**

```typescript
// Automatically calculated based on soldTickets / capacity

0-70% sold:   Green gradient (Good availability)
70-90% sold:  Orange gradient (Low availability)
90-100% sold: Red gradient + "Selling fast!" warning
```

---

## 🎯 AGE RESTRICTION BADGES

### **Supported Values**

```typescript
type AgeRestriction =
  | "all_ages" // All Ages (green check icon)
  | "16+" // 16+ (alert icon)
  | "18+" // 18+ (alert icon)
  | "21+" // 21+ (alert icon)
  | string; // Custom (users icon)
```

---

## 📅 CALENDAR INTEGRATION

### **Add to Calendar Handlers**

```typescript
const handleAddToCalendar = (
  tourDate: TourDate,
  calendarType: "google" | "apple" | "outlook",
) => {
  const eventDetails = {
    title: `The Drinkers - ${tourDate.venue}`,
    description: tourDate.tourName,
    location: `${tourDate.venue}, ${tourDate.city}, ${tourDate.country}`,
    start: tourDate.date,
    end: new Date(tourDate.date.getTime() + 3 * 60 * 60 * 1000), // +3 hours
  };

  // Google Calendar
  if (calendarType === "google") {
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.title)}&dates=${formatDate(eventDetails.start)}/${formatDate(eventDetails.end)}&details=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
    window.open(url, "_blank");
  }

  // Apple Calendar (.ics file)
  if (calendarType === "apple") {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${eventDetails.title}
DTSTART:${formatDate(eventDetails.start)}
DTEND:${formatDate(eventDetails.end)}
DESCRIPTION:${eventDetails.description}
LOCATION:${eventDetails.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "event.ics";
    link.click();
  }

  // Outlook
  if (calendarType === "outlook") {
    const url = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(eventDetails.title)}&startdt=${formatDate(eventDetails.start)}&enddt=${formatDate(eventDetails.end)}&body=${encodeURIComponent(eventDetails.description)}&location=${encodeURIComponent(eventDetails.location)}`;
    window.open(url, "_blank");
  }
};
```

---

## 🗺️ MAP INTEGRATION

### **View on Map Handler**

```typescript
const handleViewOnMap = (tourDate: TourDate) => {
  const query = encodeURIComponent(
    `${tourDate.venue}, ${tourDate.city}, ${tourDate.country}`,
  );

  // Google Maps
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${query}`,
    "_blank",
  );

  // Or Apple Maps
  // window.open(`https://maps.apple.com/?q=${query}`, '_blank');
};
```

---

## 🎭 ANIMATIONS

### **Framer Motion Features**

```tsx
// Card hover lift
whileHover={{ y: -4 }}

// Status badge scale
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}

// Ticket availability progress
initial={{ width: 0 }}
animate={{ width: `${percentageSold}%` }}
transition={{ duration: 0.5, delay: 0.2 }}

// Calendar dropdown
initial={{ opacity: 0, y: -10 }}
animate={{ opacity: 1, y: 0 }}
```

---

## 📱 RESPONSIVE DESIGN

```tsx
// Mobile (default)
- Full-width card
- Stacked layout
- Touch-friendly buttons

// md: (768px+)
- Grid layouts for support acts
- Side-by-side time details

// lg: (1024px+)
- Desktop optimized
- Hover effects enabled
- Calendar dropdown grid
```

---

## 🎨 CUSTOMIZATION

### **Featured Show Border**

```tsx
// Change featured border color
className={`border ${
  tourDate.featured
    ? 'border-purple-500 dark:border-purple-400'
    : 'border-gray-200 dark:border-gray-700'
}`}
```

### **Date Badge Gradient**

```tsx
// Change date badge gradient
className="bg-gradient-to-br from-purple-600 to-pink-600"

// Alternative gradients:
from-blue-600 to-cyan-600   // Blue theme
from-green-600 to-emerald-600 // Green theme
from-red-600 to-rose-600    // Red theme
```

---

## 🔌 INTEGRATION

### **With Drizzle ORM**

```typescript
// lib/db/schema/index.ts
export const tourDate = pgTable("tour_date", {
  id: uuid("id").primaryKey().defaultRandom(),
  tourName: varchar("tour_name", { length: 255 }),
  venue: varchar("venue", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  date: date("date").notNull(),
  time: time("time"),
  doors: time("doors"),
  ticketUrl: text("ticket_url"),
  ticketPrice: decimal("ticket_price", { precision: 10, scale: 2 }),
  status: varchar("status", { length: 50 }).notNull().default("announced"),
  capacity: integer("capacity"),
  soldTickets: integer("sold_tickets").default(0),
  supportActs: jsonb("support_acts").$type<SupportAct[]>(),
  ageRestriction: varchar("age_restriction", { length: 50 }),
  vipAvailable: boolean("vip_available").default(false),
  featured: boolean("featured").default(false),
  active: boolean("active").default(true),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

### **With Stripe**

```typescript
// app/api/tickets/route.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { tourDateId, quantity } = await req.json();

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: `The Drinkers - ${tourDateId}`,
            images: ["/images/tour/default.jpg"],
          },
          unit_amount: 2500, // €25.00
          currency: "eur",
        },
        quantity,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.get("origin")}/success`,
    cancel_url: `${req.headers.get("origin")}/tour`,
  });

  return Response.json({ url: session.url });
}
```

---

## 🧪 TESTING

### **Unit Test Example**

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { TourDateCard } from "@/components/features";

describe("TourDateCard", () => {
  const mockTourDate = {
    id: "1",
    tourName: "Test Tour",
    venue: "Test Venue",
    city: "Ljubljana",
    country: "Slovenia",
    date: new Date("2026-04-15"),
    time: "21:00",
    doors: "20:00",
    ticketUrl: "https://test.com",
    ticketPrice: "25.00",
    status: "on_sale",
    capacity: 300,
    soldTickets: 187,
    supportActs: [],
    ageRestriction: "18+",
    vipAvailable: true,
    featured: true,
    active: true,
    notes: null,
  };

  it("renders venue and city", () => {
    render(<TourDateCard tourDate={mockTourDate} />);
    expect(screen.getByText("Test Venue")).toBeInTheDocument();
    expect(screen.getByText("Ljubljana, Slovenia")).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<TourDateCard tourDate={mockTourDate} />);
    expect(screen.getByText("On Sale Now")).toBeInTheDocument();
  });

  it("calls onGetTickets when button clicked", () => {
    const mockGetTickets = jest.fn();
    render(
      <TourDateCard tourDate={mockTourDate} onGetTickets={mockGetTickets} />,
    );
    fireEvent.click(screen.getByText("Get Tickets"));
    expect(mockGetTickets).toHaveBeenCalledWith(mockTourDate);
  });

  it("shows ticket availability progress", () => {
    render(<TourDateCard tourDate={mockTourDate} />);
    expect(screen.getByText("113 tickets left")).toBeInTheDocument();
    expect(screen.getByText("62% sold")).toBeInTheDocument();
  });
});
```

---

## 📦 FILE STRUCTURE

```
components/
└── features/
    ├── TourDateCard.tsx           # Main component
    └── index.ts                   # Exports
```

---

## 🎯 BEST PRACTICES

1. **Always show status clearly** - Users need to know if tickets are available
2. **Display price ranges** - Help users make informed decisions
3. **Show support acts** - Important for concert-goers
4. **Include age restrictions** - Critical information
5. **Add calendar integration** - Increases attendance
6. **Show ticket availability** - Creates urgency
7. **Provide map links** - Helps with venue navigation
8. **Mobile-first design** - Most users browse on mobile
9. **Fast loading** - Optimize images and animations
10. **Accessible** - Keyboard navigation, ARIA labels

---

## 🎉 READY TO USE!

All components are production-ready and fully integrated with:

- ✅ Next.js 15 App Router
- ✅ React 18.3.1
- ✅ TypeScript 5.3.3
- ✅ Tailwind CSS 3.4.0
- ✅ Framer Motion 11.15.0
- ✅ Lucide React icons
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Drizzle ORM compatible
- ✅ Stripe integration ready

**Created:** 2026-03-25  
**Status:** ✅ Production Ready  
**Version:** 1.0.0
