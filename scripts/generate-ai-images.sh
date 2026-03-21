#!/bin/bash

# 🎸 THE DRINKERS - AI IMAGE GENERATION SCRIPT
# Generates all images needed for the website using AI

# Login to inference.sh first
echo "🔐 Logging in to inference.sh..."
infsh login

echo "🎨 Starting AI Image Generation for The Drinkers..."

# Create directories
mkdir -p public/images/albums
mkdir -p public/images/members
mkdir -p public/images/gallery
mkdir -p public/images/merch
mkdir -p public/images/tour

# ============================================
# 📀 ALBUM COVERS (7 albums)
# ============================================

echo "💿 Generating Album Covers..."

# 1. Lepi in trezni (1995)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Vintage rock album cover 1995 style, beer mug and guitar, crimson red and black color scheme, bold typography text \"LEPI IN TREZNI\", The Drinkers band logo, professional album artwork, high contrast, rock aesthetic",
  "aspect_ratio": "1:1"
}' > public/images/albums/lepi-in-trezni.json

# 2. Žeja (1997)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Rock album cover 1997, wine glass on dark background, deep red and black, elegant typography \"ŽEJA\", The Drinkers, professional music artwork, dramatic lighting",
  "aspect_ratio": "1:1"
}' > public/images/albums/zeja.json

# 3. Pivolucija (1999)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Beer revolution album cover 1999, beer bottle and fist, rebellious rock aesthetic, crimson and silver, text \"PIVOLUCIJA\", The Drinkers band, powerful imagery",
  "aspect_ratio": "1:1"
}' > public/images/albums/pivolucija.json

# 4. De Best Od (2001)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Greatest hits compilation album 2001, gold record disc, black background, text \"DE BEST OD\", The Drinkers, premium collection, shiny gold elements",
  "aspect_ratio": "1:1"
}' > public/images/albums/de-best-od.json

# 5. Prohibicija (2003)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Prohibition era album cover 2003, vintage speakeasy aesthetic, whiskey glass, dark moody atmosphere, text \"PROHIBICIJA\", The Drinkers, noir style",
  "aspect_ratio": "1:1"
}' > public/images/albums/prohibicija.json

# 6. Hajdi (2007)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Energetic rock album cover 2007, electric guitar with flames, dynamic composition, crimson red fire, text \"HAJDI\", The Drinkers, high energy design",
  "aspect_ratio": "1:1"
}' > public/images/albums/hajdi.json

# 7. Recidiv (2014)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Modern rock album cover 2014, urban street art style, graffiti elements, bold typography \"RECIDIV\", The Drinkers, contemporary design, edgy aesthetic",
  "aspect_ratio": "1:1"
}' > public/images/albums/recidiv.json

# ============================================
# 👥 BAND MEMBERS (5 members)
# ============================================

echo "👥 Generating Band Member Photos..."

# Matjaž Živković - Mati (Vocals)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Professional rock band vocalist portrait, charismatic male singer with microphone, stage lighting, energetic performance, long hair, rock star attitude, dramatic crimson lighting, concert atmosphere",
  "aspect_ratio": "4:5"
}' > public/images/members/matjaz.json

# Simon Kavšek - Šima (Lead Guitar)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Professional rock guitarist portrait, male musician with electric guitar, intense focus, stage performance, dramatic lighting, rock aesthetic, crimson and black color scheme",
  "aspect_ratio": "4:5"
}' > public/images/members/simon.json

# Robert Likar - Robi (Guitar)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Professional rock guitarist portrait, male musician with guitar, confident pose, concert lighting, rock band member, dramatic shadows, crimson accents",
  "aspect_ratio": "4:5"
}' > public/images/members/robert.json

# Miro Mutvar - Miro (Bass)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Professional rock bassist portrait, male musician with bass guitar, solid stance, stage performance, moody lighting, rock aesthetic, dark atmosphere",
  "aspect_ratio": "4:5"
}' > public/images/members/miro.json

# Roman Milavec - Romi (Drums)
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Professional rock drummer portrait, male drummer behind drum kit, energetic pose, drumsticks in hand, concert lighting, rock band member, dynamic composition",
  "aspect_ratio": "4:5"
}' > public/images/members/roman.json

# ============================================
# 🎫 TOUR VENUES (6 venues)
# ============================================

echo "🎫 Generating Tour Venue Images..."

# Orto Bar, Ljubljana
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Iconic rock club interior, small intimate venue, stage with instruments, crowd silhouettes, dramatic stage lighting, crimson and purple lights, energetic atmosphere, Ljubljana Orto Bar style",
  "aspect_ratio": "16:9"
}' > public/images/tour/ljubljana.json

# Pekarna, Maribor
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Industrial rock venue interior, converted factory space, exposed brick walls, stage setup, concert lighting, underground music club atmosphere, Maribor Pekarna style",
  "aspect_ratio": "16:9"
}' > public/images/tour/maribor.json

