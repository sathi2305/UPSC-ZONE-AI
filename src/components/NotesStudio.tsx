import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Check,
  Printer,
  Sparkles,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Bookmark
} from 'lucide-react';

export const NotesStudio: React.FC = () => {
  const [topic, setTopic] = useState('Anti-Defection Law (10th Schedule)');
  const [template, setTemplate] = useState<'cornell' | 'conceptTree' | 'factSheet'>('cornell');
  const [copied, setCopied] = useState(false);

  // Pre-compiled high-yield UPSC notes
  const notesDatabase: Record<string, string> = {
    'Anti-Defection Law (10th Schedule)': `### High-Yield UPSC Revision Note: Anti-Defection Law

#### 1. Constitutional & Statutory Grounding
- **Introduction:** Added by the **52nd Constitutional Amendment Act, 1985**.
- **Articles:** Article 102(2) (Disqualification for Parliament) and Article 191(2) (Disqualification for State Assemblies).
- **Core Objective:** Curb the political menace of opportunistic party-hopping (*"Aaya Ram, Gaya Ram"* culture) to provide stability to democratic governments.

#### 2. Disqualification Grounds (Paragraph 2 of 10th Schedule)
1. **Voluntary Giving Up of Membership:** Does not require formal resignation. Conduct (e.g. anti-party public rallies) can infer voluntary surrender of membership (*Ravi Naik Case, 1994*).
2. **Voting Contrary to Whip:** Voting or abstaining from voting in legislature contrary to party direction without prior permission and not condoned within 15 days.
3. **Independent Members:** Disqualified if they join any political party after election.
4. **Nominated Members:** Disqualified if they join any political party after the expiry of 6 months from taking their seat.

#### 3. Key Amendments & Exemptions
- **91st Amendment Act (2003):** 
  - Omitted the "one-third split" exception (earlier split by 1/3rd members was exempted).
  - Mergers still permitted only if at least **two-thirds** of the legislature party agrees to merge with another party.
  - Capped Council of Ministers to **15%** of total strength of Lok Sabha / Assembly.
  - Defector disqualified from holding any remunerative political or ministerial post.

#### 4. Adjudicating Authority & Judicial Review
- Deciding authority is the **Speaker / Chairman** of the House.
- **Kihoto Hollohan v. Zachillhu (1992):** Supreme Court held that the Speaker functions as a statutory tribunal; decisions are subject to **judicial review** on grounds of mala fides, perversity, or violation of natural justice.
- **Keisham Meghachandra Singh (2020):** Supreme Court recommended that Speakers decide disqualification petitions within a reasonable timeframe (normally **3 months**).

#### 5. Critical Issues & Reform Proposals
- *Dinesh Goswami Committee:* Disqualification should apply only to confidence/no-confidence votes and money bills, not all legislative votes.
- *2nd ARC Recommendation:* The power to disqualify should be vested in the President / Governor acting on the advice of the Election Commission (similar to Article 103).`,

    'Basic Structure Doctrine': `### High-Yield UPSC Revision Note: Basic Structure Doctrine

#### 1. Historical Evolution of Amending Power (Article 368)
1. **Shankari Prasad (1951):** Supreme Court ruled that constitutional amendments under Art. 368 are not "law" under Art. 13(2); Parliament can amend Fundamental Rights.
2. **Sajjan Singh (1965):** Upheld Shankari Prasad.
3. **Golaknath (1967):** 11-Judge bench reversed earlier stand; held Fundamental Rights cannot be abridged by constitutional amendment.
4. **24th Amendment Act (1971):** Parliament asserted power to amend any part of Constitution including Part III.
5. **Kesavananda Bharati v. State of Kerala (1973):** Landmark 13-judge bench created the **Basic Structure Doctrine**. Upheld Parliament's amending power under Art. 368, but held that it **cannot alter or destroy the basic structure/framework** of the Constitution.

#### 2. Key Components of the Basic Structure (Inductive List)
- Supremacy of the Constitution
- Republican and Democratic form of Government
- Secular character of the Constitution
- Separation of powers between legislature, executive, and judiciary
- Federal character of the Constitution
- Judicial Review (Art. 32 & 226)
- Rule of Law and Equality (Art. 14)
- Independence of the Judiciary (*NJAC Case, 2015*)

#### 3. Subsequent Landmark Affirmations
- **Indira Nehru Gandhi (1975):** 39th Amendment (immunizing PM election) struck down.
- **Minerva Mills (1980):** Limited amending power is itself part of the basic structure. Harmony between Fundamental Rights and DPSPs.
- **Waman Rao (1981):** Cut-off date: 9th Schedule laws enacted after 24 April 1973 are open to judicial review (*I.R. Coelho, 2007*).`,
  };

  const activeContent =
    notesDatabase[topic] ||
    `### Conceptual Notes: ${topic}

#### 1. Core Principles & Background
${topic} is an essential component of the UPSC Civil Services curriculum. Ensure you grasp the constitutional background, institutional frameworks, and economic/social impact.

#### 2. Analytical Dimensions for Mains
- **Statutory / Legal Basis:** Identify key acts, articles, or international treaties.
- **Executive & Implementation:** Challenges in execution, funding, and state capacity.
- **Socio-Economic Relevance:** Impact on vulnerable populations and inclusive growth.

#### 3. Standard Model Conclusion
Highlight a balanced way forward citing official committee reports (e.g. 2nd ARC, NITI Aayog Strategy) to secure top marks in Mains GS papers.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="notes" className="py-24 relative bg-[#10172A] border-t border-[#24324D]/60 print:bg-white print:text-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3 print:hidden">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/40 text-xs font-semibold text-[#F3AA45]">
            <FileText className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              STRUCTURED SYNTHESIS
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            AI Notes Studio
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Generate high-yield UPSC revision cheat sheets with landmark judgements, statutory articles, and committee recommendations.
          </p>
        </div>

        {/* Note Generator Box */}
        <div className="bg-[#182746] border border-[#24324D] rounded-3xl overflow-hidden shadow-2xl print:border-none print:shadow-none print:bg-white">
          {/* Top Bar */}
          <div className="p-6 bg-[#10172A]/90 border-b border-[#24324D] flex flex-wrap items-center justify-between gap-4 print:hidden">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <span className="text-xs text-slate-400 font-mono">Sample Topics:</span>
              <button
                onClick={() => setTopic('Anti-Defection Law (10th Schedule)')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  topic === 'Anti-Defection Law (10th Schedule)'
                    ? 'bg-[#F3AA45] text-[#10172A] border-[#F3AA45]'
                    : 'bg-[#182746] text-slate-300 border-[#24324D] hover:text-white'
                }`}
              >
                Anti-Defection Law
              </button>
              <button
                onClick={() => setTopic('Basic Structure Doctrine')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                  topic === 'Basic Structure Doctrine'
                    ? 'bg-[#F3AA45] text-[#10172A] border-[#F3AA45]'
                    : 'bg-[#182746] text-slate-300 border-[#24324D] hover:text-white'
                }`}
              >
                Basic Structure
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-xs font-semibold text-slate-200 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Notes'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="p-1.5 rounded-xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-slate-300 hover:text-white transition-colors"
                title="Print notes / Save PDF"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Rendered Note Content */}
          <div className="p-6 sm:p-8 bg-[#182746] text-slate-100 print:text-black space-y-4">
            <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
              {activeContent.split('\n\n').map((block, bIdx) => {
                if (block.startsWith('### ')) {
                  return (
                    <h3 key={bIdx} className="text-lg sm:text-xl font-bold font-display text-[#F3AA45] print:text-black border-b border-[#24324D] pb-2">
                      {block.replace('### ', '')}
                    </h3>
                  );
                }
                if (block.startsWith('#### ')) {
                  return (
                    <h4 key={bIdx} className="text-sm sm:text-base font-bold text-white print:text-black mt-4">
                      {block.replace('#### ', '')}
                    </h4>
                  );
                }
                return (
                  <p key={bIdx} className="whitespace-pre-line text-slate-300 print:text-gray-800">
                    {block}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
