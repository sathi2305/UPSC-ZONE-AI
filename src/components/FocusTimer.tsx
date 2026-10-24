import React, { useState, useEffect } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Coffee,
  BrainCircuit
} from 'lucide-react';

export const FocusTimer: React.FC = () => {
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(3);
  const [isDistractionFree, setIsDistractionFree] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (isActive && secondsLeft === 0) {
      setIsActive(false);
      if (mode === 'focus') {
        setCompletedSessions((prev) => prev + 1);
        setMode('shortBreak');
        setSecondsLeft(5 * 60);
      } else {
        setMode('focus');
        setSecondsLeft(durationMinutes * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, mode, durationMinutes]);

  const switchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setMode(newMode);
    setIsActive(false);
    if (newMode === 'focus') {
      setSecondsLeft(durationMinutes * 60);
    } else if (newMode === 'shortBreak') {
      setSecondsLeft(5 * 60);
    } else if (newMode === 'longBreak') {
      setSecondsLeft(15 * 60);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setSecondsLeft(durationMinutes * 60);
    } else if (mode === 'shortBreak') {
      setSecondsLeft(5 * 60);
    } else {
      setSecondsLeft(15 * 60);
    }
  };

  const changeDuration = (mins: number) => {
    setDurationMinutes(mins);
    if (mode === 'focus') {
      setIsActive(false);
      setSecondsLeft(mins * 60);
    }
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeString = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const currentTotalSeconds =
    mode === 'focus' ? durationMinutes * 60 : mode === 'shortBreak' ? 5 * 60 : 15 * 60;
  const progressPct = ((currentTotalSeconds - secondsLeft) / currentTotalSeconds) * 100;

  return (
    <section id="focus" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#63B8A5]/40 text-xs font-semibold text-[#63B8A5]">
            <Timer className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              DEEP WORK WORKSPACE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Focus Mode & Pomodoro Timer
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Train your mental stamina for the grueling 2-hour and 3-hour UPSC exam sessions with structured Pomodoro cycles.
          </p>
        </div>

        {/* Timer Card Container */}
        <div
          className={`bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-10 shadow-2xl transition-all duration-300 ${
            isDistractionFree ? 'ring-4 ring-[#F3AA45]/30' : ''
          }`}
        >
          {/* Top Bar: Mode tabs & Fullscreen toggle */}
          <div className="flex items-center justify-between pb-6 border-b border-[#24324D]/60 mb-6">
            <div className="flex rounded-xl bg-[#10172A] p-1 border border-[#24324D]">
              <button
                onClick={() => switchMode('focus')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                  mode === 'focus' ? 'bg-[#F3AA45] text-[#10172A]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>Deep Focus</span>
              </button>
              <button
                onClick={() => switchMode('shortBreak')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                  mode === 'shortBreak' ? 'bg-[#63B8A5] text-[#10172A]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>Short Break (5m)</span>
              </button>
              <button
                onClick={() => switchMode('longBreak')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                  mode === 'longBreak' ? 'bg-[#38BDF8] text-[#10172A]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Long Break (15m)</span>
              </button>
            </div>

            <button
              onClick={() => setIsDistractionFree(!isDistractionFree)}
              className="p-2 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-400 hover:text-white transition-colors"
              title="Toggle distraction-free view"
            >
              {isDistractionFree ? <Minimize2 className="w-4 h-4 text-[#F3AA45]" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Central Circular / Digital Timer Display */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
              {/* Circular SVG Progress Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke="#10172A"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="44"
                  stroke={mode === 'focus' ? '#F3AA45' : '#63B8A5'}
                  strokeWidth="6"
                  strokeDasharray="276.4"
                  strokeDashoffset={276.4 * (1 - progressPct / 100)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center select-none">
                <span className="font-display font-black text-5xl sm:text-6xl text-white tracking-tight">
                  {timeString}
                </span>
                <span className="text-xs uppercase font-mono text-slate-400 tracking-widest mt-2">
                  {mode === 'focus' ? 'Session In Progress' : 'Recovery Window'}
                </span>
              </div>
            </div>

            {/* Play / Pause / Reset Control Buttons */}
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`px-8 py-3.5 rounded-2xl font-bold text-sm shadow-xl flex items-center space-x-2 transition-all hover:scale-105 active:scale-95 ${
                  isActive
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] shadow-[#F3AA45]/20'
                }`}
              >
                {isActive ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Session</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Start Session</span>
                  </>
                )}
              </button>

              <button
                onClick={handleReset}
                className="p-3.5 rounded-2xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-slate-300 hover:text-white transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Settings & Session Count */}
          {!isDistractionFree && (
            <div className="pt-6 border-t border-[#24324D]/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <span>Duration:</span>
                {[25, 45, 60].map((m) => (
                  <button
                    key={m}
                    onClick={() => changeDuration(m)}
                    className={`px-2.5 py-1 rounded-lg border font-mono transition-colors ${
                      durationMinutes === m && mode === 'focus'
                        ? 'bg-[#F3AA45]/20 border-[#F3AA45] text-[#F3AA45] font-bold'
                        : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-white'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#63B8A5]" />
                <span>
                  Today&apos;s Focus Completed:{' '}
                  <strong className="text-white font-mono font-bold">{completedSessions} Sessions</strong>{' '}
                  ({completedSessions * 25} mins)
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