# Dvorišče, Koper
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Outdoor summer concert venue, courtyard setting, stage with lights, summer night atmosphere, crowd enjoying music, Mediterranean vibe, Koper coastal town",
  "aspect_ratio": "16:9"
}' > public/images/tour/koper.json

# Močvara, Zagreb
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Underground rock club interior, dark atmospheric venue, stage with professional lighting, intimate setting, Zagreb music scene, alternative culture",
  "aspect_ratio": "16:9"
}' > public/images/tour/zagreb.json

# Teatro Miela, Trieste
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Historic theater interior, elegant concert hall, stage with theatrical lighting, Italian architecture, Trieste cultural venue, sophisticated atmosphere",
  "aspect_ratio": "16:9"
}' > public/images/tour/trieste.json

# Arena, Vienna
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Large concert arena interior, professional stage setup, massive crowd, bright stage lights, Vienna music venue, epic scale, rock concert atmosphere",
  "aspect_ratio": "16:9"
}' > public/images/tour/vienna.json

# ============================================
# 👕 MERCHANDISE (6 products)
# ============================================

echo "👕 Generating Merchandise Images..."

# Pijemo ga radi T-Shirt
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Black rock band t-shirt mockup, crimson red text \"PIJEMO GA RADI\", The Drinkers band logo, professional product photography, white background, high quality merchandise",
  "aspect_ratio": "1:1"
}' > public/images/merch/tshirt-pijemo.json

# The Drinkers Hoodie
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Black rock band hoodie mockup, embroidered The Drinkers logo, premium quality, professional product photography, dark background, cozy merchandise",
  "aspect_ratio": "1:1"
}' > public/images/merch/hoodie.json

# Lepi in trezni Vinyl
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Vinyl record album cover, The Drinkers Lepi in trezni, black vinyl disc, professional product shot, music collector item, premium packaging",
  "aspect_ratio": "1:1"
}' > public/images/merch/vinyl.json

# The Drinkers Cap
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Black baseball cap with The Drinkers logo, embroidered emblem, professional product photography, merchandise mockup, rock band apparel",
  "aspect_ratio": "1:1"
}' > public/images/merch/cap.json

# Beer Mug
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Custom beer mug with The Drinkers logo engraved, glass beer stein, professional product photography, merchandise item, rock band memorabilia",
  "aspect_ratio": "1:1"
}' > public/images/merch/mug.json

# Prohibicija Koozie
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Beer koozie can holder, black with crimson text \"PROHIBICIJA\", The Drinkers merchandise, professional product shot, drink accessory",
  "aspect_ratio": "1:1"
}' > public/images/merch/koozie.json

# ============================================
# 🎸 GALLERY IMAGES (8 photos)
# ============================================

echo "🎸 Generating Gallery Images..."

# Live performance 1
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Rock band live performance on stage, energetic crowd surfing, dramatic stage lighting, crimson and purple lights, concert photography, professional music photography",
  "aspect_ratio": "16:9"
}' > public/images/gallery/live-1.json

# Live performance 2
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Guitarist solo on stage, spotlight, passionate performance, rock concert atmosphere, professional concert photography, dramatic lighting",
  "aspect_ratio": "16:9"
}' > public/images/gallery/live-2.json

# Backstage moment
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Backstage band photo, candid moment after concert, musicians relaxing, authentic behind the scenes, rock band lifestyle",
  "aspect_ratio": "16:9"
}' > public/images/gallery/backstage-1.json

# Promo shot
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Professional band promo photo, 5 members posed together, studio lighting, rock band portrait, promotional photography, high quality",
  "aspect_ratio": "16:9"
}' > public/images/gallery/promo-1.json

# Fan art moment
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Fan holding The Drinkers merchandise at concert, enthusiastic supporter, concert crowd, fan culture, music appreciation",
  "aspect_ratio": "16:9"
}' > public/images/gallery/fan-1.json

# Live performance 3
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Drummer in action, intense performance, drum kit, concert lighting, rock music photography, dynamic motion",
  "aspect_ratio": "16:9"
}' > public/images/gallery/live-3.json

# Backstage party
infsh app run falai/flux-dev-lora --input '{
  "prompt": "After party backstage, band celebrating with fans, authentic moment, rock concert afterparty, candid photography",
  "aspect_ratio": "16:9"
}' > public/images/gallery/backstage-2.json

# Album cover shoot
infsh app run falai/flux-dev-lora --input '{
  "prompt": "Behind the scenes album cover photoshoot, band posing for photographer, studio setting, creative process, music industry",
  "aspect_ratio": "16:9"
}' > public/images/gallery/promo-2.json

echo "✅ AI Image Generation Complete!"
echo "📁 Images saved to public/images/"
echo ""
echo "🎨 Next Steps:"
echo "1. Review generated images"
echo "2. Convert JSON to actual images using inference.sh"
echo "3. Optimize images for web"
echo "4. Deploy!"
