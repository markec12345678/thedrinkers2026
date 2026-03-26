# 🤖 AI PERSONALIZATION SETUP GUIDE

**Complete guide for implementing AI-powered personalization**

---

## 🎯 AI FEATURES FOR THE DRINKERS

### **1. Personalized Recommendations** 🎵

```
✅ Recommend songs based on listening history
✅ Suggest merch based on preferences
✅ Recommend tour dates by location
✅ Smart setlist generation
```

### **2. AI Chatbot** 💬

```
✅ Answer fan questions 24/7
✅ Help with merch selection
✅ Tour date information
✅ VIP membership info
✅ Order support
```

### **3. Smart Setlists** 🎸

```
✅ AI-generated setlists
✅ Based on fan votes
✅ Location-based songs
✅ Mood-based selection
```

### **4. Content Personalization** 📱

```
✅ Personalized homepage
✅ Custom email content
✅ Targeted notifications
✅ Dynamic merch display
```

---

## 🛠️ TECHNOLOGY STACK

### **For Recommendations:**

```
✅ Collaborative filtering
✅ Content-based filtering
✅ Hybrid approach
✅ Machine learning models
```

### **For Chatbot:**

```
✅ OpenAI GPT-4
✅ Anthropic Claude
✅ Custom RAG (Retrieval Augmented Generation)
✅ Dialogflow (Google)
```

### **For Personalization:**

```
✅ User behavior tracking
✅ Preference learning
✅ Context-aware recommendations
✅ A/B testing framework
```

---

## 📋 IMPLEMENTATION

### **1. Personalized Recommendations**

**Database Schema:**

```typescript
// lib/db/schema/recommendations.ts
import { pgTable, uuid, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";

// User listening history
export const userListeningHistory = pgTable("user_listening_history", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  songId: uuid("song_id").notNull(),
  playCount: integer("play_count").default(1),
  lastPlayedAt: timestamp("last_played_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User preferences
export const userPreferences = pgTable("user_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  favoriteGenres: jsonb("favorite_genres").$type<string[]>(),
  favoriteAlbums: jsonb("favorite_albums").$type<string[]>(),
  favoriteSongs: jsonb("favorite_songs").$type<string[]>(),
  location: varchar("location", { length: 255 }),
  concertAttendance: integer("concert_attendance").default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Recommendations
export const recommendations = pgTable("recommendations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  type: varchar("type", { length: 50 }), // song, merch, tour
  itemId: uuid("item_id").notNull(),
  score: decimal("score", { precision: 5, scale: 4 }), // 0-1 confidence
  reason: varchar("reason", { length: 500 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

**API Endpoint:**

```typescript
// app/api/recommendations/route.ts
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get("X-User-ID");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 401 });
    }

    // Get user preferences
    const preferences = await getUserPreferences(userId);

    // Get listening history
    const history = await getUserListeningHistory(userId);

    // Generate recommendations
    const recommendations = await generateRecommendations({
      preferences,
      history,
    });

    return NextResponse.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate recommendations" },
      { status: 500 },
    );
  }
}

// Recommendation algorithm
async function generateRecommendations({ preferences, history }: any) {
  // Collaborative filtering
  const collaborativeRecs = await collaborativeFiltering(history);

  // Content-based filtering
  const contentRecs = await contentBasedFiltering(preferences);

  // Hybrid approach
  const hybridRecs = combineRecommendations(collaborativeRecs, contentRecs);

  return hybridRecs.slice(0, 10); // Top 10 recommendations
}
```

---

### **2. AI Chatbot**

**Setup with OpenAI:**

```typescript
// app/api/chat/route.ts
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { message, userId, context } = await request.json();

    // Get conversation history
    const conversationHistory = await getConversationHistory(userId);

    // Build system prompt
    const systemPrompt = `You are The Drinkers band assistant. Help fans with:
- Tour dates and ticket information
- Merchandise recommendations
- Music and album information
- VIP membership details
- General band information

Be friendly, enthusiastic, and helpful. Always promote the band positively.`;

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;

    // Save to conversation history
    await saveConversation(userId, message, response);

    return NextResponse.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error("Error in chat:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process message" },
      { status: 500 },
    );
  }
}
```

**Chatbot UI Component:**

```typescript
// components/chat/ChatBot.tsx
'use client';

import { useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: input }]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({
          message: input,
          userId: 'current-user-id',
        }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4">
        <h3 className="text-white font-bold">🤖 The Drinkers Assistant</h3>
      </div>

      {/* Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-gray-500 text-sm">Typing...</div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me anything..."
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
```

---

### **3. Smart Setlists**

**AI Setlist Generator:**

```typescript
// app/api/ai-setlist/generate/route.ts
export async function POST(request: NextRequest) {
  try {
    const { mood, location, fanVotes, duration } = await request.json();

    // Get all songs
    const songs = await getAllSongs();

    // Score songs based on criteria
    const scoredSongs = songs.map((song) => ({
      ...song,
      score: calculateScore(song, { mood, location, fanVotes }),
    }));

    // Sort by score
    scoredSongs.sort((a, b) => b.score - a.score);

    // Select top songs for duration
    const setlist = selectSongsForDuration(scoredSongs, duration);

    // Optimize order (energy flow)
    const optimizedSetlist = optimizeSetlistOrder(setlist);

    return NextResponse.json({
      success: true,
      setlist: optimizedSetlist,
    });
  } catch (error) {
    console.error("Error generating setlist:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate setlist" },
      { status: 500 },
    );
  }
}

// Scoring algorithm
function calculateScore(song: any, criteria: any) {
  let score = 0;

  // Mood match
  if (song.mood === criteria.mood) {
    score += 0.3;
  }

  // Fan votes
  score += (song.fanVotes / criteria.maxVotes) * 0.4;

  // Location preference
  if (song.locationRelevance === criteria.location) {
    score += 0.2;
  }

  // Recent plays
  score += (1 - song.recentPlays) * 0.1;

  return score;
}

// Optimize setlist order (energy flow)
function optimizeSetlistOrder(setlist: any[]) {
  // Start with high energy
  // Middle: varied energy
  // End: highest energy + encore

  return setlist.sort((a, b) => {
    // Simple energy-based sorting
    return b.energy - a.energy;
  });
}
```

---

## 📊 DATA COLLECTION

### **Track User Behavior:**

```typescript
// Track song plays
trackEvent("song_play", {
  userId,
  songId,
  albumId,
  timestamp: new Date(),
});

// Track merch views
trackEvent("merch_view", {
  userId,
  productId,
  category,
  price,
  timestamp: new Date(),
});

// Track tour interest
trackEvent("tour_interest", {
  userId,
  city,
  venue,
  date,
  timestamp: new Date(),
});
```

---

## 🎯 PERSONALIZATION EXAMPLES

### **Homepage Personalization:**

```typescript
// Different content for each user based on:
- Listening history
- Location
- Past purchases
- Tour attendance
- Merch preferences
```

### **Email Personalization:**

```typescript
// Send targeted emails:
- New song release (to active listeners)
- Tour in their city (to local fans)
- Merch they viewed (to browsers)
- VIP upgrade offer (to engaged fans)
```

---

## 💰 COST BREAKDOWN

### **OpenAI API:**

```
GPT-4: ~$0.03 per 1K tokens
Average chat: 500 tokens
Cost per conversation: ~€0.015

Example:
1,000 conversations/day = €15/day = €450/month
```

### **Alternative (Cheaper):**

```
GPT-3.5 Turbo: ~$0.002 per 1K tokens
1,000 conversations/day = €1/day = €30/month
```

---

## 🚀 QUICK START

### **Phase 1: Basic Recommendations (2 uri)**

```
1. Setup user preferences table
2. Track listening history
3. Simple collaborative filtering
4. Display recommendations
```

### **Phase 2: AI Chatbot (3 ure)**

```
1. Setup OpenAI API
2. Create chat endpoint
3. Build chat UI
4. Train on band info
```

### **Phase 3: Smart Setlists (2 uri)**

```
1. Enhance existing AI setlist
2. Add mood/location factors
3. Add fan voting
4. Optimize energy flow
```

---

## ✅ CONCLUSION

**AI Personalization ready!**

```
Status: ✅ Guide complete
Time to implement: 7-10 ur
Cost: €30-450/month (API costs)
Impact: HIGH (engagement, conversions)
```

**Next:**

1. Setup user tracking
2. Implement recommendations
3. Add AI chatbot
4. Enhance setlist generator
5. Launch! 🤖

---

**AI personalization pripravljena!** 🤖✅
