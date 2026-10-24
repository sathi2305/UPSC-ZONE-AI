import React from 'react';
import {
  CheckCircle2,
  TrendingUp,
  BrainCircuit,
  Flame,
  Award,
  Sparkles,
  ArrowUpRight,
  Target
} from 'lucide-react';
import { AspirantProfile } from '../types';

interface DashboardPreviewProps {
  profile: AspirantProfile;
  onNavigate: (sectionId: string) => void;
}

export const DashboardPreview: React.FC<DashboardPreviewProps> = ({ profile, onNavigate }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto lg:max-w-none">
      {/* Ambient background glows */}
      <div className="absolute -top-12 -right-12 w-72 h-72 bg-[#F3AA45]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-[#63B8A5]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Dashboard Container */}
      <div className="relative rounded-3xl bg-[#182746]/85 border border-[#24324D] shadow-2xl backdrop-blur-xl p-5 sm:p-7 overflow-hidden">
        {/* Top Header Row of Dashboard */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#24324D]/60">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F3AA45]/15 border border-[#F3AA45]/30 flex items-center justify-center text-[#F3AA45] font-black text-sm">
              CSE
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#63B8A5]">
                  Active Preparation Cockpit
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#F3AA45]/15 text-[#F3AA45] border border-[#F3AA45]/30">
                  Demo Sync
                </span>
              </div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>{profile.name}&apos;s Daily Mission</span>
                <span className="text-xs text-slate-400 font-normal">({profile.targetYear})</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#10172A] border border-[#24324D] text-xs">
              <Flame className="w-3.5 h-3.5 text-[#F3AA45] animate-pulse" />
              <span className="font-bold text-white">{profile.totalDaysStreak}</span>
              <span className="text-slate-400">Day Streak</span>
            </div>
            <button
              onClick={() => onNavigate('analytics')}
              className="p-1.5 rounded-xl bg-[#10172A] hover:bg-[#F3AA45] hover:text-[#10172A] border border-[#24324D] text-slate-300 transition-colors"
              title="Open full analytics"
              aria-label="Open performance analytics"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Grid Layout of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-5">
          {/* Circular Preparation Readiness Meter */}
          <div className="sm:col-span-5 bg-[#10172A]/80 border border-[#24324D] rounded-2xl p-4 flex flex-col items-center justify-center text-center relative group hover:border-[#63B8A5]/40 transition-all">
            <div className="relative w-28 h-28 my-1 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className="text-slate-800"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#F3AA45"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 * (1 - profile.syllabusProgressPct / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black font-display text-white">
                  {profile.syllabusProgressPct}%
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                  Syllabus Ready
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-slate-200 mt-1">Stage: {profile.preparationStage}</span>
            <span className="text-[11px] text-[#63B8A5] mt-0.5">Estimated on track for Prelims</span>
          </div>

          {/* Subject Mastery Snapshot */}
          <div className="sm:col-span-7 bg-[#10172A]/80 border border-[#24324D] rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Subject Mastery Index
              </span>
              <span className="text-[10px] font-mono text-slate-500">Curated Weights</span>
            </div>

            <div className="space-y-2.5">
              {[
                { name: 'Polity & Governance', score: 84, color: '#F3AA45' },
                { name: 'Modern History & Art', score: 72, color: '#63B8A5' },
                { name: 'Economy & Planning', score: 68, color: '#38BDF8' },
                { name: 'Environment & Climate', score: 80, color: '#A7F3D0' },
              ].map((subj) => (
                <div key={subj.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium truncate">{subj.name}</span>
                    <span className="text-white font-mono font-semibold">{subj.score}%</span>
                  </div>
                  <div className="w-full bg-[#182746] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${subj.score}%`, backgroundColor: subj.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Mock-Test Score Card */}
          <div className="sm:col-span-6 bg-gradient-to-br from-[#10172A] to-[#182746] border border-[#24324D] rounded-2xl p-4 hover:border-[#F3AA45]/30 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1.5 text-xs text-[#F3AA45] font-semibold">
                <Award className="w-4 h-4" />
                <span>Last Prelims Mock</span>
              </div>
              <span className="text-[10px] bg-[#63B8A5]/20 text-[#63B8A5] px-2 py-0.5 rounded-full font-medium">
                +14.2 Marks
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-black font-display text-white">118.6</span>
              <span className="text-xs text-slate-400">/ 200 (Cutoff est. ~92)</span>
            </div>
            <p className="text-xs text-slate-400 mt-2 line-clamp-2">
              High accuracy in Constitutional Writs & Balance of Payments. Weak in Peninsular River Tributaries.
            </p>
            <button
              onClick={() => onNavigate('prelims')}
              className="mt-3 text-xs text-[#F3AA45] hover:text-[#f29e2e] font-semibold flex items-center space-x-1"
            >
              <span>Attempt new simulation</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* AI Mentor Quick Interaction Snippet */}
          <div className="sm:col-span-6 bg-[#10172A]/80 border border-[#24324D] rounded-2xl p-4 flex flex-col justify-between hover:border-[#63B8A5]/40 transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1.5 text-xs text-[#63B8A5] font-semibold">
                  <BrainCircuit className="w-4 h-4" />
                  <span>AI Mentor Prompt</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">GS 2: Art. 32</span>
              </div>
              <p className="text-xs text-slate-300 italic bg-[#182746]/60 p-2.5 rounded-xl border border-[#24324D]/40">
                &ldquo;Why can Habeas Corpus be issued against private citizens while Mandamus cannot?&rdquo;
              </p>
            </div>
            <button
              onClick={() => onNavigate('copilot')}
              className="mt-3 w-full py-1.5 px-3 rounded-xl bg-[#24324D]/80 hover:bg-[#24324D] text-slate-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F3AA45]" />
              <span>Open in Copilot</span>
            </button>
          </div>

          {/* Weekly Study Activity Visualization */}
          <div className="sm:col-span-12 bg-[#10172A]/80 border border-[#24324D] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-[#F3AA45]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Weekly Study Velocity (Hours / Day)
                </span>
              </div>
              <span className="text-xs text-slate-400">Goal: {profile.dailyStudyHours}h/day</span>
            </div>

            <div className="grid grid-cols-7 gap-2 items-end h-20 pt-2">
              {[
                { day: 'Mon', hours: 7.5, max: 10 },
                { day: 'Tue', hours: 8.5, max: 10 },
                { day: 'Wed', hours: 6.0, max: 10 },
                { day: 'Thu', hours: 9.0, max: 10 },
                { day: 'Fri', hours: 8.0, max: 10 },
                { day: 'Sat', hours: 10.5, max: 10 },
                { day: 'Sun', hours: 6.5, max: 10, isCurrent: true },
              ].map((d) => {
                const heightPct = Math.min(100, Math.round((d.hours / d.max) * 100));
                return (
                  <div key={d.day} className="flex flex-col items-center space-y-1 h-full justify-end group">
                    <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {d.hours}h
                    </span>
                    <div className="w-full max-w-[28px] bg-[#182746] rounded-t-lg overflow-hidden flex flex-col justify-end h-12">
                      <div
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          d.isCurrent ? 'bg-[#F3AA45]' : 'bg-[#63B8A5]/70 group-hover:bg-[#63B8A5]'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-mono ${d.isCurrent ? 'text-[#F3AA45] font-bold' : 'text-slate-400'}`}>
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Next Task Strip */}
          <div className="sm:col-span-12 flex flex-col sm:flex-row items-center justify-between p-3.5 rounded-2xl bg-[#F3AA45]/10 border border-[#F3AA45]/30 gap-3">
            <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
              <div className="p-2 rounded-xl bg-[#F3AA45] text-[#10172A] shrink-0 font-bold">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Recommended Next Task</div>
                <div className="text-xs text-slate-300">
                  Attempt 10 PYQs on Constitutional & Non-Constitutional Bodies (GS 2)
                </div>
              </div>
            </div>
            <button
              onClick={() => onNavigate('pyq')}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] text-xs font-bold shrink-0 transition-transform active:scale-95"
            >
              Start Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
