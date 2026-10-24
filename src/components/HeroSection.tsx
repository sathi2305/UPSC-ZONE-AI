import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { DashboardPreview } from './DashboardPreview';
import { AspirantProfile } from '../types';

interface HeroSectionProps {
  profile: AspirantProfile;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, onNavigate }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-8 pb-20 overflow-hidden">
      {/* Background Subtle Knowledge-Network SVG Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="knowledgeGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#F3AA45" opacity="0.6" />
              <line x1="0" y1="30" x2="60" y2="30" stroke="#24324D" strokeWidth="0.5" />
              <line x1="30" y1="0" x2="30" y2="60" stroke="#24324D" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#knowledgeGrid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/30 text-xs font-semibold text-[#F3AA45] shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F3AA45] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F3AA45]"></span>
              </span>
              <span className="tracking-widest uppercase font-mono text-[11px]">
                A SMARTER WAY TO PREPARE
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Your Ambition Deserves a{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#F3AA45] via-[#f7c276] to-[#F3AA45]">
                Smarter Strategy.
                {/* Tasteful custom saffron underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-2.5 text-[#F3AA45] opacity-80"
                  viewBox="0 0 200 8"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M1 5.5C40 2 120 1.5 199 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Bring your study plan, mock tests, current affairs, revision, and performance insights into one intelligent preparation space.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onNavigate('planner')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#F3AA45] to-[#f29e2e] text-[#10172A] font-bold text-sm tracking-wide shadow-xl shadow-[#F3AA45]/25 hover:shadow-[#F3AA45]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
              >
                <span>Build My Study Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('copilot')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#182746] hover:bg-[#203259] border border-[#24324D] hover:border-[#63B8A5]/50 text-slate-100 font-semibold text-sm transition-all flex items-center justify-center space-x-2.5"
              >
                <Sparkles className="w-4 h-4 text-[#63B8A5]" />
                <span>Explore the AI Mentor</span>
              </button>
            </div>

            {/* Supporting message & Trust proof */}
            <div className="pt-2 border-t border-[#24324D]/60 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
              <span className="italic font-medium text-slate-300">
                &ldquo;Learn at your pace. Practice with purpose. Improve every day.&rdquo;
              </span>
              <div className="hidden sm:block h-3 w-[1px] bg-[#24324D]" />
              <div className="flex items-center space-x-1.5 text-[#63B8A5]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Curated strictly to UPSC CSE 2026 syllabus</span>
              </div>
            </div>

            {/* High-yield highlights strip */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg mx-auto lg:mx-0">
              <div className="p-3 rounded-xl bg-[#182746]/60 border border-[#24324D] text-center lg:text-left">
                <div className="text-lg font-bold text-[#F3AA45] font-display">GS 1–4</div>
                <div className="text-[11px] text-slate-400">Integrated Syllabus</div>
              </div>
              <div className="p-3 rounded-xl bg-[#182746]/60 border border-[#24324D] text-center lg:text-left">
                <div className="text-lg font-bold text-[#63B8A5] font-display">Negative</div>
                <div className="text-[11px] text-slate-400">Marking Simulator</div>
              </div>
              <div className="p-3 rounded-xl bg-[#182746]/60 border border-[#24324D] text-center lg:text-left">
                <div className="text-lg font-bold text-white font-display">Spaced</div>
                <div className="text-[11px] text-slate-400">Revision Cycles</div>
              </div>
            </div>
          </div>

          {/* Right Column: High-fidelity Interactive Dashboard Preview */}
          <div className="lg:col-span-6 relative">
            <DashboardPreview profile={profile} onNavigate={onNavigate} />
          </div>
        </div>
      </div>
    </section>
  );
};
