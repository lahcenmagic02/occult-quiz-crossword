import fs from 'fs';
import englishWords from 'an-array-of-english-words';

const newWordsRaw = [
"Spirit-Bond", "Lunar-Light", "Flame-Cast", "Shadow-Work", "Soul-Stone", "Crystal-Grid", "Night-Vision", "Earth-Magic", "Water-Scry", "Storm-Ward", "Star-Path", "Blood-Moon", "Salt-Circle", "Witch-Hazel", "Grimoire-Page", "Spell-Jar", "Silver-Tongue", "Dream-Walk", "Power-Sigil", "Candle-Burn", "Ancient-Lore", "Forest-Fae", "Oracle-Deck", "Herbal-Brew", "Sacred-Grove", "Mantra-Chant", "Coven-Call", "Iron-Will", "Aura-Glow", "Mystic-Eye", "Ghost-Whisper", "Sun-Rise", "Hallow-Ground", "Sigil-Draw", "Bone-Cast", "Rune-Read", "Nature-Spirit", "Hidden-Truth", "Elder-Wand", "Chaos-Spelt"
];

const newWords = newWordsRaw.map(w => w.toUpperCase().replace(/[^A-Z]/g, ''));

const validEnglishWords = new Set(englishWords.map(w => w.toUpperCase()));

function getSubWords(baseWord: string): string[] {
  const letters = baseWord.split('');
  const letterCounts: Record<string, number> = {};
  for (const char of letters) {
    letterCounts[char] = (letterCounts[char] || 0) + 1;
  }

  const subWords: string[] = [];
  for (const word of validEnglishWords) {
    if (word.length >= 3 && word.length <= baseWord.length) {
      const wordCounts: Record<string, number> = {};
      let isValid = true;
      for (const char of word) {
        wordCounts[char] = (wordCounts[char] || 0) + 1;
        if (!letterCounts[char] || wordCounts[char] > letterCounts[char]) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        subWords.push(word);
      }
    }
  }
  return subWords;
}

const levelDataPath = './src/levelData.ts';
let levelDataContent = fs.readFileSync(levelDataPath, 'utf8');

const uniqueNewWords = Array.from(new Set(newWords));

const basicMagickWordsMatch = levelDataContent.match(/export const basicMagickWords = \[(.*?)\];/s);
let basicMagickWords = [];
if (basicMagickWordsMatch) {
  basicMagickWords = JSON.parse(`[${basicMagickWordsMatch[1]}]`);
}

const existingBasesMatch = levelDataContent.match(/export const sortedBases = \[(.*?)\];/s);
let existingBases = [];
if (existingBasesMatch) {
  existingBases = JSON.parse(`[${existingBasesMatch[1]}]`);
}

const precomputedWordsMatch = levelDataContent.match(/export const precomputedWords: Record<string, string\[\]> = (\{.*?\});/s);
let precomputedWords: Record<string, string[]> = {};
if (precomputedWordsMatch) {
  precomputedWords = JSON.parse(precomputedWordsMatch[1]);
}

for (const word of uniqueNewWords) {
  precomputedWords[word] = getSubWords(word);
}

const newContent = "export const basicMagickWords = " + JSON.stringify(basicMagickWords) + ";\n" +
"export const advancedBasicMagickWords = " + JSON.stringify(uniqueNewWords) + ";\n" +
"export const sortedBases = " + JSON.stringify(existingBases) + ";\n" +
"export const precomputedWords: Record<string, string[]> = " + JSON.stringify(precomputedWords, null, 2) + ";\n";

fs.writeFileSync(levelDataPath, newContent);
console.log('Done updating level data.');
