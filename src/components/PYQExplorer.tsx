import React, { useState } from 'react';
import {
  Compass,
  Search,
  Filter,
  Eye,
  EyeOff,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  RotateCcw,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { samplePYQs } from '../data/mockData';

export const PYQExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<'All' | 'Prelims' | 'Mains'>('All');
  const [subjectFilter, setSubjectFilter] = useState<string>('All');
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const subjects = ['All', 'Polity', 'Economy', 'Environment', 'Governance & Constitution'];

  const filteredPYQs = samplePYQs.filter((item) => {
    const matchesStage = stageFilter === 'All' || item.stage === stageFilter;
    const matchesSubject = subjectFilter === 'All' || item.subject === subjectFilter;
    const matchesQuery =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.officialRationale.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStage && matchesSubject && matchesQuery;
  });

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStageFilter('All');
    setSubjectFilter('All');
  };

  return (
    <section id="pyq" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/40 text-xs font-semibold text-[#F3AA45]">
            <Compass className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              VERIFIED UPSC ARCHIVE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            PYQ Intelligence Explorer
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Official Previous Year Questions with authentic UPSC commission key rationales, concept linkages, and pattern trends.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-5 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search PYQs by keyword (e.g. Due Process, Miyawaki, Money Multiplier, Collegium)..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-[#F3AA45]"
              />
            </div>

            {/* Stage filter pill buttons */}
            <div className="flex rounded-xl bg-[#10172A] p-1 border border-[#24324D] shrink-0">
              {(['All', 'Prelims', 'Mains'] as const).map((stage) => (
                <button
                  key={stage}
                  onClick={() => setStageFilter(stage)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    stageFilter === stage
                      ? 'bg-[#F3AA45] text-[#10172A]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          {/* Subject filters row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#24324D]/60 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 font-mono text-[11px]">Subject:</span>
              {subjects.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSubjectFilter(sub)}
                  className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                    subjectFilter === sub
                      ? 'bg-[#63B8A5]/20 text-[#63B8A5] border border-[#63B8A5]/40 font-semibold'
                      : 'bg-[#10172A] text-slate-400 border border-[#24324D] hover:text-white'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>

            {(searchQuery || stageFilter !== 'All' || subjectFilter !== 'All') && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#F3AA45] hover:underline flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredPYQs.length === 0 ? (
            <div className="p-16 rounded-3xl bg-[#182746]/50 border border-[#24324D] text-center text-slate-400 space-y-3">
              <p className="text-sm">No previous year questions match the active criteria.</p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl bg-[#F3AA45] text-[#10172A] text-xs font-bold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredPYQs.map((item) => {
              const isRevealed = revealedIds[item.id];
              const isBookmarked = bookmarkedIds[item.id];

              return (
                <div
                  key={item.id}
                  className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-7 space-y-4 hover:border-slate-600 transition-all"
                >
                  {/* Top Metadata Line */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg bg-[#F3AA45]/15 border border-[#F3AA45]/30 text-[#F3AA45] font-mono font-bold text-xs">
                        UPSC CSE {item.year}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-[#10172A] border border-[#24324D] text-[#63B8A5] font-mono text-xs font-semibold">
                        {item.stage} &bull; {item.paper}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {item.subject} &bull; {item.topic}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className={`p-1.5 rounded-xl border text-xs transition-colors ${
                          isBookmarked
                            ? 'bg-[#F3AA45]/20 border-[#F3AA45] text-[#F3AA45]'
                            : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-white'
                        }`}
                        title={isBookmarked ? 'Bookmarked' : 'Bookmark question'}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => toggleReveal(item.id)}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-xs font-semibold text-slate-200 transition-colors"
                      >
                        {isRevealed ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-[#F3AA45]" />}
                        <span>{isRevealed ? 'Hide Official Rationale' : 'Reveal Answer & Rationale'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Question Content */}
                  <div className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed">
                    {item.question}
                  </div>

                  {/* Options if Prelims */}
                  {item.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {item.options.map((opt, optIdx) => {
                        const optChars = ['(a)', '(b)', '(c)', '(d)'];
                        const isCorrectOption = optIdx === item.correctOption;

                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-xl border text-xs flex items-start space-x-2 transition-all ${
                              isRevealed && isCorrectOption
                                ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500'
                                : 'bg-[#10172A]/70 border-[#24324D] text-slate-300'
                            }`}
                          >
                            <span className="font-mono font-bold text-[#F3AA45]">{optChars[optIdx]}</span>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Revealed Official Rationale Panel */}
                  {isRevealed && (
                    <div className="p-5 rounded-2xl bg-[#10172A] border border-[#24324D] space-y-3 animate-in fade-in duration-300">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#F3AA45] font-mono">
                        Official Commission Logic & Context:
                      </div>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                        {item.officialRationale}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                        <span className="font-mono text-[11px] text-[#63B8A5]">Related Concepts:</span>
                        {item.relatedConcepts.map((tag, tIdx) => (
                          <span key={tIdx} className="px-2 py-0.5 rounded bg-[#182746] text-slate-300 border border-[#24324D] text-[11px]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
