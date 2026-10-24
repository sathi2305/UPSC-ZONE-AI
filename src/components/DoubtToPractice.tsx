import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';

export const DoubtToPractice: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState('Preamble & Basic Structure');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAddedToRevision, setIsAddedToRevision] = useState(false);

  const steps = [
    { num: 1, label: 'Select Topic' },
    { num: 2, label: 'Explanation' },
    { num: 3, label: 'Key Takeaways' },
    { num: 4, label: 'Attempt MCQ' },
    { num: 5, label: 'Feedback' },
    { num: 6, label: 'Revision Queue' },
  ];

  const topicsData: Record<
    string,
    {
      summary: string;
      takeaways: string[];
      question: string;
      options: string[];
      correctOption: number;
      explanation: string;
    }
  > = {
    'Preamble & Basic Structure': {
      summary: `The Preamble is the introductory statement that sets out the guiding purpose and principles of the Indian Constitution. In the Berubari Union case (1960), the Supreme Court initially held that the Preamble was NOT part of the Constitution. However, in Kesavananda Bharati (1973), the 13-Judge bench overruled Berubari, affirming that the Preamble IS an integral part of the Constitution and can be amended under Article 368 without altering the Basic Structure.`,
      takeaways: [
        'The Preamble is non-justiciable (its provisions cannot be directly enforced in courts).',
        'Amended only once so far by the 42nd Amendment Act (1976), which inserted "Socialist", "Secular", and "Integrity".',
        'It is neither a source of power to legislature nor a prohibition upon legislative powers.'
      ],
      question: `With reference to the Preamble to the Constitution of India, which of the following statements is correct?`,
      options: [
        'It is a part of the Constitution and has independent legal effect without other provisions.',
        'It is not a part of the Constitution and has no legal effect.',
        'It is a part of the Constitution and has the same legal effect as any other part.',
        'It is a part of the Constitution but has no legal effect independently of other parts.'
      ],
      correctOption: 3,
      explanation: `As affirmed in LIC of India (1995) and Kesavananda Bharati (1973), the Preamble is an integral part of the Constitution. However, it cannot be enforced as an independent source of legal right or prohibition in courts without connecting to an operative Article (e.g. Art. 14, 19, or 21).`
    },
    'Monetary Policy & Inflation': {
      summary: `Monetary policy refers to the central bank's macroeconomic management of money supply, credit availability, and interest rates to preserve price stability while supporting growth. Under the 2016 RBI Act amendment, the Monetary Policy Committee (MPC) targets headline CPI inflation at 4% with a tolerance band of +/- 2%.`,
      takeaways: [
        'MPC consists of 6 members: 3 from RBI (including Governor) and 3 external appointed by the Union Government.',
        'Meets at least four times a year. Quorum is four members.',
        'Governor holds a casting vote in the event of an equal division of votes.'
      ],
      question: `Which of the following is considered an indirect instrument of quantitative monetary control used by the RBI?`,
      options: [
        'Cash Reserve Ratio (CRR)',
        'Statutory Liquidity Ratio (SLR)',
        'Open Market Operations (OMO)',
        'Credit Rationing'
      ],
      correctOption: 2,
      explanation: `Open Market Operations (outright buying and selling of government securities in secondary market) is an indirect quantitative tool, whereas CRR and SLR are direct statutory reserve ratios.`
    }
  };

  const currentData = topicsData[selectedTopic];

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleResetWorkflow = () => {
    setCurrentStep(1);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsAddedToRevision(false);
  };

  return (
    <section id="workflow" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#63B8A5]/40 text-xs font-semibold text-[#63B8A5]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F3AA45]" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              GUIDED MASTERY SEQUENCE
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Doubt-to-Practice Learning Workflow
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A proven 6-step cognitive learning loop: clarify doubt &rarr; absorb takeaways &rarr; attempt MCQ &rarr; receive instant feedback &rarr; add to spaced revision.
          </p>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#182746] -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-[#F3AA45] to-[#63B8A5] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((st) => {
              const isPast = st.num < currentStep;
              const isCurrent = st.num === currentStep;

              return (
                <div key={st.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                      isPast
                        ? 'bg-[#63B8A5] text-[#10172A]'
                        : isCurrent
                        ? 'bg-[#F3AA45] text-[#10172A] ring-4 ring-[#F3AA45]/30'
                        : 'bg-[#182746] text-slate-400 border border-[#24324D]'
                    }`}
                  >
                    {isPast ? <CheckCircle2 className="w-4 h-4" /> : st.num}
                  </div>
                  <span
                    className={`text-[10px] font-mono mt-1.5 hidden sm:block ${
                      isCurrent ? 'text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Step Content Card */}
        <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-8 min-h-[360px] flex flex-col justify-between shadow-2xl">
          {/* Step 1: Topic Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#F3AA45] uppercase tracking-wider">
                Step 1: Select Your Conceptual Focus
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                Choose a Topic to Master in this Session
              </h3>
              <p className="text-xs text-slate-300">
                Pick a core topic with frequent recurrence in both UPSC Prelims and Mains exams:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {Object.keys(topicsData).map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className={`p-4 rounded-2xl border text-left text-sm font-semibold transition-all ${
                      selectedTopic === t
                        ? 'bg-[#F3AA45]/15 border-[#F3AA45] text-white shadow-md'
                        : 'bg-[#10172A] border-[#24324D] text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-[#F3AA45]" />
                      <span>{t}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Sample Explanation */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#63B8A5] uppercase tracking-wider">
                Step 2: Conceptual Explanation
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                {selectedTopic}
              </h3>
              <div className="p-5 rounded-2xl bg-[#10172A] border border-[#24324D] text-xs sm:text-sm text-slate-200 leading-relaxed">
                {currentData.summary}
              </div>
            </div>
          )}

          {/* Step 3: Key Takeaways */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#F3AA45] uppercase tracking-wider">
                Step 3: High-Yield Exam Takeaways
              </span>
              <h3 className="font-display text-xl font-bold text-white">
                High-Yield Takeaways to Retain
              </h3>
              <div className="space-y-2.5 pt-1">
                {currentData.takeaways.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 p-3.5 rounded-2xl bg-[#10172A] border border-[#24324D] text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#63B8A5] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Attempt Related MCQ */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#F3AA45] uppercase tracking-wider">
                  Step 4: Active Recall MCQ Challenge
                </span>
                <span className="text-xs text-slate-400 font-mono">Prelims Standard</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {currentData.question}
              </h4>
              <div className="space-y-2 pt-2">
                {currentData.options.map((opt, optIdx) => {
                  const isSelected = selectedAnswer === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => setSelectedAnswer(optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs transition-all ${
                        isSelected
                          ? 'bg-[#F3AA45]/20 border-[#F3AA45] text-white font-semibold'
                          : 'bg-[#10172A] border-[#24324D] text-slate-300 hover:text-white'
                      }`}
                    >
                      <span className="font-mono mr-2 text-[#F3AA45]">({String.fromCharCode(97 + optIdx)})</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Answer Feedback */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#63B8A5] uppercase tracking-wider">
                Step 5: Performance Feedback & Rationale
              </span>
              <div className="flex items-center space-x-3">
                {selectedAnswer === currentData.correctOption ? (
                  <div className="p-3 rounded-2xl bg-emerald-950/40 text-emerald-300 border border-emerald-500/50 flex items-center space-x-2 text-sm font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Correct Answer! (+2.00 Marks)</span>
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-rose-950/40 text-rose-300 border border-rose-500/50 flex items-center space-x-2 text-sm font-bold">
                    <span>Incorrect Option Selected (-0.66 Penalty)</span>
                  </div>
                )}
              </div>
              <div className="p-5 rounded-2xl bg-[#10172A] border border-[#24324D] space-y-2 text-xs sm:text-sm text-slate-200">
                <div className="font-bold text-[#F3AA45] font-mono text-xs uppercase">
                  Official Detailed Explanation:
                </div>
                <p className="leading-relaxed">{currentData.explanation}</p>
              </div>
            </div>
          )}

          {/* Step 6: Add to Revision Queue */}
          {currentStep === 6 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-[#63B8A5]/20 text-[#63B8A5] flex items-center justify-center mx-auto mb-2">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Step 6: Integrate with Spaced Revision Lab
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                You have successfully reviewed the doctrine and solved the active MCQ for{' '}
                <strong className="text-[#F3AA45]">{selectedTopic}</strong>.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setIsAddedToRevision(true)}
                  disabled={isAddedToRevision}
                  className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
                    isAddedToRevision
                      ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                      : 'bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] shadow-[#F3AA45]/20'
                  }`}
                >
                  {isAddedToRevision ? '✓ Added to Revision Queue (Day 1 Interval)' : 'Add to Revision Queue'}
                </button>
              </div>
            </div>
          )}

          {/* Stepper Footer Navigation */}
          <div className="pt-5 border-t border-[#24324D]/60 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-[#10172A] hover:bg-[#203259] disabled:opacity-30 border border-[#24324D] text-xs font-semibold text-slate-200"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {currentStep < 6 ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] text-xs font-bold transition-all shadow-md"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleResetWorkflow}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-slate-200 text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Start New Topic</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
