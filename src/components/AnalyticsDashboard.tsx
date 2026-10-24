import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Flame,
  CheckCircle2,
  Target,
  ArrowUpRight,
  BookOpen,
  PieChart,
  Calendar,
  Sparkles
} from 'lucide-react';
import { AspirantProfile } from '../types';

interface AnalyticsDashboardProps {
  profile: AspirantProfile;
  onNavigate: (sectionId: string) => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ profile, onNavigate }) => {
  return (
    <section id="analytics" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/40 text-xs font-semibold text-[#F3AA45]">
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              DATA-DRIVEN INSIGHTS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Performance Intelligence Center
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Real-time diagnostics across accuracy, syllabus coverage, mock-test percentiles, and revision velocity.
          </p>
        </div>

        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>Study Streak</span>
              <Flame className="w-4 h-4 text-[#F3AA45] animate-pulse" />
            </div>
            <div className="text-3xl font-black font-display text-white">
              {profile.totalDaysStreak} <span className="text-sm font-normal text-slate-400">Days</span>
            </div>
            <p className="text-xs text-[#63B8A5] mt-2 flex items-center space-x-1">
              <TrendingUp className="w-3 h-3" />
              <span>Top 5% consistency this cohort</span>
            </p>
          </div>

          <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>MCQs Attempted</span>
              <Award className="w-4 h-4 text-[#63B8A5]" />
            </div>
            <div className="text-3xl font-black font-display text-white">
              1,420
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Overall Accuracy: <span className="text-[#F3AA45] font-bold font-mono">76.4%</span>
            </p>
          </div>

          <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>Syllabus Coverage</span>
              <BookOpen className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div className="text-3xl font-black font-display text-white">
              {profile.syllabusProgressPct}%
            </div>
            <p className="text-xs text-slate-400 mt-2">
              Stage: <span className="text-white font-medium">{profile.preparationStage}</span>
            </p>
          </div>

          <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
              <span>Mock Percentile</span>
              <Sparkles className="w-4 h-4 text-[#F3AA45]" />
            </div>
            <div className="text-3xl font-black font-display text-[#F3AA45]">
              93.8%
            </div>
            <p className="text-xs text-emerald-400 mt-2">
              Predicted Prelims Clearance: High
            </p>
          </div>
        </div>

        {/* Middle Row: Detailed Charts & Subject Radar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          {/* Weekly Consistency Bar Chart (7 Cols) */}
          <div className="lg:col-span-7 bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white font-display">Weekly Study Hours vs Target</h3>
                <p className="text-xs text-slate-400">Target baseline: {profile.dailyStudyHours} hours daily</p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-[#10172A] text-[#63B8A5] border border-[#24324D]">
                +6.2h over target
              </span>
            </div>

            <div className="grid grid-cols-7 gap-3 items-end h-48 pt-6">
              {[
                { day: 'Mon', hours: 7.5, target: 8 },
                { day: 'Tue', hours: 8.5, target: 8 },
                { day: 'Wed', hours: 6.0, target: 8 },
                { day: 'Thu', hours: 9.0, target: 8 },
                { day: 'Fri', hours: 8.0, target: 8 },
                { day: 'Sat', hours: 10.5, target: 8 },
                { day: 'Sun', hours: 6.5, target: 8, current: true },
              ].map((item) => {
                const max = 12;
                const heightPct = Math.round((item.hours / max) * 100);
                const isOver = item.hours >= item.target;

                return (
                  <div key={item.day} className="flex flex-col items-center space-y-2 h-full justify-end group">
                    <span className="text-xs font-mono font-bold text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.hours}h
                    </span>
                    <div className="w-full max-w-[36px] bg-[#10172A] rounded-t-xl overflow-hidden flex flex-col justify-end h-32 border border-[#24324D]/60">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-700 ${
                          item.current
                            ? 'bg-[#F3AA45]'
                            : isOver
                            ? 'bg-[#63B8A5]'
                            : 'bg-slate-600'
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    </div>
                    <span className={`text-xs font-mono ${item.current ? 'text-[#F3AA45] font-bold' : 'text-slate-400'}`}>
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#24324D]/60 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#63B8A5] inline-block" />
                <span>Met Daily Target</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#F3AA45] inline-block" />
                <span>Today</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-600 inline-block" />
                <span>Below Target</span>
              </span>
            </div>
          </div>

          {/* Subject Mastery Index (5 Cols) */}
          <div className="lg:col-span-5 bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white font-display">Subject Mastery Index</h3>
                <span className="text-xs font-mono text-slate-400">GS 1–4</span>
              </div>

              <div className="space-y-3.5">
                {[
                  { name: 'Indian Polity & Governance', score: 84, color: '#F3AA45', label: 'Strong' },
                  { name: 'Modern Indian History', score: 72, color: '#63B8A5', label: 'Good' },
                  { name: 'Indian Economy & Budget', score: 68, color: '#38BDF8', label: 'Moderate' },
                  { name: 'Environment & Ecology', score: 80, color: '#A7F3D0', label: 'Strong' },
                  { name: 'Ethics, Integrity & Case Studies', score: 62, color: '#FCD34D', label: 'Needs Practice' },
                ].map((subj) => (
                  <div key={subj.name} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-200 font-medium truncate">{subj.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-400 font-mono">({subj.label})</span>
                        <span className="text-white font-mono font-bold">{subj.score}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-[#10172A] h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${subj.score}%`, backgroundColor: subj.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#24324D]/60 text-xs text-slate-400 flex items-center justify-between">
              <span>Weakest Area: Ethics Case Studies</span>
              <button
                onClick={() => onNavigate('mains')}
                className="text-[#F3AA45] hover:underline font-semibold"
              >
                Practice in Studio &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Action Recommendation Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-[#182746] to-[#121c33] border border-[#F3AA45]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-[#F3AA45] text-[#10172A] shrink-0 font-bold">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-display">
                AI Diagnostic Recommendation: Focus on Peninsular Drainage & Article 142
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Based on your last 3 mock test errors, reviewing river tributaries and discretionary Supreme Court powers will yield immediate percentile improvements.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('prelims')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] font-bold text-xs uppercase tracking-wider shrink-0 transition-transform active:scale-95"
          >
            Launch Targeted Test
          </button>
        </div>
      </div>
    </section>
  );
};
