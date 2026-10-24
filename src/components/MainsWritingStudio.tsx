import React, { useState, useEffect } from 'react';
import {
  PenTool,
  Clock,
  Sparkles,
  CheckSquare,
  Square,
  RotateCcw,
  BookOpen,
  Award,
  ChevronDown,
  Printer,
  FileCheck
} from 'lucide-react';
import { evaluateMainsAnswer, MainsEvaluationResult } from '../services/geminiService';

export const MainsWritingStudio: React.FC = () => {
  const sampleQuestion = {
    paper: 'General Studies Paper II',
    marks: 15,
    wordLimit: 250,
    text: `Examine the constitutional role of the Finance Commission in balancing vertical and horizontal fiscal imbalances in India. Discuss the recent challenges faced in its recommendations in light of demographic and fiscal federalism realities. (15 Marks, 250 Words)`
  };

  const [answer, setAnswer] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(660); // 11 mins = 660s (Standard for 15M question)
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [activeGuidanceTab, setActiveGuidanceTab] = useState<'intro' | 'body' | 'conclusion' | 'model'>('intro');
  const [evaluation, setEvaluation] = useState<MainsEvaluationResult | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Self review checklist state
  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    addressedDirective: false,
    quotedArticle280: false,
    verticalVsHorizontal: false,
    demographicIssue: false,
    includedWayForward: false,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds]);

  const words = answer.trim() ? answer.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleChecklist = (key: string) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEvaluate = async () => {
    if (wordCount < 20) return;
    setIsEvaluating(true);
    try {
      const res = await evaluateMainsAnswer(sampleQuestion.text, sampleQuestion.paper, answer, sampleQuestion.wordLimit);
      setEvaluation(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setAnswer('');
    setEvaluation(null);
    setTimerSeconds(660);
    setIsTimerActive(false);
    setChecklist({
      addressedDirective: false,
      quotedArticle280: false,
      verticalVsHorizontal: false,
      demographicIssue: false,
      includedWayForward: false,
    });
  };

  return (
    <section id="mains" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60 print:bg-white print:text-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3 print:hidden">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/40 text-xs font-semibold text-[#F3AA45]">
            <PenTool className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              DESCRIPTIVE SIMULATOR
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Mains Answer Writing Studio
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Practice UPSC 150/250-word descriptive answers with countdown timer, word limit compliance, structural guidance, and self-evaluation rubric.
          </p>
        </div>

        {/* Main Writing Container */}
        <div className="bg-[#182746] border border-[#24324D] rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none print:bg-white">
          {/* Question Banner */}
          <div className="p-6 bg-[#10172A]/90 border-b border-[#24324D] print:border-b-2 print:border-black">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#F3AA45]/15 border border-[#F3AA45]/30 text-[#F3AA45] font-mono text-xs font-bold">
                  {sampleQuestion.paper}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {sampleQuestion.marks} Marks &bull; {sampleQuestion.wordLimit} Words Limit
                </span>
              </div>

              {/* Timer Bar */}
              <div className="flex items-center space-x-2 print:hidden">
                <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#182746] border border-[#24324D] text-xs">
                  <Clock className={`w-3.5 h-3.5 ${timerSeconds < 120 ? 'text-rose-400 animate-pulse' : 'text-[#63B8A5]'}`} />
                  <span className={`font-mono font-bold ${timerSeconds < 120 ? 'text-rose-400' : 'text-white'}`}>
                    {formatTimer(timerSeconds)}
                  </span>
                </div>
                <button
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  className="px-3 py-1.5 rounded-xl bg-[#24324D] hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
                >
                  {isTimerActive ? 'Pause' : 'Start Timer'}
                </button>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white print:text-black leading-snug">
              {sampleQuestion.text}
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#24324D]">
            {/* Left 7 Columns: Interactive Writing Textarea */}
            <div className="lg:col-span-7 p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono">Write your answer here (Structured Point-format):</span>
                  <div className="flex items-center space-x-2 font-mono">
                    <span className={wordCount > 250 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                      {wordCount} / 250 words
                    </span>
                    <span className="text-slate-500">({Math.round((wordCount / 250) * 100)}%)</span>
                  </div>
                </div>

                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Introduction: Article 280 of the Constitution provides for a Finance Commission every fifth year to recommend...

Body (Vertical Devolution):
1. Tax sharing between Union and States...
2. Cesses and surcharges concern...

Body (Horizontal Devolution & Demographic Challenges):
1. 2011 Census criteria vs Southern States concerns...
2. Fiscal performance indicators...

Conclusion & Way Forward:
Promoting genuine cooperative fiscal federalism..."
                  rows={14}
                  className="w-full p-4 rounded-2xl bg-[#10172A] border border-[#24324D] text-slate-100 placeholder-slate-500 text-sm leading-relaxed focus:outline-none focus:border-[#F3AA45] font-sans resize-y"
                />
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#24324D]/60 print:hidden">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleEvaluate}
                    disabled={isEvaluating || wordCount < 20}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F3AA45] to-[#f29e2e] hover:bg-[#f29e2e] disabled:opacity-40 text-[#10172A] font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isEvaluating ? 'Evaluating...' : 'Evaluate Answer'}</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="p-2 rounded-xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-slate-300 hover:text-white transition-colors"
                    title="Print answer / Save as PDF"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-rose-300 hover:bg-[#10172A] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>

              {/* Evaluation Feedback Panel */}
              {evaluation && (
                <div className="p-5 rounded-2xl bg-[#10172A] border border-[#24324D] space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-[#24324D] pb-3">
                    <div className="flex items-center space-x-2">
                      <Award className="w-5 h-5 text-[#F3AA45]" />
                      <span className="font-bold text-white text-sm">Evaluation Report</span>
                    </div>
                    <div className="px-3 py-1 rounded-xl bg-[#F3AA45]/20 border border-[#F3AA45]/40 text-[#F3AA45] font-mono font-bold text-sm">
                      Score: {evaluation.score} / 10
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {evaluation.overallAssessment}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="text-[#63B8A5] font-semibold">Dimensions Captured:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {evaluation.bodyDimensions.map((d, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#182746] text-slate-300 border border-[#24324D]">
                          &bull; {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#182746] text-xs text-amber-200/90 border border-amber-500/30">
                    <div className="font-bold text-amber-300 mb-1">Recommended Value Additions:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {evaluation.valueAdditionSuggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Columns: Guidance, Answer Structure & Self-Review Checklist */}
            <div className="lg:col-span-5 p-6 bg-[#10172A]/50 space-y-5 print:hidden">
              {/* Guidance Navigation Tabs */}
              <div className="flex rounded-xl bg-[#10172A] p-1 border border-[#24324D]">
                {(
                  [
                    { id: 'intro', label: 'Intro Guide' },
                    { id: 'body', label: 'Body Specs' },
                    { id: 'conclusion', label: 'Way Forward' },
                    { id: 'model', label: 'Model Framework' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveGuidanceTab(tab.id)}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeGuidanceTab === tab.id
                        ? 'bg-[#F3AA45] text-[#10172A]'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="text-xs leading-relaxed text-slate-300 bg-[#182746] border border-[#24324D] rounded-2xl p-4 min-h-[140px]">
                {activeGuidanceTab === 'intro' && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-sm">Introduction Strategy (30–40 Words):</h4>
                    <p>
                      Directly cite <strong>Article 280</strong> of the Constitution. State that the Finance Commission is a quasi-judicial constitutional body functioning as the balancing wheel of fiscal federalism in India.
                    </p>
                    <p className="text-slate-400 italic">
                      Tip: Avoid generic opening lines. Begin straight away with statutory or constitutional grounding.
                    </p>
                  </div>
                )}
                {activeGuidanceTab === 'body' && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-sm">Body Dimensions (160–180 Words):</h4>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      <li><strong>Vertical Imbalance:</strong> Union collects ~60% of taxes while States execute ~60% of public expenditure. Devolution currently at 41%.</li>
                      <li><strong>Horizontal Imbalance:</strong> Equity vs efficiency criteria across states (Income Distance 45%, Population 15%, Area 15%, Forest & Ecology 10%).</li>
                      <li><strong>Demographic Tension:</strong> 2011 Census shift vs southern states fiscal contribution.</li>
                    </ul>
                  </div>
                )}
                {activeGuidanceTab === 'conclusion' && (
                  <div className="space-y-2">
                    <h4 className="font-bold text-white text-sm">Way Forward & Conclusion (30–40 Words):</h4>
                    <p>
                      Conclude with a progressive balance: permanent institutional secretariat for Finance Commission, rationalizing cesses and surcharges to widen divisible pool, and fostering cooperative fiscal federalism.
                    </p>
                  </div>
                )}
                {activeGuidanceTab === 'model' && (
                  <div className="space-y-2 font-mono text-[11px] text-slate-300">
                    <div className="text-[#F3AA45] font-bold">15-Mark Answer Blueprint:</div>
                    <div>1. Art 280 Definition (2 lines)</div>
                    <div>2. Subheading: Role in Vertical Imbalance (4 points)</div>
                    <div>3. Subheading: Role in Horizontal Imbalance (Criteria matrix)</div>
                    <div>4. Subheading: Emerging Fiscal Challenges (Cesses, Demographic shift)</div>
                    <div>5. Conclusion: Toward Cooperative Federalism</div>
                  </div>
                )}
              </div>

              {/* Self-Review Checklist */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
                    <FileCheck className="w-4 h-4 text-[#63B8A5]" />
                    <span>Aspirant Self-Review Checklist</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#F3AA45]">
                    {Object.values(checklist).filter(Boolean).length} / 5 Checked
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    { key: 'addressedDirective', text: 'Directly addressed directive verb "Examine"' },
                    { key: 'quotedArticle280', text: 'Quoted Article 280 and constitutional status' },
                    { key: 'verticalVsHorizontal', text: 'Distinguished vertical and horizontal devolution' },
                    { key: 'demographicIssue', text: 'Analyzed 2011 census demographic challenge' },
                    { key: 'includedWayForward', text: 'Concluded with forward-looking reforms' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      onClick={() => toggleChecklist(item.key)}
                      className={`w-full flex items-center space-x-2.5 p-2.5 rounded-xl border text-xs text-left transition-colors ${
                        checklist[item.key]
                          ? 'bg-[#63B8A5]/15 border-[#63B8A5]/40 text-emerald-300'
                          : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {checklist[item.key] ? (
                        <CheckSquare className="w-4 h-4 text-[#63B8A5] shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <span>{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
