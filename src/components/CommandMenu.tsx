import React, { useEffect, useState, useRef } from 'react';
import {
  Search,
  BookOpen,
  BrainCircuit,
  Award,
  PenTool,
  Newspaper,
  Compass,
  Layers,
  Calendar,
  BarChart3,
  Timer,
  FileText,
  MapPin,
  CheckCircle2,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Tools' | 'Subjects' | 'Study Actions';
  icon: React.ComponentType<{ className?: string }>;
  targetId?: string;
  action?: () => void;
}

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commandItems: CommandItem[] = [
    {
      id: 'ai-mentor',
      title: 'AI Study Copilot',
      subtitle: 'Ask conceptual questions & explore syllabus summaries',
      category: 'Tools',
      icon: BrainCircuit,
      targetId: 'copilot',
    },
    {
      id: 'prelims-arena',
      title: 'Prelims Arena Mock Test',
      subtitle: 'Attempt 5 standard UPSC GS questions with timer & explanation',
      category: 'Tools',
      icon: Award,
      targetId: 'prelims',
    },
    {
      id: 'mains-studio',
      title: 'Mains Answer Writing Studio',
      subtitle: 'Practice 250-word answer with word counter and evaluation',
      category: 'Tools',
      icon: PenTool,
      targetId: 'mains',
    },
    {
      id: 'current-affairs',
      title: 'Current Affairs Intelligence',
      subtitle: 'Browse curated news topics organized by GS paper',
      category: 'Tools',
      icon: Newspaper,
      targetId: 'current-affairs',
    },
    {
      id: 'pyq-explorer',
      title: 'PYQ Intelligence Explorer',
      subtitle: 'Search past Prelims & Mains questions with official rationales',
      category: 'Tools',
      icon: Compass,
      targetId: 'pyq',
    },
    {
      id: 'revision-lab',
      title: 'Smart Revision Lab',
      subtitle: 'Interactive flashcards with spaced repetition ratings',
      category: 'Tools',
      icon: Layers,
      targetId: 'revision',
    },
    {
      id: 'study-planner',
      title: 'Adaptive Study Planner',
      subtitle: 'Generate a personalized 7-day study timetable',
      category: 'Tools',
      icon: Calendar,
      targetId: 'planner',
    },
    {
      id: 'analytics',
      title: 'Performance Intelligence Center',
      subtitle: 'Review consistency, subject mastery, and practice accuracy',
      category: 'Tools',
      icon: BarChart3,
      targetId: 'analytics',
    },
    {
      id: 'focus-timer',
      title: 'Focus Mode & Pomodoro',
      subtitle: 'Deep work timer for 25-minute distraction-free study',
      category: 'Tools',
      icon: Timer,
      targetId: 'focus',
    },
    {
      id: 'notes-studio',
      title: 'AI Notes Studio',
      subtitle: 'Generate high-yield UPSC revision notes & templates',
      category: 'Tools',
      icon: FileText,
      targetId: 'notes',
    },
    {
      id: 'knowledge-map',
      title: 'Interactive Knowledge Map',
      subtitle: 'Visual concept node graph for Indian Polity & Constitution',
      category: 'Tools',
      icon: MapPin,
      targetId: 'knowledge-map',
    },
    {
      id: 'doubt-practice',
      title: 'Doubt-to-Practice Workflow',
      subtitle: 'Guided 6-step mastery from concept to practice question',
      category: 'Tools',
      icon: CheckCircle2,
      targetId: 'workflow',
    },
    {
      id: 'syllabus-nav',
      title: 'Interactive Syllabus Navigator',
      subtitle: 'Explore full GS 1-4 syllabus with progress checkboxes',
      category: 'Tools',
      icon: BookOpen,
      targetId: 'syllabus',
    },
    {
      id: 'resource-library',
      title: 'Verified Resource Library',
      subtitle: 'Official reports, Economic Survey, 2nd ARC & Bare Acts',
      category: 'Tools',
      icon: BookOpen,
      targetId: 'resources',
    },
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSelect = (item: CommandItem) => {
    if (item.targetId) {
      onNavigate(item.targetId);
    } else if (item.action) {
      item.action();
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#182746] border border-[#24324D] rounded-2xl shadow-2xl overflow-hidden transition-all text-slate-100"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#24324D] bg-[#10172A]/70">
          <Search className="w-5 h-5 text-[#F3AA45] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a feature, subject, or study tool... (e.g. Prelims, Flashcards, Polity)"
            className="w-full bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none text-base"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-xs bg-[#24324D] text-slate-300 px-2 py-0.5 rounded border border-slate-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-[#24324D]/40">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Sparkles className="w-8 h-8 text-[#F3AA45] mx-auto mb-2 opacity-60" />
              <p className="text-sm font-medium">No direct matching commands found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for &lsquo;Prelims&rsquo;, &lsquo;Mains&rsquo;, &lsquo;Polity&rsquo;, or &lsquo;Planner&rsquo;.</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#F3AA45]/15 border border-[#F3AA45]/40 text-white' : 'hover:bg-slate-800/50 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <div
                      className={`p-2 rounded-lg shrink-0 ${
                        isSelected ? 'bg-[#F3AA45] text-[#10172A]' : 'bg-[#10172A] text-[#63B8A5]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-sm font-semibold truncate flex items-center space-x-2">
                        <span>{item.title}</span>
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 shrink-0 ml-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-[#10172A] px-2 py-0.5 rounded border border-[#24324D]">
                      {item.category}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-0.5 text-[#F3AA45]' : 'opacity-30'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-[#10172A]/90 border-t border-[#24324D] flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="bg-[#24324D] px-1.5 py-0.5 rounded text-slate-300 font-mono text-[10px]">↑</kbd>{' '}
              <kbd className="bg-[#24324D] px-1.5 py-0.5 rounded text-slate-300 font-mono text-[10px]">↓</kbd> navigate
            </span>
            <span>
              <kbd className="bg-[#24324D] px-1.5 py-0.5 rounded text-slate-300 font-mono text-[10px]">↵</kbd> select
            </span>
          </div>
          <span className="text-[11px] text-[#F3AA45]">UPSC ZONE AI 2026 Engine</span>
        </div>
      </div>
    </div>
  );
};
