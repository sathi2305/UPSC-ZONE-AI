import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  HelpCircle,
  FileText,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';
import { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';

export const AIMentor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      role: 'assistant',
      content: `### Welcome to the UPSC ZONE AI Academic Copilot

I am your civil services preparation mentor. You can explore complex constitutional concepts, request economic explanations, generate 7-day revision plans, or clarify GS syllabus doubts.

Select a suggested topic below or type any question to begin.`,
      timestamp: 'Just now',
      modelUsed: 'UPSC Academic Knowledge Engine',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Explain Fundamental Rights in simple terms.',
    'Summarize the Directive Principles of State Policy.',
    'Explain inflation with an example.',
    'Create a seven-day revision plan.',
    'Generate five UPSC-level practice questions.',
    'Explain federalism with a concept map.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const apiHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await sendChatMessage(apiHistory);

      const assistantMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: response.modelUsed,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: 'Apologies, unable to process request. Please try selecting one of the suggested prompts or check network connection.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'Fallback Engine',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        role: 'assistant',
        content: 'Conversation cleared. What syllabus topic or concept would you like to master next?',
        timestamp: 'Just now',
        modelUsed: 'UPSC Academic Knowledge Engine',
      },
    ]);
  };

  // Helper action buttons
  const triggerTopicSummary = () => {
    handleSendMessage('Summarize the Directive Principles of State Policy.');
  };

  const triggerPracticeQuestions = () => {
    handleSendMessage('Generate five UPSC-level practice questions.');
  };

  const triggerRevisionNotes = () => {
    handleSendMessage('Create a seven-day revision plan.');
  };

  return (
    <section id="copilot" className="py-24 relative bg-[#10172A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#182746] border border-[#F3AA45]/40 text-xs font-semibold text-[#F3AA45]">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-mono text-[11px]">
              INTERACTIVE AI ASSISTANT
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            AI Study Copilot
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Ask complex syllabus questions, request conceptual breakdowns, or generate instant revision structures.
          </p>
        </div>

        {/* Chat Studio Workspace Container */}
        <div className="bg-[#182746] border border-[#24324D] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[700px]">
          {/* Chat Studio Top Toolbar */}
          <div className="px-6 py-4 bg-[#10172A]/80 border-b border-[#24324D] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F3AA45] to-[#f29e2e] flex items-center justify-center text-[#10172A] font-bold shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-bold text-white">UPSC ZONE Copilot</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#63B8A5]/20 text-[#63B8A5] border border-[#63B8A5]/30">
                    Online & Curated
                  </span>
                </div>
                <p className="text-xs text-slate-400">GS Papers 1-4 & Prelims Civil Services Intelligence</p>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={triggerTopicSummary}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-xs text-slate-200 transition-colors"
                title="Topic Summary"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#F3AA45]" />
                <span>Topic Summary</span>
              </button>
              <button
                onClick={triggerPracticeQuestions}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-xs text-slate-200 transition-colors"
                title="Generate Practice Questions"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#63B8A5]" />
                <span>Practice Questions</span>
              </button>
              <button
                onClick={triggerRevisionNotes}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-[#10172A] hover:bg-[#203259] border border-[#24324D] text-xs text-slate-200 transition-colors"
                title="Revision Notes"
              >
                <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>Revision Plan</span>
              </button>

              <button
                onClick={handleClear}
                className="p-2 rounded-xl bg-[#10172A] hover:bg-rose-950/40 border border-[#24324D] hover:border-rose-700/50 text-slate-400 hover:text-rose-300 transition-colors"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {messages.map((message) => {
              const isAssistant = message.role === 'assistant';
              return (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3.5 ${
                    isAssistant ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-[#F3AA45]/20 border border-[#F3AA45]/40 text-[#F3AA45] flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-[#10172A]/90 border border-[#24324D] text-slate-200 shadow-sm'
                        : 'bg-[#F3AA45] text-[#10172A] font-medium shadow-md ml-12'
                    }`}
                  >
                    {/* Content formatted with basic markdown rendering */}
                    <div className="space-y-3 prose prose-invert max-w-none text-inherit">
                      {message.content.split('\n\n').map((paragraph, pIdx) => {
                        if (paragraph.startsWith('### ')) {
                          return (
                            <h3 key={pIdx} className="text-base font-bold text-white border-b border-[#24324D] pb-1 font-display">
                              {paragraph.replace('### ', '')}
                            </h3>
                          );
                        }
                        if (paragraph.startsWith('#### ')) {
                          return (
                            <h4 key={pIdx} className="text-sm font-semibold text-[#F3AA45]">
                              {paragraph.replace('#### ', '')}
                            </h4>
                          );
                        }
                        if (paragraph.startsWith('> ')) {
                          return (
                            <div key={pIdx} className="p-3 rounded-xl bg-[#182746] border-l-4 border-[#F3AA45] text-xs text-slate-300">
                              {paragraph.replace('> ', '')}
                            </div>
                          );
                        }
                        if (paragraph.startsWith('```')) {
                          return (
                            <pre key={pIdx} className="p-3 rounded-xl bg-[#0b101d] font-mono text-xs text-emerald-400 overflow-x-auto">
                              {paragraph.replace(/```/g, '')}
                            </pre>
                          );
                        }
                        return (
                          <p key={pIdx} className="whitespace-pre-line">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>

                    {/* Footer bar with model label & copy button */}
                    {isAssistant && (
                      <div className="mt-4 pt-3 border-t border-[#24324D]/60 flex items-center justify-between text-xs text-slate-400">
                        <span className="font-mono text-[11px] text-[#63B8A5]">
                          {message.modelUsed || 'UPSC ZONE Engine'}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleCopy(message.id, message.content)}
                            className="flex items-center space-x-1 hover:text-white transition-colors px-2 py-0.5 rounded bg-[#182746]"
                          >
                            {copiedId === message.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400 text-[10px]">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span className="text-[10px]">Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-[#F3AA45] text-[#10172A] flex items-center justify-center shrink-0 mt-1 font-bold">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading state indicator */}
            {isLoading && (
              <div className="flex items-start space-x-3.5">
                <div className="w-8 h-8 rounded-xl bg-[#F3AA45]/20 border border-[#F3AA45]/40 text-[#F3AA45] flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-[#10172A]/90 border border-[#24324D] text-slate-400 text-xs flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#F3AA45] animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-[#F3AA45] animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-[#F3AA45] animate-bounce" />
                  </div>
                  <span>Thinking through UPSC syllabus & landmark precedents...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Question Chips */}
          <div className="px-6 py-3 bg-[#10172A]/60 border-t border-[#24324D]/60 overflow-x-auto flex items-center space-x-2 text-xs scrollbar-none">
            <span className="text-slate-400 uppercase tracking-wider font-mono text-[10px] shrink-0 flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-[#F3AA45]" />
              <span>Prompts:</span>
            </span>
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => handleSendMessage(q)}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-[#182746] hover:bg-[#203259] border border-[#24324D] hover:border-[#F3AA45]/40 text-slate-300 hover:text-white transition-all text-xs"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Text Input Footer */}
          <div className="p-4 sm:p-5 bg-[#10172A]/90 border-t border-[#24324D]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center space-x-3"
            >
              <div className="relative flex-1">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask any UPSC question (e.g. 'Explain the Basic Structure doctrine and Kesavananda Bharati case')..."
                  className="w-full pl-4 pr-10 py-3 rounded-2xl bg-[#182746] border border-[#24324D] focus:border-[#F3AA45] text-slate-100 placeholder-slate-400 focus:outline-none text-sm transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-3 rounded-2xl bg-[#F3AA45] hover:bg-[#f29e2e] disabled:opacity-40 disabled:hover:bg-[#F3AA45] text-[#10172A] font-bold shadow-lg shadow-[#F3AA45]/20 transition-all shrink-0"
                aria-label="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center space-x-1">
                <Info className="w-3 h-3 text-slate-400" />
                <span>Trained for civil services academic rigor. Never replaces standard NCERTs and Bare Acts.</span>
              </span>
              <span className="hidden sm:inline font-mono">Press Enter to send</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
