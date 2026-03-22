# 🎬 THE DRINKERS - AI VIDEO GENERATION SCRIPTS 2026

## 📊 VIDEO TRENDI 2026

### **Ključni Insights:**
- ✅ **Short-form video dominira** - 15-30s optimalno
- ✅ **Authentic > Polished** - Raw content outperforms
- ✅ **Fast-paced edits** - Cuts na 2-3 sekunde
- ✅ **Vertical format** - 9:16 za mobile-first
- ✅ **Audio sync** - Beat-matched transitions
- ✅ **Text overlays** - Silent viewing friendly

### **Platform Specs 2026:**
| Platforma | Format | Dolžina | FPS | Max File Size |
|-----------|--------|---------|-----|---------------|
| **Instagram Reel** | 1080x1920 (9:16) | 15-90s | 30 | 4GB |
| **TikTok** | 1080x1920 (9:16) | 15-60s | 30 | 287.6MB |
| **Facebook Reel** | 1080x1920 (9:16) | 15-60s | 30 | 4GB |
| **YouTube Shorts** | 1080x1920 (9:16) | 15-60s | 30 | 256MB |
| **Twitter/X** | 1280x720 (16:9) | 3-15s | 30 | 512MB |

---

## 🎯 VIDEO SCRIPTI PO KAMPA NJAH

### **VIDEO 1: Dan 3 - Instagram Reel Teaser (15s)**

**Koncept:** "30 Let Rock'n'rolla"

```bash
# Generiranje z Google Veo 3.1
infsh app run google/veo-3-1 --input '{
  "prompt": "15 second vertical rock band teaser video for Instagram Reel, sequence: [0-2s] black screen with white text \"30 LET...\" fade in, [2-5s] extreme close-up electric guitar strings vibrating with crimson red lighting, [5-8s] drummer hands hitting snare drum in slow motion, stage lights flickering, [8-11s] singer hand grabbing vintage microphone, dramatic shadows, [11-13s] beer mug slamming on wooden table, liquid splash frozen in time, [13-15s] The Drinkers band logo reveal with crimson red glow and text \"thedrinkers.si KMALU\", authentic concert footage aesthetic, raw energy not overproduced, fast-paced cuts every 2-3 seconds, vertical 9:16 format 1080x1920, 30fps, professional but gritty, Slovenian rock band style, high contrast, dramatic stage lighting",
  "aspect_ratio": "9:16",
  "duration": 15,
  "fps": 30,
  "output_format": "mp4",
  "quality": "high"
}' --output public/images/social/instagram/reels/teaser-30let-day3.mp4

# Alternative z Wan 2.5 (boljša kvaliteta)
infsh app run wanai/wan-2-5 --input '{
  "prompt": "Fast-paced rock music teaser, 15 seconds, guitar strings close-up, drummer hands, singer with mic, beer mug slam, logo reveal, crimson red #dc143c stage lighting, dark background, vertical 9:16 for Instagram Reel, authentic concert energy, raw aesthetic",
  "aspect_ratio": "9:16",
  "duration": 15,
  "output_format": "mp4",
  "quality": "high"
}' --output public/images/social/instagram/reels/teaser-30let-day3-wan.mp4

# Alternative s Seedance (hitreje)
infsh app run bytedance/seedance-1-5-pro --input '{
  "prompt": "Rock band teaser video, 15s, guitar drummer singer beer mug, logo reveal, crimson lighting, vertical format",
  "aspect_ratio": "9:16",
  "duration": 15,
  "output_format": "mp4"
}' --output public/images/social/instagram/reels/teaser-30let-day3-seedance.mp4
```

**Audio Post-Production (v CapCut/Premiere):**
```
Track: "Pijemo ga radi" - glavni riff (instrumental)
Duration: 15 seconds
BPM: 120-140 (energetic rock)

Timeline:
[0:00-0:02]  Black screen, text fade in, audio: drum hit
[0:02-0:05]  Guitar close-up, audio: guitar riff starts
[0:05-0:08]  Drummer, audio: full band kicks in
[0:08-0:11]  Singer with mic, audio: vocal build-up
[0:11-0:13]  Beer mug slam, audio: bass drop + crowd cheer
[0:13-0:15]  Logo reveal, audio: final chord + fade out

Transitions:
- Cut on beat (every 2-3s)
- Flash frame na vsakem cutu
- Subtle shake effect na beat
```

