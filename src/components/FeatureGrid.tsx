import React from 'react';
import {
  BrainCircuit,
  Award,
  Newspaper,
  Compass,
  Layers,
  Calendar,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen
} from 'lucide-react';

interface FeatureGridProps {
  onNavigate: (sectionId: string) => void;
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ onNavigate }) => {
  return (
    <section id="learn-suite" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#63B8A5]/40 text-xs font-semibold text-[#63B8A5]">
            <Sparkles className="w-3.5 h-3.5 text-[#F3AA45]" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              COMPREHENSIVE LEARNING SUITE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Everything You Need.{' '}
            <span className="text-[#F3AA45]">One Intelligent Platform.</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            From the first concept to the final revision, make every study session more focused.
          </p>
        </div>

        {/* Varied Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1. AI Study Copilot (Wide Hero Card, 7 columns on md) */}
          <div
            onClick={() => onNavigate('copilot')}
            className="md:col-span-7 group relative bg-gradient-to-br from-[#182746] to-[#121e36] border border-[#24324D] hover:border-[#F3AA45]/50 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#F3AA45]/10 flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F3AA45]/10 rounded-full blur-3xl group-hover:bg-[#F3AA45]/20 transition-all pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-[#F3AA45]/15 border border-[#F3AA45]/30 text-[#F3AA45] group-hover:scale-110 transition-transform">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#10172A] border border-[#24324D] text-[#63B8A5]">
                  AI Powered
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#F3AA45] transition-colors">
                1. AI Study Copilot
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Explore concepts, ask questions, create structured summaries, and discover related learning topics. Trained with civil services syllabus rigor.
              </p>
              {/* Interactive preview prompt chip list */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs bg-[#10172A]/90 text-slate-300 px-3 py-1.5 rounded-xl border border-[#24324D]">
                  Fundamental Rights
                </span>
                <span className="text-xs bg-[#10172A]/90 text-slate-300 px-3 py-1.5 rounded-xl border border-[#24324D]">
                  Inflation & Repo Rate
                </span>
                <span className="text-xs bg-[#10172A]/90 text-slate-300 px-3 py-1.5 rounded-xl border border-[#24324D]">
                  7-Day Revision Sprints
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#F3AA45] pt-4 border-t border-[#24324D]/50">
              <span>Open AI Conversation Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 2. Prelims Arena (5 columns on md) */}
          <div
            onClick={() => onNavigate('prelims')}
            className="md:col-span-5 group relative bg-[#182746]/80 border border-[#24324D] hover:border-[#63B8A5]/50 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#63B8A5]/10 flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-[#63B8A5]/15 border border-[#63B8A5]/30 text-[#63B8A5] group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#10172A] border border-[#24324D] text-slate-300">
                  -0.66 Penalty Sim
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#63B8A5] transition-colors">
                2. Prelims Arena
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Practice multiple-choice questions, review explanations, and understand performance under authentic timed test conditions.
              </p>
              <div className="p-3 rounded-2xl bg-[#10172A]/90 border border-[#24324D] text-xs text-slate-300 space-y-1.5">
                <div className="flex items-center space-x-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Real-time question palette & timer</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Subject-wise detailed explanations</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#63B8A5] pt-4 border-t border-[#24324D]/50 mt-4">
              <span>Start 5-Question Simulation</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 3. Current Affairs Intelligence (4 columns on md) */}
          <div
            onClick={() => onNavigate('current-affairs')}
            className="md:col-span-4 group relative bg-[#182746]/80 border border-[#24324D] hover:border-[#38BDF8]/50 rounded-3xl p-7 cursor-pointer transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="p-3.5 rounded-2xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] w-fit mb-5 group-hover:scale-110 transition-transform">
                <Newspaper className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#38BDF8] transition-colors">
                3. Current Affairs Desk
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Organize exam-relevant news topics, key takeaways, verified sources (The Hindu, PIB), and GS 1–4 syllabus linkages.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#38BDF8] pt-4 border-t border-[#24324D]/50 mt-4">
              <span>Filter by GS Paper</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 4. PYQ Intelligence Explorer (4 columns on md) */}
          <div
            onClick={() => onNavigate('pyq')}
            className="md:col-span-4 group relative bg-[#182746]/80 border border-[#24324D] hover:border-[#F3AA45]/50 rounded-3xl p-7 cursor-pointer transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="p-3.5 rounded-2xl bg-[#F3AA45]/15 border border-[#F3AA45]/30 text-[#F3AA45] w-fit mb-5 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#F3AA45] transition-colors">
                4. PYQ Intelligence Explorer
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Search and filter authentic past UPSC questions (2019–2024) with official UPSC key rationales and concept drill-downs.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#F3AA45] pt-4 border-t border-[#24324D]/50 mt-4">
              <span>Search Previous Questions</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 5. Smart Revision Lab (4 columns on md) */}
          <div
            onClick={() => onNavigate('revision')}
            className="md:col-span-4 group relative bg-[#182746]/80 border border-[#24324D] hover:border-[#A7F3D0]/50 rounded-3xl p-7 cursor-pointer transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="p-3.5 rounded-2xl bg-[#A7F3D0]/15 border border-[#A7F3D0]/30 text-[#A7F3D0] w-fit mb-5 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[#A7F3D0] transition-colors">
                5. Smart Revision Lab
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Review interactive 3D flashcards, assess confidence ratings, mark weak spots, and calibrate spaced repetition intervals.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#A7F3D0] pt-4 border-t border-[#24324D]/50 mt-4">
              <span>Launch Flashcard Deck</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* 6. Adaptive Study Planner (Full width strip on md, 12 columns) */}
          <div
            onClick={() => onNavigate('planner')}
            className="md:col-span-12 group relative bg-gradient-to-r from-[#182746] via-[#1b2b4d] to-[#182746] border border-[#24324D] hover:border-[#F3AA45]/50 rounded-3xl p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center space-x-5">
              <div className="p-4 rounded-2xl bg-[#F3AA45] text-[#10172A] shrink-0 font-bold group-hover:scale-105 transition-transform">
                <Calendar className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs font-mono text-[#63B8A5] uppercase tracking-wider">
                    MODULE 06
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-[#F3AA45]/20 text-[#F3AA45] font-semibold">
                    Personalized 7-Day Timetable
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#F3AA45] transition-colors">
                  6. Adaptive Study Planner Pro
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl mt-1">
                  Generate a practical learning schedule based on your available study hours (4h, 6h, 8h+), target year, and weak subjects with daily checklist tracking.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('planner')}
              className="px-6 py-3 rounded-2xl bg-[#F3AA45] text-[#10172A] font-bold text-xs uppercase tracking-wider shrink-0 shadow-lg shadow-[#F3AA45]/20 group-hover:bg-[#f29e2e] transition-colors flex items-center space-x-2"
            >
              <span>Build Schedule</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
