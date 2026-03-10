import React, { useState, useEffect, useMemo } from 'react';
import { sortedBases } from './levelData';
import { Header } from './components/Header';
import { Hexagram } from './components/Hexagram';
import { WordGrid } from './components/WordGrid';
import { DocsModal } from './components/DocsModal';
import { MenuModal } from './components/MenuModal';
import { ImportModal } from './components/ImportModal';
import { getLevel, LevelData } from './levelGenerator';
import { soundService } from './services/soundService';
import { persistenceService, PlayerProgress } from './services/persistenceService';
import { grimoirePages } from './constants/grimoireData';
import { GrimoireModal } from './components/GrimoireModal';
import { cn } from './utils';

export default function App() {
  // Load initial progress
  const initialProgress = useMemo(() => persistenceService.loadProgress(), []);

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentLevelNumber, setCurrentLevelNumber] = useState(initialProgress?.currentLevel || 1);
  const [currentLevel, setCurrentLevel] = useState<LevelData>(getLevel(initialProgress?.currentLevel || 1));
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundHiddenWords, setFoundHiddenWords] = useState<string[]>([]);
  const [coins, setCoins] = useState(initialProgress?.aetherCoins ?? 100);
  const [unlockedGrimoirePages, setUnlockedGrimoirePages] = useState<number[]>(initialProgress?.unlockedGrimoirePages || [1]);
  const [coinsEarnedThisLevel, setCoinsEarnedThisLevel] = useState(0);
  const [isDocsOpen, setIsDocsOpen] = useState(false);
  const [isGrimoireOpen, setIsGrimoireOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [frozen, setFrozen] = useState(false);
  const [hiddenWordFound, setHiddenWordFound] = useState(false);
  const [isSfxEnabled, setIsSfxEnabled] = useState(soundService.isSfxEnabled);
  const [isBgmEnabled, setIsBgmEnabled] = useState(soundService.isBgmEnabled);
  const [hintedIndex, setHintedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'main' | 'hidden'>('main');

  // Check if level is complete
  const isLevelComplete = foundWords.length === currentLevel.words.length && currentLevel.words.length > 0;

  const reinforcements = [
    "Masterful!", "Excellent!", "Superb!", "Brilliant!", 
    "Magical!", "Phenomenal!", "Spellbinding!", "Divine!"
  ];

  const reinforcement = useMemo(() => {
    return reinforcements[Math.floor(Math.random() * reinforcements.length)];
  }, [isLevelComplete]);

  // Create a Set of all valid English words for fast lookup
  const validEnglishWords = useMemo(() => new Set(sortedBases.map(w => w.toUpperCase())), []);

  useEffect(() => {
    setWelcomeMessage('Welcome, Spellbinder! Your occult journey begins.');
    const timer = setTimeout(() => setWelcomeMessage(''), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Save progress whenever key values change
  useEffect(() => {
    persistenceService.saveProgress({
      currentLevel: currentLevelNumber,
      aetherCoins: coins,
      unlockedGrimoirePages: unlockedGrimoirePages,
      lastPlayed: new Date().toISOString()
    });
  }, [currentLevelNumber, coins, unlockedGrimoirePages]);

  useEffect(() => {
    const level = getLevel(currentLevelNumber);
    setCurrentLevel(level);
    setFoundWords([]);
    setFoundHiddenWords([]);
    setCoinsEarnedThisLevel(0);
    setMessage('');
    setFrozen(false);
    setHintedIndex(null);
    soundService.startSoundtrack(level.category);
  }, [currentLevelNumber]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleBgm = () => {
    setIsBgmEnabled(soundService.toggleBgm());
  };

  const toggleSfx = () => {
    setIsSfxEnabled(soundService.toggleSfx());
  };

  const jumpToLevel = (level: number) => {
    setCurrentLevelNumber(level);
  };

  const handleWordSubmit = (word: string) => {
    if (frozen || isLevelComplete) return;

    // Check for cursed letter
    const hasCursed = word.split('').some(char => currentLevel.cursed.includes(char));
    if (hasCursed && !currentLevel.words.includes(word)) {
      setFrozen(true);
      setMessage('CURSED! Frozen for 3s');
      soundService.playIncorrectSound();
      setTimeout(() => {
        setFrozen(false);
        setMessage('');
      }, 3000);
      return;
    }

    if (currentLevel.words.includes(word)) {
      if (!foundWords.includes(word)) {
        const newFoundWords = [...foundWords, word];
        setFoundWords(newFoundWords);
        const reward = word.length * 5;
        setCoins(prev => prev + reward);
        setCoinsEarnedThisLevel(prev => prev + reward);
        
        if (newFoundWords.length === currentLevel.words.length) {
          setMessage('Level Complete!');
          setCoins(prev => prev + 10); // Base reward
          setCoinsEarnedThisLevel(prev => prev + 10);
          soundService.playLevelCompleteSound();

          // Check for Grimoire unlocks
          const newlyUnlocked = grimoirePages
            .filter(page => page.unlockLevel <= currentLevelNumber && !unlockedGrimoirePages.includes(page.id))
            .map(page => page.id);
          
          if (newlyUnlocked.length > 0) {
            setUnlockedGrimoirePages(prev => [...prev, ...newlyUnlocked]);
            setTimeout(() => setMessage('Grimoire Page Unlocked!'), 2000);
          }
        } else {
          setMessage('Correct!');
          soundService.playCorrectSound();
          setTimeout(() => setMessage(''), 1500);
        }
      } else {
        setMessage('Already Found!');
        soundService.playIncorrectSound();
        setTimeout(() => setMessage(''), 1500);
      }
    } else if (word.length > 2 && validEnglishWords.has(word)) {
      if (!foundHiddenWords.includes(word)) {
        setFoundHiddenWords(prev => [...prev, word]);
        const reward = word.length * 2;
        setCoins(prev => prev + reward);
        setCoinsEarnedThisLevel(prev => prev + reward);
        setMessage('Hidden Word! +' + reward);
        setHiddenWordFound(true);
        setTimeout(() => setHiddenWordFound(false), 1000);
        soundService.playCorrectSound();
        setTimeout(() => setMessage(''), 1500);
      } else {
        setMessage('Already Found!');
        soundService.playIncorrectSound();
        setTimeout(() => setMessage(''), 1500);
      }
    } else {
      setMessage('Not a word!');
      soundService.playIncorrectSound();
      setTimeout(() => setMessage(''), 1500);
    }
  };

  const handleFreeShuffle = () => {
    if (frozen || isLevelComplete) return;
    
    // Actually shuffle the letters
    setCurrentLevel(prev => {
      const shuffledLetters = [...prev.letters];
      for (let i = shuffledLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledLetters[i], shuffledLetters[j]] = [shuffledLetters[j], shuffledLetters[i]];
      }
      return { ...prev, letters: shuffledLetters };
    });

    soundService.playCorrectSound();
  };

  const handleSeersEye = () => {
    if (frozen || isLevelComplete) return;
    if (coins < 15) {
      setMessage('Not enough Aether!');
      soundService.playIncorrectSound();
      setTimeout(() => setMessage(''), 1500);
      return;
    }
    
    const unfoundWords = currentLevel.words.filter(w => !foundWords.includes(w));
    if (unfoundWords.length > 0) {
      setCoins(prev => prev - 15);
      
      const word = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
      const firstLetter = word[0];
      
      const indices = [];
      for (let i = 0; i < currentLevel.letters.length; i++) {
        if (currentLevel.letters[i] === firstLetter) {
          indices.push(i);
        }
      }
      
      if (indices.length > 0) {
        const indexToHint = indices[Math.floor(Math.random() * indices.length)];
        setHintedIndex(indexToHint);
        setMessage("Seer's Eye!");
        soundService.playCorrectSound();
        setTimeout(() => setMessage(''), 1500);
      }
    }
  };

  const handleHint = () => {
    if (frozen || isLevelComplete) return;
    if (coins < 25) {
      setMessage('Not enough Aether!');
      soundService.playIncorrectSound();
      setTimeout(() => setMessage(''), 1500);
      return;
    }
    setCoins(prev => prev - 25);
    // Find a word that hasn't been found yet
    const unfoundWords = currentLevel.words.filter(w => !foundWords.includes(w));
    if (unfoundWords.length > 0) {
      const wordToReveal = unfoundWords[0];
      setFoundWords(prev => [...prev, wordToReveal]);
      if (foundWords.length + 1 === currentLevel.words.length) {
        setMessage('Level Complete!');
        setCoins(prev => prev + 10);
        setCoinsEarnedThisLevel(prev => prev + 10);
        soundService.playLevelCompleteSound();
      } else {
        soundService.playCorrectSound();
      }
    }
  };

  const nextLevel = () => {
    const customWords = JSON.parse(localStorage.getItem('customWords') || '[]');
    const maxLevel = 666 + customWords.length;
    
    if (currentLevelNumber < maxLevel) {
      setCurrentLevelNumber(prev => prev + 1);
    }
  };

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-[#121212] text-[#e0e0e0]' : 'bg-[#f4ecd8] text-[#2b1b17]';
  }, [theme]);

  return (
    <div 
      className={cn(
        "min-h-screen flex flex-col font-sans transition-colors duration-500 bg-cover bg-center bg-no-repeat relative",
        theme === 'dark' ? "text-[#e0e0e0]" : "text-[#2b1b17]"
      )}
      style={{ backgroundImage: `url(${currentLevel.backgroundUrl}), url(https://picsum.photos/seed/magic/1920/1080?blur=4)` }}
    >
      {/* Background Overlay */}
      <div className={cn(
        "absolute inset-0 z-0 transition-colors duration-500",
        theme === 'dark' ? "bg-[#121212]/70" : "bg-[#f4ecd8]/70"
      )} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          level={currentLevel.id} 
          tier={currentLevel.tier}
          category={currentLevel.category}
          coins={coins}
          onOpenDocs={() => setIsDocsOpen(true)}
          onOpenGrimoire={() => setIsGrimoireOpen(true)}
          isSfxEnabled={isSfxEnabled}
          isBgmEnabled={isBgmEnabled}
          toggleSfx={toggleSfx}
          toggleBgm={toggleBgm}
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenImport={() => setIsImportOpen(true)}
        />

        <main className="flex-1 flex flex-col items-center justify-between py-4 px-4 max-w-md mx-auto w-full">
          
          <div className="w-full flex-1 flex flex-col items-center justify-center space-y-4">
            <div className="flex gap-4 mb-2">
              <button 
                onClick={() => setActiveTab('main')}
                className={cn(
                  "px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
                  activeTab === 'main' 
                    ? (theme === 'dark' ? "bg-[#ff3333] text-white" : "bg-[#8b0000] text-white")
                    : (theme === 'dark' ? "text-[#e0e0e0] opacity-50 hover:opacity-100" : "text-[#2b1b17] opacity-50 hover:opacity-100")
                )}
              >
                Main Words
              </button>
              <button 
                onClick={() => setActiveTab('hidden')}
                className={cn(
                  "px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest transition-all",
                  activeTab === 'hidden' 
                    ? (theme === 'dark' ? "bg-[#ff3333] text-white" : "bg-[#8b0000] text-white")
                    : (theme === 'dark' ? "text-[#e0e0e0] opacity-50 hover:opacity-100" : "text-[#2b1b17] opacity-50 hover:opacity-100")
                )}
              >
                Hidden Words ({foundHiddenWords.length})
              </button>
            </div>

            {activeTab === 'main' ? (
              <WordGrid 
                layout={currentLevel.layout} 
                foundWords={foundWords} 
                theme={theme} 
              />
            ) : (
              <div className="w-full flex-1 flex flex-col items-center justify-start overflow-y-auto max-h-[250px] p-4 border rounded-xl" style={{ borderColor: theme === 'dark' ? '#333' : '#d4c4a8', minHeight: '250px' }}>
                {foundHiddenWords.length === 0 ? (
                  <p className={cn("text-sm opacity-50 italic mt-8", theme === 'dark' ? "text-[#e0e0e0]" : "text-[#2b1b17]")}>No hidden words found yet.</p>
                ) : (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {foundHiddenWords.map((word, i) => (
                      <span key={i} className={cn(
                        "px-3 py-1 rounded-md text-sm font-bold font-serif border",
                        theme === 'dark' ? "bg-[#1a1a1a] text-[#e0e0e0] border-[#333]" : "bg-white text-[#2b1b17] border-[#d4c4a8]"
                      )}>
                        {word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div className="flex flex-col items-center justify-center h-12">
              <div className="h-8 flex items-center justify-center">
                {message && (
                  <span className={cn(
                    "text-lg font-bold font-serif tracking-widest uppercase animate-pulse drop-shadow-md",
                    frozen ? (theme === 'dark' ? "text-red-500" : "text-red-700") : (theme === 'dark' ? "text-[#ff3333]" : "text-[#8b0000]")
                  )}>
                    {message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full mt-auto pb-4 relative">
            {welcomeMessage && (
              <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                <div className={cn(
                  "px-8 py-6 rounded-2xl text-center border shadow-2xl animate-in fade-in zoom-in duration-700 backdrop-blur-md",
                  theme === 'dark' ? "bg-[#1a1a1a]/90 text-[#ff3333] border-[#ff3333]" : "bg-[#fdfbf7]/90 text-[#8b0000] border-[#8b0000]"
                )}>
                  <p className="text-xl font-bold font-serif tracking-[0.2em] uppercase">{welcomeMessage}</p>
                </div>
              </div>
            )}
            {isLevelComplete && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/80 backdrop-blur-xl rounded-3xl animate-in fade-in duration-500">
                <div className="flex flex-col items-center space-y-6 p-8 text-center">
                  <div className="space-y-2">
                    <h2 className={cn(
                      "text-3xl font-bold font-serif tracking-[0.2em] uppercase",
                      theme === 'dark' ? "text-[#ff3333]" : "text-[#8b0000]"
                    )}>
                      {reinforcement}
                    </h2>
                    <p className={cn(
                      "text-sm font-mono tracking-widest uppercase opacity-70",
                      theme === 'dark' ? "text-[#e0e0e0]" : "text-[#2b1b17]"
                    )}>
                      Level {currentLevel.id} Cleared
                    </p>
                  </div>

                  <div className={cn(
                    "flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed",
                    theme === 'dark' ? "bg-[#1a1a1a] border-[#ff3333]/30" : "bg-white border-[#8b0000]/30"
                  )}>
                    <span className="text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-60">Aether Harvested</span>
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        "text-5xl font-bold font-mono",
                        theme === 'dark' ? "text-[#ff3333]" : "text-[#8b0000]"
                      )}>
                        +{coinsEarnedThisLevel}
                      </span>
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border-2",
                        theme === 'dark' ? "border-[#ff3333] text-[#ff3333]" : "border-[#8b0000] text-[#8b0000]"
                      )}>
                        <span className="text-lg font-bold">A</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={nextLevel}
                    className={cn(
                      "w-full py-4 rounded-2xl text-xl font-bold font-serif tracking-[0.2em] uppercase shadow-2xl transition-all hover:scale-105 active:scale-95 border-2",
                      theme === 'dark' ? "bg-[#ff3333] text-white border-[#ff3333]" : "bg-[#8b0000] text-white border-[#8b0000]"
                    )}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            )}
            {hiddenWordFound && (
              <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
                <div className="animate-ping absolute w-32 h-32 rounded-full border-4 border-yellow-500/50" />
                <div className="animate-pulse flex flex-col items-center">
                  <span className="text-4xl">✨</span>
                  <span className="text-yellow-500 font-bold font-serif text-xl tracking-widest uppercase drop-shadow-lg">Aether Found!</span>
                </div>
              </div>
            )}
            <Hexagram 
              letters={currentLevel.letters} 
              cursedLetters={currentLevel.cursed}
              onWordSubmit={handleWordSubmit} 
              theme={theme} 
              frozen={frozen || isLevelComplete}
              hintedIndex={hintedIndex}
              onClearHint={() => setHintedIndex(null)}
              onShuffle={handleFreeShuffle}
            />
          </div>

          <div className="flex justify-center gap-4 mt-4 w-full px-4">
            <button 
              onClick={handleSeersEye}
              disabled={frozen || isLevelComplete}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-2xl transition-all active:scale-95 border shadow-sm",
                theme === 'dark' 
                  ? "bg-[#1a1a1a]/80 border-[#333] hover:bg-[#222]/90 hover:border-[#9932cc]/50" 
                  : "bg-white/80 border-[#d4c4a8] hover:bg-white hover:border-[#8a2be2]/50",
                (frozen || isLevelComplete) && "opacity-50 cursor-not-allowed grayscale"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border",
                theme === 'dark' ? "border-[#9932cc]/30 text-[#9932cc] bg-[#9932cc]/10" : "border-[#8a2be2]/30 text-[#8a2be2] bg-[#8a2be2]/10"
              )}>
                <span className="text-lg leading-none">👁</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 text-center leading-tight">Seer's<br/>Eye</span>
                <span className={cn("text-[9px] font-mono mt-0.5", theme === 'dark' ? "text-[#9932cc]" : "text-[#8a2be2]")}>-15 Aether</span>
              </div>
            </button>

            <button 
              onClick={handleHint}
              disabled={frozen || isLevelComplete}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-2xl transition-all active:scale-95 border shadow-sm",
                theme === 'dark' 
                  ? "bg-[#1a1a1a]/80 border-[#333] hover:bg-[#222]/90 hover:border-[#ff3333]/50" 
                  : "bg-white/80 border-[#d4c4a8] hover:bg-white hover:border-[#8b0000]/50",
                (frozen || isLevelComplete) && "opacity-50 cursor-not-allowed grayscale"
              )}
            >
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border",
                theme === 'dark' ? "border-[#ff3333]/30 text-[#ff3333] bg-[#ff3333]/10" : "border-[#8b0000]/30 text-[#8b0000] bg-[#8b0000]/10"
              )}>
                <span className="text-lg leading-none">✨</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 text-center leading-tight">Reveal<br/>Word</span>
                <span className={cn("text-[9px] font-mono mt-0.5", theme === 'dark' ? "text-[#ff3333]" : "text-[#8b0000]")}>-25 Aether</span>
              </div>
            </button>
          </div>

        </main>

        <DocsModal 
          isOpen={isDocsOpen} 
          onClose={() => setIsDocsOpen(false)} 
          theme={theme} 
        />

        <GrimoireModal
          isOpen={isGrimoireOpen}
          onClose={() => setIsGrimoireOpen(false)}
          theme={theme}
          unlockedPages={unlockedGrimoirePages}
        />
        
        <MenuModal
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          theme={theme}
          onSelectCategory={jumpToLevel}
          currentLevel={currentLevelNumber}
          isSfxEnabled={isSfxEnabled}
          isBgmEnabled={isBgmEnabled}
          toggleSfx={toggleSfx}
          toggleBgm={toggleBgm}
        />

        <ImportModal
          isOpen={isImportOpen}
          onClose={() => setIsImportOpen(false)}
          theme={theme}
          onImportSuccess={() => {
            // Optional: Show a toast or jump to custom levels
          }}
        />
      </div>
    </div>
  );
}
