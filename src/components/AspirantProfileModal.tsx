import React, { useState } from 'react';
import { X, User, Target, BookOpen, Clock, ShieldCheck, Check } from 'lucide-react';
import { AspirantProfile } from '../types';

interface AspirantProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: AspirantProfile;
  onSaveProfile: (profile: AspirantProfile) => void;
}

export const AspirantProfileModal: React.FC<AspirantProfileModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<AspirantProfile>({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  const optionalSubjects = [
    'Public Administration',
    'Political Science & International Relations (PSIR)',
    'Geography',
    'Sociology',
    'History',
    'Anthropology',
    'Philosophy',
    'Economics',
    'Commerce & Accountancy',
    'Literature (Hindi/Tamil/English/etc.)'
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#182746] border border-[#24324D] rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#24324D] bg-[#10172A]/70">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#F3AA45]/20 text-[#F3AA45]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display text-white">Aspirant Profile & Study Setup</h2>
              <p className="text-xs text-slate-400">Personalize your study plan and exam dashboard targets</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#24324D] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Aspirant Name / Call-Sign
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. IAS Aspirant Rahul"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 focus:outline-none focus:border-[#F3AA45] text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Target className="w-3.5 h-3.5 text-[#F3AA45]" />
                <span>Target Attempt Year</span>
              </label>
              <select
                value={formData.targetYear}
                onChange={(e) => setFormData({ ...formData, targetYear: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 focus:outline-none focus:border-[#F3AA45] text-sm"
              >
                <option value="2026">CSE 2026 (Primary Target)</option>
                <option value="2027">CSE 2027 (Long-term Foundation)</option>
                <option value="2028">CSE 2028</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-[#63B8A5]" />
                <span>Daily Study Goal</span>
              </label>
              <select
                value={formData.dailyStudyHours}
                onChange={(e) => setFormData({ ...formData, dailyStudyHours: parseInt(e.target.value, 10) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 focus:outline-none focus:border-[#F3AA45] text-sm"
              >
                <option value={4}>4 Hours (Working Professional)</option>
                <option value={6}>6 Hours (College Student)</option>
                <option value={8}>8 Hours (Dedicated Aspirant)</option>
                <option value={10}>10+ Hours (Sprint Mode)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-[#F3AA45]" />
              <span>Optional Subject</span>
            </label>
            <select
              value={formData.optionalSubject}
              onChange={(e) => setFormData({ ...formData, optionalSubject: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-100 focus:outline-none focus:border-[#F3AA45] text-sm"
            >
              {optionalSubjects.map((subj) => (
                <option key={subj} value={subj}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Current Preparation Stage
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Foundation', 'Consolidation', 'Revision & Test Sprint'] as const).map((stg) => (
                <button
                  type="button"
                  key={stg}
                  onClick={() => setFormData({ ...formData, preparationStage: stg })}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    formData.preparationStage === stg
                      ? 'bg-[#F3AA45]/20 border-[#F3AA45] text-white shadow-sm'
                      : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {stg}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-[#63B8A5]" />
              <span>Settings stored locally in browser session</span>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#24324D]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-[#10172A] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] shadow-lg shadow-[#F3AA45]/20 transition-all flex items-center space-x-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Profile Updated!</span>
                </>
              ) : (
                <span>Save Profile Preferences</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
