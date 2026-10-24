import React, { useState } from 'react';
import {
  Target,
  CheckCircle2,
  Circle,
  Flame,
  Award,
  Sparkles,
  RotateCcw,
  Quote,
  CheckSquare
} from 'lucide-react';

interface DailyTask {
  id: string;
  title: string;
  subject: string;
  duration: string;
  completed: boolean;
}

export const DailyMissions: React.FC = () => {
  const [tasks, setTasks] = useState<DailyTask[]>([
    { id: 'dt-1', title: 'Read The Hindu / Indian Express Editorial & Notes', subject: 'Current Affairs', duration: '45 mins', completed: true },
    { id: 'dt-2', title: 'Solve 15 Prelims MCQs on Fundamental Rights (Articles 14–32)', subject: 'Polity', duration: '30 mins', completed: true },
    { id: 'dt-3', title: 'Draft 1 Mains GS 2 descriptive answer on Finance Commission', subject: 'Answer Writing', duration: '20 mins', completed: false },
    { id: 'dt-4', title: 'Complete 1 Pomodoro Deep Focus session on Peninsular Rivers', subject: 'Geography', duration: '25 mins', completed: false },
    { id: 'dt-5', title: 'Review 10 Flashcards in Spaced Revision Lab', subject: 'Active Recall', duration: '15 mins', completed: false },
  ]);

  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);

  const quotes = [
    {
      text: 'Cultivation of mind should be the ultimate aim of human existence.',
      author: 'Dr. B.R. Ambedkar',
      role: 'Father of the Indian Constitution'
    },
    {
      text: 'Arise, awake, and stop not until the goal is reached.',
      author: 'Swami Vivekananda',
      role: 'Philosopher & Youth Icon'
    },
    {
      text: 'By common endeavour we can raise the country to a new greatness, while a lack of unity will expose us to fresh calamities.',
      author: 'Sardar Vallabhbhai Patel',
      role: 'Iron Man of India & Architect of Civil Services'
    }
  ];

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleResetTasks = () => {
    setTasks((prev) => prev.map((t) => ({ ...t, completed: false })));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const currentQuote = quotes[activeQuoteIdx];

  return (
    <section id="missions" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/40 text-xs font-semibold text-[#F3AA45]">
            <Target className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              DAILY CONSISTENCY DISCIPLINE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Daily Learning Missions & Motivation
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Civil Services preparation is won through daily consistency. Complete today&apos;s 5 micro-targets to protect your active preparation streak.
          </p>
        </div>

        {/* 2-Column Layout: Daily Tasks + Motivational Wisdom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tasks Checklist (7 Cols) */}
          <div className="lg:col-span-7 bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#24324D]">
              <div>
                <span className="text-xs font-mono font-bold text-[#63B8A5] uppercase tracking-wider">
                  Today&apos;s Mission Protocol
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-0.5">
                  Target Checklist
                </h3>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-sm font-mono font-bold text-[#F3AA45]">
                  {completedCount}/{totalCount} Completed
                </span>
                <button
                  onClick={handleResetTasks}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#10172A]"
                  title="Reset daily tasks"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Daily Readiness Target</span>
                <span>{progressPct}%</span>
              </div>
              <div className="w-full bg-[#10172A] h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#F3AA45] to-[#63B8A5] transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-3 pt-2">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    task.completed
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                      : 'bg-[#10172A] border-[#24324D] text-slate-100 hover:border-slate-500'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0 pr-3">
                    <button
                      className="text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
                      aria-label="Toggle task completed"
                    >
                      {task.completed ? (
                        <CheckSquare className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>
                    <div className="min-w-0">
                      <div className={`text-xs sm:text-sm font-medium ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                        {task.title}
                      </div>
                      <div className="text-[11px] text-[#F3AA45] font-mono mt-0.5">
                        {task.subject}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0">
                    {task.duration}
                  </span>
                </div>
              ))}
            </div>

            {progressPct === 100 && (
              <div className="p-4 rounded-2xl bg-[#F3AA45]/15 border border-[#F3AA45]/40 text-center text-xs text-[#F3AA45] font-bold animate-in fade-in">
                🎉 Spectacular dedication! You have achieved 100% of today&apos;s study mission. Your streak extends by +1!
              </div>
            )}
          </div>

          {/* Right Column: Consistency Calendar & Leadership Quote (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Leadership Motivation Quote Card */}
            <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-7 relative overflow-hidden">
              <div className="p-3 rounded-2xl bg-[#F3AA45]/15 text-[#F3AA45] w-fit mb-4">
                <Quote className="w-5 h-5" />
              </div>

              <blockquote className="text-sm sm:text-base text-slate-200 font-serif italic leading-relaxed">
                &ldquo;{currentQuote.text}&rdquo;
              </blockquote>

              <div className="mt-4 pt-4 border-t border-[#24324D]/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{currentQuote.author}</div>
                  <div className="text-[10px] text-[#63B8A5] font-mono">{currentQuote.role}</div>
                </div>

                <button
                  onClick={() => setActiveQuoteIdx((prev) => (prev + 1) % quotes.length)}
                  className="text-xs text-[#F3AA45] hover:underline font-semibold"
                >
                  Next Quote &rarr;
                </button>
              </div>
            </div>

            {/* Consistency Habit Tracker Card */}
            <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center space-x-1.5">
                  <Flame className="w-4 h-4 text-[#F3AA45]" />
                  <span>30-Day Activity Heatmap</span>
                </span>
                <span className="text-xs text-[#63B8A5] font-bold font-mono">19-Day Streak</span>
              </div>

              {/* 30-Day Dot Matrix */}
              <div className="grid grid-cols-10 gap-2 pt-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const isDone = i < 19;
                  const isToday = i === 18;

                  return (
                    <div
                      key={i}
                      title={`Day ${i + 1}: ${isDone ? 'Completed Target' : 'Pending'}`}
                      className={`h-5 rounded-md transition-all ${
                        isToday
                          ? 'bg-[#F3AA45] ring-2 ring-white scale-110'
                          : isDone
                          ? 'bg-[#63B8A5]'
                          : 'bg-[#10172A] border border-[#24324D]'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-[#24324D]/60">
                <span>Current Cycle: Oct–Nov</span>
                <span className="text-slate-300">Goal: 90%+ Retention</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
