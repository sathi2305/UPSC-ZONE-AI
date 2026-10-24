import React, { useState, useEffect } from 'react';
import {
  Layers,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { sampleFlashcards } from '../data/mockData';

export const RevisionLab: React.FC = () => {
  const [cardIdx, setCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [useTextAlternative, setUseTextAlternative] = useState(false);
  const [ratings, setRatings] = useState<Record<string, 'low' | 'medium' | 'high'>>({});
  const [markedCards, setMarkedCards] = useState<Record<string, boolean>>({});

  const totalCards = sampleFlashcards.length;
  const currentCard = sampleFlashcards[cardIdx];

  const handleNext = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCardIdx((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleRating = (rating: 'low' | 'medium' | 'high') => {
    setRatings((prev) => ({ ...prev, [currentCard.id]: rating }));
    setTimeout(() => {
      if (cardIdx < totalCards - 1) {
        handleNext();
      }
    }, 300);
  };

  const toggleBookmark = () => {
    setMarkedCards((prev) => ({ ...prev, [currentCard.id]: !prev[currentCard.id] }));
  };

  // Keyboard navigation for accessible revision
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped((prev) => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cardIdx]);

  return (
    <section id="revision" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#A7F3D0]/40 text-xs font-semibold text-[#A7F3D0]">
            <Layers className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              SPACED RETENTION SYSTEM
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Smart Revision Memory Lab
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Active recall flashcards covering high-yield constitutional provisions, economic terminology, and environmental conventions.
          </p>
        </div>

        {/* Progress & Controls Bar */}
        <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-[#F3AA45] font-bold">
              Card {cardIdx + 1} of {totalCards}
            </span>
            <span>&bull;</span>
            <span className="text-slate-300 font-medium">
              {currentCard.subject} — {currentCard.topic}
            </span>
          </div>

          {/* Text Alternative Toggle for Accessibility */}
          <button
            onClick={() => setUseTextAlternative(!useTextAlternative)}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            title="Toggle between 3D flip card and two-sided accessible layout"
          >
            {useTextAlternative ? <ToggleRight className="w-4 h-4 text-[#63B8A5]" /> : <ToggleLeft className="w-4 h-4" />}
            <span>Accessible Text View</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#182746] h-1.5 rounded-full overflow-hidden mb-6">
          <div
            className="bg-gradient-to-r from-[#F3AA45] to-[#63B8A5] h-full transition-all duration-300"
            style={{ width: `${((cardIdx + 1) / totalCards) * 100}%` }}
          />
        </div>

        {/* Flashcard Area */}
        {!useTextAlternative ? (
          /* 3D Flip Card Container */
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer select-none perspective-1000 min-h-[340px] flex"
          >
            <div
              className={`relative w-full rounded-3xl p-8 border transition-all duration-500 transform-style-preserve-3d flex flex-col justify-between shadow-2xl ${
                isFlipped
                  ? 'bg-gradient-to-br from-[#182746] to-[#131f38] border-[#63B8A5]/50 shadow-[#63B8A5]/10'
                  : 'bg-gradient-to-br from-[#182746] to-[#10172A] border-[#24324D] hover:border-[#F3AA45]/50 shadow-black/40'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl bg-[#10172A] border border-[#24324D] text-[#F3AA45] font-mono text-xs font-bold">
                  {isFlipped ? 'Answer & Core Rationale' : 'Active Recall Challenge'}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark();
                    }}
                    className={`p-1.5 rounded-xl border transition-colors ${
                      markedCards[currentCard.id]
                        ? 'bg-[#F3AA45]/20 border-[#F3AA45] text-[#F3AA45]'
                        : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-white'
                    }`}
                  >
                    {markedCards[currentCard.id] ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                  <span className="text-xs text-slate-400 font-mono flex items-center space-x-1">
                    <RotateCw className="w-3.5 h-3.5 text-slate-400" />
                    <span>Flip</span>
                  </span>
                </div>
              </div>

              {/* Card Central Text */}
              <div className="py-6 flex-1 flex flex-col justify-center">
                {!isFlipped ? (
                  <p className="font-display text-xl sm:text-2xl font-bold text-white leading-relaxed text-center">
                    {currentCard.front}
                  </p>
                ) : (
                  <div className="space-y-4 text-center sm:text-left">
                    <p className="text-sm sm:text-base text-slate-200 leading-relaxed whitespace-pre-line font-medium">
                      {currentCard.back}
                    </p>
                    {currentCard.keyArticlesOrDates && (
                      <div className="pt-3 border-t border-[#24324D] text-xs font-mono text-[#63B8A5]">
                        <strong>Referenced Statues/Articles:</strong> {currentCard.keyArticlesOrDates}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Card Bottom instruction */}
              <div className="text-center text-xs text-slate-400">
                {!isFlipped
                  ? 'Click anywhere or press Space to reveal answer'
                  : 'Select your confidence rating below to calibrate next interval'}
              </div>
            </div>
          </div>
        ) : (
          /* Accessible Text View: Both front and back displayed side-by-side or stacked */
          <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="p-5 rounded-2xl bg-[#10172A] border border-[#24324D]">
              <div className="text-xs font-mono font-bold text-[#F3AA45] mb-2 uppercase">Recall Prompt:</div>
              <p className="text-base font-bold text-white">{currentCard.front}</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#10172A] border border-[#63B8A5]/40">
              <div className="text-xs font-mono font-bold text-[#63B8A5] mb-2 uppercase">Answer & Explanations:</div>
              <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed">{currentCard.back}</p>
            </div>
          </div>
        )}

        {/* Confidence Rating Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-[#182746] border border-[#24324D] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <span className="font-bold text-white">How well did you know this?</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleRating('low')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                ratings[currentCard.id] === 'low'
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                  : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-white'
              }`}
            >
              Needs Work (1 Day)
            </button>
            <button
              onClick={() => handleRating('medium')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                ratings[currentCard.id] === 'medium'
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-white'
              }`}
            >
              Moderate (3 Days)
            </button>
            <button
              onClick={() => handleRating('high')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                ratings[currentCard.id] === 'high'
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                  : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-white'
              }`}
            >
              Mastered (7 Days)
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handlePrev}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#182746] hover:bg-[#203259] border border-[#24324D] text-slate-200 text-xs font-semibold transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Card</span>
          </button>

          <div className="text-xs text-slate-500 font-mono hidden sm:block">
            Keyboard: Space to flip &bull; Left/Right arrow to navigate
          </div>

          <button
            onClick={handleNext}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] text-xs font-bold transition-all shadow-md"
          >
            <span>Next Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
