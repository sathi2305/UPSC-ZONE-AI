import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  RotateCcw,
  Printer,
  CheckCircle2,
  Circle,
  CheckSquare,
  BookOpen,
  Coffee,
  Award
} from 'lucide-react';
import { StudyPlanDay } from '../types';

export const StudyPlanner: React.FC = () => {
  // User Form Parameters
  const [goal, setGoal] = useState<'2026 Prelims + Mains' | '2027 Comprehensive' | 'Mains Test Sprint'>('2026 Prelims + Mains');
  const [dailyHours, setDailyHours] = useState<number>(8);
  const [prioritySubject, setPrioritySubject] = useState<string>('Indian Polity & Governance');
  const [stage, setStage] = useState<'Foundation' | 'Consolidation' | 'Revision Sprint'>('Consolidation');
  const [restDay, setRestDay] = useState<'Sunday' | 'Saturday' | 'None'>('Sunday');
  const [revisionPref, setRevisionPref] = useState<'Daily 1.5h' | 'Weekend Sprints' | 'Active Recall Slots'>('Daily 1.5h');

  // Generated Plan State
  const defaultPlan: StudyPlanDay[] = [
    {
      dayNumber: 1,
      dayName: 'Monday',
      focusArea: 'Polity & Constitutional Framework',
      sessions: [
        { timeSlot: '07:00 – 09:30', activity: 'High-Yield Theory: Fundamental Rights & Judicial Writs', subject: 'Polity', durationMinutes: 150, completed: true },
        { timeSlot: '10:00 – 12:30', activity: 'Standard Text & Landmark Judgements (Kesavananda, Maneka)', subject: 'Polity', durationMinutes: 150, completed: true },
        { timeSlot: '14:30 – 16:30', activity: 'Daily Current Affairs Synthesis (The Hindu / PIB)', subject: 'Current Affairs', durationMinutes: 120, completed: false },
        { timeSlot: '17:00 – 18:30', activity: 'Solve 25 Prelims MCQs + Error Notebook Logging', subject: 'Practice', durationMinutes: 90, completed: false },
        { timeSlot: '20:30 – 21:30', activity: 'Active Recall Flashcard Session', subject: 'Revision', durationMinutes: 60, completed: false },
      ]
    },
    {
      dayNumber: 2,
      dayName: 'Tuesday',
      focusArea: 'Parliamentary Democracy & Legislation',
      sessions: [
        { timeSlot: '07:00 – 09:30', activity: 'Parliament & State Legislatures (Money Bills, Speaker Powers)', subject: 'Polity', durationMinutes: 150, completed: false },
        { timeSlot: '10:00 – 12:30', activity: 'Anti-Defection Law (10th Schedule) & Recent Case Precedents', subject: 'Polity', durationMinutes: 150, completed: false },
        { timeSlot: '14:30 – 16:30', activity: 'Mains GS 2 Descriptive Answer Practice (2 Questions)', subject: 'Mains Writing', durationMinutes: 120, completed: false },
        { timeSlot: '17:00 – 18:30', activity: 'CSAT Quantitative Aptitude Sprint (Ratio & Percentages)', subject: 'CSAT', durationMinutes: 90, completed: false },
        { timeSlot: '20:30 – 21:30', activity: 'Consolidation of Articles 52 to 151', subject: 'Revision', durationMinutes: 60, completed: false },
      ]
    },
    {
      dayNumber: 3,
      dayName: 'Wednesday',
      focusArea: 'Indian Economy & Macro Stability',
      sessions: [
        { timeSlot: '07:00 – 09:30', activity: 'Monetary Policy, RBI Tools (Repo, MSF) & Inflation Targeting', subject: 'Economy', durationMinutes: 150, completed: false },
        { timeSlot: '10:00 – 12:30', activity: 'Fiscal Policy, FRBM Targets & Government Capital Expenditure', subject: 'Economy', durationMinutes: 150, completed: false },
        { timeSlot: '14:30 – 16:30', activity: 'Economic Survey Chapter 1–3 Key Highlights', subject: 'Reports', durationMinutes: 120, completed: false },
        { timeSlot: '17:00 – 18:30', activity: 'Solve 25 Economy Prelims MCQs', subject: 'Practice', durationMinutes: 90, completed: false },
        { timeSlot: '20:30 – 21:30', activity: 'Formula & Concept Review', subject: 'Revision', durationMinutes: 60, completed: false },
      ]
    },
    {
      dayNumber: 4,
      dayName: 'Thursday',
      focusArea: 'Environment, Biodiversity & Climate Treaties',
      sessions: [
        { timeSlot: '07:00 – 09:30', activity: 'Wildlife Protection Amendment 2022 & Protected Area Network', subject: 'Environment', durationMinutes: 150, completed: false },
        { timeSlot: '10:00 – 12:30', activity: 'UNFCCC COP29 NCQG Climate Finance & India Commitments', subject: 'Environment', durationMinutes: 150, completed: false },
        { timeSlot: '14:30 – 16:30', activity: 'Ramsar Sites & Biosphere Reserves Map Practice', subject: 'Mapping', durationMinutes: 120, completed: false },
        { timeSlot: '17:00 – 18:30', activity: 'Mains GS 3 Answer: Climate Adaptation Finance', subject: 'Mains Writing', durationMinutes: 90, completed: false },
        { timeSlot: '20:30 – 21:30', activity: 'Daily Flashcard Spaced Interval Deck', subject: 'Revision', durationMinutes: 60, completed: false },
      ]
    },
    {
      dayNumber: 5,
      dayName: 'Friday',
      focusArea: 'Modern Indian History & Freedom Movement',
      sessions: [
        { timeSlot: '07:00 – 09:30', activity: 'Gandhian Phases (Non-Cooperation, Civil Disobedience, Quit India)', subject: 'History', durationMinutes: 150, completed: false },
        { timeSlot: '10:00 – 12:30', activity: 'Constitutional Acts 1909, 1919, 1935 Evolution', subject: 'History', durationMinutes: 150, completed: false },
        { timeSlot: '14:30 – 16:30', activity: 'Weekly Current Affairs Consolidation (Magazines/PIB)', subject: 'Current Affairs', durationMinutes: 120, completed: false },
        { timeSlot: '17:00 – 18:30', activity: 'Solve 30 History PYQs (2018–2024)', subject: 'PYQ Practice', durationMinutes: 90, completed: false },
        { timeSlot: '20:30 – 21:30', activity: 'Timeline Review & Mnemonics', subject: 'Revision', durationMinutes: 60, completed: false },
      ]
    },
    {
      dayNumber: 6,
      dayName: 'Saturday',
      focusArea: 'Optional Subject & Integrated GS Mains',
      sessions: [
        { timeSlot: '08:00 – 11:00', activity: 'Optional Subject Paper 1 Deep Dive & Answer Framework', subject: 'Optional', durationMinutes: 180, completed: false },
        { timeSlot: '12:00 – 14:00', activity: 'Optional Paper 2 Key Thinkers / Applied Case Studies', subject: 'Optional', durationMinutes: 120, completed: false },
        { timeSlot: '15:30 – 17:30', activity: 'Ethics (GS 4) Case Study Writing Practice (2 Scenarios)', subject: 'Ethics GS 4', durationMinutes: 120, completed: false },
        { timeSlot: '18:30 – 20:00', activity: 'CSAT Reading Comprehension Speed Drill', subject: 'CSAT', durationMinutes: 90, completed: false },
      ]
    },
    {
      dayNumber: 7,
      dayName: 'Sunday',
      focusArea: 'Full Simulation & Mind Recovery',
      sessions: [
        { timeSlot: '09:30 – 11:30', activity: 'Prelims GS Paper 1 Full Mock Exam (100 Questions, Strict Timer)', subject: 'Full Mock', durationMinutes: 120, completed: false },
        { timeSlot: '13:00 – 14:30', activity: 'Mock Test Error Analysis & Weak Area Identification', subject: 'Analysis', durationMinutes: 90, completed: false },
        { timeSlot: '15:30 – 18:00', activity: 'Mind Recovery & Weekly Planning Calibration for Week Ahead', subject: 'Rest / Planning', durationMinutes: 150, completed: false },
      ]
    }
  ];

  const [weeklyPlan, setWeeklyPlan] = useState<StudyPlanDay[]>(defaultPlan);

  const toggleSessionComplete = (dayIdx: number, sessionIdx: number) => {
    setWeeklyPlan((prev) => {
      const next = [...prev];
      const targetSession = next[dayIdx].sessions[sessionIdx];
      targetSession.completed = !targetSession.completed;
      return next;
    });
  };

  const totalSessions = weeklyPlan.reduce((acc, day) => acc + day.sessions.length, 0);
  const completedSessions = weeklyPlan.reduce(
    (acc, day) => acc + day.sessions.filter((s) => s.completed).length,
    0
  );
  const planProgressPct = Math.round((completedSessions / totalSessions) * 100);

  const handleRegenerate = () => {
    // Dynamically customize subject headers according to prioritySubject
    const updated = defaultPlan.map((d, idx) => {
      if (idx === 0) {
        return {
          ...d,
          focusArea: `${prioritySubject} Acceleration`,
          sessions: d.sessions.map((s) => ({
            ...s,
            completed: false,
            durationMinutes: Math.round((dailyHours * 60) / d.sessions.length),
          })),
        };
      }
      return {
        ...d,
        sessions: d.sessions.map((s) => ({
          ...s,
          completed: false,
          durationMinutes: Math.round((dailyHours * 60) / d.sessions.length),
        })),
      };
    });
    setWeeklyPlan(updated);
  };

  const handleReset = () => {
    setWeeklyPlan(defaultPlan.map((d) => ({
      ...d,
      sessions: d.sessions.map((s) => ({ ...s, completed: false })),
    })));
  };

  return (
    <section id="planner" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60 print:bg-white print:text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3 print:hidden">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/40 text-xs font-semibold text-[#F3AA45]">
            <Calendar className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              ADAPTIVE TIMETABLE ENGINE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Adaptive Study Planner Pro
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Generate a balanced, high-retention weekly study schedule calibrated to your daily available hours and preparation stage.
          </p>
        </div>

        {/* Configuration Setup Form */}
        <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-8 mb-8 print:hidden shadow-xl">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#F3AA45] font-mono mb-4 flex items-center space-x-2">
            <Sparkles className="w-4 h-4" />
            <span>Customize Your 7-Day Timetable Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Goal */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Preparation Goal</label>
              <select
                value={goal}
                onChange={(e: any) => setGoal(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 text-xs focus:outline-none focus:border-[#F3AA45]"
              >
                <option value="2026 Prelims + Mains">2026 Prelims + Mains Integrated</option>
                <option value="2027 Comprehensive">2027 Foundation & Consolidation</option>
                <option value="Mains Test Sprint">Mains Answer Writing Sprint</option>
              </select>
            </div>

            {/* Daily Hours */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Daily Study Hours</label>
              <select
                value={dailyHours}
                onChange={(e) => setDailyHours(parseInt(e.target.value, 10))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 text-xs focus:outline-none focus:border-[#F3AA45]"
              >
                <option value={4}>4 Hours / Day (Working Professional)</option>
                <option value={6}>6 Hours / Day (Student)</option>
                <option value={8}>8 Hours / Day (Full-Time Aspirant)</option>
                <option value={10}>10+ Hours / Day (Final Lap Sprint)</option>
              </select>
            </div>

            {/* Priority Subject */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Priority Focus Subject</label>
              <select
                value={prioritySubject}
                onChange={(e) => setPrioritySubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 text-xs focus:outline-none focus:border-[#F3AA45]"
              >
                <option value="Indian Polity & Governance">Indian Polity & Governance (GS 2)</option>
                <option value="Modern Indian History">Modern Indian History (GS 1)</option>
                <option value="Indian Economy">Indian Economy & Budget (GS 3)</option>
                <option value="Environment & Ecology">Environment & Ecology (GS 3)</option>
                <option value="Ethics & Case Studies">Ethics & Case Studies (GS 4)</option>
              </select>
            </div>

            {/* Stage */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Preparation Stage</label>
              <select
                value={stage}
                onChange={(e: any) => setStage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 text-xs focus:outline-none focus:border-[#F3AA45]"
              >
                <option value="Foundation">Foundation (NCERTs & Standard Texts)</option>
                <option value="Consolidation">Consolidation (PYQs & Notes)</option>
                <option value="Revision Sprint">Revision Sprint (Mock Tests)</option>
              </select>
            </div>

            {/* Weekly Rest Day */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Weekly Rest / Buffer Day</label>
              <select
                value={restDay}
                onChange={(e: any) => setRestDay(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 text-xs focus:outline-none focus:border-[#F3AA45]"
              >
                <option value="Sunday">Sunday Afternoon Buffer</option>
                <option value="Saturday">Saturday Evening Buffer</option>
                <option value="None">No Rest Day (Sprint Mode)</option>
              </select>
            </div>

            {/* Revision Preference */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1.5">Revision Model</label>
              <select
                value={revisionPref}
                onChange={(e: any) => setRevisionPref(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 text-xs focus:outline-none focus:border-[#F3AA45]"
              >
                <option value="Daily 1.5h">Daily 1.5h Evening Recall Block</option>
                <option value="Weekend Sprints">Weekend Spaced Sprints</option>
                <option value="Active Recall Slots">Active Recall Slots after each session</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-[#24324D]">
            <div className="text-xs text-slate-400">
              Schedule dynamically adjusts subject weighting and mock test distribution.
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Reset Default
              </button>
              <button
                onClick={handleRegenerate}
                className="px-5 py-2.5 rounded-xl bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] text-xs font-bold shadow-md shadow-[#F3AA45]/20 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Regenerate Custom Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Progress Bar for Timetable */}
        <div className="bg-[#182746] border border-[#24324D] rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#63B8A5]/20 text-[#63B8A5] flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-mono">Weekly Target Completion</div>
              <div className="text-lg font-bold text-white font-display">
                {completedSessions} of {totalSessions} Study Sessions Completed ({planProgressPct}%)
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="w-full sm:w-48 bg-[#10172A] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F3AA45] to-[#63B8A5] transition-all duration-500"
                style={{ width: `${planProgressPct}%` }}
              />
            </div>
            <button
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-slate-300 print:hidden transition-colors"
              title="Print timetable / Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 7-Day Timetable Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {weeklyPlan.map((day, dIdx) => {
            const isToday = dIdx === 0;
            const completedCount = day.sessions.filter((s) => s.completed).length;

            return (
              <div
                key={day.dayNumber}
                className={`rounded-3xl border p-5 flex flex-col justify-between transition-all ${
                  isToday
                    ? 'bg-[#182746] border-[#F3AA45] shadow-xl shadow-[#F3AA45]/10'
                    : 'bg-[#182746]/80 border-[#24324D]'
                }`}
              >
                <div>
                  {/* Day Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#24324D]/60 mb-3">
                    <div>
                      <div className="text-base font-bold text-white flex items-center space-x-2">
                        <span>{day.dayName}</span>
                        {isToday && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#F3AA45] text-[#10172A] font-bold">
                            Today
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#63B8A5] font-mono truncate max-w-[180px]">
                        {day.focusArea}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {completedCount}/{day.sessions.length}
                    </span>
                  </div>

                  {/* Sessions List */}
                  <div className="space-y-2.5">
                    {day.sessions.map((session, sIdx) => (
                      <div
                        key={sIdx}
                        onClick={() => toggleSessionComplete(dIdx, sIdx)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start space-x-2.5 ${
                          session.completed
                            ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-400'
                            : 'bg-[#10172A] border-[#24324D] text-slate-200 hover:border-slate-500'
                        }`}
                      >
                        <button
                          className="mt-0.5 shrink-0 text-slate-400 hover:text-emerald-400 transition-colors"
                          aria-label="Toggle session completed"
                        >
                          {session.completed ? (
                            <CheckSquare className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Circle className="w-4 h-4" />
                          )}
                        </button>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#F3AA45] mb-0.5">
                            <span>{session.timeSlot}</span>
                            <span className="text-slate-400">{session.durationMinutes}m</span>
                          </div>
                          <div className={`font-medium line-clamp-2 ${session.completed ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                            {session.activity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-[#24324D]/60 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Target: {day.sessions.reduce((acc, s) => acc + s.durationMinutes, 0) / 60}h</span>
                  <span>{completedCount === day.sessions.length ? '🎉 Day Complete' : 'In Progress'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