**Text Overlays:**
```
Font: Bold sans-serif (Montserrat Bold / Bebas Neue)
Color: White (#ffffff) z crimson shadow (#dc143c)
Size: Large, mobile-readable

[0-2s]:   "30 LET..."
[13-15s]: "thedrinkers.si"
          "KMALU"
```

**Caption:**
```
Kdo smo? The Drinkers. 🎸
Kaj igramo? Rock'n'roll. 🤘
Kdaj? Kmalu. ⏰

#TheDrinkers #SlovenianRock #BoozeRock #NewMusic #Reels #FYP
#RockMusic #Slovenia #ComingSoon #Guitar #Drummer #LiveMusic
```

---

### **VIDEO 2: Dan 7 - TikTok Launch Hype (10s)**

**Koncept:** "JUTRI! Ob 18:00!"

```bash
# Generiranje z Google Veo 3.1
infsh app run google/veo-3-1 --input '{
  "prompt": "10 second vertical hype video for TikTok launch announcement, fast text animations with beat sync: [0-2s] bold white text \"JUTRI\" slams onto screen with crimson red explosion background, [2-4s] text \"OB 18:00\" zooms in with motion blur, [4-6s] website URL \"thedrinkers.si\" types out letter by letter with glow effect, [6-8s] The Drinkers band logo pulses with red glow, [8-10s] text \"SET YOUR ALARMS! ⏰\" bounces with alarm clock icon, energetic transitions with crimson red #dc143c light leaks and particle effects, vertical 9:16 format 1080x1920, 30fps, high energy, rock concert aesthetic, Slovenian band branding, professional motion graphics",
  "aspect_ratio": "9:16",
  "duration": 10,
  "fps": 30,
  "output_format": "mp4",
  "quality": "high"
}' --output public/images/social/all-platforms/launch-hype-day7-tiktok.mp4

# Alternative z Wan 2.5
infsh app run wanai/wan-2-5 --input '{
  "prompt": "10s TikTok hype video, text animations JUTRI OB 18:00, The Drinkers logo, crimson red explosions, vertical 9:16, high energy",
  "aspect_ratio": "9:16",
  "duration": 10,
  "output_format": "mp4"
}' --output public/images/social/all-platforms/launch-hype-day7-tiktok-wan.mp4
```

**Audio Post-Production:**
```
Track: Epic cinematic trailer music ali rock build-up
Duration: 10 seconds
BPM: 140+ (high energy)

Timeline:
[0:00-0:02]  "JUTRI" slam, audio: bass hit + whoosh
[0:02-0:04]  "OB 18:00" zoom, audio: rising synth
[0:04-0:06]  URL types out, audio: keyboard clicks + build
[0:06-0:08]  Logo pulse, audio: drum roll
[0:08-0:10]  "SET YOUR ALARMS", audio: alarm bell + final hit

SFX:
- Whooshes na transitions
- Hits na text slams
- Alarm sound effect na koncu
```

**Caption (TikTok):**
```
🚀 JUTRI! OB 18:00! 🚀

thedrinkers.si

Set your alarms! ⏰

#TheDrinkers #LaunchDay #Tomorrow #SlovenianRock #NewWebsite
#BoozeRock #RockMusic #Slovenia #NewEra #FYP #TikTokSlovenia
```

---

### **VIDEO 3: Dan 4 - Twitter/X Logo Animation (3s loop)**

**Koncept:** "Pulsing Logo GIF"

```bash
# Generiranje z Google Veo 3.1
infsh app run google/veo-3-1 --input '{
  "prompt": "3 second seamless looping animated GIF for Twitter/X, The Drinkers band logo in center with pulsing crimson red #dc143c glow effect that expands and contracts rhythmically, black background #0a0a0a, subtle smoke particles floating, minimal rock aesthetic, 16:9 horizontal format 1200x675, professional social media banner animation, smooth loop",
  "aspect_ratio": "16:9",
  "duration": 3,
  "fps": 24,
  "output_format": "gif",
  "quality": "high"
}' --output public/images/social/twitter/posts/logo-pulse-day4.gif

# Convert MP4 to GIF (če Veo ne dela GIF)
infsh app run google/veo-3-1 --input '{
  "prompt": "3 second logo animation, The Drinkers band logo pulsing crimson red glow, black background, 16:9 horizontal",
  "aspect_ratio": "16:9",
  "duration": 3,
  "output_format": "mp4"
}' --output public/images/social/twitter/posts/logo-pulse-day4-temp.mp4

#然后用 ffmpeg convert to GIF
ffmpeg -i public/images/social/twitter/posts/logo-pulse-day4-temp.mp4 -vf "fps=24,scale=1200:-1:flags=lanczos" -loop 0 public/images/social/twitter/posts/logo-pulse-day4.gif
```

