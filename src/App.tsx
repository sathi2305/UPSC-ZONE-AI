import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CommandMenu } from './components/CommandMenu';
import { AspirantProfileModal } from './components/AspirantProfileModal';
import { HeroSection } from './components/HeroSection';
import { FeatureGrid } from './components/FeatureGrid';
import { AIMentor } from './components/AIMentor';
import { PrelimsArena } from './components/PrelimsArena';
import { MainsWritingStudio } from './components/MainsWritingStudio';
import { CurrentAffairsDesk } from './components/CurrentAffairsDesk';
import { PYQExplorer } from './components/PYQExplorer';
import { RevisionLab } from './components/RevisionLab';
import { SyllabusNavigator } from './components/SyllabusNavigator';
import { StudyPlanner } from './components/StudyPlanner';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { FocusTimer } from './components/FocusTimer';
import { NotesStudio } from './components/NotesStudio';
import { KnowledgeMap } from './components/KnowledgeMap';
import { DoubtToPractice } from './components/DoubtToPractice';
import { ResourceLibrary } from './components/ResourceLibrary';
import { DailyMissions } from './components/DailyMissions';
import { TrustSection } from './components/TrustSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { initialAspirantProfile } from './data/mockData';
import { AspirantProfile } from './types';
import { ArrowUp, Sparkles, Search } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<AspirantProfile>(() => {
    try {
      const saved = localStorage.getItem('upsc_aspirant_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Unable to read profile from localStorage', e);
    }
    return initialAspirantProfile;
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Synchronize profile updates to localStorage
  const handleSaveProfile = (newProfile: AspirantProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem('upsc_aspirant_profile', JSON.stringify(newProfile));
    } catch (e) {
      console.warn('Unable to persist profile', e);
    }
  };

  // Keyboard shortcut for Command Menu (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Back to top scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionIds = [
        'hero',
        'learn-suite',
        'copilot',
        'prelims',
        'mains',
        'current-affairs',
        'pyq',
        'revision',
        'syllabus',
        'planner',
        'analytics',
        'focus',
        'notes',
        'knowledge-map',
        'workflow',
        'resources',
        'missions',
        'trust'
      ];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#10172A] text-slate-100 flex flex-col font-sans selection:bg-[#F3AA45]/30 selection:text-[#F3AA45]">
      {/* Sticky Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenCommand={() => setIsCommandOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        userName={profile.name}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Cinematic Hero Section with Interactive Cockpit */}
        <HeroSection profile={profile} onNavigate={scrollToSection} />

        {/* 2. Feature Overview Suite */}
        <FeatureGrid onNavigate={scrollToSection} />

        {/* 3. AI Study Copilot */}
        <AIMentor />

        {/* 4. Prelims Arena Simulator */}
        <PrelimsArena />

        {/* 5. Mains Answer Writing Studio */}
        <MainsWritingStudio />

        {/* 6. Current Affairs Intelligence Desk */}
        <CurrentAffairsDesk />

        {/* 7. PYQ Intelligence Explorer */}
        <PYQExplorer />

        {/* 8. Smart Revision Memory Lab */}
        <RevisionLab />

        {/* 9. Interactive Syllabus Navigator */}
        <SyllabusNavigator />

        {/* 10. Adaptive Study Planner Pro */}
        <StudyPlanner />

        {/* 11. Performance Intelligence Center */}
        <AnalyticsDashboard profile={profile} onNavigate={scrollToSection} />

        {/* 12. Focus Mode & Pomodoro Timer */}
        <FocusTimer />

        {/* 13. AI Notes Studio */}
        <NotesStudio />

        {/* 14. Interactive Knowledge Map */}
        <KnowledgeMap onNavigate={scrollToSection} />

        {/* 15. Doubt-to-Practice Learning Workflow */}
        <DoubtToPractice />

        {/* 16. Resource Library */}
        <ResourceLibrary />

        {/* 17. Daily Missions & Motivation */}
        <DailyMissions />

        {/* 18. Trust, Ethics & Academic Rigor */}
        <TrustSection />

        {/* 19. Final CTA */}
        <FinalCTA onNavigate={scrollToSection} />
      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Command Menu Modal (Cmd+K / Ctrl+K) */}
      <CommandMenu
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onNavigate={scrollToSection}
      />

      {/* Aspirant Profile Configuration Modal */}
      <AspirantProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />

      {/* Floating Action Buttons: Back to Top & Quick Command */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-2">
        <button
          onClick={() => setIsCommandOpen(true)}
          className="p-3 rounded-2xl bg-[#182746] hover:bg-[#203259] border border-[#24324D] hover:border-[#F3AA45]/50 text-[#F3AA45] shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
          title="Command Menu (⌘K)"
          aria-label="Open Command Menu"
        >
          <Search className="w-5 h-5" />
        </button>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-2xl bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] shadow-xl shadow-[#F3AA45]/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center font-bold"
            title="Scroll to top"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
