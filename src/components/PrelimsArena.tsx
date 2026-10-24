import React, { useState, useEffect } from 'react';
import {
  Award,
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { samplePrelimsQuestions } from '../data/mockData';

export const PrelimsArena: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<number, boolean>>({});
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Timer states (default 10 minutes = 600 seconds)
  const [timeLeft, setTimeLeft] = useState(600);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeLeft > 0 && !isTestFinished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isTestFinished]);

  const currentQ = samplePrelimsQuestions[currentIdx];
  const totalQuestions = samplePrelimsQuestions.length;

  const handleSelectOption = (optIdx: number) => {
    if (submittedQuestions[currentIdx] || isTestFinished) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleToggleReview = () => {
    setMarkedForReview((prev) => ({ ...prev, [currentIdx]: !prev[currentIdx] }));
  };

  const handleSubmitCurrentQuestion = () => {
    if (selectedAnswers[currentIdx] === undefined) return;
    setSubmittedQuestions((prev) => ({ ...prev, [currentIdx]: true }));
  };

  // Score Calculation (+2 for correct, -0.66 for incorrect)
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  samplePrelimsQuestions.forEach((q, idx) => {
    const userAns = selectedAnswers[idx];
    if (userAns === undefined) {
      unattemptedCount++;
    } else if (userAns === q.correctOptionIndex) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  });

  const totalScore = Math.max(0, correctCount * 2 - incorrectCount * 0.66);
  const accuracyPct =
    correctCount + incorrectCount > 0
      ? Math.round((correctCount / (correctCount + incorrectCount)) * 100)
      : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResetTest = () => {
    setSelectedAnswers({});
    setMarkedForReview({});
    setSubmittedQuestions({});
    setIsTestFinished(false);
    setCurrentIdx(0);
    setTimeLeft(600);
    setIsTimerRunning(true);
    setShowSubmitModal(false);
  };

  return (
    <section id="prelims" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#63B8A5]/40 text-xs font-semibold text-[#63B8A5]">
            <Award className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              EXAM SIMULATOR ENGINE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive Prelims Arena
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Authentic UPSC General Studies Paper 1 simulator with multi-statement questions, standard negative marking (-0.66), and detailed official rationale.
          </p>
        </div>

        {/* Main Arena Simulator Card */}
        <div className="bg-[#182746] border border-[#24324D] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
          {/* Top Control Bar: Timer, Status, Palette */}
          <div className="px-6 py-4 bg-[#10172A]/90 border-b border-[#24324D] flex flex-wrap items-center justify-between gap-4">
            {/* Left: Question info & subject badge */}
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold text-[#F3AA45] bg-[#F3AA45]/15 px-3 py-1 rounded-xl border border-[#F3AA45]/30">
                Question {currentIdx + 1} of {totalQuestions}
              </span>
              <span className="text-xs font-medium text-slate-300 bg-[#182746] px-3 py-1 rounded-xl border border-[#24324D]">
                {currentQ.subject} &bull; {currentQ.subtopic}
              </span>
              <span className="hidden sm:inline-block text-[11px] font-mono text-[#63B8A5] bg-[#63B8A5]/10 px-2 py-0.5 rounded">
                {currentQ.difficulty}
              </span>
            </div>

            {/* Right: Timer & Test Actions */}
            <div className="flex items-center space-x-3">
              {/* Exam Timer */}
              <div className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#10172A] border border-[#24324D] text-xs">
                <Timer className={`w-4 h-4 ${timeLeft < 120 ? 'text-rose-400 animate-pulse' : 'text-[#F3AA45]'}`} />
                <span className={`font-mono font-bold ${timeLeft < 120 ? 'text-rose-400' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
                {!isTestFinished && (
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
                    aria-label={isTimerRunning ? 'Pause timer' : 'Resume timer'}
                  >
                    {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 text-emerald-400" />}
                  </button>
                )}
              </div>

              {!isTestFinished && (
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="px-4 py-1.5 rounded-xl bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] text-xs font-bold transition-all"
                >
                  Submit Test
                </button>
              )}
            </div>
          </div>

          {/* Test in Progress View OR Finished Result Summary */}
          {!isTestFinished ? (
            <div className="p-6 sm:p-8 space-y-6">
              {/* Question Text */}
              <div className="bg-[#10172A]/70 border border-[#24324D] rounded-2xl p-5 sm:p-6">
                <pre className="font-sans whitespace-pre-line text-sm sm:text-base text-slate-100 leading-relaxed font-normal">
                  {currentQ.question}
                </pre>
              </div>

              {/* Four Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === optIdx;
                  const isSubmitted = submittedQuestions[currentIdx];
                  const isCorrect = optIdx === currentQ.correctOptionIndex;

                  let borderClass = 'border-[#24324D] hover:border-slate-500 bg-[#10172A]/50 text-slate-300';
                  if (isSelected && !isSubmitted) {
                    borderClass = 'border-[#F3AA45] bg-[#F3AA45]/15 text-white ring-1 ring-[#F3AA45]';
                  } else if (isSubmitted) {
                    if (isCorrect) {
                      borderClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      borderClass = 'border-rose-500 bg-rose-950/40 text-rose-200 ring-1 ring-rose-500';
                    }
                  }

                  const optLabels = ['(a)', '(b)', '(c)', '(d)'];

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`flex items-start space-x-3 p-4 rounded-2xl border text-left text-sm transition-all ${borderClass}`}
                    >
                      <span className="font-mono font-bold text-xs shrink-0 mt-0.5 text-[#F3AA45]">
                        {optLabels[optIdx]}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isSubmitted && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Action Toolbar: Review, Check Answer, Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#24324D]/60">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleToggleReview}
                    className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      markedForReview[currentIdx]
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>{markedForReview[currentIdx] ? 'Marked for Review' : 'Mark for Review'}</span>
                  </button>

                  {!submittedQuestions[currentIdx] && selectedAnswers[currentIdx] !== undefined && (
                    <button
                      onClick={handleSubmitCurrentQuestion}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      Check Answer
                    </button>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    disabled={currentIdx === 0}
                    onClick={() => setCurrentIdx((prev) => prev - 1)}
                    className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-[#10172A] hover:bg-[#203259] disabled:opacity-30 border border-[#24324D] text-xs font-medium text-slate-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    disabled={currentIdx === totalQuestions - 1}
                    onClick={() => setCurrentIdx((prev) => prev + 1)}
                    className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-[#10172A] hover:bg-[#203259] disabled:opacity-30 border border-[#24324D] text-xs font-medium text-slate-300"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Detailed Explanation Panel (Visible after submit or checking answer) */}
              {submittedQuestions[currentIdx] && (
                <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#10172A] border border-[#24324D] space-y-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono uppercase tracking-wider text-[#F3AA45] flex items-center space-x-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>UPSC Detailed Rationale & Key Takeaway</span>
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {currentQ.syllabusTag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {currentQ.explanation}
                  </p>
                  <div className="p-3 rounded-xl bg-[#182746] border-l-4 border-[#63B8A5] text-xs text-slate-300">
                    <span className="font-bold text-[#63B8A5]">Mnemonic / Key Rule: </span>
                    {currentQ.keyTakeaway}
                  </div>
                </div>
              )}

              {/* Question Palette Strip */}
              <div className="pt-4 border-t border-[#24324D]/60 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-mono">Palette:</span>
                  {samplePrelimsQuestions.map((_, idx) => {
                    const isCurrent = idx === currentIdx;
                    const isAnswered = selectedAnswers[idx] !== undefined;
                    const isReview = markedForReview[idx];

                    let paletteStyle = 'bg-[#10172A] border-[#24324D] text-slate-400';
                    if (isCurrent) {
                      paletteStyle = 'ring-2 ring-[#F3AA45] text-white bg-[#182746]';
                    } else if (isReview) {
                      paletteStyle = 'bg-amber-500/20 border-amber-500 text-amber-300';
                    } else if (isAnswered) {
                      paletteStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-300';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentIdx(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-mono font-bold border flex items-center justify-center transition-all ${paletteStyle}`}
                        aria-label={`Go to question ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                    <span>Answered ({Object.keys(selectedAnswers).length})</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                    <span>Review ({Object.values(markedForReview).filter(Boolean).length})</span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Test Completed Score Summary Screen */
            <div className="p-8 space-y-8 text-center">
              <div className="max-w-md mx-auto space-y-3">
                <div className="w-16 h-16 rounded-3xl bg-[#F3AA45]/20 text-[#F3AA45] flex items-center justify-center mx-auto mb-2 border border-[#F3AA45]/30">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black text-white">
                  Simulation Performance Analysis
                </h3>
                <p className="text-xs text-slate-300">
                  Calculated based on standard UPSC CSE Prelims marking rules (+2.00 marks for correct, -0.66 penalty for wrong answers).
                </p>
              </div>

              {/* Score Breakdown Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="p-4 rounded-2xl bg-[#10172A] border border-[#24324D]">
                  <div className="text-xs text-slate-400 font-mono">Total Score</div>
                  <div className="text-2xl font-black font-display text-[#F3AA45] mt-1">
                    {totalScore.toFixed(2)}
                  </div>
                  <div className="text-[10px] text-slate-500">out of 10.00 Marks</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#10172A] border border-[#24324D]">
                  <div className="text-xs text-slate-400 font-mono">Accuracy Rate</div>
                  <div className="text-2xl font-black font-display text-[#63B8A5] mt-1">
                    {accuracyPct}%
                  </div>
                  <div className="text-[10px] text-slate-500">Target: &gt;75%</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#10172A] border border-[#24324D]">
                  <div className="text-xs text-slate-400 font-mono">Correct / Wrong</div>
                  <div className="text-2xl font-black font-display text-white mt-1">
                    <span className="text-emerald-400">{correctCount}</span> /{' '}
                    <span className="text-rose-400">{incorrectCount}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">{unattemptedCount} Unattempted</div>
                </div>

                <div className="p-4 rounded-2xl bg-[#10172A] border border-[#24324D]">
                  <div className="text-xs text-slate-400 font-mono">Time Spent</div>
                  <div className="text-2xl font-black font-display text-white mt-1">
                    {formatTime(600 - timeLeft)}
                  </div>
                  <div className="text-[10px] text-slate-500">Avg 1m 12s/Q</div>
                </div>
              </div>

              {/* Review Question List */}
              <div className="max-w-2xl mx-auto text-left space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Question-by-Question Breakdown
                </h4>
                <div className="divide-y divide-[#24324D] rounded-2xl bg-[#10172A] border border-[#24324D] overflow-hidden">
                  {samplePrelimsQuestions.map((q, idx) => {
                    const userAns = selectedAnswers[idx];
                    const isCorrect = userAns === q.correctOptionIndex;
                    const isUnattempted = userAns === undefined;

                    return (
                      <div key={q.id} className="p-3.5 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          <span className="font-mono font-bold text-slate-400 w-5">#{idx + 1}</span>
                          <span className="text-slate-200 font-medium">{q.subject} &mdash; {q.subtopic}</span>
                        </div>
                        <div>
                          {isUnattempted ? (
                            <span className="text-slate-500 font-mono">Skipped (0 pts)</span>
                          ) : isCorrect ? (
                            <span className="text-emerald-400 font-mono font-bold">+2.00 pts</span>
                          ) : (
                            <span className="text-rose-400 font-mono font-bold">-0.66 pts</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Retake Button */}
              <div className="pt-4">
                <button
                  onClick={handleResetTest}
                  className="px-6 py-3 rounded-2xl bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] font-bold text-sm shadow-lg shadow-[#F3AA45]/20 transition-all inline-flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Restart Simulation</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#182746] border border-[#24324D] rounded-2xl p-6 max-w-sm w-full space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white font-display">Confirm Test Submission</h4>
            <p className="text-xs text-slate-300">
              You have answered <span className="text-white font-bold">{Object.keys(selectedAnswers).length}</span> of {totalQuestions} questions. Are you sure you want to finalize and calculate your score?
            </p>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-300 text-xs font-semibold hover:text-white"
              >
                Continue Test
              </button>
              <button
                onClick={() => {
                  setShowSubmitModal(false);
                  setIsTestFinished(true);
                  setIsTimerRunning(false);
                }}
                className="px-5 py-2 rounded-xl bg-[#F3AA45] text-[#10172A] text-xs font-bold hover:bg-[#f29e2e]"
              >
                Submit Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
