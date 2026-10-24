import React, { useState } from 'react';
import { KnowledgeSymbol } from './KnowledgeSymbol';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <>
      <footer className="bg-[#0b101d] border-t border-[#24324D] text-slate-400 text-xs py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand column (2 cols on lg) */}
            <div className="lg:col-span-2 space-y-4">
              <div
                onClick={() => onNavigate('hero')}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <KnowledgeSymbol size={32} />
                <span className="font-display font-black text-xl text-white tracking-tight group-hover:text-[#F3AA45] transition-colors">
                  UPSC ZONE <span className="text-[#F3AA45]">AI</span>
                </span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed max-w-sm">
                Empowering civil services aspirants with AI-driven academic copilot tools, authentic Prelims negative-marking simulations, and structured Mains answer writing evaluations.
              </p>
              <div className="pt-2 text-[11px] font-mono text-slate-400">
                Designed for UPSC Civil Services Examination (CSE) 2026.
              </div>
            </div>

            {/* Platform Navigation */}
            <div className="space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Study Tools
              </div>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('copilot')} className="hover:text-white transition-colors">
                    AI Study Copilot
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('prelims')} className="hover:text-white transition-colors">
                    Prelims Arena Simulator
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('mains')} className="hover:text-white transition-colors">
                    Mains Writing Studio
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('current-affairs')} className="hover:text-white transition-colors">
                    Current Affairs Desk
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('pyq')} className="hover:text-white transition-colors">
                    PYQ Intelligence Archive
                  </button>
                </li>
              </ul>
            </div>

            {/* Learning Workspaces */}
            <div className="space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Workspaces
              </div>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('revision')} className="hover:text-white transition-colors">
                    Smart Revision Lab
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('syllabus')} className="hover:text-white transition-colors">
                    Syllabus Navigator
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('planner')} className="hover:text-white transition-colors">
                    Adaptive Study Planner
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('focus')} className="hover:text-white transition-colors">
                    Focus Pomodoro Timer
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('knowledge-map')} className="hover:text-white transition-colors">
                    Polity Knowledge Map
                  </button>
                </li>
              </ul>
            </div>

            {/* Official Resources & Legal */}
            <div className="space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider font-mono">
                Transparency & Terms
              </div>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => onNavigate('resources')} className="hover:text-white transition-colors">
                    Verified Resource Library
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigate('trust')} className="hover:text-white transition-colors">
                    Academic Integrity & Ethics
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">
                    Terms of Use
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#24324D] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div>
              &copy; 2026 UPSC ZONE AI. All rights reserved. Built with precision for competitive exam excellence.
            </div>
            <div className="flex items-center space-x-1 text-slate-400">
              <span>Crafted for UPSC Civil Services Aspirants across India</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy / Terms Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-lg bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-8 space-y-4 text-slate-100 shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#24324D] pb-3">
              <h3 className="font-display font-bold text-lg text-white">
                {activeModal === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
              {activeModal === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Local Storage of Study Data:</strong> UPSC ZONE AI stores your study plans, task completion states, and quiz scores locally in your browser storage. We do not sell or monetize personal learning analytics.
                  </p>
                  <p>
                    <strong>2. AI API Queries:</strong> When you submit questions to the AI Study Copilot or evaluate answers in the Mains Studio, queries are processed securely on the server without storing personally identifiable information.
                  </p>
                  <p>
                    <strong>3. Data Retention:</strong> You can clear your session data at any time via the reset controls in each module.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Educational Use Only:</strong> All content, practice questions, simulated scores, and timetables are provided for educational and illustrative purposes to aid exam preparation.
                  </p>
                  <p>
                    <strong>2. Independent Platform:</strong> UPSC ZONE AI is not affiliated with the Union Public Service Commission. Official notifications should always be verified on upsc.gov.in.
                  </p>
                  <p>
                    <strong>3. Intellectual Rigor:</strong> Practice questions and rationales are formulated for academic study. No guarantee of examination ranking is expressed or implied.
                  </p>
                </>
              )}
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-[#F3AA45] text-[#10172A] text-xs font-bold"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
