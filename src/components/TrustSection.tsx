import React from 'react';
import {
  ShieldCheck,
  BookOpen,
  Award,
  Sparkles,
  Lock,
  FileCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section id="trust" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#63B8A5]/40 text-xs font-semibold text-[#63B8A5]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#F3AA45]" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              ETHICAL & TRANSPARENT LEARNING
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Built on Academic Rigor & Integrity
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            A principled, transparent platform engineered for the serious civil services aspirant.
          </p>
        </div>

        {/* 4 Pillars of Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F3AA45]/15 text-[#F3AA45] flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Syllabus Strictness
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every practice question, current affairs note, and flashcard is anchored directly to the official UPSC Civil Services Examination notification syllabus.
            </p>
          </div>

          <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#63B8A5]/15 text-[#63B8A5] flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Transparent AI Philosophy
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              We never fabricate answers or guarantee ranks. AI models assist in drafting, structure evaluation, and rapid conceptual synthesis.
            </p>
          </div>

          <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#38BDF8]/15 text-[#38BDF8] flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Privacy by Design
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your written Mains answers, study planner schedules, and test diagnostics remain completely private in your secure browser session.
            </p>
          </div>

          <div className="bg-[#182746] border border-[#24324D] rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#A7F3D0]/15 text-[#A7F3D0] flex items-center justify-center font-bold">
              <FileCheck className="w-5 h-5" />
            </div>
            <h3 className="font-display text-base font-bold text-white">
              Verified Primary Sources
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Syntheses are derived directly from the Gazette of India, PIB, PRS Legislative Research, Law Commission, and Union Budget publications.
            </p>
          </div>
        </div>

        {/* Educational Disclaimer Banner */}
        <div className="p-6 rounded-3xl bg-[#182746]/70 border border-[#24324D] text-xs text-slate-400 space-y-2">
          <div className="flex items-center space-x-2 text-[#F3AA45] font-bold font-mono">
            <Info className="w-4 h-4 shrink-0" />
            <span>Official Educational Disclaimer:</span>
          </div>
          <p className="leading-relaxed">
            UPSC ZONE AI is an independent academic preparation and technology platform designed to assist competitive exam candidates. It is not affiliated with, authorized, maintained, sponsored, or endorsed by the Union Public Service Commission (UPSC) or the Government of India. The official authority for all examination regulations, syllabi, dates, and selection results is exclusively <strong>upsc.gov.in</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};
