import React, { useState } from 'react';
import {
  Newspaper,
  Search,
  Bookmark,
  BookmarkCheck,
  Calendar,
  ExternalLink,
  Sparkles,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { sampleCurrentAffairs } from '../data/mockData';
import { CurrentAffairArticle } from '../types';

export const CurrentAffairsDesk: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [activeArticle, setActiveArticle] = useState<CurrentAffairArticle | null>(null);

  const categories = [
    'All',
    'Polity & Governance',
    'Economy',
    'Environment',
    'International Relations',
  ];

  const filteredArticles = sampleCurrentAffairs.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch =
      art.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.syllabusTopic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="current-affairs" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#38BDF8]/40 text-xs font-semibold text-[#38BDF8]">
            <Newspaper className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              DAILY REVISION INTELLIGENCE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Current Affairs Intelligence Desk
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Synthesized strictly through the lens of UPSC General Studies 1–4. Every issue linked to constitutional articles, committees, and mains exam relevance.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#F3AA45] text-[#10172A] border-[#F3AA45]'
                    : 'bg-[#182746] text-slate-300 border-[#24324D] hover:text-white hover:border-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter topics (e.g. SC, RBI, Climate)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#182746] border border-[#24324D] text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-[#F3AA45]"
            />
          </div>
        </div>

        {/* Article Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.length === 0 ? (
            <div className="col-span-2 py-16 text-center text-slate-400 bg-[#182746]/50 rounded-2xl border border-[#24324D]">
              <p className="text-sm">No articles found matching &ldquo;{searchQuery}&rdquo;.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-3 text-xs text-[#F3AA45] font-semibold underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isBookmarked = bookmarkedIds[article.id];
              return (
                <div
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="group bg-[#182746] border border-[#24324D] hover:border-[#F3AA45]/50 rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top Row: Category, GS Paper & Bookmark */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2.5 py-1 rounded-lg bg-[#F3AA45]/15 border border-[#F3AA45]/30 text-[#F3AA45] font-mono text-[11px] font-bold">
                          {article.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-[#10172A] border border-[#24324D] text-[#63B8A5] font-mono text-[11px] font-semibold">
                          {article.gsPaper}
                        </span>
                      </div>
                      <button
                        onClick={(e) => toggleBookmark(article.id, e)}
                        className={`p-2 rounded-xl border transition-colors ${
                          isBookmarked
                            ? 'bg-[#F3AA45]/20 border-[#F3AA45] text-[#F3AA45]'
                            : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-white'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark for revision'}
                        aria-label="Bookmark article"
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Headline */}
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-[#F3AA45] transition-colors leading-snug">
                      {article.headline}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>

                    {/* UPSC Relevance badge */}
                    <div className="p-3 rounded-xl bg-[#10172A]/80 border border-[#24324D] text-xs text-slate-300 space-y-1">
                      <div className="text-[11px] font-mono font-bold text-[#63B8A5]">
                        UPSC GS Syllabus Linkage:
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {article.upscRelevance}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 mt-4 border-t border-[#24324D]/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-[11px] flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.date} &bull; {article.source}</span>
                    </span>
                    <span className="text-[#F3AA45] font-bold text-xs flex items-center space-x-1 group-hover:underline">
                      <span>Read Synthesis</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Read More Modal Detail View */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-8 space-y-5 text-slate-100 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#24324D] pb-4">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 rounded-xl bg-[#F3AA45]/20 text-[#F3AA45] text-xs font-mono font-bold">
                  {activeArticle.category} &bull; {activeArticle.gsPaper}
                </span>
                <span className="text-xs text-slate-400">{activeArticle.date}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded-lg bg-[#10172A]"
              >
                Close (ESC)
              </button>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
              {activeArticle.headline}
            </h3>

            <div className="text-xs text-[#63B8A5] font-mono">
              Source: {activeArticle.source}
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {activeArticle.summary}
            </p>

            <div className="p-4 rounded-2xl bg-[#10172A] border border-[#24324D] space-y-2">
              <div className="text-xs font-bold text-[#F3AA45] uppercase font-mono tracking-wider">
                Key Exam Takeaways & Model Answer Points:
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeArticle.keyTakeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#63B8A5] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-[#10172A]/70 text-xs text-slate-400 font-mono">
              <strong>Syllabus Code:</strong> {activeArticle.syllabusTopic}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
