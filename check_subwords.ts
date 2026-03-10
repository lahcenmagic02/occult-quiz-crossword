import * as fs from 'fs';
import { sortedBases } from './src/levelData.js';

const cleanWords = sortedBases;

function getLetterCounts(word: string) {
  const counts: Record<string, number> = {};
  for (const char of word) {
    counts[char] = (counts[char] || 0) + 1;
  }
  return counts;
}

function canForm(word: string, baseCounts: Record<string, number>) {
  const wordCounts = getLetterCounts(word);
  for (const char in wordCounts) {
    if (!baseCounts[char] || wordCounts[char] > baseCounts[char]) {
      return false;
    }
  }
  return true;
}

let validBases = 0;
for (const base of cleanWords) {
  const baseCounts = getLetterCounts(base);
  const subWords = cleanWords.filter(word => {
    if (word.length > base.length) return false;
    return canForm(word, baseCounts);
  });
  if (subWords.length >= 2) {
    validBases++;
  }
}
console.log("Valid bases with at least 1 other subword from the list:", validBases);
