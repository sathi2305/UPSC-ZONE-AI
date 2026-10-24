import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  BookOpen,
  HelpCircle,
  Layers,
  CheckCircle2,
  List,
  Eye,
  ArrowRight
} from 'lucide-react';
import { sampleKnowledgeNodes } from '../data/mockData';
import { KnowledgeNode } from '../types';

interface KnowledgeMapProps {
  onNavigate: (sectionId: string) => void;
}

export const KnowledgeMap: React.FC<KnowledgeMapProps> = ({ onNavigate }) => {
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode>(sampleKnowledgeNodes[0]);
  const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual');
  const [addedRevisionIds, setAddedRevisionIds] = useState<Record<string, boolean>>({});

  const handleAddRevision = (id: string) => {
    setAddedRevisionIds((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="knowledge-map" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/40 text-xs font-semibold text-[#F3AA45]">
            <MapPin className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              INTERACTIVE CONCEPT TOPOLOGY
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Indian Polity Knowledge Map
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Explore interconnected constitutional doctrines, landmark judicial cases, and institutional relationships visually.
          </p>
        </div>

        {/* View Mode Toggle Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span className="text-white font-bold">{sampleKnowledgeNodes.length}</span>
            <span>Core Constitutional Nodes</span>
          </div>

          <div className="flex rounded-xl bg-[#182746] p-1 border border-[#24324D]">
            <button
              onClick={() => setViewMode('visual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                viewMode === 'visual' ? 'bg-[#F3AA45] text-[#10172A]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Interactive Graph</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                viewMode === 'list' ? 'bg-[#F3AA45] text-[#10172A]' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Accessible List</span>
            </button>
          </div>
        </div>

        {/* Workspace: Visual Graph OR Accessible List + Node Details Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Canvas (7 Cols) */}
          <div className="lg:col-span-7 bg-[#182746] border border-[#24324D] rounded-3xl p-6 relative overflow-hidden flex flex-col justify-center min-h-[480px]">
            {viewMode === 'visual' ? (
              <div className="relative w-full h-[440px] flex items-center justify-center">
                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 550">
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F3AA45" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#63B8A5" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {sampleKnowledgeNodes.map((source) =>
                    source.connectedTo.map((targetId) => {
                      const target = sampleKnowledgeNodes.find((n) => n.id === targetId);
                      if (!target) return null;
                      const isConnectedToSelected =
                        selectedNode.id === source.id || selectedNode.id === target.id;

                      return (
                        <line
                          key={`${source.id}-${target.id}`}
                          x1={source.x}
                          y1={source.y}
                          x2={target.x}
                          y2={target.y}
                          stroke={isConnectedToSelected ? '#F3AA45' : '#24324D'}
                          strokeWidth={isConnectedToSelected ? 2 : 1}
                          strokeDasharray={isConnectedToSelected ? '4 2' : undefined}
                          className="transition-all duration-300"
                        />
                      );
                    })
                  )}
                </svg>

                {/* Nodes HTML Overlay */}
                <div className="relative w-full h-full">
                  {sampleKnowledgeNodes.map((node) => {
                    const isSelected = selectedNode.id === node.id;
                    const leftPct = (node.x / 800) * 100;
                    const topPct = (node.y / 550) * 100;

                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl border text-xs font-bold transition-all duration-300 shadow-xl flex items-center space-x-2 ${
                          isSelected
                            ? 'bg-[#F3AA45] text-[#10172A] border-white scale-110 z-20 shadow-[#F3AA45]/30'
                            : 'bg-[#10172A] text-slate-200 border-[#24324D] hover:border-[#63B8A5] hover:scale-105 z-10'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-current" />
                        <span className="whitespace-nowrap">{node.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Accessible List for Screen Readers & Clean Reading */
              <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2">
                {sampleKnowledgeNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`w-full text-left p-4 rounded-2xl border transition-colors ${
                      selectedNode.id === node.id
                        ? 'bg-[#F3AA45]/15 border-[#F3AA45] text-white'
                        : 'bg-[#10172A] border-[#24324D] text-slate-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{node.label}</span>
                      <span className="text-[11px] font-mono text-[#F3AA45]">{node.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{node.summary}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Detail Pane (5 Cols) */}
          <div className="lg:col-span-5 bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#24324D] pb-3">
                <span className="text-xs font-mono font-bold text-[#F3AA45] bg-[#F3AA45]/15 px-2.5 py-1 rounded-xl">
                  {selectedNode.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedNode.connectedTo.length} Constitutional Links
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white">
                {selectedNode.label}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {selectedNode.summary}
              </p>

              {/* Articles & Facts */}
              <div className="p-4 rounded-2xl bg-[#10172A] border border-[#24324D] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#63B8A5] font-mono flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Key Articles & Provisions:</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1">
                  {selectedNode.articlesOrFacts.map((item, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#F3AA45]">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Landmark Cases */}
              <div className="p-4 rounded-2xl bg-[#10172A] border border-[#24324D] space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Landmark Cases / Events:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.landmarkCasesOrEvents.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-lg bg-[#182746] text-slate-300 text-[11px] border border-[#24324D]">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Mains Question */}
              <div className="text-xs text-slate-300 italic p-3 rounded-xl bg-[#10172A]/70 border-l-2 border-[#F3AA45]">
                <strong className="text-[#F3AA45] not-italic block mb-0.5">Sample UPSC Question:</strong>
                &ldquo;{selectedNode.sampleQuestion}&rdquo;
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#24324D] flex items-center space-x-3">
              <button
                onClick={() => handleAddRevision(selectedNode.id)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border transition-colors flex items-center justify-center space-x-1.5 ${
                  addedRevisionIds[selectedNode.id]
                    ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                    : 'bg-[#10172A] border-[#24324D] text-slate-200 hover:text-white'
                }`}
              >
                {addedRevisionIds[selectedNode.id] ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Added to Revision Queue</span>
                  </>
                ) : (
                  <>
                    <Layers className="w-3.5 h-3.5 text-[#F3AA45]" />
                    <span>Add to Revision Lab</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onNavigate('prelims')}
                className="py-2.5 px-4 rounded-xl bg-[#F3AA45] hover:bg-[#f29e2e] text-[#10172A] text-xs font-bold transition-all flex items-center space-x-1"
              >
                <span>Practice MCQs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
