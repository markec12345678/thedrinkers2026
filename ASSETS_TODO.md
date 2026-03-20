# The Drinkers - Project Structure

## Created Assets

### Images
- `/public/images/logo.png` - Generated rock band logo (AI generated)
- `/public/images/hero-poster.jpg` - Hero section poster placeholder
- `/public/og-image.jpg` - Open Graph social sharing image

### Videos  
- `/public/videos/hero-loop.mp4` - Hero background video placeholder

## Missing Assets to Create

### Album Artwork
- `/public/images/albums/first-round.jpg`
- `/public/images/albums/midnight-rocker.jpg` 
- `/public/images/albums/last-call.jpg`

### Band Member Photos
- `/public/images/members/jani.jpg`
- `/public/images/members/mato.jpg`
- `/public/images/members/luka.jpg`
- `/public/images/members/gogi.jpg`

### Merchandise Images
- `/public/images/merch/tshirt-last-call-front.jpg`
- `/public/images/merch/tshirt-last-call-back.jpg`
- `/public/images/merch/hoodie-logo.jpg`
- `/public/images/merch/vinyl-last-call.jpg`
- `/public/images/merch/cap.jpg`

### Video Thumbnails
- `/public/images/videos/last-call-thumb.jpg`
- `/public/images/videos/balkan-express-thumb.jpg`
- `/public/images/videos/bts-last-call-thumb.jpg`

### Gallery Images
- `/public/images/gallery/live-001.jpg`
- `/public/images/gallery/live-002.jpg`
- `/public/images/gallery/backstage-001.jpg`
- `/public/images/gallery/promo-001.jpg`
- `/public/images/gallery/fan-art-001.jpg`
- `/public/images/gallery/live-003.jpg`
- `/public/images/gallery/backstage-002.jpg`
- `/public/images/gallery/promo-002.jpg`

## Environment Variables Needed

### High Priority
- `NEXTAUTH_SECRET` - Generate with: openssl rand -base64 32
- `SPOTIFY_CLIENT_ID` - Spotify Developer Dashboard
- `SPOTIFY_CLIENT_SECRET` - Spotify Developer Dashboard

### Medium Priority
- `YOUTUBE_API_KEY` - Google Cloud Console
- `RESEND_API_KEY` - For contact forms
- `NEXT_PUBLIC_VERCEL_ANALYTICS_ID` - Vercel Dashboard

### Optional
- `GOOGLE_MAPS_API_KEY` - If using Google Maps
- `EVENTIM_API_KEY` - Ticketing integration

## Generated Content

### Logo (AI Generated)
- URL: https://cdn-video.51sux.com/mcp-images/20260320/17bdfb1a-0d44-4679-a90c-9a2fa55e88f7.png
- Style: Rock/metal logo with crimson red and black
- Usage: Band logo, branding materials