---

### **VIDEO 4: Bonus - Behind The Scenes (30s)**

**Koncept:** "Making Of Website"

```bash
infsh app run google/veo-3-1 --input '{
  "prompt": "30 second behind the scenes video of website design process, sequence: [0-5s] computer screen showing The Drinkers website design in Figma, cursor moving, [5-10s] developer typing code on mechanical keyboard, VS Code with React components, [10-15s] team meeting around laptop, pointing at screen, modern office, [15-20s] close-up of coffee cups and notebooks with sketches, [20-25s] screen recording of website scrolling through pages, [25-30s] final logo reveal with text \"thedrinkers.si - Coming Soon\", professional documentary style, warm lighting, collaborative atmosphere, vertical 9:16 for Instagram Stories, 30fps",
  "aspect_ratio": "9:16",
  "duration": 30,
  "fps": 30,
  "output_format": "mp4"
}' --output public/images/social/instagram/stories/bts-website.mp4
```

**Audio:**
```
Track: Lo-fi chill beat ali acoustic guitar
Duration: 30 seconds
Mood: Relaxed, creative
```

---

### **VIDEO 5: Bonus - Band Member Introductions (60s)**

**Koncept:** "Spoznaj Člane Banda"

```bash
infsh app run wanai/wan-2-5 --input '{
  "prompt": "60 second vertical video introducing The Drinkers band members, sequence with text overlays: [0-2s] intro title \"SPOZNAJ THE DRINKERS\", [2-14s] lead singer portrait with name and role text, [14-26s] guitarist portrait with name and role, [26-38s] bassist portrait with name and role, [38-50s] drummer portrait with name and role, [50-60s] full band photo with text \"thedrinkers.si - Coming Soon\", each member shown performing on stage with their instrument, crimson red stage lighting, dynamic concert footage style, vertical 9:16 for Instagram Reel/TikTok, 30fps, professional music video aesthetic",
  "aspect_ratio": "9:16",
  "duration": 60,
  "fps": 30,
  "output_format": "mp4"
}' --output public/images/social/instagram/reels/band-members-intro.mp4
```

---

## 🎬 VIDEO EDITING WORKFLOW

### **1. CapCut Workflow (Free)**

```
1. Import AI-generated video
2. Add audio track
3. Sync cuts to beat (auto-beat detection)
4. Add text overlays:
   - Font: Montserrat Bold
   - Color: White z crimson shadow
   - Animation: Fade in + slight zoom
5. Add transitions:
   - Flash frame (1 frame white)
   - Light leak overlay
   - Shake effect on beat
6. Color grading:
   - Contrast: +20
   - Saturation: +10
   - Temperature: -5 (cooler)
   - Tint: +10 (crimson)
7. Export:
   - Resolution: 1080x1920
   - Frame rate: 30fps
   - Bitrate: 15 Mbps
   - Format: MP4 (H.264)
```

### **2. Adobe Premiere Pro Workflow**

```xml
<!-- Sequence Settings -->
<sequence>
  <frameSize>1080, 1920</frameSize>
  <pixelAspectRatio>1.0</pixelAspectRatio>
  <timebase>30.00</timebase>
</sequence>

<!-- Export Settings -->
<export>
  <format>H.264</format>
  <preset>Match Source - High Bitrate</preset>
  <bitrate>
    <target>15</target>
    <maximum>20</maximum>
  </bitrate>
  <audio>
    <codec>AAC</codec>
    <sampleRate>48000</sampleRate>
    <bitrate>320</bitrate>
  </audio>
</export>
```

---

## 🎵 AUDIO RESOURCES

### **Free Music Sources:**
```
✅ YouTube Audio Library (free, royalty-free)
✅ Epidemic Sound (paid, high quality)
✅ Artlist (paid, unlimited)
✅ Bensound (free with attribution)
✅ Incompetech (free, Kevin MacLeod)
```

