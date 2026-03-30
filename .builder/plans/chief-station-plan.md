# AI Batch Image Generation - Plan za Implementacijo

## Pregled

Dodati batch generiranje slik (4-6 slik naenkrat) v obstoječi AI generator in ustvariti novo namenska stran za batch generiranje. Sistem bo omogočal generiranje bodisi enakih slik z istimi nastavitvami bodisi različnih variacij.

## Arhitekturni Pregled

### Obstoječi Sistem

- **AI Generator Page**: `app/ai-generator/page.tsx` - trenutno ustvari samo 1 sliko
- **API Route**: `app/api/ai/generate/route.ts` - generira slike preko Pollinations.ai
- **Podprte Nastavke**:
  - Stili (rock, vintage, modern, grunge, neon, minimalist)
  - Razpoloženja (party, energetic, chill, rebellious, nostalgic, drinking)
  - Lastni prompt
  - Različne modele (pollinations-free je default)

### Nova Funkcionalnost - Batch Generation

- Sposobnost generiranja 4-6 slik v eni sesiji
- Dve nastavitvi:
  1. **Enaka Nastavka**: Ista slika X-krat (za testiranje variabilnosti AI-ja)
  2. **Različne Variacije**: Različne kombinacije stilov/razpoloženja

## Implementacijski Koraki

### Faza 1: API Razširitev

1. **Razširiti `/api/ai/generate` route**
   - Dodati parameter `quantity: number` (default 1, max 6)
   - Dodati parameter `variations: boolean` (ali generirati različne variacije)
   - Dodati parameter `variationConfig: array` (za različne kombinacije)
   - Implementirati paralelno generiranje za hitrost

2. **Novi API Endpoint: `/api/ai/batch-generate` (opciono)**
   - Namenske batch operations
   - Tracking za batch progress
   - Rezultat vrne array slik z metapodatki

### Faza 2: Frontend Komponente

1. **Razširiti obstoječo `app/ai-generator/page.tsx`**
   - Dodati toggle "Batch Mode"
   - Dodati selektor za število slik (4, 6, ali custom)
   - Dodati opcije za "Same Settings" vs "Different Variations"
   - Ko je batch mode aktiven:
     - Prikazati grid preview za vse generirane slike
     - Omogočiti download vseh slik hkrati
     - Omogočiti share vseh slik

2. **Nova Stran: `app/ai-batch-generator/page.tsx`**
   - Dedikirana page samo za batch generiranje
   - Layout s prikazom:
     - Kontrolniki (izbira stilov, razpoloženja, itd.)
     - Batch nastavke (broj slik, mode - same/different)
     - Grid prikaz vseh generiranih slik
     - Bulk download (zip datoteka)
     - Galerija nedavnih batch generiranj

3. **Nova Komponenta: `BatchImageGrid`**
   - Prikazuje generirane slike v grid layout
   - Omogoča individualno ali bulk operacije (download, delete)
   - Loading state za vsako sliko posebej
   - Fallback za napake pri generiranju posamezne slike

4. **Nova Komponenta: `BatchVariationSelector`**
   - Omogoči izbiro različnih kombinacij za vsako sliko
   - Tabel ali card view za različne nastavke
   - Add/remove variacije dinamično

### Faza 3: UX/UI Spremembe

1. **Obstoječa Stran (AI Generator)**
   - Dodati subtle toggle za "Batch Mode" pod "Dodaj Opis" sekcijo
   - Ko je batch mode ON:
     - Prikazati selektor za število slik
     - Prikazati opcije za "Same" vs "Different" mode
     - Preview sekcija postane grid namesto single image
2. **Nova Batch Stran**
   - Slična navigacija kot obstoja, ampak fokusirana na batch
   - Hero sekcija "AI BATCH STUDIO"
   - Tri sekcije:
     - Nastavke (stil, razpoloženje, custom prompt)
     - Batch konfiguracija (broj slik, mode, variacije)
     - Rezultati grid s bulk akcijami

### Faza 4: Funkcionalnosti

#### Same Settings Mode

```
Uporabnik izbere: stil="rock", razpoloženje="energetic", prompt="band poster"
Sistem: generira 4 ali 6 slik s točno isto kombinacijo
Kaj se razlikuje: samo output AI-ja (variabilnost modela)
Primerna za: testiranje AI konsistence, generiranje alternativ
```

#### Different Variations Mode

```
Uporabnik definiše array nastavk:
- Variation 1: rock + energetic + "band poster"
- Variation 2: grunge + rebellious + "dark artwork"
- Variation 3: neon + party + "concert"
Sistem: generira po 1 sliko za vsako variaciju
Primerna za: raziskovanje različnih kreativnih smeri
```

### Faza 5: Shramba in Tracking

1. **Opcionalno: Shramba Generated Batches**
   - Dodati database tabelo za batch history
   - Shranjiti metapodatke (prompt, nastavke, timestamps)
   - Omogočiti brskanje nedavnih batch slik
   - Funkcija "Regenerate batch with same settings"

2. **Local Storage (minimalističen pristop)**
   - Shranjiti zadnjih 5 batch slik v local storage
   - Prikazati "Recent Batches" galerijo
   - Nima potrebe za database če se slike ne shranjujejo trajno

## Tehnični Detajli

### API Spremembe

```typescript
// Razširjena zahteva
POST /api/ai/generate
{
  prompt: string,
  category: string,
  style: string,
  mood: string,
  quantity?: number (1-6, default: 1),
  mode?: 'same' | 'variations' (default: 'same'),
  variationConfigs?: Array<{
    style: string,
    mood: string,
    prompt: string
  }>
}

// Odgovor
{
  success: boolean,
  images: Array<{
    imageUrl: string,
    imageId: string,
    prompt: string,
    model: string,
    style: string,
    mood: string,
    generatedAt: string
  }>,
  batchId?: string,
  totalTime?: number
}
```

### Paralelno Generiranje

- Uporabljati `Promise.all()` za simultano generiranje več slik
- Implementirati retry logiko za failed slike
- Timeout zaščito (max 60 sekund na batch)

## Prioriteta Implementacije

1. **MVP (Minimum Viable Product)**
   - Razširiti API za `quantity` parameter
   - Razširiti obstoječo AI Generator stran
   - Supportati samo "Same Settings" mode

2. **Polna Verzija**
   - Dodati "Different Variations" mode
   - Nova Batch Generator stran
   - BatchVariationSelector komponenta

3. **Nadgradnje (po lansiranju)**
   - Database storage za batch history
   - Bulk download kot ZIP datoteka
   - Advanced variation presets
   - AI upscaling za generirane slike

## Datoteke za Spremembo / Ustvaritev

### Obstoječe Datoteke za Spremembo

- `app/api/ai/generate/route.ts` - razširiti API
- `app/ai-generator/page.tsx` - dodati batch mode

### Nove Datoteke za Ustvaritev

- `app/ai-batch-generator/page.tsx` - nova stran
- `components/features/BatchImageGrid.tsx` - komponenta
- `components/features/BatchVariationSelector.tsx` - komponenta (opciono)
- `lib/ai/batch-generation.ts` - utility funkcije (opciono)

## Časoven Pregled

- MVP: 1-2 koraka (API + obstoječa stran)
- Polna verzija: +2-3 koraka (nova stran + komponente)

## Zaključek

Plan omogoča fleksibilno batch generiranje slik z dvema strategijama (same/different), z minimalnim vplivom na obstoječi kod in opcionalnimi nadgradnjami za prihodnost.
