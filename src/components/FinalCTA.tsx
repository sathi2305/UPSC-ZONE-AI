import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Target, Calendar } from 'lucide-react';
import { KnowledgeSymbol } from './KnowledgeSymbol';

interface FinalCTAProps {
  onNavigate: (sectionId: string) => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#F3AA45]/15 via-[#63B8A5]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="flex justify-center">
          <KnowledgeSymbol size={64} glow={true} />
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Make Every Study Session Count.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Start with one goal, take one focused step, and build a preparation routine you can sustain all the way to Dholpur House.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onNavigate('planner')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F3AA45] to-[#f29e2e] text-[#10172A] font-bold text-sm tracking-wide shadow-xl shadow-[#F3AA45]/25 hover:shadow-[#F3AA45]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <span>Build My Study Plan</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('learn-suite')}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#182746] hover:bg-[#203259] border border-[#24324D] hover:border-[#63B8A5]/50 text-slate-100 font-semibold text-sm transition-all flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-[#63B8A5]" />
            <span>Explore Learning Features</span>
          </button>
        </div>

        <div className="pt-4 text-xs font-mono text-slate-400">
          UPSC Civil Services Examination 2026 &bull; Integrated GS & CSAT Preparation
        </div>
      </div>
    </section>
  );
};
