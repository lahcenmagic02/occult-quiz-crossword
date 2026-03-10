import fs from 'fs';
import words from 'an-array-of-english-words';

const dict = words.filter((w: string) => w.length >= 3).map((w: string) => w.toUpperCase());

// Combine all bases into a single pool
const allBasesRaw = [
  "MAGIC", "WITCH", "DEMON", "SPELL", "GHOST", "ALTAR", "TAROT", "RUNES", "WANDS", "FLAME", 
  "WATER", "EARTH", "SWORD", "PENTA", "CHANT", "CHARM", "CURSE", "HEXES", "OMENS", "MYTHS", 
  "SOULS", "FAIRY", "ELVES", "GNOME", "NYMPH", "SYLPH", "BLOOD", "BONES", "SKULL", "SIGIL",
  "CANDLE", "AMULET", "MANTRA", "CHAKRA", "OCCULT", "MYSTIC", "ZODIAC", "ASTRAL", "SPIRIT", 
  "RITUAL", "WICCAN", "SHAMAN", "VOODOO", "POTION", "SCROLL", "TEMPLE", "PRIEST", "MYTHOS", 
  "COSMOS", "HERMES", "GNOSIS", "PLANET", "NATURE", "DIVINE", "SACRED", "THELEMA", "ALCHEMY", 
  "GRIMOIRE", "PLEROMA", "DEMIURGE", "WATCHERS", "ENOCHIAN", "GOETIA", "KABBALAH", "SEPHIRAH", 
  "QLIPHOTH", "LUCIFER", "SATANISM", "PICATRIX", "ARBATEL", "NOTORIA", "PANTACLE", "TALISMAN", 
  "SORCERY", "WARLOCK", "PROPHET", "PENTACLE", "THAUMATURGY", "SEPHIROTH", "NECROMANCY", 
  "DIVINATION", "ASTROLOGY", "PENTAGRAM", "BAPHOMET", "LEVIATHAN", "BEELZEBUB", "MEPHISTO", 
  "ASMODEUS", "APPARITION", "MEDIUMSHIP", "ALCHEMIST"
];

// Remove duplicates
const allBases = Array.from(new Set(allBasesRaw));

function getSubWords(baseWord: string) {
  const baseCounts: Record<string, number> = {};
  for (const char of baseWord) {
    baseCounts[char] = (baseCounts[char] || 0) + 1;
  }

  const validWords = [];
  for (const word of dict) {
    if (word.length > baseWord.length) continue;
    
    const wordCounts: Record<string, number> = {};
    let valid = true;
    for (const char of word) {
      wordCounts[char] = (wordCounts[char] || 0) + 1;
      if (!baseCounts[char] || wordCounts[char] > baseCounts[char]) {
        valid = false;
        break;
      }
    }
    if (valid) {
      validWords.push(word);
    }
  }
  
  if (!validWords.includes(baseWord)) {
    validWords.push(baseWord);
  }
  
  // Sort by length, then alphabetically
  validWords.sort((a, b) => a.length - b.length || a.localeCompare(b));
  
  // Keep up to 20 words to have a good pool for the crossword
  const result = validWords.slice(-20);
  if (!result.includes(baseWord)) {
    result.push(baseWord);
  }
  return Array.from(new Set(result));
}

const precomputed: Record<string, string[]> = {};

allBases.forEach(base => {
  precomputed[base] = getSubWords(base);
});

// Sort bases by difficulty:
// 1. Length of the base word (shorter is easier)
// 2. Number of valid sub-words (more sub-words means more options, but also potentially harder crosswords. We'll sort by length primarily)
const sortedBases = [...allBases].sort((a, b) => {
  if (a.length !== b.length) {
    return a.length - b.length;
  }
  // If same length, sort by number of sub-words (fewer is easier)
  return precomputed[a].length - precomputed[b].length;
});

const output = `
export const sortedBases = ${JSON.stringify(sortedBases)};
export const precomputedWords: Record<string, string[]> = ${JSON.stringify(precomputed, null, 2)};
`;

fs.writeFileSync('./src/levelData.ts', output);
console.log('Successfully generated levelData.ts');

