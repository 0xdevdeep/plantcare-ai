import React from 'react';
import { Sprout, Cpu, BookOpen, Sparkles, Compass, CheckCircle2, Moon } from 'lucide-react';

export function Navbar({ ollamaStatus, onOpenOllamaModal, onOpenLogModal, onQuickDemo, activePlanCount }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-emerald-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5 text-emerald-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                TrailMate<span className="text-emerald-400 font-normal">.ai</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Touch Grass
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/60 hidden sm:block">Open-Weight Outdoor Companion</p>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-emerald-100/80">
          <a href="#planner" className="hover:text-emerald-400 transition-colors">Plan Adventure</a>
          <a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a>
          <a href="#challenges" className="hover:text-emerald-400 transition-colors">Challenges</a>
          <a href="#why-open-ai" className="hover:text-emerald-400 transition-colors">Why Open AI</a>
          <a href="#take-it-outside" className="hover:text-emerald-400 transition-colors">Adventure Log</a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          {/* Quick Demo Button */}
          <button
            onClick={onQuickDemo}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-500/30 transition-all shadow-sm active:scale-95"
            title="Pre-fill Nagpur demo adventure"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Try Demo</span>
          </button>

          {/* AI Status Badge */}
          <button
            onClick={onOpenOllamaModal}
            className="flex items-center gap-2 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/50 border border-emerald-500/20 text-emerald-200 transition-colors cursor-pointer"
            title="Click to view AI engine & inference options"
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                ollamaStatus?.online || ollamaStatus?.geminiConfigured ? 'bg-emerald-400' : 'bg-amber-400'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${
                ollamaStatus?.online || ollamaStatus?.geminiConfigured ? 'bg-emerald-400' : 'bg-amber-400'
              }`}></span>
            </span>
            <span className="hidden sm:inline">
              {ollamaStatus?.online 
                ? `Ollama (${ollamaStatus.defaultModel || 'Llama 3.2'})` 
                : (ollamaStatus?.geminiConfigured ? 'Live AI (Gemini)' : 'AI: Open Demo Engine')}
            </span>
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
          </button>

          {/* Adventure Journal Button */}
          <button
            onClick={onOpenLogModal}
            className="relative p-2 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/20 text-emerald-200 transition-colors"
            title="View saved plans and adventures"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            {activePlanCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-emerald-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                {activePlanCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
