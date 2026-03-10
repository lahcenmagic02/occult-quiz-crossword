import { generateCrossword, CrosswordLayout } from './crosswordGenerator';
import { 
  astrologyWords, 
  divinationWords, 
  basicMagickWords, 
  advancedMagickWords, 
  alchemyWords, 
  ancientLoreWords, 
  spiritWords,
  precomputedWords 
} from './levelData';
import { loadCustomWords } from './utils/customWords';

export interface LevelData {
  id: number;
  tier: string;
  category: string;
  letters: string[];
  cursed: string[];
  words: string[];
  validWords: string[];
  layout: CrosswordLayout;
  backgroundUrl: string;
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function getWordFromList(currentLevel: number, startLevel: number, endLevel: number, wordList: string[]): string {
  if (!wordList || wordList.length === 0) return "MAGIC";
  const N = wordList.length;
  
  const range = endLevel - startLevel + 1;
  let progress = Math.max(0, Math.min(1, (currentLevel - startLevel) / Math.max(1, range - 1)));
  
  // Exponential-like difficulty: stay on easier words longer, then accelerate
  progress = Math.pow(progress, 1.8); 
  
  const W = Math.min(N, Math.max(3, Math.floor(3 + progress * 17)));
  const windowStart = Math.max(0, Math.min(
    Math.floor(progress * (N - W + 1)),
    N - W
  ));
  
  const prime = 17;
  const offset = (currentLevel * prime) % W;
  
  return wordList[windowStart + offset];
}

export function getLevel(level: number): LevelData {
  let tier = "";
  let category = "";
  let baseWord = "";
  let candidateWords: string[] = [];
  
  if (level <= 70) {
    tier = "The Star-Reader";
    category = "Astrology";
    baseWord = getWordFromList(level, 1, 70, astrologyWords);
  } else if (level <= 155) {
    tier = "The Oracle";
    category = "Divination & Tarot";
    baseWord = getWordFromList(level, 71, 155, divinationWords);
  } else if (level <= 250) {
    tier = "The Spellbinder";
    category = "Basic Magick";
    baseWord = getWordFromList(level, 156, 250, basicMagickWords);
  } else if (level <= 350) {
    tier = "The Arch-Mage";
    category = "Advanced Magick";
    baseWord = getWordFromList(level, 251, 350, advancedMagickWords);
  } else if (level <= 455) {
    tier = "The Transmuter";
    category = "The Alchemist’s Lab";
    baseWord = getWordFromList(level, 351, 455, alchemyWords);
  } else if (level <= 565) {
    tier = "The Sage of Ages";
    category = "Ancient Lore";
    baseWord = getWordFromList(level, 456, 565, ancientLoreWords);
  } else if (level <= 666) {
    tier = "The Spirit-Master";
    category = "The Book of Spirits";
    baseWord = getWordFromList(level, 566, 666, spiritWords);
  } else {
    tier = "The Architect";
    category = "Custom Magick";
    const customWords = loadCustomWords();
    if (customWords.length > 0) {
      const customIndex = (level - 667) % customWords.length;
      baseWord = customWords[customIndex].baseWord;
      candidateWords = [...customWords[customIndex].validWords];
    } else {
      baseWord = "MAGIC";
    }
  }

  if (level <= 666 && !candidateWords.length) {
    if (precomputedWords[baseWord]) {
      candidateWords = [...precomputedWords[baseWord]];
    } else {
      candidateWords = [baseWord];
    }
  }

  // Ensure we have at least 3 candidates if possible
  if (candidateWords.length < 3) {
    const categoryList = category === "Astrology" ? astrologyWords :
                        category === "Divination & Tarot" ? divinationWords :
                        category === "Basic Magick" ? basicMagickWords :
                        category === "Advanced Magick" ? advancedMagickWords :
                        category === "The Alchemist’s Lab" ? alchemyWords :
                        category === "Ancient Lore" ? ancientLoreWords : spiritWords;
    
    let i = 0;
    while (candidateWords.length < 5 && i < categoryList.length) {
      const extraWord = categoryList[i];
      if (!candidateWords.includes(extraWord)) {
        candidateWords.push(extraWord);
      }
      i++;
    }
  }

  let backgroundUrl = "";
  switch (category) {
    case "Astrology": backgroundUrl = "/wallpapers/astrology.png"; break;
    case "Divination & Tarot": backgroundUrl = "/wallpapers/divination.png"; break;
    case "Basic Magick": backgroundUrl = "/wallpapers/basic_magick.png"; break;
    case "Advanced Magick": backgroundUrl = "/wallpapers/advanced_magick.png"; break;
    case "The Alchemist’s Lab": backgroundUrl = "/wallpapers/alchemy.png"; break;
    case "Ancient Lore": backgroundUrl = "/wallpapers/ancient_lore.png"; break;
    case "The Book of Spirits": backgroundUrl = "/wallpapers/spirits.png"; break;
    default: backgroundUrl = "/wallpapers/custom_magick.png"; break;
  }

  // Difficulty Scaling for Target Words: 3 to 8 words for a smoother curve
  const progress = Math.max(0, Math.min(1, (level - 1) / 665));
  const targetWords = Math.floor(3 + progress * 5.1);

  let result = generateCrossword(baseWord, candidateWords, targetWords, level);
  
  // If we failed to get at least 3 words, try with a different seed or more candidates
  let retryCount = 0;
  while (result.layout.words.length < 3 && retryCount < 5) {
    result = generateCrossword(baseWord, candidateWords, targetWords, level + retryCount + 100);
    retryCount++;
  }

  const { layout, validWords } = result;
  const selectedWords = layout.words.map(w => w.word);

  const requiredCounts: Record<string, number> = {};
  const allWordsToForm = [...selectedWords];
  if (!allWordsToForm.includes(baseWord)) {
    allWordsToForm.push(baseWord);
  }

  allWordsToForm.forEach(word => {
    const counts: Record<string, number> = {};
    for (const char of word) {
      counts[char] = (counts[char] || 0) + 1;
    }
    for (const char in counts) {
      requiredCounts[char] = Math.max(requiredCounts[char] || 0, counts[char]);
    }
  });

  let letters: string[] = [];
  for (const char in requiredCounts) {
    for (let i = 0; i < requiredCounts[char]; i++) {
      letters.push(char);
    }
  }
  
  // Smooth Difficulty Scaling for Target Letters (Density)
  // Starts at 6, scales up to 12
  const targetLetters = Math.floor(6 + progress * 6.1);
  const finalTargetLetters = Math.max(targetLetters, letters.length);
  
  let cursed: string[] = [];
  // Cursed letters start appearing after level 100, scaling up to 5
  if (level >= 100) {
    const cursedProgress = (level - 100) / 566;
    const numCursed = Math.floor(1 + cursedProgress * 4.1);
    
    for (let c = 0; c < numCursed; c++) {
      const char = alphabet[(level * 13 + c * 7) % 26];
      if (!letters.includes(char)) {
        cursed.push(char);
        letters.push(char);
      }
    }
  }

  let attempts = 0;
  while (letters.length < finalTargetLetters && attempts < 50) {
    const char = alphabet[(level + attempts * 7) % 26];
    if (!letters.includes(char)) {
      letters.push(char);
    }
    attempts++;
  }
  
  for (let j = letters.length - 1; j > 0; j--) {
    const k = (level * 17 + j * 31) % (j + 1);
    [letters[j], letters[k]] = [letters[k], letters[j]];
  }

  return {
    id: level,
    tier,
    category,
    letters,
    cursed,
    words: selectedWords,
    validWords,
    layout,
    backgroundUrl
  };
}
