import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  RotateCcw,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { sampleResources } from '../data/mockData';
import { ResourceItem } from '../types';

export const ResourceLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(null);

  const types = ['All', 'Official Syllabus', 'Report / Survey', 'Act / Constitution', 'Standard Reference'];

  const filteredResources = sampleResources.filter((item) => {
    const matchesType = selectedType === 'All' || item.type === selectedType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="resources" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#63B8A5]/40 text-xs font-semibold text-[#63B8A5]">
            <BookOpen className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              VERIFIED PRIMARY SOURCES
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Curated UPSC Resource Hub
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Authoritative documents, Economic Survey reports, 2nd ARC commissions, and Gazette notifications essential for civil services preparation.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  selectedType === type
                    ? 'bg-[#F3AA45] text-[#10172A] border-[#F3AA45]'
                    : 'bg-[#182746] text-slate-300 border-[#24324D] hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources by title or source..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#182746] border border-[#24324D] text-slate-100 placeholder-slate-400 text-xs focus:outline-none focus:border-[#F3AA45]"
            />
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 bg-[#182746]/50 rounded-3xl border border-[#24324D] space-y-3">
              <p className="text-sm">No resources match your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('All');
                }}
                className="px-4 py-2 rounded-xl bg-[#F3AA45] text-[#10172A] text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredResources.map((res) => {
              const isBookmarked = bookmarkedIds[res.id];
              return (
                <div
                  key={res.id}
                  onClick={() => setPreviewResource(res)}
                  className="group bg-[#182746] border border-[#24324D] hover:border-[#F3AA45]/50 rounded-3xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-[#10172A] border border-[#24324D] text-[#F3AA45] font-mono text-[11px] font-bold">
                        {res.badge}
                      </span>
                      <button
                        onClick={(e) => toggleBookmark(res.id, e)}
                        className={`p-1.5 rounded-xl border text-xs transition-colors ${
                          isBookmarked
                            ? 'bg-[#F3AA45]/20 border-[#F3AA45] text-[#F3AA45]'
                            : 'bg-[#10172A] border-[#24324D] text-slate-400 hover:text-white'
                        }`}
                        title={isBookmarked ? 'Bookmarked' : 'Bookmark'}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>

                    <h3 className="font-display text-base font-bold text-white group-hover:text-[#F3AA45] transition-colors line-clamp-2">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {res.description}
                    </p>

                    <div className="text-[11px] font-mono text-[#63B8A5]">
                      Authority: {res.sourceName}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#24324D]/60 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-[11px]">{res.readTime}</span>
                    <span className="text-[#F3AA45] font-semibold flex items-center space-x-1 group-hover:underline">
                      <span>Preview Synopsis</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {previewResource && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setPreviewResource(null)}
        >
          <div
            className="w-full max-w-lg bg-[#182746] border border-[#24324D] rounded-3xl p-6 sm:p-8 space-y-4 text-slate-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#24324D] pb-3">
              <span className="px-2.5 py-1 rounded-xl bg-[#F3AA45]/20 text-[#F3AA45] text-xs font-mono font-bold">
                {previewResource.type}
              </span>
              <button
                onClick={() => setPreviewResource(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <h3 className="font-display text-lg font-bold text-white">
              {previewResource.title}
            </h3>

            <div className="text-xs font-mono text-[#63B8A5]">
              Published Authority: {previewResource.sourceName}
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {previewResource.description}
            </p>

            <div className="p-4 rounded-2xl bg-[#10172A] border border-[#24324D] text-xs space-y-1.5">
              <div className="font-bold text-white">Exam Application Recommendation:</div>
              <p className="text-slate-400">
                Integrate key statistical charts, committee terms of reference, and statutory case citations into your Mains GS answer frameworks to achieve value differentiation.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setPreviewResource(null)}
                className="px-5 py-2 rounded-xl bg-[#F3AA45] text-[#10172A] text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
