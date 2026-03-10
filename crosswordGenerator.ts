import { precomputedWords, sortedBases } from './levelData';

export interface CrosswordWord {
  word: string;
  x: number;
  y: number;
  isHorizontal: boolean;
}

export interface CrosswordLayout {
  words: CrosswordWord[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface CrosswordResult {
  layout: CrosswordLayout;
  baseWord: string;
  validWords: string[];
}

function canPlaceWord(word: string, x: number, y: number, isHorizontal: boolean, grid: Map<string, string>): boolean {
  for (let i = 0; i < word.length; i++) {
    const cx = isHorizontal ? x + i : x;
    const cy = isHorizontal ? y : y + i;
    const key = `${cx},${cy}`;
    
    const hasLetter = grid.has(key);
    if (hasLetter && grid.get(key) !== word[i]) {
      return false;
    }
    
    if (!hasLetter) {
      if (isHorizontal) {
        if (grid.has(`${cx},${cy-1}`) || grid.has(`${cx},${cy+1}`)) return false;
      } else {
        if (grid.has(`${cx-1},${cy}`) || grid.has(`${cx+1},${cy}`)) return false;
      }
    }
  }
  
  if (isHorizontal) {
    if (grid.has(`${x-1},${y}`) || grid.has(`${x+word.length},${y}`)) return false;
  } else {
    if (grid.has(`${x},${y-1}`) || grid.has(`${x},${y+word.length}`)) return false;
  }
  
  return true;
}

export function generateCrossword(baseWord: string, candidateWords: string[], targetWordCount: number, seed: number): CrosswordResult {
  const sorted = [...candidateWords].sort((a, b) => b.length - a.length);
  if (sorted.length === 0) return { layout: { words: [], minX: 0, maxX: 0, minY: 0, maxY: 0 }, baseWord, validWords: candidateWords };

  const firstWord = sorted.shift()!;
  
  // Predictable shuffle for the rest
  for (let j = sorted.length - 1; j > 0; j--) {
    const k = (seed * j) % (j + 1);
    [sorted[j], sorted[k]] = [sorted[k], sorted[j]];
  }
  
  sorted.unshift(firstWord);
  
  const placed: CrosswordWord[] = [];
  const grid = new Map<string, string>();
  
  const first = sorted[0];
  placed.push({ word: first, x: 0, y: 0, isHorizontal: true });
  for (let i = 0; i < first.length; i++) {
    grid.set(`${i},0`, first[i]);
  }
  
  const usedWords = new Set<string>([first]);
  
  let minX = 0;
  let maxX = first.length - 1;
  let minY = 0;
  let maxY = 0;
  
  for (const word of sorted) {
    if (usedWords.has(word)) continue;
    if (placed.length >= targetWordCount) break;
    
    let bestPlacement: { word: string, x: number, y: number, isHorizontal: boolean, intersections: number } | null = null;
    
    for (const p of placed) {
      for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < p.word.length; j++) {
          if (word[i] === p.word[j]) {
            const isHorizontal = !p.isHorizontal;
            let x, y;
            if (p.isHorizontal) {
              x = p.x + j;
              y = p.y - i;
            } else {
              x = p.x - i;
              y = p.y + j;
            }
            
            if (canPlaceWord(word, x, y, isHorizontal, grid)) {
              let intersections = 0;
              for (let k = 0; k < word.length; k++) {
                const cx = isHorizontal ? x + k : x;
                const cy = isHorizontal ? y : y + k;
                if (grid.has(`${cx},${cy}`)) intersections++;
              }
              
              if (!bestPlacement || intersections > bestPlacement.intersections) {
                bestPlacement = { word, x, y, isHorizontal, intersections };
              }
            }
          }
        }
      }
    }
    
    if (bestPlacement) {
      placed.push(bestPlacement);
      usedWords.add(bestPlacement.word);
      for (let k = 0; k < bestPlacement.word.length; k++) {
        const cx = bestPlacement.isHorizontal ? bestPlacement.x + k : bestPlacement.x;
        const cy = bestPlacement.isHorizontal ? bestPlacement.y : bestPlacement.y + k;
        grid.set(`${cx},${cy}`, bestPlacement.word[k]);
        
        if (cx < minX) minX = cx;
        if (cx > maxX) maxX = cx;
        if (cy < minY) minY = cy;
        if (cy > maxY) maxY = cy;
      }
    }
  }
  
  return { 
    layout: { words: placed, minX, maxX, minY, maxY },
    baseWord,
    validWords: candidateWords
  };
}
