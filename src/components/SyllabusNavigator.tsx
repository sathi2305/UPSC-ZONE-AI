import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { sampleSyllabusData } from '../data/mockData';
import { SyllabusItem } from '../types';

export const SyllabusNavigator: React.FC = () => {
  const [syllabusList, setSyllabusList] = useState<SyllabusItem[]>(sampleSyllabusData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPaper, setSelectedPaper] = useState<string>('All');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({ 'syl-3': true });

  const papers = [
    'All',
    'General Studies I',
    'General Studies II',
    'General Studies III',
    'General Studies IV'
  ];

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComplete = (id: string) => {
    setSyllabusList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextCompleted = !item.completed;
          return {
            ...item,
            completed: nextCompleted,
            revisionStatus: nextCompleted ? 'Mastered' : 'In Progress',
          };
        }
        return item;
      })
    );
  };

  const resetAllProgress = () => {
    setSyllabusList((prev) =>
      prev.map((item) => ({ ...item, completed: false, revisionStatus: 'Not Started' }))
    );
  };

  const filteredItems = syllabusList.filter((item) => {
    const matchesPaper = selectedPaper === 'All' || item.paper === selectedPaper;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtopics.some((st) => st.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesPaper && matchesSearch;
  });

  const totalTopics = syllabusList.length;
  const completedTopics = syllabusList.filter((t) => t.completed).length;
  const progressPct = Math.round((completedTopics / totalTopics) * 100);

  // Find next uncompleted topic
  const nextRecommendedTopic = syllabusList.find((t) => !t.completed);

  return (
    <section id="syllabus" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/40 text-xs font-semibold text-[#F3AA45]">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              CIVIL SERVICES CURRICULUM
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive Syllabus Navigator
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Official UPSC Civil Services Mains General Studies 1–4 curriculum breakdown with granular micro-topic tracking.
          </p>
        </div>

        {/* Global Progress & Recommended Next Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-5 bg-[#182746] border border-[#24324D] rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Syllabus Mastery Velocity
              </span>
              <button
                onClick={resetAllProgress}
                className="text-xs text-slate-400 hover:text-rose-300 flex items-center space-x-1"
                title="Reset completion checkboxes"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="flex items-baseline space-x-3 my-2">
              <span className="text-4xl font-black font-display text-white">{progressPct}%</span>
              <span className="text-xs text-slate-400 font-mono">
                ({completedTopics} of {totalTopics} Core Units Done)
              </span>
            </div>

            <div className="w-full bg-[#10172A] h-2 rounded-full overflow-hidden mt-2">
              <div
                className="h-full bg-gradient-to-r from-[#F3AA45] to-[#63B8A5] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="md:col-span-7 bg-[#182746] border border-[#24324D] rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-[#63B8A5] uppercase font-mono tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#F3AA45]" />
              <span>Recommended Next Subject To Cover</span>
            </div>
            {nextRecommendedTopic ? (
              <div>
                <div className="text-xs font-mono text-[#F3AA45] mb-1">
                  {nextRecommendedTopic.paper} &bull; {nextRecommendedTopic.category}
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white line-clamp-2">
                  {nextRecommendedTopic.title}
                </h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-1">
                  Next subtopic: {nextRecommendedTopic.subtopics[0]}
                </p>
              </div>
            ) : (
              <div className="text-emerald-400 font-bold text-sm">
                100% of core syllabus topics marked complete! Focus on test series and answer writing sprints.
              </div>
            )}
          </div>
        </div>

        {/* Search & Paper Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {papers.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPaper(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedPaper === p
                    ? 'bg-[#F3AA45] text-[#10172A] border-[#F3AA45]'
                    : 'bg-[#182746] text-slate-300 border-[#24324D] hover:text-white'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search syllabus keywords..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#182746] border border-[#24324D] text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-[#F3AA45]"
            />
          </div>
        </div>

        {/* Syllabus Accordion Cards */}
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isExpanded = expandedIds[item.id];
            return (
              <div
                key={item.id}
                className="bg-[#182746] border border-[#24324D] rounded-2xl overflow-hidden transition-all"
              >
                <div
                  onClick={() => toggleExpand(item.id)}
                  className="p-5 flex items-center justify-between cursor-pointer hover:bg-[#1f3156] transition-colors"
                >
                  <div className="flex items-start space-x-3.5 min-w-0 pr-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComplete(item.id);
                      }}
                      className="mt-0.5 text-slate-400 hover:text-[#63B8A5] transition-colors shrink-0"
                      aria-label="Toggle completed"
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#10172A] text-[#F3AA45] border border-[#24324D]">
                          {item.paper}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {item.category}
                        </span>
                      </div>
                      <h4 className={`text-sm sm:text-base font-bold ${item.completed ? 'text-slate-300 line-through' : 'text-white'}`}>
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <span
                      className={`hidden sm:inline-block text-[11px] font-mono px-2.5 py-1 rounded-full border ${
                        item.revisionStatus === 'Mastered'
                          ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40'
                          : item.revisionStatus === 'In Progress'
                          ? 'bg-amber-950/40 text-amber-300 border-amber-500/40'
                          : 'bg-slate-900 text-slate-400 border-slate-700'
                      }`}
                    >
                      {item.revisionStatus}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                {/* Expanded Micro-Topics */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-[#24324D]/60 bg-[#10172A]/60 space-y-2">
                    <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Granular Exam Subtopics & Directives:
                    </div>
                    <ul className="space-y-2">
                      {item.subtopics.map((sub, sIdx) => (
                        <li key={sIdx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                          <span className="text-[#F3AA45] font-mono font-bold shrink-0 mt-0.5">&bull;</span>
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