### **AI-Generated Music:**
```bash
# Generate custom rock track with AI
infsh app run diffrythm/fast-song --input '{
  "prompt": "Energetic rock instrumental, 120-140 BPM, electric guitar riff, drums, bass, 15 seconds, intro-build-drop structure, suitable for social media teaser",
  "duration": 15,
  "genre": "rock",
  "mood": "energetic"
}' --output audio/rock-teaser-15s.mp3
```

---

## 📊 VIDEO PERFORMANCE OPTIMIZATION

### **Compression Settings:**
```bash
# FFmpeg optimal compression
ffmpeg -i input.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" \
  output-optimized.mp4
```

### **Platform-Specific Optimization:**

**Instagram Reels:**
```
✅ 1080x1920 (9:16)
✅ 30fps
✅ H.264 codec
✅ AAC audio
✅ Max 15-30s for teasers
✅ Cover image: 1080x1920
```

**TikTok:**
```
✅ 1080x1920 (9:16)
✅ 30fps
✅ H.264 codec
✅ AAC audio, 44.1kHz
✅ Max 60s
✅ Thumbnail: 1080x1920
```

**Twitter/X:**
```
✅ 1280x720 (16:9) ali 1080x1920 (9:16)
✅ 30fps
✅ H.264 codec
✅ AAC audio
✅ Max 15s za GIF-style
✅ Max 2:20 za regular videos
```

---

## 🚀 BATCH VIDEO GENERATION

```bash
#!/bin/bash
# generate-all-videos.sh

echo "🎬 Generiranje vseh video assetov..."

# Dan 3 - Instagram Reel
echo "📸 Dan 3: Instagram Reel..."
infsh app run google/veo-3-1 --input '{
  "prompt": "15 second vertical rock band teaser video, guitar close-up, drummer, singer, beer mug slam, logo reveal, crimson red lighting, 9:16",
  "aspect_ratio": "9:16",
  "duration": 15,
  "output_format": "mp4"
}' --output public/images/social/instagram/reels/teaser-day3.mp4

# Dan 4 - Twitter/X GIF
echo "🐦 Dan 4: Twitter/X Animation..."
infsh app run google/veo-3-1 --input '{
  "prompt": "3 second logo animation loop, The Drinkers logo pulsing crimson red glow, black background, 16:9 horizontal",
  "aspect_ratio": "16:9",
  "duration": 3,
  "output_format": "mp4"
}' --output public/images/social/twitter/posts/logo-day4.mp4

# Dan 7 - TikTok Hype
echo "🎵 Dan 7: TikTok Hype Video..."
infsh app run google/veo-3-1 --input '{
  "prompt": "10 second hype video, JUTRI OB 18:00 text animations, The Drinkers logo, crimson red explosions, vertical 9:16",
  "aspect_ratio": "9:16",
  "duration": 10,
  "output_format": "mp4"
}' --output public/images/social/all-platforms/launch-day7-tiktok.mp4

# Bonus - BTS
echo "🎬 Bonus: Behind The Scenes..."
infsh app run google/veo-3-1 --input '{
  "prompt": "30 second behind the scenes website design process, computer screen, typing code, team meeting, coffee, vertical 9:16",
  "aspect_ratio": "9:16",
  "duration": 30,
  "output_format": "mp4"
}' --output public/images/social/instagram/stories/bts.mp4

echo "✅ Generiranje video končano!"
```

---

## 📈 VIDEO ANALYTICS TRACKING

### **Metrics to Track:**
```
👁️ Views (0-3s, 3s, complete)
❤️ Likes
💬 Comments
🔄 Shares
💾 Saves
📈 Completion Rate (%)
🔗 Profile Visits
🔗 Link Clicks
```

### **Benchmark 2026:**
| Metric | Good | Great | Viral |
|--------|------|-------|-------|
| **Completion Rate** | 40% | 60% | 80%+ |
| **Engagement Rate** | 3% | 5% | 10%+ |
| **Share Rate** | 1% | 3% | 5%+ |
| **Save Rate** | 0.5% | 1% | 3%+ |

---

**PRIPRAVLJENO ZA VIDEO GENERIRANJE! 🎬🤘**
