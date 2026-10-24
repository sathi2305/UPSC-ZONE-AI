import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Search,
  User,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { KnowledgeSymbol } from './KnowledgeSymbol';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCommand: () => void;
  onOpenProfile: () => void;
  userName?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenCommand,
  onOpenProfile,
  userName = 'Aspirant',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'AI Mentor', id: 'copilot' },
    { name: 'Learn', id: 'learn-suite' },
    { name: 'Practice', id: 'prelims' },
    { name: 'Current Affairs', id: 'current-affairs' },
    { name: 'Resources', id: 'resources' },
    { name: 'About', id: 'trust' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#10172A]/90 backdrop-blur-md border-b border-[#24324D] shadow-lg shadow-black/20'
            : 'bg-[#10172A]/70 backdrop-blur-sm border-b border-[#24324D]/40'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => handleLinkClick('hero')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <KnowledgeSymbol size={36} glow={true} />
            <div className="flex flex-col">
              <span className="font-display font-black text-xl tracking-tight text-white group-hover:text-[#F3AA45] transition-colors">
                UPSC ZONE <span className="text-[#F3AA45]">AI</span>
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#63B8A5] -mt-1 font-semibold">
                CIVIL SERVICES 2026
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#F3AA45] bg-[#F3AA45]/10 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-[#F3AA45] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Command palette search button */}
            <button
              onClick={onOpenCommand}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#182746] border border-[#24324D] text-slate-300 hover:text-white hover:border-[#F3AA45]/50 transition-all text-xs"
              title="Search and quick commands (Ctrl+K / Cmd+K)"
              aria-label="Open command palette"
            >
              <Search className="w-3.5 h-3.5 text-[#F3AA45]" />
              <span>Search tools</span>
              <kbd className="bg-[#10172A] px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-[#24324D]">
                ⌘K
              </kbd>
            </button>

            {/* Profile / Sign In */}
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-[#182746] transition-colors text-xs font-medium"
              title="Aspirant settings"
            >
              <div className="w-6 h-6 rounded-full bg-[#63B8A5]/20 text-[#63B8A5] flex items-center justify-center font-bold text-xs border border-[#63B8A5]/30">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="hidden md:inline">{userName}</span>
            </button>

            {/* Primary CTA */}
            <button
              onClick={() => handleLinkClick('planner')}
              className="group flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#F3AA45] to-[#f29e2e] text-[#10172A] font-semibold text-xs tracking-wide shadow-md shadow-[#F3AA45]/20 hover:shadow-lg hover:shadow-[#F3AA45]/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Preparing</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center space-x-2">
            <button
              onClick={onOpenCommand}
              className="p-2 rounded-xl bg-[#182746] border border-[#24324D] text-[#F3AA45]"
              aria-label="Search tools"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-[#182746] border border-[#24324D] text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/80 backdrop-blur-md sm:hidden pt-20"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-[#182746] border-b border-[#24324D] p-5 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#24324D]">
              <div className="flex items-center space-x-2">
                <KnowledgeSymbol size={28} />
                <span className="font-display font-bold text-white text-base">UPSC ZONE AI</span>
              </div>
              <button
                onClick={onOpenProfile}
                className="flex items-center space-x-1.5 text-xs text-[#63B8A5] bg-[#10172A] px-2.5 py-1 rounded-lg border border-[#24324D]"
              >
                <User className="w-3.5 h-3.5" />
                <span>{userName}</span>
              </button>
            </div>

            <div className="space-y-1 py-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#F3AA45]/20 text-[#F3AA45] font-semibold'
                      : 'text-slate-300 hover:bg-[#10172A] hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#24324D] space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommand();
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-[#10172A] border border-[#24324D] text-slate-300 text-xs font-medium"
              >
                <Search className="w-4 h-4 text-[#F3AA45]" />
                <span>Command Menu (Quick Navigation)</span>
              </button>
              <button
                onClick={() => handleLinkClick('planner')}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#F3AA45] text-[#10172A] font-bold text-sm shadow-md"
              >
                <Sparkles className="w-4 h-4" />
                <span>Build My Study Plan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
