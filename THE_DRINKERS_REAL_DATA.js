/**
 * 🎸 THE DRINKERS - PRAVI PODATKI
 * 
 * Skupina: The Drinkers
 * Nastanek: Julij 1993 (33 let)
 * Kraj: Litija, Slovenija
 * Žanr: Booze Rock / Rock / Slovenian Rock
 * Spletna stran: www.thedrinkers.net
 */

const realBandData = {
  name: 'The Drinkers',
  formed: {
    year: 1993,
    month: 'Julij',
    city: 'Litija',
    country: 'Slovenija',
    story: 'Skupina je nastala nekega soparnega julijskega večera leta 1993 v Litiji. Pet prijateljev, vseh nekdanjih glasbenikov v različnih zasedbah, je ob hladnem pivu dobilo idejo, da bi ustanovili skupino, sposobno nastopiti na lokalnem rock festivalu "Rusty Trumpets". Presenetljivo so zmagali in se odločili ostati skupaj.'
  },
  genre: ['Booze Rock', 'Rock', 'Slovenian Rock'],
  yearsActive: '1993 – present',
  website: 'www.thedrinkers.net',
  members: {
    founding: [
      { name: 'Sandi Kolenc - Koli', role: 'Vokal' },
      { name: 'Robert Likar', role: 'Kitara' },
    ],
    joined1994: [
      { name: 'Miro M', role: 'Bas kitara' }
    ],
    note: 'Skupina je skozi leta doživela številne kadrovske spremembe, vendar sta dva ustanovna člana ostala: Robert Likar in Sandi Kolenc.'
  },
  discography: [
    {
      album: 'Lepi In Trezni',
      year: 1995,
      tracks: 9,
      listeners: 36,
      description: 'Prvenec skupine'
    },
    {
      album: 'De Best Od',
      year: 2001,
      month: 'Junij',
      tracks: 18,
      listeners: 124,
      description: 'Greatest hits kompilacija'
    },
    {
      album: 'Pivolucija',
      year: 1999,
      tracks: 10,
      listeners: 158,
      description: 'Kultni album z največjimi uspešnicami'
    },
    {
      album: 'Zadnja Večerja',
      year: 1999,
      type: 'Mini Album',
      description: 'Priredbe božičnih pesmi'
    },
    {
      album: 'Hajdi',
      year: 2007,
      tracks: 12,
      listeners: 34,
      description: 'Sedmi studijski album'
    }
  ],
  topTracks: [
    'Deset majhnih jagrov',
    'Pijemo ga radi',
    'Lepi in trezni',
    'Žeja',
    'Recidiv'
  ],
  achievements: [
    'Zmagovalci festivala "Rusty Trumpets" 1993',
    '33 let aktivnega delovanja',
    '7 studijskih albumov',
    '500+ odigranih koncertov',
    'Kultni status v slovenskem rock prostoru'
  ],
  stats: {
    lastFM: {
      listeners: 961,
      scrobbles: '19K',
      monthlyListeners: '1-2 tisoč'
    }
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = realBandData;
}

console.log('✅ THE DRINKERS - PRAVI PODATKI NALOŽENI');
console.log('📊 Skupina:', realBandData.name);
console.log('📅 Ustanovljena:', realBandData.formed.year, 'v', realBandData.formed.city);
console.log('🎸 Žanr:', realBandData.genre.join(' / '));
console.log('🎵 Albumov:', realBandData.discography.length);
console.log('🏆 Let aktivnosti:', realBandData.yearsActive);
